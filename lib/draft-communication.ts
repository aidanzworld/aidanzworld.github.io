// This file handles communication between the admin panel and the draft tracker

// Create a type for the message structure
export type DraftUpdateMessage = {
  type: "DRAFT_UPDATE"
  data: any
}

// Create a broadcast channel for real-time communication between tabs
let broadcastChannel: BroadcastChannel | null = null

// Initialize the broadcast channel if we're in a browser environment
export function initBroadcastChannel() {
  if (typeof window !== "undefined" && !broadcastChannel) {
    try {
      broadcastChannel = new BroadcastChannel("draft_updates")
    } catch (error) {
      console.error("BroadcastChannel not supported in this browser:", error)
    }
  }
  return broadcastChannel
}

// Function to broadcast draft updates to other tabs and save to server
export async function broadcastDraftUpdate(data: any) {
  // Save to localStorage for persistence
  localStorage.setItem(
    "draft_data",
    JSON.stringify({
      data,
      timestamp: new Date().toISOString(),
    }),
  )

  // Broadcast to other tabs
  const channel = initBroadcastChannel()
  if (channel) {
    const message: DraftUpdateMessage = {
      type: "DRAFT_UPDATE",
      data,
    }
    channel.postMessage(message)
  }

  // Send to server API
  try {
    await fetch("/api/draft", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
  } catch (error) {
    console.error("Error sending draft update to server:", error)
  }
}

// Function to get the latest draft data from localStorage
export function getLatestDraftData() {
  try {
    const storedData = localStorage.getItem("draft_data")
    if (storedData) {
      return JSON.parse(storedData).data
    }
  } catch (error) {
    console.error("Error retrieving draft data from localStorage:", error)
  }
  return null
}

// Function to fetch the latest draft data from the server
export async function fetchDraftDataFromServer() {
  try {
    const response = await fetch("/api/draft")
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching draft data from server:", error)
    return null
  }
}
