import { NextResponse } from "next/server"
import { initialDraftPicks, initialDraftState } from "@/lib/draft-data"

// In a real app, you would use a database to store this data
// For this demo, we'll use in-memory storage
let draftPicks = [...initialDraftPicks]
let draftState = { ...initialDraftState }

export async function GET() {
  return NextResponse.json({
    picks: draftPicks,
    state: draftState,
  })
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Debug log to see what's being received
    console.log("Received draft data:", {
      currentRound: data.state?.currentRound,
      currentPick: data.state?.currentPick,
      firstPick: data.picks?.[0]?.round,
      picksCount: data.picks?.length,
    })

    // Update draft data
    if (data.picks) draftPicks = data.picks
    if (data.state) draftState = data.state

    return NextResponse.json({
      success: true,
      message: "Draft data updated successfully",
    })
  } catch (error) {
    console.error("Error updating draft data:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update draft data",
      },
      { status: 500 },
    )
  }
}

// Add a reset endpoint
export async function DELETE() {
  try {
    // Reset to initial state
    draftPicks = [...initialDraftPicks]
    draftState = { ...initialDraftState }

    return NextResponse.json({
      success: true,
      message: "Draft data reset successfully",
    })
  } catch (error) {
    console.error("Error resetting draft data:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to reset draft data",
      },
      { status: 500 },
    )
  }
}
