export interface NewsItem {
  id: number
  title: string
  excerpt: string
  content: string
  category: "breaking" | "player" | "team" | "event"
  image: string
  date: string
  slug: string
}

// Helper function to ensure slugs are properly formatted
function normalizeSlug(slug: string): string {
  return slug.trim().toLowerCase()
}

// Update the first article's slug to ensure it matches exactly
export const newsItems: NewsItem[] = [
  {
    id: 7,
    title: "Denver Defense Stops 2-Pt Conversion in OT2, Broncos Edge Oilers 58-56",
    excerpt:
      "In a thrilling double overtime showdown, the Denver Broncos defense made a crucial stop on a two-point conversion to secure a narrow victory over the Tennessee Oilers.",
    content: `
      <p>In one of the most thrilling games of the STC Season 12, the Denver Broncos outlasted the Tennessee Oilers 58-56 in double overtime, with their defense making a game-winning stop on a critical two-point conversion attempt.</p>
      
      <p>The marathon contest, which featured offensive fireworks from both teams, finally came to an end when the Broncos' defense stood tall in the second overtime period. With the Oilers needing a successful two-point conversion to extend the game, Denver's defensive unit made the decisive play on the 2 pt.</p>
      
      <p>"That was championship-level resilience from our guys," said Denver's Sean after the game. "When you're that exhausted, in the second overtime, it comes down to who wants it more. Our defense showed incredible heart on that final play."</p>
      
      <p>The game featured multiple lead changes and momentum swings, with both offenses seemingly unstoppable for long stretches. The combined 114 points set a new STC record for most points in an overtime game.</p>
      
      <p>Denver's quarterback orchestrated several crucial drives, including the go-ahead score in the second overtime period. The Broncos' offense accumulated over 500 total yards in the victory.</p>
      
      <p>For the Oilers, the heartbreaking loss drops them to 5-4 on the season, while Denver improves to 2-7, keeping their slim playoff hopes alive.</p>
      
      <p>"We showed a lot of fight today," said the Oilers' quarterback. "To battle back multiple times and force double overtime shows the character of this team. We just came up one play short (cause im ass..!)"</p>
      
      <p>The game will likely be remembered as one of the most exciting contests in STC history, with its double-overtime finish and record-setting scoring.</p>
      
      <p>Denver will look to build on this momentum as they face the Saints next week, while the Oilers will try to bounce back against the Bears in another crucial matchup.</p>

      <h3>Article by STC President Aidan</h3>
    `,
    category: "team",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_2025-04-13_204158-1ux7Na2cNQKQZTspy2cBBRf9rJxNAr.png",
    date: "April 13, 2025",
    slug: normalizeSlug("broncos-defense-stops-oilers-ot2"),
  },
  {
    id: 1,
    title: "Shrimp Zay: How a STC Bowl XII Win Would Change His Legacy",
    excerpt: "Shrimp Zay may be the runaway STC MVP winner, but what would another championship mean for his legacy?",
    content: `
      <p>Shrimp Zay may be the runaway STC MVP winner.</p>
      
      <p>There's no doubt about that.</p>
      
      <p>But Joel Embiid has an NBA MVP award and the only thing people seem to care about is the fact he's never won a title.</p>
      
      <p>Well, Zay has won a STC Bowl and, at the very least, appears to be on the verge of another.</p>
      
      <p>He is already considered to be one of the greatest quarterbacks of all-time, but we always want more.</p>
      
      <p>So what would another ring do for Zay's legacy?</p>
      
      <p>Let's take a look.</p>
      
      <h3>Improve His Hall of Fame Resume</h3>
      
      <p>I'm as sure about this statement as I would be if I wrote that the Falcons are the worst team in football: Shrimp Zay is going into the Hall of Fame.</p>
      <p>In fact, anyone above the age of five can tell you that. But it's important to note that this season has drastically improved his Hall of Fame resume.</p>
      
      <p>Zay has now totaled 34,545 passing yards, has accounted for 267 career touchdowns, has a career passer rating of 95.0 and has thrown just 103 career interceptions.</p>
      <p>That's not even taking into account the awards he's about to have.</p>
      <p>If something in life besides death and taxes is guaranteed, it's that Zay's credentials will be much better by season's end.</p>
      
      <h3>Guarantee His Place As One of the Most Clutch Athletes in Sports History</h3>
      
      <p>There's a difference between winning and coming through in the clutch.</p>
      
      <p>Zay's done both throughout his career, but his clutch performances often seem to be forgotten after Chicago's recent Super Bowl loss.</p>
      
      <p>In actuality though, Zay has already proved to be one of the most gritty athletes in sports history.</p>
      
      <p>In each of his Postseason victories, He has been able to convert when it matters most.</p>
      
      <h3>Prove That Shrimp Zay's Season 12 Was Better Than Season 9</h3>
      
      <p>During the 2023-24 (or S9) Season, Shrimp Zay threw for 4,806 yards, scored 87 total touchdowns and threw just eight interceptions.</p>
      
      <p>And Bears started 6-4 before losing to the Bengals in the STC Bowl. No one thought that Brady would ever top that magical season.</p>
      
      <p>But he has.</p>
      <p>This season Zay's thrown for 3,701 yards, scored 35 total touchdowns and thrown just four interceptions.</p>
      <p>Bears has also gone an astounding 9 straight games without a loss and has led the Patriots—who many expected to have a down year—to the top of the NFC.</p>
      <p>If Zay's Bears win STC Bowl XII, the case is closed—S12 is the best season of Zay's career.</p>
      
      <h3>Cap Off the Most Impressive Seasons In Recent STC History</h3>
      
      <p>When you think about some of the greatest seasons for a Team in recent STC history, several come to mind.</p>
      
      <p>Like S2 Seahawks (9-1).</p>
      <p>Like S7 Niners (9-1).</p>
      <p>Or S10 Bengals (8-0).</p>
      <p>Heck, even the S11 Ravens (11-1).</p>
      <p>But no one's been impressive as Shrimp Zay, who leads the league in touchdown passes (44), hasn't lost all season, has led the Bears to the No. 1 seed in the NFC.</p>
      
      <h3>Proof That He Is Better Than Tyler Rob & Skill</h3>
      
      <p>If Shrimp Zay and the Bears capture another STC Bowl title, he will undoubtedly assert himself as the greatest quarterback of his Era.</p>
      <p>Yes, better than Skill and Tyler Rob.</p>
      <p>Zay's career resume would read like this: Two STC Bowls and two STC MVP's, 7 STC Bowl Appearances and Most Postseason wins by a player under 30.</p>
      
      <p>It's just simple math.</p>
      <p>Zay would have four combined MVPs and STC Bowls while Rob and Skill would have just three (MVPs btw, not rings).</p>
      <p>Okay, it's not that simple. But at the end of the day, team accomplishments mean more than individual awards.</p>
      
      <h3>Reassert Himself As the Winningest Quarterback In League History</h3>
      
      <p>As of this writing, Shrimp Zay's career record as a starting quarterback in both the playoffs and the regular season is 34-18.</p>
      <p>His winning percentage of .775 is the highest of any quarterback in the STC Bowl era (since S1) with at least 100 career starts</p>
      <p>Zay is already the winningest quarterback ever to step foot on an STC field, but another STC Bowl ring would be the cherry on top of the "I never lose" sundae.</p>
      
      <h3>Assure His Spot As One of the Greatest QBs in Playoff History</h3>
      
      <p>Shrimp Zay entered season 12 with a 13-0 (not counting SB losses) playoff record. That ranks first in STC history only above Skill,</p>
      <p>Zay's 13 playoff wins are the most in league history.</p>
      <p>If the Bears win STC Bowl XII, Chicago will surpass Those of Legends and Be the first undefeated team in STC history, if that's not the "GOAT", then what does?</p>
      
      <h3>Affirm His Place As a Top-Two Quarterback in STC History</h3>
      
      <p>Skill has a regular season STC MVP award, Three STC Bowl MVP awards and five STC Bowl rings.</p>
      <p>At the end of this season, he could be dead even with Shrimp Zay in every single one of those categories.</p>
      <p>And sorry to guys like Tyler Rob, but Two STC Bowl rings automatically eliminates you from any "greatest quarterback" talk even if you were a better football player than Zay.</p>
      <p>Apologies also go out to quarterbacks like Mets and Landon as well, whose strong supporting casts hurt their cases.</p>
      <p>When it comes down to it, this is a two-horse race between Zay and Skill.</p>
      <p>It's definitely a case of comparing apples to oranges though, as the quarterbacks Play on the same team,</p>
      <p>If Zay wins another STC Bowl, he and Skill will be 1a and 1b.</p>
      <p>It's up to you guys to decide who goes where.</p>

      <h3>Article written by League Commmisioner, Decemberof2008</h3>
    `,
    category: "player",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6496.jpg-eUwCuVqfcpIyjciiutE4YGJGaakb2z.jpeg",
    date: "April 5, 2025 - STC Analysis",
    slug: "shrimp-zay-legacy-stc-bowl",
  },
  // Continue with the rest of the articles...
  {
    id: 2,
    title: "Two Rival Quarterbacks, Aidan and Liam Face Off This Week",
    excerpt: "After rap beef, Aidan and Liam's Dolphins and Chiefs go up to see who takes the #2 seed.",
    content: `
      <p>Two teams. Two fiery quarterbacks. One critical game—and one viral beef.</p>
      
      <p>This Sunday, the spotlight shines on a heated clash between the Miami Dolphins (2-4) and the Kansas City Chiefs (2-4) as they battle for the #2 seed in the division. But the story goes far beyond the scoreboard. It is a personal rivalry between two quarterbacks—Aidan, the rising star for Miami, and Liam Mahomes, the high-profile leader and accused predator of the Chiefs—fueled by a back-and-forth diss track war that has taken the league by storm.</p>
      
      <p>What started as some light-hearted shade after a court case, by Aidan commenting on the situation on STC's STC 10 news, it spiraled into a full-fledged lyrical feud. Liam fired next, releasing "AIDANK", taking direct aim at Aidans performance and legacy.</p>

      <p>According to CBS Sports, the fan voting percentage has the dolphins winning by 84% compared to the Kansas City Chiefs 16%. Looks like Kansas City will be the underdog in this game.</p>
    `,
    category: "breaking",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/GAMEPREVIEW.jpg-Y0SYiEQwztRVEc1jv2TnU6EgPH1tLA.jpeg",
    date: "March 27, 2025 - CBS Sports",
    slug: "liam-vs-aidan-week-7-news",
  },
  {
    id: 3,
    title: "STC Bowl XII to Take Place in Las Vegas, Nevada",
    excerpt: "League announces star-studded venue choice for championship game in Las Vegas.",
    content: `
      <p>The Sports Talk Club has announced that this year's STC Bowl XII will be at Allegiant Stadium, home of the NFL Las Vegas Raiders, in Las Vegas, Nevada.</p>
      
      <p>The 12th STC Bowl game, will showcase one of the biggest entertainment spectacles in STC history, with intros and surprises planned for viewers.</p>
      
      <p>"We're taking the STC Bowl to another level this season," said Decemberof2008, league commissioner in a press statement. "The combination of championship football and world-class entertainment will make this an unforgettable event for fans."</p>
      
      <p>The STC Bowl XII is still to be scheduled.</p>
    `,
    category: "event",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/STCBowlLocation.jpg-3SLcVggu3xL0TvUiZPOGZjgvRuMeg9.jpeg",
    date: "March 26, 2025",
    slug: "stc-bowl-12-stadium",
  },
  {
    id: 4,
    title: "Sean Unsuspended By League",
    excerpt: "Denver's Franchise Owner and star quarterback expected to play in crucial Week 7 matchup.",
    content: `
      <p>Denver Broncos quarterback Sean is listed as unsuspended after talking to Commisioner MVPSizzle about the matter.</p>
      
      <p>The Broncos have needed a quarterback pretty bad and now finally have the qb they've been wanting to play all season, but haven't been able to until now.</p>
      
      <p>Sean must win more games than he has on the sideline coaching, as he is 1-5 so far this past STC season.</p>
    `,
    category: "team",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SeanUnsuspended.jpg-9zCoEe7LNdZPBfg9iWdj84ddhYGxXN.jpeg",
    date: "March 27, 2025",
    slug: "sean-suspended-by-league",
  },
  {
    id: 5,
    title: "Bucs vs Saints, Post-Season Matchup Preview",
    excerpt: "Two of the teams in their conference go up to see if the Saints can take the Bucs spot.",
    content: `
      <p>The Sports Talk Club has a STACKED NFC this 12th season, with the top 4 teams having at least a 4-2 record.</p>
      
      <p>The Tampa Bay Buccaneers are 5-1, while the New Orleans Saints are 4-2. If the Saints beat the Buccaneers, they go 5-2 and tie the same record with them.</p>
      
      <p>But! If the Saints win against them, they take the advantage over them and go to #2. This is not really crucial for the Buccaneers but if they want a better seed, and to not play the Saints immediately or at all, they will have to win this matchup.</p>
    `,
    category: "breaking",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/GAMEPREVIEW2.jpg-Y8kljZX2LjKIjtUa2d3vK6DEouALOK.jpeg",
    date: "March 27, 2025",
    slug: "bucs-vs-saints-matchup",
  },
  {
    id: 6,
    title: "Bears Remain Undefeated at 9-0",
    excerpt: "Chicago Bears continue their perfect season with another dominant performance.",
    content: `
      <p>The Chicago Bears have continued their remarkable undefeated run, improving to 9-0 after another dominant performance this past weekend. The team has shown exceptional skill on both sides of the ball, establishing themselves as the clear favorites in the NFC.</p>
      
      <p>Led by their star quarterback and an aggressive defense, the Bears have outscored opponents by an average of 14 points per game. Their offensive line has been particularly impressive, allowing just 8 sacks all season while creating opportunities for their dynamic running game.</p>
      
      <p>"We're taking it one game at a time," said the Bears head coach in a post-game press conference. "This team has great chemistry and focus. We're not thinking about records or streaks - just the next opponent."</p>
      
      <p>With seven games remaining in the regular season, speculation has already begun about whether the Bears can complete a perfect season and make a run at the STC Bowl championship.</p>
    `,
    category: "team",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bears-undefeated.jpg",
    date: "April 3, 2025",
    slug: "bears-remain-undefeated",
  },
]

export function getLatestNews(count = 3): NewsItem[] {
  return newsItems.slice(0, count)
}

export function getNewsByCategory(category: string, count = 10): NewsItem[] {
  return newsItems.filter((item) => item.category === category).slice(0, count)
}

export function getNewsById(id: number): NewsItem | undefined {
  return newsItems.find((item) => item.id === id)
}

export function getNewsBySlug(slug: string): NewsItem | undefined {
  if (!slug) return undefined

  const normalizedSearchSlug = slug.trim().toLowerCase()

  // Log for debugging
  console.log("Searching for slug:", normalizedSearchSlug)
  console.log(
    "Available slugs:",
    newsItems.map((item) => item.slug.trim().toLowerCase()),
  )

  return newsItems.find((item) => item.slug.trim().toLowerCase() === normalizedSearchSlug)
}
