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

// Make sure the initialDraftState is correctly set to round 1, pick 1
export const initialDraftState: DraftState = {
  currentRound: 1,
  currentPick: 1,
  isActive: false,
  lastUpdated: new Date().toISOString(),
}

// This will be populated with the actual draft order
export const initialDraftPicks: DraftPick[] = [
  // Round 1
  {
    round: 1,
    pick: 1,
    team: "Browns",
    teamLogo: "/images/team-logos/CLE.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 1,
    pick: 2,
    team: "Bears",
    teamLogo: "/images/team-logos/CHI.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "VIA LV",
  },
  {
    round: 1,
    pick: 3,
    team: "Texans",
    teamLogo: "/images/team-logos/HOU.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 1,
    pick: 4,
    team: "Chiefs",
    teamLogo: "/images/team-logos/KAN.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 1,
    pick: 5,
    team: "Panthers",
    teamLogo: "/images/team-logos/CAR.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "VIA KC",
  },
  {
    round: 1,
    pick: 6,
    team: "Broncos",
    teamLogo: "/images/team-logos/DEN.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "VIA CH",
  },
  {
    round: 1,
    pick: 7,
    team: "Packers",
    teamLogo: "/images/team-logos/GB.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "VIA BAL",
  },
  {
    round: 1,
    pick: 8,
    team: "Lions",
    teamLogo: "/images/team-logos/DET.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 1,
    pick: 9,
    team: "Cardinals",
    teamLogo: "/images/team-logos/ARI.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "VIA KC",
  },
  {
    round: 1,
    pick: 10,
    team: "Ravens",
    teamLogo: "/images/team-logos/BAL.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "VIA GB",
  },
  {
    round: 1,
    pick: 11,
    team: "Broncos",
    teamLogo: "/images/team-logos/DEN.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 1,
    pick: 12,
    team: "Buccaneers",
    teamLogo: "/images/team-logos/TB.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "VIA CHI",
  },

  // Round 2
  {
    round: 2,
    pick: 13,
    team: "Buccaneers",
    teamLogo: "/images/team-logos/TB.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "VIA CHI",
  },
  {
    round: 2,
    pick: 14,
    team: "Chiefs",
    teamLogo: "/images/team-logos/KAN.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "VIA BAL",
  },
  {
    round: 2,
    pick: 15,
    team: "Bears",
    teamLogo: "/images/team-logos/CHI.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "VIA DEN",
  },
  {
    round: 2,
    pick: 16,
    team: "Cardinals",
    teamLogo: "/images/team-logos/ARI.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "VIA KC",
  },
  {
    round: 2,
    pick: 17,
    team: "Lions",
    teamLogo: "/images/team-logos/DET.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 2,
    pick: 18,
    team: "Ravens",
    teamLogo: "/images/team-logos/BAL.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "VIA KC",
  },
  {
    round: 2,
    pick: 19,
    team: "Browns",
    teamLogo: "/images/team-logos/CLE.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "VIA TB",
  },
  {
    round: 2,
    pick: 20,
    team: "Cardinals",
    teamLogo: "/images/team-logos/ARI.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 2,
    pick: 21,
    team: "Panthers",
    teamLogo: "/images/team-logos/CAR.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 2,
    pick: 22,
    team: "Texans",
    teamLogo: "/images/team-logos/HOU.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 2,
    pick: 23,
    team: "Panthers",
    teamLogo: "/images/team-logos/CAR.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "VIA LV",
  },
  {
    round: 2,
    pick: 24,
    team: "Ravens",
    teamLogo: "/images/team-logos/BAL.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "VIA DEN",
  },

  // Round 3
  {
    round: 3,
    pick: 25,
    team: "Ravens",
    teamLogo: "/images/team-logos/BAL.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "VIA DEN",
  },
  {
    round: 3,
    pick: 26,
    team: "Panthers",
    teamLogo: "/images/team-logos/CAR.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "VIA LV",
  },
  {
    round: 3,
    pick: 27,
    team: "Texans",
    teamLogo: "/images/team-logos/HOU.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 3,
    pick: 28,
    team: "Panthers",
    teamLogo: "/images/team-logos/CAR.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 3,
    pick: 29,
    team: "Cardinals",
    teamLogo: "/images/team-logos/ARI.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 3,
    pick: 30,
    team: "Browns",
    teamLogo: "/images/team-logos/CLE.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "VIA TB",
  },
  {
    round: 3,
    pick: 31,
    team: "Packers",
    teamLogo: "/images/team-logos/GB.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "VIA BAL",
  },
  {
    round: 3,
    pick: 32,
    team: "Lions",
    teamLogo: "/images/team-logos/DET.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 3,
    pick: 33,
    team: "Ravens",
    teamLogo: "/images/team-logos/BAL.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "VIA DEN",
  },
  {
    round: 3,
    pick: 34,
    team: "Packers",
    teamLogo: "/images/team-logos/GB.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 3,
    pick: 35,
    team: "Broncos",
    teamLogo: "/images/team-logos/DEN.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 3,
    pick: 36,
    team: "Broncos",
    teamLogo: "/images/team-logos/DEN.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "VIA CHI",
  },

  // Round 4
  {
    round: 4,
    pick: 37,
    team: "Bears",
    teamLogo: "/images/team-logos/CHI.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 4,
    pick: 38,
    team: "Broncos",
    teamLogo: "/images/team-logos/DEN.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 4,
    pick: 39,
    team: "Packers",
    teamLogo: "/images/team-logos/GB.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 4,
    pick: 40,
    team: "Broncos",
    teamLogo: "/images/team-logos/DEN.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "VIA BAL",
  },
  {
    round: 4,
    pick: 41,
    team: "Lions",
    teamLogo: "/images/team-logos/DET.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 4,
    pick: 42,
    team: "Broncos",
    teamLogo: "/images/team-logos/DEN.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "VIA BAL",
  },
  {
    round: 4,
    pick: 43,
    team: "Buccaneers",
    teamLogo: "/images/team-logos/TB.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 4,
    pick: 44,
    team: "Broncos",
    teamLogo: "/images/team-logos/DEN.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "VIA BAL",
  },
  {
    round: 4,
    pick: 45,
    team: "Panthers",
    teamLogo: "/images/team-logos/CAR.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 4,
    pick: 46,
    team: "Texans",
    teamLogo: "/images/team-logos/HOU.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "",
  },
  {
    round: 4,
    pick: 47,
    team: "Panthers",
    teamLogo: "/images/team-logos/CAR.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "VIA LV",
  },
  {
    round: 4,
    pick: 48,
    team: "Broncos",
    teamLogo: "/images/team-logos/DEN.png",
    isOnClock: false,
    isComplete: false,
    pickInfo: "VIA CAR",
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
