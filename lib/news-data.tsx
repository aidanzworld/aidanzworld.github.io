export interface NewsItem {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  category: string
  image: string
  slug: string
  readTime: string
  tags: string[]
}

export const newsItems: NewsItem[] = [
  {
    id: "1",
    title: "STC Bowl Championship Set for Las Vegas",
    excerpt: "The biggest game in STC League history will take place in the entertainment capital of the world.",
    content: `The STC League has officially announced that the championship game will be held in Las Vegas, Nevada. This marks a historic moment for the league as it continues to grow and expand its reach.

The championship game will feature the top two teams from the regular season in what promises to be an unforgettable showdown. Las Vegas provides the perfect backdrop for this momentous occasion, with its world-class facilities and entertainment options.

"We're thrilled to bring the STC Bowl to Las Vegas," said League Commissioner. "This city represents the pinnacle of entertainment, and our championship deserves nothing less."

The game will be broadcast live on the STC Network, with coverage beginning at 6:00 PM ET. Fans can expect pre-game festivities, halftime entertainment, and post-game celebrations that will make this an event to remember.

Tickets are expected to go on sale next month, with prices starting at $150 for upper-level seats. VIP packages will also be available for fans looking for the ultimate championship experience.`,
    author: "STC Sports Staff",
    date: "2024-11-15",
    category: "Championship",
    image: "/images/playoffs-vegas.png",
    slug: "stc-bowl-championship-las-vegas",
    readTime: "3 min read",
    tags: ["Championship", "Las Vegas", "STC Bowl"],
  },
  {
    id: "2",
    title: "Justin Fields Leads Comeback Victory",
    excerpt: "The young quarterback orchestrated a stunning fourth-quarter comeback to secure the win.",
    content: `In what many are calling the game of the season, Justin Fields led his team to a remarkable comeback victory, overcoming a 21-point deficit in the fourth quarter.

Fields threw for 387 yards and 4 touchdowns, with three of those scores coming in the final 15 minutes of play. His performance showcased the poise and leadership that has made him one of the most exciting young quarterbacks in the league.

"I just trusted my teammates and stuck to the game plan," Fields said after the game. "Our offensive line gave me time, and our receivers made incredible catches when it mattered most."

The comeback began with 12:47 left on the clock when Fields found his favorite target for a 23-yard touchdown pass. Two more scoring drives followed, including a spectacular 67-yard bomb with just 2:14 remaining that sent the crowd into a frenzy.

The victory keeps Fields' team in contention for a playoff spot and serves as a statement win that could define their season. With performances like this, it's clear that the future is bright for this young quarterback and his squad.`,
    author: "Mike Johnson",
    date: "2024-11-10",
    category: "Game Recap",
    image: "/images/news/justin-fields.jpg",
    slug: "justin-fields-comeback-victory",
    readTime: "4 min read",
    tags: ["Justin Fields", "Comeback", "Quarterback"],
  },
  {
    id: "3",
    title: "Mahomes Injury Update: Expected to Return",
    excerpt: "The star quarterback is making good progress and could return sooner than expected.",
    content: `Patrick Mahomes is ahead of schedule in his recovery from a high ankle sprain and could return to action within the next two weeks, according to team sources.

The injury occurred during last week's game when Mahomes was rolled up on during a scramble. Initial fears suggested he could miss 4-6 weeks, but his rapid progress has been encouraging for both the team and fans.

"Patrick is a warrior," said the team's head coach. "His dedication to his recovery has been incredible to watch. We're optimistic about his return, but we won't rush anything."

Mahomes has been working with the team's medical staff daily, focusing on mobility and strength exercises. He's been able to participate in limited practice sessions, throwing passes while stationary.

The team has gone 1-1 in his absence, with backup quarterback Chad Henne stepping up admirably. However, everyone knows that Mahomes' return will be crucial for any championship aspirations.

Fantasy football owners and fans alike will be monitoring his progress closely as the team prepares for their upcoming crucial matchups.`,
    author: "Sarah Williams",
    date: "2024-11-08",
    category: "Injury Report",
    image: "/images/news/mahomes-injury.jpg",
    slug: "mahomes-injury-update-return",
    readTime: "3 min read",
    tags: ["Patrick Mahomes", "Injury", "Recovery"],
  },
  {
    id: "4",
    title: "League Expansion: Two New Teams Join STC",
    excerpt: "The STC League announces its expansion with two new franchises set to begin play next season.",
    content: `The STC League has officially announced its expansion, welcoming two new franchises that will begin competition in Season 15. This marks the first expansion in the league's history and represents a significant milestone in its growth.

The new teams will be based in Austin, Texas, and Portland, Oregon, bringing the total number of teams to 12. Both cities were selected after an extensive evaluation process that considered market size, fan support, and facility capabilities.

"This expansion represents the natural evolution of our league," said the Commissioner. "Austin and Portland have shown incredible enthusiasm for STC football, and we're excited to bring the game to these passionate fan bases."

The expansion draft will take place in the offseason, allowing the new teams to select players from existing rosters. Each current team will be able to protect a certain number of players, while making others available for selection.

Construction of new stadiums in both cities is already underway, with state-of-the-art facilities planned that will enhance the fan experience. The Austin franchise will play in a 45,000-seat stadium, while Portland's venue will accommodate 42,000 fans.

Season ticket deposits are already being accepted in both markets, with overwhelming response from local communities eager to support their new teams.`,
    author: "David Chen",
    date: "2024-11-05",
    category: "League News",
    image: "/images/news/league-expansion.jpg",
    slug: "league-expansion-two-new-teams",
    readTime: "5 min read",
    tags: ["Expansion", "Austin", "Portland", "Season 15"],
  },
  {
    id: "5",
    title: "Colts Find Their Franchise Quarterback",
    excerpt: "After years of searching, Indianapolis believes they've found their long-term answer at the position.",
    content: `The Indianapolis Colts appear to have found their franchise quarterback after years of uncertainty at the position. The young signal-caller has shown remarkable progress and leadership qualities that have impressed coaches and teammates alike.

In his first season as a starter, he's thrown for over 3,200 yards with 24 touchdowns and just 8 interceptions. More importantly, he's led the team to several crucial victories in high-pressure situations.

"He has all the tools you want in a franchise quarterback," said the offensive coordinator. "His arm strength, accuracy, and football IQ are all elite level. But what really sets him apart is his leadership and composure under pressure."

The quarterback's development has been accelerated by working with veteran receivers and a strong offensive line. His ability to read defenses and make quick decisions has been particularly impressive for someone so early in his career.

The Colts' front office is already discussing a long-term contract extension, recognizing that they may have found their cornerstone player for the next decade. Fans in Indianapolis are buzzing with excitement about the team's future prospects.

With a franchise quarterback in place, the Colts can now focus on building a championship-caliber team around him. The future looks bright in Indianapolis.`,
    author: "Jennifer Martinez",
    date: "2024-11-01",
    category: "Player Spotlight",
    image: "/images/news/colts-qb.jpg",
    slug: "colts-franchise-quarterback",
    readTime: "4 min read",
    tags: ["Indianapolis Colts", "Quarterback", "Franchise Player"],
  },
]

// Export as both newsItems and newsArticles for compatibility
export const newsArticles = newsItems
