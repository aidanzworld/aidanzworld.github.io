export interface DraftPick {
  round: number
  pick: number
  team: string
  teamLogo: string
  pickInfo: string
  player?: {
    name: string
    position: string
    college: string
    image?: string
  }
  isOnClock: boolean
  isComplete: boolean
  pickStatus?: "On the Clock" | "The pick is in" | ""
}

export interface DraftState {
  currentRound: number
  currentPick: number
  isActive: boolean
  lastUpdated: string
}

// Initial draft state for Season 14
export const initialDraftState: DraftState = {
  currentRound: 1,
  currentPick: 1,
  isActive: false,
  lastUpdated: new Date().toISOString(),
}

// Updated draft picks for Season 14 with 10 teams
export const initialDraftPicks: DraftPick[] = [
  // Round 1
  {
    round: 1,
    pick: 1,
    team: "Ravens",
    teamLogo: "/images/team-logos/BAL.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 1,
    pick: 2,
    team: "Cardinals",
    teamLogo: "/images/team-logos/ARI.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 1,
    pick: 3,
    team: "Lions",
    teamLogo: "/images/team-logos/DET.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 1,
    pick: 4,
    team: "Packers",
    teamLogo: "/images/team-logos/GB.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 1,
    pick: 5,
    team: "Bears",
    teamLogo: "/images/team-logos/CHI.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 1,
    pick: 6,
    team: "Panthers",
    teamLogo: "/images/team-logos/CAR.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 1,
    pick: 7,
    team: "Broncos",
    teamLogo: "/images/team-logos/DEN.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 1,
    pick: 8,
    team: "Raiders",
    teamLogo: "/images/team-logos/LV.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 1,
    pick: 9,
    team: "Chiefs",
    teamLogo: "/images/team-logos/KAN.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 1,
    pick: 10,
    team: "Texans",
    teamLogo: "/images/team-logos/HOU.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },

  // Round 2
  {
    round: 2,
    pick: 11,
    team: "Texans",
    teamLogo: "/images/team-logos/HOU.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 2,
    pick: 12,
    team: "Chiefs",
    teamLogo: "/images/team-logos/KAN.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 2,
    pick: 13,
    team: "Raiders",
    teamLogo: "/images/team-logos/LV.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 2,
    pick: 14,
    team: "Broncos",
    teamLogo: "/images/team-logos/DEN.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 2,
    pick: 15,
    team: "Panthers",
    teamLogo: "/images/team-logos/CAR.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 2,
    pick: 16,
    team: "Bears",
    teamLogo: "/images/team-logos/CHI.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 2,
    pick: 17,
    team: "Packers",
    teamLogo: "/images/team-logos/GB.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 2,
    pick: 18,
    team: "Lions",
    teamLogo: "/images/team-logos/DET.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 2,
    pick: 19,
    team: "Cardinals",
    teamLogo: "/images/team-logos/ARI.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 2,
    pick: 20,
    team: "Ravens",
    teamLogo: "/images/team-logos/BAL.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },

  // Round 3
  {
    round: 3,
    pick: 21,
    team: "Ravens",
    teamLogo: "/images/team-logos/BAL.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 3,
    pick: 22,
    team: "Cardinals",
    teamLogo: "/images/team-logos/ARI.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 3,
    pick: 23,
    team: "Lions",
    teamLogo: "/images/team-logos/DET.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 3,
    pick: 24,
    team: "Packers",
    teamLogo: "/images/team-logos/GB.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 3,
    pick: 25,
    team: "Bears",
    teamLogo: "/images/team-logos/CHI.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 3,
    pick: 26,
    team: "Panthers",
    teamLogo: "/images/team-logos/CAR.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 3,
    pick: 27,
    team: "Broncos",
    teamLogo: "/images/team-logos/DEN.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 3,
    pick: 28,
    team: "Raiders",
    teamLogo: "/images/team-logos/LV.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 3,
    pick: 29,
    team: "Chiefs",
    teamLogo: "/images/team-logos/KAN.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 3,
    pick: 30,
    team: "Texans",
    teamLogo: "/images/team-logos/HOU.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },

  // Round 4
  {
    round: 4,
    pick: 31,
    team: "Texans",
    teamLogo: "/images/team-logos/HOU.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 4,
    pick: 32,
    team: "Chiefs",
    teamLogo: "/images/team-logos/KAN.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 4,
    pick: 33,
    team: "Raiders",
    teamLogo: "/images/team-logos/LV.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 4,
    pick: 34,
    team: "Broncos",
    teamLogo: "/images/team-logos/DEN.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 4,
    pick: 35,
    team: "Panthers",
    teamLogo: "/images/team-logos/CAR.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 4,
    pick: 36,
    team: "Bears",
    teamLogo: "/images/team-logos/CHI.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 4,
    pick: 37,
    team: "Packers",
    teamLogo: "/images/team-logos/GB.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 4,
    pick: 38,
    team: "Lions",
    teamLogo: "/images/team-logos/DET.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 4,
    pick: 39,
    team: "Cardinals",
    teamLogo: "/images/team-logos/ARI.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 4,
    pick: 40,
    team: "Ravens",
    teamLogo: "/images/team-logos/BAL.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
]

// Update the positions list to only include the specified positions
export const positions = ["QB", "RB", "WR", "OL", "DE", "TE", "DB"]

// Update the colleges list to only include the specified colleges
export const colleges = ["Alabama", "LSU", "Texas", "BYU", "Penn State", "Florida", "Notre Dame", "Other"]

// Helper function to group picks by round
export function groupPicksByRound(picks: DraftPick[]) {
  return picks.reduce(
    (acc, pick) => {
      if (!acc[pick.round]) {
        acc[pick.round] = []
      }
      acc[pick.round].push(pick)
      return acc
    },
    {} as Record<number, DraftPick[]>,
  )
}

// Add a helper function to verify the draft picks are correctly ordered
export function verifyDraftOrder(picks: DraftPick[]): boolean {
  // Check if picks are in the correct order
  for (let i = 0; i < picks.length; i++) {
    const pick = picks[i]
    // For round 1, picks should start at 1
    if (pick.round === 1 && pick.pick < 1) {
      console.error("Invalid pick number in round 1:", pick)
      return false
    }
  }
  return true
}
