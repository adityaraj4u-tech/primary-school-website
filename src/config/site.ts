export const siteConfig = {
  name: "PlayGrid",
  shortName: "PlayGrid",
  tagline: "Free browser games. No downloads. Just play.",
  description:
    "PlayGrid is a free online game hub. Start with classic Tic-Tac-Toe — more games coming soon.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://primary-school-website-aditya-raj3.vercel.app",
  locale: "en_IN",
  games: [
    {
      id: "tic-tac-toe",
      title: "Tic-Tac-Toe",
      slug: "/games/tic-tac-toe",
      description: "Classic 3×3. Play a friend or challenge the AI.",
      status: "live" as const,
      emoji: "⭕",
      accent: "#3986D7",
    },
  ],
};

export type SiteConfig = typeof siteConfig;
