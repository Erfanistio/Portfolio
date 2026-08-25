export const navLinks = [
  { label: 'HOME', href: '#hero' },
  { label: 'ABOUT', href: '#about' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'JOURNAL', href: '#journal' },
];

const matinProfile = {
  id: 'matin',
  metaTitle: 'Matin Asghari — UI/UX Designer',
  hero: {
    name: 'Matin Asghari',
    role: 'UI/UX designer',
    intro: "Hi, I'm a UI/UX Designer focused on creating intuitive, user-centered digital experiences. This website is a collection of my selected projects, showcasing my design process from idea to execution.",
  },
  projects: [
    { category: 'CASE STUDY', title: 'INNERSPACE', image: '/assets/placeholder.png', alt: 'Innerspace project preview' },
    { category: 'SIDE PROJECT', title: 'GOOK', image: '/assets/placeholder.png', alt: 'Gook project preview' },
    { category: 'BRANDING', title: 'POLESTAR', image: '/assets/placeholder.png', alt: 'Polestar project preview' },
    { category: 'CASE STUDY', title: 'NEXT PROJECT', image: '/assets/placeholder.png', alt: 'Next project preview' },
  ],
  about: {
    label: 'ABOUT MATIN .26',
    imageAlt: 'Matin Asghari UI/UX designer background',
    paragraphs: [
      "I'm a freelance UI/UX and Product Designer currently focused on creating clear, user-centered digital experiences.",
      "I'm 16 years old, and I care deeply about design thinking, problem-solving, and building products that are simple, functional, and meaningful.",
      'For me, design is not just about visual appearance, but about understanding real user needs and turning ideas into practical digital solutions.',
      "I currently work as a freelancer and am also open to long-term collaborations and full-time opportunities.",
      'This website is a space where I share my projects, case studies, and progress as a designer.',
    ],
  },
  service: {
    badge: '01  UI/UX DESIGN',
    description: 'I craft thoughtful digital experiences that balance visual clarity, user needs, and product goals—from early concepts to polished interfaces.',
  },
  milestones: [
    { value: '2023', suffix: '', label: 'STARTED UI/UX JOURNEY' },
    { value: '7', suffix: '+', label: 'PROJECTS COMPLETED' },
  ],
  skills: [
    'UI/UX Design',
    'Product Design',
    'Wireframing & Prototyping',
    'Design Systems',
  ],

  journal: {
    intro: 'A collection of notes on design thinking, creative process, useful patterns, and the lessons behind each project.',
    items: [
      { image: '/assets/journal-1.png', alt: 'Design process journal', description: 'A practical look at moving from an early idea to a focused, user-centered interface.', title: 'FROM IDEA TO INTERFACE' },
      { image: '/assets/journal-2.png', alt: 'Visual systems journal', description: 'How a consistent visual language makes digital products easier to understand and use.', title: 'DESIGNING WITH SYSTEMS' },
      { image: '/assets/journal-3.png', alt: 'Product thinking journal', description: 'Notes on balancing user needs, business goals, and the small details that shape a product.', title: 'PRODUCT THINKING' },
    ],
  },
  contact: {
    intro: "Have a project in mind? Whether you're launching a brand, designing a product, or elevating your digital presence, let's bring your vision to life.",
  },
  footer: {
    brand: 'MATIN ASGHARI',
    description: 'I combine curiosity, structure, and visual craft to turn bold ideas into clear digital experiences.',
    codedBy: 'Erfan Akrami',
    designedBy: 'Matin Asghari',
  },
};

const erfanProfile = {
  id: 'erfan',
  metaTitle: 'Erfan Akrami — Front-End Developer',
  hero: {
    name: 'Erfan Akrami',
    role: 'Front-End Developer',
    intro: "Hi, I'm Erfan—a front-end developer focused on building responsive, accessible, and polished web experiences. I turn thoughtful designs into fast, maintainable interfaces with React and modern CSS.",
  },
  projects: [
    { category: 'FEATURED BUILD', title: 'PORTFOLIO', image: '/assets/placeholder.png', alt: 'Erfan Akrami portfolio project preview' },
    { category: 'FRONT-END', title: 'UI SYSTEMS', image: '/assets/placeholder.png', alt: 'Reusable interface system preview' },
    { category: 'INTERACTION', title: 'WEB MOTION', image: '/assets/placeholder.png', alt: 'Interactive web animation preview' },
    { category: 'IN PROGRESS', title: 'NEXT BUILD', image: '/assets/placeholder.png', alt: 'Upcoming front-end project preview' },
  ],
  about: {
    label: 'ABOUT ERFAN .26',
    imageAlt: 'Erfan Akrami front-end developer background',
    paragraphs: [
      "I'm Erfan Akrami, a front-end developer who enjoys turning ideas and visual designs into responsive, production-ready websites.",
      'My work centers on React, JavaScript, modern CSS, and reusable component architecture, with close attention to usability and visual detail.',
      'I care about the parts of a website people feel immediately: clear hierarchy, smooth interaction, fast loading, and layouts that work across screen sizes.',
      'I approach each build as both an engineering and design problem—keeping the code maintainable while preserving the character of the original concept.',
      "I'm continually improving through hands-on projects and I'm open to collaborations where thoughtful design and strong front-end execution matter.",
    ],
  },
  service: {
    badge: '01  FRONT-END DEVELOPMENT',
    description: 'I build responsive React interfaces, translate designs into reusable components, add purposeful motion, and refine accessibility and performance across devices.',
  },
  milestones: [
    { value: 'REACT', suffix: '', label: 'COMPONENT-DRIVEN DEVELOPMENT' },
    { value: '100', suffix: '%', label: 'RESPONSIVE UI FOCUS' },
  ],
  skills: [
    'Front-End Development',
    'React Interfaces',
    'TypeScript',
    'Tailwind CSS',
    'GSAP Motion',
    'Responsive Design',
    'Accessibility',
    'Git & GitHub',
  ],

  journal: {
    intro: 'Notes from my front-end journey—covering React patterns, interface engineering, motion, accessibility, and the details that make websites feel complete.',
    items: [
      { image: '/assets/journal-1.png', alt: 'React component architecture article', description: 'How reusable components keep a growing interface consistent without slowing development.', title: 'BUILDING BETTER COMPONENTS' },
      { image: '/assets/journal-2.png', alt: 'Responsive interface article', description: 'A practical approach to layouts that remain clear, balanced, and useful on every screen.', title: 'RESPONSIVE BY DEFAULT' },
      { image: '/assets/journal-3.png', alt: 'Web animation article', description: 'Using motion with restraint to guide attention, communicate state, and add personality.', title: 'MOTION WITH PURPOSE' },
    ],
  },
  contact: {
    intro: "Have a website or front-end project in mind? If you need a responsive React build, a polished interface, or help bringing a design to life, let's talk.",
  },
  footer: {
    brand: 'ERFAN AKRAMI',
    description: 'I build responsive, accessible, and thoughtfully animated web experiences with clean, maintainable front-end code.',
    codedBy: 'Erfan Akrami',
    designedBy: 'Matin Asghari',
  },
};

export const portfolioProfiles = { matin: matinProfile, erfan: erfanProfile };

export const assetNames = [
  'avatar.png', 'hero.png', 'placeholder.png', 'fade.png', 'about.png',
  'journal-1.png', 'journal-2.png', 'journal-3.png', 'contact.png', 'noise.png',
];
