export type NavItem = {
  label: string
  to: string
}

export type Project = {
  id: string
  title: string
  shortTitle: string
  kind: string
  type: string
  summary: string
  objective: string
  tested: string
  tools: string[]
  focus: string[]
  chips: string[]
  github: string
  gradient: string
}

export type Experience = {
  company: string
  website: string
  logoText: string
  logoImage?: string
  location: string
  role: string
  period: string
  summary: string
  contributions: string[]
  tags: string[]
  current?: boolean
}

export type Education = {
  institution: string
  logoText: string
  logoImage?: string
  credential: string
  period: string
  meta: string
  highlight?: string
}

export type Favorite = {
  title: string
  meta: string
  note: string
  externalUrl: string
  gradient: string
  image?: string
  linkLabel?: string
}

export const site = {
  name: 'Shaikh Mahmudur Rahman (Nahid)',
  role: 'Software QA Engineer | Manual & Automation Testing',
  tagline: 'I test with curiosity, think like a user, and help teams ship with confidence.',
  email: 'smrahman.nahid@gmail.com',
  location: 'Dhaka, Bangladesh',
  cvPath: '/cv/Shaikh_Mahmudur_Rahman_Nahid_CV.pdf',
  thesisPdfPath: '/research/depression-detection-cnn-transfer-learning.pdf',
  formspreeEndpoint: 'https://formspree.io/f/mqevjwkd',
  links: {
    github: 'https://github.com/Nahid-Rahman',
    linkedin: 'https://www.linkedin.com/in/sk-mahmudur-rahman/',
    facebook: 'https://www.facebook.com/nahid.mercer',
    instagram: 'https://www.instagram.com/nahid_smrahman',
  },
}

export const navigation: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Experience', to: '/experience' },
  { label: 'Projects', to: '/projects' },
  { label: 'Skills', to: '/skills' },
  { label: 'Education & Research', to: '/education-research' },
  { label: 'Beyond Work', to: '/beyond-work' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export const glanceStats = [
  { value: '4+', label: 'Years in QA' },
  { value: 'Manual + Automation', label: 'Testing approach' },
  { value: 'Web · Mobile · API · Backend', label: 'Testing coverage' },
]

export const homeAbout = [
  'I am a Software QA Engineer who tests web, mobile, APIs, and backend systems through structured manual testing and practical automation.',
  'I enjoy finding issues early, thinking like a real user, and helping teams ship products with confidence.',
  'I also care about how comfortably users move through a product — whether the flow feels clear, stable, and easy to trust.',
]

export const quickFacts = [
  'Based in Dhaka',
  'From Satkhira',
  'Muslim (Sunni)',
  'AB+',
]

export const experiences: Experience[] = [
  {
    company: 'Shomvob Technologies Ltd.',
    website: 'https://shomvob.co/',
    logoImage: '/assets/company-logos/shomvob.webp',
    logoText: 'ST',
    location: 'Dhaka, Bangladesh',
    role: 'Software Quality Assurance Engineer',
    period: 'Oct 2025 — Present',
    current: true,
    summary: 'I help protect quality across fast-moving HR tech, recruitment, and edtech products while balancing release confidence with real-user experience.',
    contributions: [
      'Own end-to-end QA across multiple modules, including Shomvob Jobs, Shomvob Academy, and Shomvob HRM.',
      'Support redesign and release cycles through validation, bug tracking, retesting, demo preparation, and client-issue investigation.',
      'Build practical Postman automation for settings and core flows while supporting day-to-day QA team growth.',
    ],
    tags: ['HR Tech', 'Recruitment', 'EdTech', 'Web & Mobile QA', 'Postman Automation'],
  },
  {
    company: 'Shamolima Limited (SNZ Technologies)',
    website: 'https://shamolima.com/',
    logoImage: '/assets/company-logos/shamolima.webp',
    logoText: 'SL',
    location: 'Dhaka, Bangladesh',
    role: 'Software Quality Assurance Engineer',
    period: 'Aug 2024 — Sep 2025',
    summary: 'I worked as the sole QA owner across requirements, manual testing, API automation, release readiness, logistics workflows, and process improvement.',
    contributions: [
      'Translated requirements and UI/UX designs into detailed, testable scenarios for new and evolving features.',
      'Automated core feature APIs with Postman to increase coverage and reduce repetitive manual checks.',
      'Worked closely with product and engineering teams to triage critical issues and maintain release quality under tight timelines.',
    ],
    tags: ['Logistics', 'Manual QA', 'API Automation', 'Agile', 'Test Design'],
  },
  {
    company: 'SmartCrowd',
    website: 'https://smartcrowd.ae/',
    logoImage: '/assets/company-logos/smartcrowd.webp',
    logoText: 'SC',
    location: 'Dubai, UAE · Remote',
    role: 'Junior Software Quality Assurance Engineer',
    period: 'Feb 2022 — Jul 2024',
    summary: 'I contributed to quality assurance for a real-estate investment platform, with experience spanning iOS flows, data checks, documentation, and client communication.',
    contributions: [
      'Reviewed product requirements and UI designs to document test coverage for new and existing features.',
      'Tested key iOS journeys, including Apple Pay, share transfer, and new-registration flows.',
      'Investigated reported issues through data validation and root-cause collaboration between client-facing and technical teams.',
    ],
    tags: ['Real Estate', 'iOS QA', 'Data Validation', 'Client Communication', 'Documentation'],
  },
  {
    company: 'ShopUp',
    website: 'https://shopup.org/',
    logoImage: '/assets/company-logos/shopup.webp',
    logoText: 'SU',
    location: 'Dhaka, Bangladesh',
    role: 'Intern — Team Tech, Product Management',
    period: 'Aug 2021 — Jan 2022',
    summary: 'I worked at the intersection of operational systems, business-management workflows, product coordination, and lightweight automation.',
    contributions: [
      'Used Python scripting to automate small tasks and improve operational accuracy.',
      'Co-designed a dashboard and tracker to surface progress updates and problematic zones.',
      'Supported onboarding, access management, and communication of technical issues to development teams.',
    ],
    tags: ['Business Systems', 'Product Operations', 'Python', 'Dashboarding', 'Problem Solving'],
  },
]

export const education: Education[] = [
  {
    institution: 'BRAC University',
    logoText: 'BRACU',
    logoImage: '/assets/education-logos/brac-university.webp',
    credential: 'Master of Science in Computer Science',
    period: '2024 — Present',
    meta: 'CGPA: 3.43 / 4.00',
    highlight: 'Current research: trust, viewer engagement, and response behaviour in livestream gaming communities.',
  },
  {
    institution: 'BRAC University',
    logoText: 'BRACU',
    logoImage: '/assets/education-logos/brac-university.webp',
    credential: 'Bachelor of Science in Computer Science & Engineering',
    period: '2017 — 2021',
    meta: 'CGPA: 3.36 / 4.00',
    highlight: 'Undergraduate thesis: deep learning-based depression detection using CNNs and transfer learning.',
  },
  {
    institution: 'Dhaka City College',
    logoText: 'DCC',
    logoImage: '/assets/education-logos/dhaka-city-college.webp',
    credential: 'Higher Secondary Certificate · Science · Dhaka Board',
    period: '2016',
    meta: 'GPA: 5.00 / 5.00',
  },
  {
    institution: 'Government Laboratory High School, Dhanmondi, Dhaka',
    logoText: 'GLHS',
    logoImage: '/assets/education-logos/government-laboratory-high-school.webp',
    credential: 'Secondary School Certificate · Science · Dhaka Board',
    period: '2014',
    meta: 'GPA: 5.00 / 5.00',
  },
]

export const currentResearch = {
  title: 'Livestream Gaming Communities — Trust & Viewer Engagement Research',
  status: 'In Progress',
  summary: 'Exploring trust, viewer engagement, and response behaviour in livestream gaming communities.',
}

export const earlierResearch = {
  title: 'Depression Detection Using CNNs & Transfer Learning',
  summary: 'Undergraduate thesis research in deep learning-based depression detection.',
}

export const projects: Project[] = [
  {
    id: 'api-automation',
    title: 'End-to-End API Automation',
    shortTitle: 'API Automation',
    kind: 'Postman & Newman',
    type: 'API Automation',
    summary: 'A scenario-driven API automation project covering authentication, account creation, balance checks, deposits, withdrawals, and money transfer flows.',
    objective: 'Demonstrate reusable API checks across a realistic transaction journey, including clear documentation around passed and intentionally failed scenarios.',
    tested: 'Admin login, customer/agent creation, deposits, balance queries, withdrawals, transfers, and validation outcomes.',
    tools: ['Postman', 'Newman', 'Node.js'],
    focus: ['Scenario coverage', 'Reusable assertions', 'Documentation and bug/improvement notes'],
    chips: ['Auth', 'Assertions', 'Collection Runner', 'Reports'],
    github: 'https://github.com/Nahid-Rahman/Api_automation_using_Postman',
    gradient: 'from-violet-500/30 via-fuchsia-500/10 to-slate-950',
  },
  {
    id: 'orangehrm',
    title: 'OrangeHRM Web Automation',
    shortTitle: 'OrangeHRM Automation',
    kind: 'Selenium, TestNG & Allure',
    type: 'Web Automation',
    summary: 'An end-to-end web automation suite for employee lifecycle workflows in an HRM demo application.',
    objective: 'Automate practical HRM flows while combining positive and negative checks with readable Allure reporting.',
    tested: 'Admin authentication, employee creation, employee search, ID update, secondary-user login, and profile/contact updates.',
    tools: ['Selenium WebDriver', 'Java', 'TestNG', 'Gradle', 'Allure'],
    focus: ['End-to-end workflow coverage', 'Positive and negative scenarios', 'Readable automation reporting'],
    chips: ['POM', 'Employee Flow', 'TestNG', 'Allure'],
    github: 'https://github.com/Nahid-Rahman/Web-Automation-on-OrangeHRM-Website-with-Selenium-and-TestNG',
    gradient: 'from-cyan-400/20 via-sky-500/10 to-slate-950',
  },
  {
    id: 'performance-testing',
    title: 'API Performance & Stress Testing',
    shortTitle: 'Performance Testing',
    kind: 'JMeter',
    type: 'Performance Testing',
    summary: 'A performance-testing exercise focused on throughput measurement, expected-versus-actual TPS comparison, and stress-point identification.',
    objective: 'Explore how increasing load affects an API and identify the point where meaningful errors begin to appear.',
    tested: 'TPS estimation, load variation, stress-point identification, and report-based result comparison.',
    tools: ['Apache JMeter', 'Excel'],
    focus: ['Throughput analysis', 'Load and stress testing', 'Evidence-based comparison'],
    chips: ['Load Test', 'Stress Test', 'TPS', 'Response Time'],
    github: 'https://github.com/Nahid-Rahman/Random-User-API-Performance-Test-Using-JMeter',
    gradient: 'from-amber-300/25 via-orange-500/10 to-slate-950',
  },
  {
    id: 'appium',
    title: 'Mobile App Automation',
    shortTitle: 'Appium Automation',
    kind: 'Appium',
    type: 'Mobile Automation',
    summary: 'Mobile automation exercises for calculator-style Android apps using a real device and Android tooling.',
    objective: 'Practice repeatable mobile interaction testing across simple but stateful Android workflows.',
    tested: 'Basic calculator and EMI-calculation interactions on Android.',
    tools: ['Appium', 'Android Studio', 'JDK', 'Android SDK'],
    focus: ['Real-device testing', 'Mobile interaction automation', 'Environment setup'],
    chips: ['Android', 'Real Device', 'UI Flow', 'Validation'],
    github: 'https://github.com/Nahid-Rahman/EMI-Calculator-Automation-Using-Appium',
    gradient: 'from-emerald-400/20 via-teal-500/10 to-slate-950',
  },
  {
    id: 'junit-form',
    title: 'Form Validation Automation',
    shortTitle: 'Form Validation',
    kind: 'Selenium & JUnit',
    type: 'Validation Automation',
    summary: 'A form-automation project combining valid submission flow with a broad set of validation-focused negative cases.',
    objective: 'Show how structured test design can cover field behavior, required inputs, and invalid data handling.',
    tested: 'Dynamic form input, radio/checkbox validation, date handling, upload, and invalid/empty input conditions.',
    tools: ['Selenium', 'Java', 'JUnit', 'Gradle'],
    focus: ['Negative testing', 'Field validation', 'Detailed test case and bug documentation'],
    chips: ['Negative Cases', 'JUnit', 'Input Validation', 'Regression'],
    github: 'https://github.com/Nahid-Rahman/Automating-Form-Using-JUnit-and-Selenium',
    gradient: 'from-rose-400/20 via-pink-500/10 to-slate-950',
  },
]

export const skillGroups = [
  {
    title: 'Manual & Automation Testing',
    description: 'I combine structured manual exploration with repeatable automation where it creates real coverage and confidence.',
    skills: ['Feature Testing', 'Smoke Testing', 'Sanity Testing', 'Regression Testing', 'Exploratory / Gorilla Testing', 'Release Validation'],
  },
  {
    title: 'Web, Mobile & API Testing',
    description: 'I test connected journeys across front-end behavior, mobile experiences, APIs, and basic backend/data validation.',
    skills: ['Web Testing', 'Mobile Testing', 'API Testing', 'Backend Validation', 'Data Integrity Checks', 'Cross-platform Release Checks'],
  },
  {
    title: 'Automation Frameworks & Tools',
    description: 'My automation toolkit supports browser, API, mobile, and BDD-oriented workflows.',
    skills: ['Postman', 'Newman', 'Selenium', 'Playwright', 'Cypress', 'Appium', 'REST Assured', 'JUnit', 'TestNG', 'Cucumber'],
  },
  {
    title: 'Performance & Reliability Testing',
    description: 'I use performance checks to understand throughput, response behavior, bottlenecks, and release risk.',
    skills: ['JMeter', 'Load Testing', 'Stress Testing', 'TPS Analysis', 'Reliability Checks'],
  },
  {
    title: 'QA Process & Product Quality',
    description: 'I care about testability, clear evidence, actionable defects, and communication that helps teams decide quickly.',
    skills: ['Test Case Design', 'Bug Lifecycle', 'Severity & Priority', 'Agile Collaboration', 'JIRA', 'Trello', 'Confluence', 'Miro', 'Airtable'],
  },
  {
    title: 'Supporting Technical Skills',
    description: 'These tools help me reason through systems, validate data, and communicate more effectively with technical teams.',
    skills: ['Java', 'Python', 'JavaScript', 'SQL', 'MySQL', 'SQLite', 'Git', 'HTML & CSS', 'LaTeX'],
  },
]

export const certifications = [
  { title: 'Full Stack SQA & Test Automation', issuer: 'Road to SDET', year: '2025' },
  { title: 'Data Analyst with SQL & Python', issuer: 'Farhan’s Academy', year: '2024' },
]

export const values = [
  'Humility over arrogance',
  'Clear communication and respectful collaboration',
  'Clean spaces, structured systems, and attention to the little details',
  'Thoughtful planning without unnecessary complexity',
  'Learning through hands-on work and honest reflection',
  'Products that are simple, useful, and considerate of real people',
]

export const enjoyment = [
  'Mystery, atmosphere, and stories with emotional memory',
  'Nature photography and everyday aesthetic details',
  'Games that feel immersive, strategic, or cinematic',
  'Football, esports, and shared competitive moments',
  'Quiet reading and worlds that stay after the page ends',
]

export const interests = [
  { label: 'Gaming', detail: 'Story-driven worlds, multiplayer sessions, and action-thrillers.' },
  { label: 'Movies, Series & Anime', detail: 'Sci-fi, thrillers, comedy, psychological stories, rom-coms, and drama with something to say.' },
  { label: 'Photography', detail: 'Nature and random aesthetic moments worth keeping.' },
  { label: 'Football & Esports', detail: 'Real Madrid, Brazil, Sentinels, Paper Rex, TenZ, Jinggg, and f0rsakeN.' },
  { label: 'Reading', detail: 'Stories, sci-fi, manga, manhwa, mystery, atmosphere, and emotional connection.' },
]

export const galleryPhotos = [
  { src: '/assets/photos/cafe-candid.webp', alt: 'Casual café portrait' },
  { src: '/assets/photos/library.webp', alt: 'Reading in a library' },
  { src: '/assets/photos/traditional.webp', alt: 'Traditional outfit portrait' },
  { src: '/assets/photos/graduation.webp', alt: 'Graduation portrait' },
]

const imdbFind = (title: string) => `https://www.imdb.com/find/?q=${encodeURIComponent(title)}&s=tt`
const imdbTitle = (id: string) => `https://www.imdb.com/title/${id}/`
const goodreads = (title: string) => `https://www.goodreads.com/search?q=${encodeURIComponent(title)}`
const mal = (title: string) => `https://myanimelist.net/search/all?q=${encodeURIComponent(title)}`
const gameSearch = (title: string) => `https://www.google.com/search?q=${encodeURIComponent(`${title} official game`)}`

export const favorites: Record<string, Favorite[]> = {
  "Movies": [
    { title: "The Dark Knight", meta: "2008 · Crime · Drama", note: "Batman faces a criminal mastermind who pushes Gotham into chaos and tests justice, fear, and sacrifice.", externalUrl: "https://www.google.com/search?q=The%20Dark%20Knight%20IMDb", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/the-dark-knight.webp", linkLabel: "View on IMDb" },
    { title: "The Wild Robot", meta: "2024 · Animation · Sci-Fi", note: "A shipwrecked robot learns to survive on a wild island while forming unexpected bonds.", externalUrl: "https://www.google.com/search?q=The%20Wild%20Robot%20IMDb", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/the-wild-robot.webp", linkLabel: "View on IMDb" },
    { title: "Good Will Hunting", meta: "1997 · Drama", note: "A gifted young man is pushed to face his past, relationships, and future.", externalUrl: "https://www.google.com/search?q=Good%20Will%20Hunting%20IMDb", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/good-will-hunting.webp", linkLabel: "View on IMDb" },
    { title: "Interstellar", meta: "2014 · Sci-Fi · Drama", note: "A team travels beyond Earth in search of a future for humanity while family and time collide.", externalUrl: "https://www.google.com/search?q=Interstellar%20IMDb", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/interstellar.webp", linkLabel: "View on IMDb" },
    { title: "Inception", meta: "2010 · Action · Sci-Fi", note: "A mind-bending heist inside dreams where reality, memory, and control blur together.", externalUrl: "https://www.google.com/search?q=Inception%20IMDb", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/inception.webp", linkLabel: "View on IMDb" },
    { title: "The Pursuit of Happyness", meta: "2006 · Biography · Drama", note: "A moving story about persistence, responsibility, and holding on through uncertainty.", externalUrl: "https://www.google.com/search?q=The%20Pursuit%20of%20Happyness%20IMDb", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/the-pursuit-of-happyness.webp", linkLabel: "View on IMDb" },
    { title: "Klaus", meta: "2019 · Animation · Family", note: "A selfish postman and a quiet toy maker help a cold town rediscover kindness.", externalUrl: "https://www.google.com/search?q=Klaus%20IMDb", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/klaus.webp", linkLabel: "View on IMDb" },
    { title: "WALL-E", meta: "2008 · Animation · Sci-Fi", note: "A lonely waste-collecting robot discovers love, purpose, and fragile hope.", externalUrl: "https://www.google.com/search?q=WALL-E%20IMDb", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/wall-e.webp", linkLabel: "View on IMDb" },
    { title: "Wreck-It Ralph", meta: "2012 · Animation · Adventure", note: "A video-game villain sets out to prove he can be more than his programmed role.", externalUrl: "https://www.google.com/search?q=Wreck-It%20Ralph%20IMDb", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/wreck-it-ralph.webp", linkLabel: "View on IMDb" },
    { title: "Zootopia", meta: "2016 · Animation · Mystery", note: "A rookie rabbit officer and a sly fox uncover a citywide mystery.", externalUrl: "https://www.google.com/search?q=Zootopia%20IMDb", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/zootopia.webp", linkLabel: "View on IMDb" },
    { title: "Miracle in Cell No. 7", meta: "2013 · Drama", note: "A father and daughter’s bond becomes a story of innocence, loss, and compassion.", externalUrl: "https://www.google.com/search?q=Miracle%20in%20Cell%20No.%207%20IMDb", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/miracle-in-cell-no-7.webp", linkLabel: "View on IMDb" },
    { title: "The Last Samurai", meta: "2003 · Action · Drama", note: "A former soldier finds meaning through honor, conflict, and discipline.", externalUrl: "https://www.google.com/search?q=The%20Last%20Samurai%20IMDb", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/the-last-samurai.webp", linkLabel: "View on IMDb" },
    { title: "The Pianist", meta: "2002 · Biography · Drama", note: "A gifted pianist struggles to survive devastation while holding onto art and memory.", externalUrl: "https://www.google.com/search?q=The%20Pianist%20IMDb", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/the-pianist.webp", linkLabel: "View on IMDb" },
    { title: "Spider-Man: Into the Spider-Verse", meta: "2018 · Animation · Action", note: "Miles Morales discovers a wider multiverse of heroes, identity, and courage.", externalUrl: "https://www.google.com/search?q=Spider-Man%20Into%20the%20Spider-Verse%20IMDb", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/spider-man-into-the-spider-verse.webp", linkLabel: "View on IMDb" },
    { title: "Spider-Man: No Way Home", meta: "2021 · Action · Adventure", note: "Peter Parker faces consequences when familiar enemies enter his world.", externalUrl: "https://www.google.com/search?q=Spider-Man%20No%20Way%20Home%20IMDb", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/spider-man-no-way-home.webp", linkLabel: "View on IMDb" },
    { title: "Gladiator", meta: "2000 · Action · Drama", note: "A betrayed Roman general seeks justice through the arena.", externalUrl: "https://www.google.com/search?q=Gladiator%20IMDb", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/gladiator.webp", linkLabel: "View on IMDb" },
    { title: "Green Book", meta: "2018 · Biography · Comedy-Drama", note: "A driver and a pianist form an unlikely bond during a difficult road trip.", externalUrl: "https://www.google.com/search?q=Green%20Book%20IMDb", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/green-book.webp", linkLabel: "View on IMDb" },
    { title: "Joker", meta: "2019 · Crime · Drama", note: "An isolated man in Gotham slowly transforms under personal and social pressure.", externalUrl: "https://www.google.com/search?q=Joker%20IMDb", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/joker.webp", linkLabel: "View on IMDb" },
  ],
  "Series": [
    { title: "FRIENDS", meta: "Comedy · Sitcom", note: "A comfort sitcom about friendship, awkward moments, everyday chaos, and the kind of jokes that stay familiar for years.", externalUrl: "https://www.google.com/search?q=FRIENDS%20IMDb", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/friends.webp", linkLabel: "View on IMDb" },
    { title: "Modern Family", meta: "Comedy · Sitcom", note: "A warm mockumentary-style comedy about family, relationships, parenting, and all the funny details in between.", externalUrl: "https://www.google.com/search?q=Modern%20Family%20IMDb", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/modern-family.webp", linkLabel: "View on IMDb" },
    { title: "The Office", meta: "Comedy · Mockumentary", note: "Workplace awkwardness, dry humour, and oddly lovable characters make it a classic comfort watch.", externalUrl: "https://www.google.com/search?q=The%20Office%20IMDb", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/the-office.webp", linkLabel: "View on IMDb" },
    { title: "It's Okay to Not Be Okay", meta: "K-Drama · Romance · Healing", note: "A beautifully styled Korean drama about emotional wounds, family, care, and healing at a difficult pace.", externalUrl: "https://www.google.com/search?q=It%27s%20Okay%20to%20Not%20Be%20Okay%20IMDb", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/its-okay-to-not-be-okay.webp", linkLabel: "View on IMDb" },
    { title: "Sherlock", meta: "Crime · Mystery", note: "A modern Sherlock Holmes and Dr. Watson solve sharp, stylish mysteries.", externalUrl: "https://www.google.com/search?q=Sherlock%20IMDb", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/sherlock.webp", linkLabel: "View on IMDb" },
    { title: "Arcane", meta: "Animation · Action", note: "Two sisters are pulled apart by class conflict, power, and invention.", externalUrl: "https://www.google.com/search?q=Arcane%20IMDb", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/arcane.webp", linkLabel: "View on IMDb" },
    { title: "Seinfeld", meta: "Comedy · Sitcom", note: "Everyday social awkwardness becomes clever, endlessly quotable comedy.", externalUrl: "https://www.google.com/search?q=Seinfeld%20IMDb", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/seinfeld.webp", linkLabel: "View on IMDb" },
    { title: "Peaky Blinders", meta: "Crime · Drama", note: "A Birmingham gang family expands its reach through politics and ambition.", externalUrl: "https://www.google.com/search?q=Peaky%20Blinders%20IMDb", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/peaky-blinders.webp", linkLabel: "View on IMDb" },
    { title: "House M.D.", meta: "Medical · Drama", note: "A brilliant but difficult doctor solves unusual medical cases.", externalUrl: "https://www.google.com/search?q=House%20MD%20IMDb", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/house-md.webp", linkLabel: "View on IMDb" },
    { title: "When Life Gives You Tangerines", meta: "K-Drama · Romance", note: "A warm Korean drama following love, hardship, and ordinary resilience.", externalUrl: "https://www.google.com/search?q=When%20Life%20Gives%20You%20Tangerines%20IMDb", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/when-life-gives-you-tangerines.webp", linkLabel: "View on IMDb" },
    { title: "The Glory", meta: "K-Drama · Thriller", note: "A woman carefully plans her return against the people who hurt her.", externalUrl: "https://www.google.com/search?q=The%20Glory%20IMDb", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/the-glory.webp", linkLabel: "View on IMDb" },
    { title: "Guardian: The Lonely and Great God", meta: "K-Drama · Fantasy", note: "An immortal guardian searches for release while fate and memory bind him.", externalUrl: "https://www.google.com/search?q=Guardian%20The%20Lonely%20and%20Great%20God%20IMDb", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/guardian-the-lonely-and-great-god.webp", linkLabel: "View on IMDb" },
    { title: "Queen of Tears", meta: "K-Drama · Romance", note: "A married couple faces crisis, pride, and rediscovery.", externalUrl: "https://www.google.com/search?q=Queen%20of%20Tears%20IMDb", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/queen-of-tears.webp", linkLabel: "View on IMDb" },
    { title: "Hometown Cha-Cha-Cha", meta: "K-Drama · Romance", note: "A city dentist and village handyman cross paths in a seaside town.", externalUrl: "https://www.google.com/search?q=Hometown%20Cha-Cha-Cha%20IMDb", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/hometown-cha-cha-cha.webp", linkLabel: "View on IMDb" },
    { title: "Business Proposal", meta: "K-Drama · Rom-Com", note: "A blind date, mistaken identity, and office romance become a bright story.", externalUrl: "https://www.google.com/search?q=Business%20Proposal%20KDrama%20IMDb", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/business-proposal-series.webp", linkLabel: "View on IMDb" },
    { title: "A River Runs Through It", meta: "C-Drama · Youth Romance", note: "A coming-of-age story about friendship, school years, and growing feelings.", externalUrl: "https://www.google.com/search?q=A%20River%20Runs%20Through%20It%20Chinese%20drama", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/a-river-runs-through-it.webp", linkLabel: "View on IMDb" },
    { title: "Mouse", meta: "K-Drama · Thriller", note: "A crime thriller around investigation, psychology, and recognizing evil.", externalUrl: "https://www.google.com/search?q=Mouse%20KDrama%20IMDb", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/mouse.webp", linkLabel: "View on IMDb" },
    { title: "Daredevil", meta: "Action · Crime", note: "A blind lawyer fights for justice by day and protects Hell’s Kitchen by night.", externalUrl: "https://www.google.com/search?q=Daredevil%20Netflix%20IMDb", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/daredevil.webp", linkLabel: "View on IMDb" },
  ],
  "Anime": [
    { title: "Suzume", meta: "Film · Fantasy · Adventure", note: "A visually beautiful journey through doors, memory, loss, and healing.", externalUrl: "https://www.google.com/search?q=Suzume%20MyAnimeList", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/suzume.webp", linkLabel: "View Details" },
    { title: "Your Name", meta: "Film · Romance · Fantasy", note: "Two teenagers mysteriously connected across distance and time search for each other.", externalUrl: "https://www.google.com/search?q=Your%20Name%20MyAnimeList", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/your-name.webp", linkLabel: "View Details" },
    { title: "Jujutsu Kaisen", meta: "Action · Supernatural", note: "A kind-hearted student enters a dangerous world of curses.", externalUrl: "https://www.google.com/search?q=Jujutsu%20Kaisen%20MyAnimeList", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/jujutsu-kaisen.webp", linkLabel: "View Details" },
    { title: "Spirited Away", meta: "Film · Fantasy", note: "A young girl enters a mysterious spirit world and must find courage and home.", externalUrl: "https://www.google.com/search?q=Spirited%20Away%20MyAnimeList", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/spirited-away.webp", linkLabel: "View Details" },
    { title: "Grave of the Fireflies", meta: "Film · Drama", note: "An emotional wartime story following two siblings trying to survive.", externalUrl: "https://www.google.com/search?q=Grave%20of%20the%20Fireflies%20MyAnimeList", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/grave-of-the-fireflies.webp", linkLabel: "View Details" },
    { title: "Frieren: Beyond Journey’s End", meta: "Fantasy · Adventure", note: "An elf mage reflects on friendship, time, and meaning after the adventure.", externalUrl: "https://www.google.com/search?q=Frieren%20Beyond%20Journey%27s%20End%20MyAnimeList", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/frieren-beyond-journeys-end.webp", linkLabel: "View Details" },
    { title: "Code Geass", meta: "Mecha · Political Thriller", note: "A gifted strategist gains power and leads rebellion through sacrifice.", externalUrl: "https://www.google.com/search?q=Code%20Geass%20MyAnimeList", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/code-geass.webp", linkLabel: "View Details" },
    { title: "Dandadan", meta: "Action · Supernatural", note: "Aliens, spirits, and friendship collide in a fast supernatural adventure.", externalUrl: "https://www.google.com/search?q=Dandadan%20MyAnimeList", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/dandadan.webp", linkLabel: "View Details" },
    { title: "A Silent Voice", meta: "Film · Drama", note: "A former bully seeks forgiveness and connection with the girl he hurt.", externalUrl: "https://www.google.com/search?q=A%20Silent%20Voice%20MyAnimeList", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/a-silent-voice.webp", linkLabel: "View Details" },
    { title: "Hell’s Paradise", meta: "Action · Dark Fantasy", note: "Condemned fighters search a deadly island for a legendary elixir.", externalUrl: "https://www.google.com/search?q=Hell%27s%20Paradise%20MyAnimeList", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/hells-paradise.webp", linkLabel: "View Details" },
    { title: "Your Lie in April", meta: "Music · Drama", note: "A pianist’s muted world changes after meeting a free-spirited violinist.", externalUrl: "https://www.google.com/search?q=Your%20Lie%20in%20April%20MyAnimeList", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/your-lie-in-april.webp", linkLabel: "View Details" },
    { title: "I Want to Eat Your Pancreas", meta: "Film · Drama", note: "Two classmates form a fragile bond through a shared secret.", externalUrl: "https://www.google.com/search?q=I%20Want%20to%20Eat%20Your%20Pancreas%20MyAnimeList", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/i-want-to-eat-your-pancreas.webp", linkLabel: "View Details" },
    { title: "Kimi ni Todoke", meta: "Romance · School", note: "A shy girl slowly opens up through friendship and kindness.", externalUrl: "https://www.google.com/search?q=Kimi%20ni%20Todoke%20MyAnimeList", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/kimi-ni-todoke.webp", linkLabel: "View Details" },
    { title: "Orange", meta: "Drama · Romance", note: "Letters from the future push friends to rethink choices and care.", externalUrl: "https://www.google.com/search?q=Orange%20anime%20MyAnimeList", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/orange.webp", linkLabel: "View Details" },
    { title: "Hotarubi no Mori e", meta: "Film · Supernatural Romance", note: "A girl and forest spirit build a quiet bond shaped by impossible rules.", externalUrl: "https://www.google.com/search?q=Hotarubi%20no%20Mori%20e%20MyAnimeList", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/hotarubi-no-mori-e.webp", linkLabel: "View Details" },
  ],
  "Books": [
    { title: "Jules Verne", meta: "Adventure · Science Fiction", note: "Classic journeys built on curiosity, imagination, invention, and discovery.", externalUrl: "https://www.google.com/search?q=Jules%20Verne%20Goodreads", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/jules-verne.webp", linkLabel: "View on Goodreads" },
    { title: "Byomkesh Bakshi", meta: "Detective · Bengali", note: "A sharp Bengali detective world built around observation and motives.", externalUrl: "https://www.google.com/search?q=Byomkesh%20Bakshi%20Goodreads", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/byomkesh-bakshi.webp", linkLabel: "View on Goodreads" },
    { title: "Harry Potter", meta: "Fantasy · Series", note: "A world of wonder, friendship, courage, and timeless comfort.", externalUrl: "https://www.google.com/search?q=Harry%20Potter%20Goodreads", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/harry-potter.webp", linkLabel: "View on Goodreads" },
    { title: "Sherlock Holmes", meta: "Mystery · Collection", note: "Atmosphere, observation, and the satisfaction of a well-built mystery.", externalUrl: "https://www.google.com/search?q=Sherlock%20Holmes%20Goodreads", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/sherlock-holmes-book.webp", linkLabel: "View on Goodreads" },
    { title: "Dan Brown Novels", meta: "Mystery · Thriller", note: "Fast-moving puzzles, hidden history, and a sense of discovery.", externalUrl: "https://www.google.com/search?q=Dan%20Brown%20Novels%20Goodreads", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/dan-brown-novels.webp", linkLabel: "View on Goodreads" },
    { title: "Feluda", meta: "Detective · Bengali", note: "A beloved mix of intelligence, culture, travel, and adventure.", externalUrl: "https://www.google.com/search?q=Feluda%20Goodreads", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/feluda.webp", linkLabel: "View on Goodreads" },
    { title: "Tukunji", meta: "Bangla Sci-Fi", note: "A local sci-fi favourite that keeps imagination close to home.", externalUrl: "https://www.google.com/search?q=Tukunji%20Muhammad%20Zafar%20Iqbal", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/tukunji.webp", linkLabel: "View on Goodreads" },
  ],
  "Manga & Manhwa": [
    { title: "Rurouni Kenshin", meta: "Manga · Action", note: "A wandering swordsman with a violent past searches for redemption.", externalUrl: "https://www.google.com/search?q=Rurouni%20Kenshin%20MyAnimeList", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/rurouni-kenshin.webp", linkLabel: "View Details" },
    { title: "Eleceed", meta: "Manhwa · Action", note: "A kind student and an unlikely mentor navigate a hidden world of powers.", externalUrl: "https://www.google.com/search?q=Eleceed%20MyAnimeList", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/eleceed.webp", linkLabel: "View Details" },
    { title: "Demon Slayer", meta: "Manga · Action", note: "A young swordsman fights demons to protect what remains of his family.", externalUrl: "https://www.google.com/search?q=Demon%20Slayer%20MyAnimeList", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/demon-slayer.webp", linkLabel: "View Details" },
    { title: "Solo Leveling", meta: "Manhwa · Action", note: "Pacing, progression, and visual momentum make it hard to put down.", externalUrl: "https://www.google.com/search?q=Solo%20Leveling%20MyAnimeList", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/solo-leveling.webp", linkLabel: "View Details" },
    { title: "A Business Proposal", meta: "Manhwa · Rom-Com", note: "A light, fun counterbalance to heavier stories.", externalUrl: "https://www.google.com/search?q=A%20Business%20Proposal%20manhwa", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/a-business-proposal-manhwa.webp", linkLabel: "View Details" },
  ],
  "Games": [
    { title: "Pragmata", meta: "Sci-Fi · Action Adventure", note: "A mysterious sci-fi adventure with a striking visual identity and a futuristic world worth keeping an eye on.", externalUrl: "https://www.google.com/search?q=Pragmata%20official%20game", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/pragmata.webp", linkLabel: "Open Official Search" },
    { title: "Prototype", meta: "Action · Open World", note: "A dark open-world action game built around mobility and city-scale combat.", externalUrl: "https://www.google.com/search?q=Prototype%20official%20game", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/prototype.webp", linkLabel: "Open Official Search" },
    { title: "The Last of Us", meta: "Story-Driven · Drama", note: "A cinematic survival journey focused on atmosphere, danger, and emotion.", externalUrl: "https://www.google.com/search?q=The%20Last%20of%20Us%20official%20game", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/the-last-of-us.webp", linkLabel: "Open Official Search" },
    { title: "Uncharted: Legacy of Thieves", meta: "Action · Adventure", note: "A polished treasure-hunting adventure with cinematic set pieces.", externalUrl: "https://www.google.com/search?q=Uncharted%20Legacy%20of%20Thieves%20official%20game", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/uncharted-legacy-of-thieves.webp", linkLabel: "Open Official Search" },
    { title: "Red Dead Redemption", meta: "Western · Open World", note: "A vast western world shaped by loyalty, consequence, and survival.", externalUrl: "https://www.google.com/search?q=Red%20Dead%20Redemption%20official%20game", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/red-dead-redemption.webp", linkLabel: "Open Official Search" },
    { title: "Detroit: Become Human", meta: "Interactive Drama", note: "A choice-driven sci-fi story about androids and consequences.", externalUrl: "https://www.google.com/search?q=Detroit%20Become%20Human%20official%20game", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/detroit-become-human.webp", linkLabel: "Open Official Search" },
    { title: "Clair Obscur: Expedition 33", meta: "RPG · Fantasy", note: "A striking modern favourite with atmosphere, style, and emotional pull.", externalUrl: "https://www.google.com/search?q=Clair%20Obscur%20Expedition%2033%20official%20game", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/clair-obscur-expedition-33.webp", linkLabel: "Open Official Search" },
    { title: "Assassin’s Creed IV: Black Flag", meta: "Action · Adventure", note: "A world that makes exploration feel like a real adventure.", externalUrl: "https://www.google.com/search?q=Assassins%20Creed%20IV%20Black%20Flag%20official%20game", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/assassins-creed-iv-black-flag.webp", linkLabel: "Open Official Search" },
    { title: "Ghost of Tsushima", meta: "Action · Adventure", note: "A beautiful, quiet, cinematic world with purpose behind every moment.", externalUrl: "https://www.google.com/search?q=Ghost%20of%20Tsushima%20official%20game", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/ghost-of-tsushima.webp", linkLabel: "Open Official Search" },
    { title: "Need for Speed: Most Wanted", meta: "Racing", note: "A nostalgic rush of speed, sound, and late-night races.", externalUrl: "https://www.google.com/search?q=Need%20for%20Speed%20Most%20Wanted%20official%20game", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/need-for-speed-most-wanted.webp", linkLabel: "Open Official Search" },
    { title: "Call of Duty", meta: "Action · Series", note: "A familiar multiplayer staple for action, teamwork, and quick reflexes.", externalUrl: "https://www.google.com/search?q=Call%20of%20Duty%20official%20game", gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)', image: "/assets/favorites/call-of-duty.webp", linkLabel: "Open Official Search" },
  ],
}
