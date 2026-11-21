/**
 * Single source of truth for school identity and feature flags.
 */

export type VerifiedFlag = {
  verified: boolean;
  note?: string;
};

export const siteConfig = {
  name: "YOUR SCHOOL",
  shortName: "YOUR SCHOOL",
  tagline: "Little Steps Today, Big Dreams Tomorrow.",

  address: {
    line1: "Address line 1 — TO BE CONFIRMED",
    line2: "City, State, PIN — TO BE CONFIRMED",
    city: "City",
    state: "State",
    pincode: "000000",
    country: "India",
  },
  phones: [
    { label: "Main office", number: "+91 00000 00000", verified: false },
  ],
  whatsapp: {
    number: "910000000000",
    verified: false,
  },
  email: {
    general: "office@yourschool.example",
    admissions: "admissions@yourschool.example",
    verified: false,
  },
  timings: {
    office: "Monday–Saturday, 9:00 AM – 2:00 PM (placeholder)",
    verified: false,
  },
  mapEmbedUrl: "",
  social: {
    facebook: "",
    instagram: "",
    youtube: "",
  },

  affiliation: {
    statusText:
      "YOUR SCHOOL is not currently affiliated with the CBSE. Information and documents will be published here as they become available.",
    isCbseAffiliated: false,
    verified: true,
  },

  features: {
    enableSupabase: false,
    showFees: false,
    showGalleryPhotos: true,
    admissionsOpen: false,
  },

  verified: {
    contact: false,
    timings: false,
    fees: false,
    faculty: false,
    facilities: false,
    curriculum: false,
    principalMessage: false,
    management: false,
  } as Record<string, boolean>,

  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://primary-school-website-aditya-raj3.vercel.app",
  locale: "en_IN",
};

export type SiteConfig = typeof siteConfig;

export const isDev = process.env.NODE_ENV === "development";
