export const CLINIC = {
  name: "GME Global Medical Excellence",
  short: "GME",
  phone: "(702) 550-6777",
  phoneHref: "tel:+17025506777",
  email: "Contact@GMELV.com",
  bookingUrl: "https://d2oe0ra32qx05a.cloudfront.net/?practiceKey=k_1_114664",
  address: {
    line1: "700 Shadow Lane Suite #165",
    line2: "Las Vegas, NV 89106",
  },
  hours: [
    { day: "Mon – Thu", time: "8:00 AM – 5:00 PM" },
    { day: "Friday", time: "8:00 AM – 3:00 PM" },
    { day: "Sat – Sun", time: "Closed" },
  ],
  mapEmbed:
    "https://www.google.com/maps?q=700+Shadow+Lane+Suite+165+Las+Vegas+NV+89106&output=embed",
};

export type ServiceSlug =
  | "primary-care"
  | "lifestyle-medicine"
  | "addiction-care"
  | "all-physician-group";

export const SERVICES: {
  slug: ServiceSlug;
  title: string;
  short: string;
  long: string;
  bullets: string[];
}[] = [
  {
    slug: "primary-care",
    title: "Primary Care",
    short: "Comprehensive, physician-led primary care for adults of every season of life.",
    long:
      "Our primary care practice is built around long-term relationships. Every visit is conducted by a board-certified physician who knows your story — from your annual wellness exams and chronic disease management to acute illness, preventive screenings, and coordinated specialty referrals. We take the time to listen, think critically about your whole health picture, and partner with you on a plan you understand and trust.",
    bullets: [
      "Annual wellness & preventive exams",
      "Chronic disease management (diabetes, hypertension, cholesterol, thyroid)",
      "Acute illness & same-week sick visits",
      "Coordinated specialty referrals",
      "On-site labs and follow-through",
    ],
  },
  {
    slug: "lifestyle-medicine",
    title: "Lifestyle Medicine",
    short: "Advanced therapies for energy, longevity, recovery, and how you actually feel day to day.",
    long:
      "Lifestyle Medicine at GME is where evidence-based science meets a deeply personal approach to vitality. We design protocols around your labs, your symptoms, and your goals — combining hormone optimization, peptide therapy, topical and regenerative treatments, and targeted nutrition and recovery support. This is care for the patient who wants to feel sharper, stronger, and more like themselves again, supervised end-to-end by your physician.",
    bullets: [
      "Bioidentical hormone replacement therapy (men & women)",
      "Peptide therapy for recovery, sleep, and metabolic health",
      "Topical & compounded treatments",
      "Stem cell and regenerative consultations",
      "Personalized longevity and performance plans",
    ],
  },
  {
    slug: "addiction-care",
    title: "Addiction Care",
    short: "Confidential, judgment-free, board-certified addiction medicine with MAT.",
    long:
      "Addiction is a medical condition, and it deserves medical expertise. Our board-certified addictionologists provide compassionate, evidence-based treatment including medication-assisted therapy (MAT) for opioid use disorder, alcohol use disorder, and co-occurring conditions. Care is delivered privately in our clinic by the same physicians who manage the rest of your health — so your recovery is integrated, dignified, and supported for the long term.",
    bullets: [
      "Medication-Assisted Therapy (Suboxone, naltrexone, others)",
      "Alcohol use disorder treatment",
      "Co-occurring mental health support",
      "Confidential outpatient program",
      "Long-term recovery and relapse prevention",
    ],
  },
  {
    slug: "all-physician-group",
    title: "All-Physician Group",
    short: "Every visit, every decision — handled by a board-certified physician. No mid-level extenders.",
    long:
      "At GME, you will never be handed off to a mid-level extender. Every patient encounter is conducted by one of our fully board-certified physicians. This is increasingly rare in modern primary care, and it is a deliberate choice: we believe complex decisions about your health deserve a doctor's training, judgment, and time. It is the foundation of everything else we do.",
    bullets: [
      "100% physician-delivered care",
      "Continuity with the same doctor visit after visit",
      "Longer, unhurried appointments",
      "Decisions made by board-certified internists",
      "Direct physician access for your questions",
    ],
  },
];

export type PhysicianSlug = "dr-scott-silver" | "dr-mark-lopez";

export const PHYSICIANS: {
  slug: PhysicianSlug;
  name: string;
  title: string;
  short: string;
  bio: string[];
  credentials: string[];
  image: string;
}[] = [
  {
    slug: "dr-scott-silver",
    name: "Dr. Scott Silver",
    title: "Co-Founder · Program Director, Graduate Medical Education",
    image: "dr-scott",
    short:
      "Over a decade serving Las Vegas across hospital, outpatient, and long-term care. Dual board-certified internist and GME Program Director at Valley Hospital.",
    bio: [
      "Dr. Scott Silver brings over a decade of dedicated service to the Las Vegas community, spanning hospital care, outpatient clinics, and long-term care facilities. He earned his Bachelor of Science from Cornell University before receiving his medical doctorate from NYCOM. He completed his Internal Medicine residency right here in Las Vegas.",
      "As a leader in the medical community, Dr. Silver serves as the Program Director for Graduate Medical Education at Valley Hospital, where he actively mentors and trains the next generation of physicians. His commitment to excellence is reflected in his dual board certifications from the ABIM and AOBIM, as well as his prestigious Fellowships in both the American College of Physicians (ACP) and the American College of Osteopathic Internists (ACOI).",
      "Whether he is acting as a medical director for local organizations or seeing patients in our clinic, Dr. Silver's focus remains the same: providing expert, physician-led care built on years of clinical experience and a passion for medical education.",
    ],
    credentials: [
      "B.S., Cornell University",
      "D.O., New York College of Osteopathic Medicine",
      "Internal Medicine Residency — Las Vegas",
      "Board Certified: ABIM & AOBIM",
      "Fellow, American College of Physicians (FACP)",
      "Fellow, American College of Osteopathic Internists (FACOI)",
      "Program Director, GME — Valley Hospital",
    ],
  },
  {
    slug: "dr-mark-lopez",
    name: "Dr. Mark Lopez",
    title: "Co-Founder · Associate Program Director, Graduate Medical Education",
    image: "dr-mark",
    short:
      "U.S. Air Force veteran with ~20 years of medical experience. Dual board-certified in Internal Medicine and Addiction Medicine.",
    bio: [
      "Dr. Mark Lopez brings a unique and distinguished background to our practice, defined by his service to both his country and the Las Vegas community. After graduating from the University of Nevada, Reno (UNR), Dr. Lopez earned his medical degree from the Touro University College of Osteopathic Medicine. He completed his Internal Medicine residency in Las Vegas, where he honed his skills in complex adult care.",
      "A veteran of the United States Air Force, Dr. Lopez served on a deployment to Iraq, an experience that instilled in him a steadfast commitment to precision and compassionate care under pressure.",
      "Dr. Lopez is dual board-certified in Internal Medicine and Addiction Medicine, providing him with a comprehensive understanding of the physical and psychological components of long-term wellness. His dedication to the future of healthcare is evident in his role as the Associate Program Director (APD) for Graduate Medical Education, where he works alongside Dr. Silver to mentor the next generation of physicians. With nearly 20 years of medical experience, Dr. Lopez ensures that every patient receives expert, physician-led attention tailored to their individual needs.",
    ],
    credentials: [
      "B.S., University of Nevada, Reno",
      "D.O., Touro University College of Osteopathic Medicine",
      "Internal Medicine Residency — Las Vegas",
      "Board Certified: Internal Medicine",
      "Board Certified: Addiction Medicine",
      "U.S. Air Force Veteran — Iraq deployment",
      "Associate Program Director, GME",
    ],
  },
];

export const AFFILIATIONS = [
  "Valley Hospital Medical Center",
  "American College of Physicians",
  "American College of Osteopathic Internists",
  "ABIM",
  "AOBIM",
  "Touro University Nevada",
  "University of Nevada, Reno",
  "NYCOM",
  "U.S. Air Force",
  "Graduate Medical Education",
];

export const INSURANCE_FEATURED = [
  "Aetna",
  "Anthem Blue Cross Blue Shield",
  "Cigna",
  "Humana",
  "UnitedHealthcare",
  "Medicare",
  "TRICARE",
  "Health Plan of Nevada",
];

export const INSURANCE_ALL = [
  "Aetna",
  "Aetna Better Health",
  "Anthem Blue Cross Blue Shield",
  "Cigna",
  "Cigna HealthSpring",
  "First Health Network",
  "Health Plan of Nevada (HPN)",
  "HealthSCOPE Benefits",
  "Humana",
  "Humana Military / TRICARE East",
  "Medicare (Original)",
  "Medicare Advantage — Aetna",
  "Medicare Advantage — Humana",
  "Medicare Advantage — UnitedHealthcare",
  "MultiPlan / PHCS",
  "Nevada Medicaid (select plans)",
  "Prominence Health Plan",
  "Sierra Health & Life",
  "SilverSummit Healthplan",
  "TRICARE",
  "UMR",
  "UnitedHealthcare",
  "WellCare",
];

export const TESTIMONIALS = [
  {
    name: "Patricia M.",
    role: "Patient since 2021",
    quote:
      "I finally have a doctor who knows me. Dr. Silver caught something two specialists missed. I send my whole family here.",
  },
  {
    name: "James R.",
    role: "U.S. Army veteran",
    quote:
      "Dr. Lopez treats you like a person, not a chart. As a vet, that means everything. The MAT program saved my life.",
  },
  {
    name: "Linda K.",
    role: "Patient since 2019",
    quote:
      "No nurse practitioners pretending to be doctors here. Real physicians, real time, real answers. It's how medicine used to feel.",
  },
  {
    name: "Daniel T.",
    role: "Hormone therapy patient",
    quote:
      "The lifestyle medicine program changed my year. Labs, plan, follow-through. I have my energy back and I'm sleeping again.",
  },
];
