export interface Team {
  id: string
  name: string
  city: string
  logo: string
  conference: "AFC" | "NFC"
  division: string
  wins: number
  losses: number
  description: string
  founded: number
  stadium: string
  colors: {
    primary: string
    secondary: string
  }
  pointsFor?: number
  pointsAgainst?: number
  streak?: string
}

export const defaultTeams: Team[] = [
  // AFC Teams
  {
    id: "ravens",
    name: "Ravens",
    city: "Baltimore",
    logo: "/images/team-logos/BAL.png",
    conference: "AFC",
    division: "North",
    wins: 2,
    losses: 0,
    description: "A strong defensive team with championship aspirations.",
    founded: 1996,
    stadium: "M&T Bank Stadium",
    colors: { primary: "#241773", secondary: "#000000" },
    pointsFor: 63,
    pointsAgainst: 38,
    streak: "W2",
  },
  {
    id: "chiefs",
    name: "Chiefs",
    city: "Kansas City",
    logo: "/images/team-logos/KAN.png",
    conference: "AFC",
    division: "West",
    wins: 2,
    losses: 0,
    description: "The defending champions with explosive offensive potential.",
    founded: 1960,
    stadium: "Arrowhead Stadium",
    colors: { primary: "#E31837", secondary: "#FFB81C" },
    pointsFor: 59,
    pointsAgainst: 42,
    streak: "W2",
  },
  {
    id: "jets",
    name: "Jets",
    city: "New York",
    logo: "/images/team-logos/NYJ.png",
    conference: "AFC",
    division: "East",
    wins: 2,
    losses: 0,
    description: "A young team building around a talented core.",
    founded: 1960,
    stadium: "MetLife Stadium",
    colors: { primary: "#125740", secondary: "#000000" },
    pointsFor: 41,
    pointsAgainst: 30,
    streak: "W2",
  },
  {
    id: "dolphins",
    name: "Dolphins",
    city: "Miami",
    logo: "/images/team-logos/MIA.png",
    conference: "AFC",
    division: "East",
    wins: 1,
    losses: 1,
    description: "Fast-paced offense with a dynamic quarterback.",
    founded: 1966,
    stadium: "Hard Rock Stadium",
    colors: { primary: "#008E97", secondary: "#FC4C02" },
    pointsFor: 44,
    pointsAgainst: 45,
    streak: "W1",
  },
  {
    id: "jaguars",
    name: "Jaguars",
    city: "Jacksonville",
    logo: "/images/team-logos/JAX.png",
    conference: "AFC",
    division: "South",
    wins: 1,
    losses: 1,
    description: "An up-and-coming team with a bright future.",
    founded: 1995,
    stadium: "TIAA Bank Field",
    colors: { primary: "#006778", secondary: "#9F792C" },
    pointsFor: 38,
    pointsAgainst: 38,
    streak: "W1",
  },
  // NFC Teams
  {
    id: "49ers",
    name: "49ers",
    city: "San Francisco",
    logo: "/images/team-logos/49ERS.png",
    conference: "NFC",
    division: "West",
    wins: 1,
    losses: 1,
    description: "A powerhouse team with championship experience.",
    founded: 1946,
    stadium: "Levi's Stadium",
    colors: { primary: "#AA0000", secondary: "#B3995D" },
    pointsFor: 55,
    pointsAgainst: 51,
    streak: "L1",
  },
  {
    id: "rams",
    name: "Rams",
    city: "Los Angeles",
    logo: "/images/team-logos/LAR.png",
    conference: "NFC",
    division: "West",
    wins: 0,
    losses: 2,
    description: "High-powered offense with elite playmakers.",
    founded: 1936,
    stadium: "SoFi Stadium",
    colors: { primary: "#003594", secondary: "#FFA300" },
    pointsFor: 41,
    pointsAgainst: 52,
    streak: "L2",
  },
  {
    id: "bears",
    name: "Bears",
    city: "Chicago",
    logo: "/images/team-logos/CHI.png",
    conference: "NFC",
    division: "North",
    wins: 0,
    losses: 2,
    description: "Historic franchise with a strong defensive tradition.",
    founded: 1920,
    stadium: "Soldier Field",
    colors: { primary: "#0B162A", secondary: "#C83803" },
    pointsFor: 38,
    pointsAgainst: 59,
    streak: "L2",
  },
  {
    id: "buccaneers",
    name: "Buccaneers",
    city: "Tampa Bay",
    logo: "/images/team-logos/TB.png",
    conference: "NFC",
    division: "South",
    wins: 0,
    losses: 1,
    description: "Championship contenders with veteran leadership.",
    founded: 1976,
    stadium: "Raymond James Stadium",
    colors: { primary: "#D50A0A", secondary: "#FF7900" },
    pointsFor: 10,
    pointsAgainst: 35,
    streak: "L1",
  },
  {
    id: "panthers",
    name: "Panthers",
    city: "Carolina",
    logo: "/images/team-logos/CAR.png",
    conference: "NFC",
    division: "South",
    wins: 0,
    losses: 1,
    description: "Rebuilding team with young talent and potential.",
    founded: 1995,
    stadium: "Bank of America Stadium",
    colors: { primary: "#0085CA", secondary: "#101820" },
    pointsFor: 13,
    pointsAgainst: 20,
    streak: "L1",
  },
]

// Team data management functions
export const getTeams = (): Team[] => {
  if (typeof window === "undefined") return defaultTeams

  const savedTeams = localStorage.getItem("stc-teams")
  if (savedTeams) {
    try {
      return JSON.parse(savedTeams)
    } catch (error) {
      console.error("Error loading saved teams:", error)
    }
  }
  return defaultTeams
}

export const saveTeams = (teams: Team[]): void => {
  if (typeof window === "undefined") return
  localStorage.setItem("stc-teams", JSON.stringify(teams))
}

export const updateTeam = (updatedTeam: Team): void => {
  const teams = getTeams()
  const updatedTeams = teams.map((team) => (team.id === updatedTeam.id ? updatedTeam : team))
  saveTeams(updatedTeams)
}

export const getTeamById = (id: string): Team | undefined => {
  const teams = getTeams()
  return teams.find((team) => team.id === id)
}

export const getTeamByName = (name: string): Team | undefined => {
  const teams = getTeams()
  return teams.find((team) => team.name === name || `${team.city} ${team.name}` === name)
}

// Calculate team stats from game results
export const calculateTeamStats = (teams: Team[], games: any[]): Team[] => {
  const teamStats = teams.map((team) => ({
    ...team,
    wins: 0,
    losses: 0,
    pointsFor: 0,
    pointsAgainst: 0,
    streak: "",
  }))

  // Process completed games
  const completedGames = games.filter((game) => game.status === "final")

  completedGames.forEach((game) => {
    const homeTeam = teamStats.find(
      (t) => t.name === game.homeTeam.name || `${t.city} ${t.name}` === `${game.homeTeam.city} ${game.homeTeam.name}`,
    )
    const awayTeam = teamStats.find(
      (t) => t.name === game.awayTeam.name || `${t.city} ${t.name}` === `${game.awayTeam.city} ${game.awayTeam.name}`,
    )

    if (homeTeam && awayTeam && game.homeScore !== undefined && game.awayScore !== undefined) {
      // Update points
      homeTeam.pointsFor += game.homeScore
      homeTeam.pointsAgainst += game.awayScore
      awayTeam.pointsFor += game.awayScore
      awayTeam.pointsAgainst += game.homeScore

      // Update wins/losses
      if (game.homeScore > game.awayScore) {
        homeTeam.wins++
        awayTeam.losses++
      } else {
        awayTeam.wins++
        homeTeam.losses++
      }
    }
  })

  // Calculate streaks (simplified - just show current record trend)
  teamStats.forEach((team) => {
    if (team.wins > team.losses) {
      team.streak = `W${team.wins}`
    } else if (team.losses > team.wins) {
      team.streak = `L${team.losses}`
    } else {
      team.streak = "T"
    }
  })

  return teamStats
}
