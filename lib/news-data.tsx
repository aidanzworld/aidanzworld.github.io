export interface NewsArticle {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  category: string
  image: string
  slug: string
  featured?: boolean
}

export const newsArticles: NewsArticle[] = [
  {
    id: "1",
    title: "STC Bowl XIV Set for Las Vegas",
    excerpt: "The championship game will be held at the iconic Las Vegas Stadium with unprecedented fanfare.",
    content:
      "The STC League has officially announced that STC Bowl XIV will take place in Las Vegas, marking the first time the championship game will be held in the entertainment capital of the world. The game is expected to draw record crowds and television viewership.",
    author: "Mike Johnson",
    date: "2024-09-15",
    category: "Championship",
    image: "/images/news/stc-bowl-halftime.jpg",
    slug: "stc-bowl-xiv-las-vegas",
    featured: true,
  },
  {
    id: "2",
    title: "Mahomes Injury Update",
    excerpt: "Chiefs quarterback dealing with minor ankle sprain, expected to play this week.",
    content:
      "Kansas City Chiefs quarterback Patrick Mahomes suffered a minor ankle sprain during practice this week but is expected to be ready for the upcoming game. Team medical staff are optimistic about his recovery.",
    author: "Sarah Davis",
    date: "2024-09-14",
    category: "Injury Report",
    image: "/images/news/mahomes-injury.jpg",
    slug: "mahomes-injury-update",
  },
  {
    id: "3",
    title: "League Expansion Talks Continue",
    excerpt: "STC officials discuss potential addition of two new franchises for Season 15.",
    content:
      "The STC League continues discussions about expanding from 10 to 12 teams for the upcoming Season 15. Officials are evaluating potential markets and ownership groups.",
    author: "Tom Wilson",
    date: "2024-09-13",
    category: "League News",
    image: "/images/news/league-expansion.jpg",
    slug: "league-expansion-talks",
  },
  {
    id: "4",
    title: "Justin Fields Leads Bears Comeback",
    excerpt: "Chicago quarterback orchestrates stunning fourth-quarter rally against division rivals.",
    content:
      "In a thrilling display of leadership, Justin Fields led the Chicago Bears to a remarkable comeback victory, throwing for 300 yards and 3 touchdowns in the final quarter.",
    author: "Alex Rodriguez",
    date: "2024-09-12",
    category: "Game Recap",
    image: "/images/news/justin-fields.jpg",
    slug: "justin-fields-bears-comeback",
  },
  {
    id: "5",
    title: "Colts Sign New Quarterback",
    excerpt: "Indianapolis makes major move in free agency, signing veteran signal-caller.",
    content:
      "The Indianapolis Colts have made a significant addition to their roster, signing veteran quarterback Marcus Johnson to a multi-year deal. The move is expected to bolster their playoff chances.",
    author: "Jennifer Lee",
    date: "2024-09-11",
    category: "Transactions",
    image: "/images/news/colts-qb.jpg",
    slug: "colts-sign-new-quarterback",
  },
]
