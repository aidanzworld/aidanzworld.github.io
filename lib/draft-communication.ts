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

// Function to broadcast draft updates to other tabs
export function broadcastDraftUpdate(data: any) {
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
