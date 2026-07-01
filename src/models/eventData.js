// ─── Event Core Data ────────────────────────────────────────────────────────
export const eventData = {
  name: 'Student Community Day',
  shortName: 'SCD2026',
  hashtag: '#SCDPY2026',
  location: 'Pondicherry',
  venue: 'SMVEC',
  venueFull: 'Sri Manakula Vinayagar Engineering College',
  venueAddress: 'Madagadipet, Pondicherry — 605 107',
  date: '25th July 2026',
  dateISO: '2026-07-25T09:00:00',
  email: 'awsugpuducherry@gmail.com',
  registerLink: 'https://www.meetup.com/aws-sbg-at-sri-manakula-vinayagar-engineering-college/events/315050413/?utm_medium=referral&utm_campaign=share-btn_savedevents_share_modal&utm_source=link&utm_version=v2&member_id=475523380',
  organizer: 'AWS Student Builder Group SMVEC',
  communityPartner: 'AWS UG Puducherry',
  sponsorshipDeckLink: 'https://drive.google.com/your-sponsorship-deck-link',
  tagline: 'Build. Connect. Innovate.',
  subTagline: 'The biggest student cloud community gathering in Pondicherry',
  year: '2026',
};

// ─── Navigation Links ────────────────────────────────────────────────────────
export const navLinks = [
  { label: 'Get Tickets', href: '#register', highlight: true },
  { label: 'Tracks', href: '#tracks' },
  { label: 'Why Attend?', href: '#why-attend' },
  { label: 'Speakers', href: '#speakers' },
  { label: 'Sponsors', href: '#sponsors' },
  { label: 'Call for Speakers', href: '#call-for-speakers' },
  { label: 'Contact Us', href: '#contact' },
  { label: 'Code of Conduct', href: '#conduct', isCoC: true },
];

export const whyAttendItems = [
  { text: 'Learn from industry experts and AWS community leaders', icon: '🎓' },
  { text: 'Build practical, real-world cloud skills', icon: '🛠️' },
  { text: 'Participate in the flagship #Include1.0 Hackathon', icon: '🏆' },
  { text: 'Network with like-minded tech enthusiasts and industry experts', icon: '🤝' },
  { text: 'Refreshments & Lunch Included', icon: '🍽️', highlight: true },
  { text: 'Gain exposure to emerging technologies and industry trends', icon: '🔮' },
  { text: 'Receive an official participation Credly Badge', icon: '🏅' },
  { text: 'Win exciting prizes, certificates, and AWS swag', icon: '🎁' },
  { text: 'Become part of the AWS community ecosystem', icon: '☁️' }
];

// ─── Tracks ──────────────────────────────────────────────────────────────────
export const tracks = [
  {
    id: 1,
    title: 'Technical Sessions',
    icon: '⚡',
    number: '01',
    description: 'Deep-dive talks on AWS services, cloud architecture, serverless, AI/ML, and cutting-edge cloud technologies from industry experts.',
    tags: ['Cloud Architecture', 'Serverless', 'AI/ML', 'DevOps'],
    color: 'from-purple-600 to-violet-700',
    accent: '#8b5cf6',
    stat: '8+ Talks',
  },
  {
    id: 2,
    title: 'Workshops',
    icon: '🛠️',
    number: '02',
    description: 'Hands-on labs and interactive sessions where you build real solutions on AWS. Bring your laptop and leave with working projects.',
    tags: ['Hands-on Labs', 'Live Coding', 'AWS Console', 'Projects'],
    color: 'from-violet-600 to-purple-800',
    accent: '#7c3aed',
    stat: '2 Workshops',
  },
  {
    id: 3,
    title: 'Ad Panel & Q/A',
    icon: '💬',
    number: '03',
    description: 'Engaging conversations with cloud leaders, startup founders, and AWS heroes on the future of cloud computing and career paths. Live Q&A included.',
    tags: ['Industry Leaders', 'Career Paths', 'Cloud Future', 'Q&A'],
    color: 'from-purple-700 to-indigo-700',
    accent: '#6d28d9',
    stat: '2 Panels',
  },
  {
    id: 4,
    title: 'Hackathon',
    icon: '🏆',
    number: '04',
    description: 'A high-energy build challenge. Form teams, pick a problem, and build an AWS-powered solution. Swags & prizes await the best builders.',
    tags: ['Team Challenge', 'Hybrid', 'Swags', 'Prizes'],
    color: 'from-indigo-600 to-purple-700',
    accent: '#4f46e5',
    stat: '₹ Prizes',
  },
];

// ─── Team Roles ───────────────────────────────────────────────────────────────
export const teamRoles = [
  { id: 1, role: 'Captain', initials: 'VP', description: 'Leading the vision and strategy' },
  { id: 2, role: 'Management Lead', initials: 'A', description: 'Operations & team coordination' },
  { id: 3, role: 'Content Creation Lead', initials: 'K', description: 'Storytelling & content strategy' },
  { id: 4, role: 'Technical Lead', initials: 'MK', description: 'AWS architecture & tech stack' },
  { id: 5, role: 'Event Management Lead', initials: 'V', description: 'On-ground event execution' },
  { id: 6, role: 'Treasurer', initials: 'J', description: 'Budget & financial planning' },
  { id: 7, role: 'Outreach Lead', initials: 'VM', description: 'Community & partnerships' },
  { id: 8, role: 'Hosting Lead', initials: 'S', description: 'Stage presence & MC duties' },
  { id: 9, role: 'Social Media Lead', initials: 'R', description: 'Social media & campaigns' },
];

// ─── Sponsors ─────────────────────────────────────────────────────────────────
export const sponsorTiers = [
  {
    tier: 'Cloud Partner',
    emoji: '☁️',
    color: '#f59e0b',
    items: [
      { name: 'Amazon Web Services', abbr: 'AWS', logo: '/aws-logo.png', type: 'sponsor' },
    ],
  },
  {
    tier: 'Venue Partner',
    emoji: '🏛️',
    color: '#3b82f6',
    items: [
      { name: 'SMVEC', abbr: 'SMVEC', logo: '/smvec-logo.png', type: 'venue' },
    ],
  },
  {
    tier: 'Community Partner',
    emoji: '🤝',
    color: '#8b5cf6',
    items: [
      { name: 'AWS UG Puducherry', abbr: 'AWSUG', logo: '/aws-logo.png', type: 'community' },
    ],
  },
];

// ─── Agenda (Ticket Back) ─────────────────────────────────────────────────────
export const agenda = [
  { time: '08:30', title: 'Registration & Networking', type: 'logistics', icon: '📋' },
  { time: '09:30', title: 'Opening Keynote', type: 'keynote', icon: '🎤' },
  { time: '10:30', title: 'Technical Sessions — Track A & B', type: 'session', icon: '⚡' },
  { time: '12:30', title: 'Lunch Break & Networking', type: 'logistics', icon: '🍽️' },
  { time: '13:30', title: 'Workshops & Hands-on Labs', type: 'workshop', icon: '🛠️' },
  { time: '15:00', title: 'Panel Discussion', type: 'panel', icon: '💬' },
  { time: '16:00', title: 'Hackathon Showcase', type: 'hackathon', icon: '🏆' },
  { time: '17:30', title: 'Awards & Closing Ceremony', type: 'closing', icon: '🎊' },
];

// ─── Code of Conduct ──────────────────────────────────────────────────────────
export const codeOfConduct = {
  title: 'Code of Conduct',
  summary: 'Student Community Day Pondicherry is dedicated to providing a harassment-free conference experience for everyone.',
  principles: [
    'Be respectful and inclusive to all attendees',
    'No harassment, discrimination, or inappropriate behavior',
    'Respect speakers, organizers, and fellow attendees',
    'Follow AWS Community guidelines and values',
  ],
};
