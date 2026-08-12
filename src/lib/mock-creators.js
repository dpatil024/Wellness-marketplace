export const CREATORS = [
  {
    slug: 'maya-reyes',
    name: 'Maya Reyes',
    niche: 'Nutrition Coaching',
    tagline: 'Sustainable eating, not restriction',
    verified: true,
    photoUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=faces&q=80',
    credentials: [
      { label: 'RD', variant: 'verified', fullName: 'Registered Dietitian' },
      { label: 'CNS', variant: 'plum', fullName: 'Certified Nutrition Specialist' },
    ],
    bio: 'Sustainable eating, not restriction — steady, personal guidance.',
    fullBio:
      "I spent six years in clinical nutrition before I started coaching — now I help people build eating habits that hold up under a real schedule, not a meal plan you'll abandon by March. No detoxes, no macros police. Just steady, personal guidance.",
    scopeNote:
      "Maya provides nutrition coaching and accountability — not medical diagnosis, treatment, or a substitute for your doctor.",
    tiers: [
      {
        variant: 'free',
        name: 'Community',
        description: 'Weekly public posts, recipe drops',
      },
      {
        variant: 'paid',
        name: '1:1 Coaching',
        description: 'Personal check-ins, direct messages, custom guidance',
        price: '$19',
      },
    ],
    checkIn: {
      time: 'Tuesday, 7:42am',
      message:
        "A few of you asked about protein timing after evening workouts — posted a short breakdown in the feed. Also, how'd the meal prep go this week? Tell me what stuck and what didn't, I'll adjust next week's plan around it.",
    },
  },
  {
    slug: 'jordan-pike',
    name: 'Jordan Pike',
    niche: 'Strength & Conditioning',
    tagline: 'Programs built around your actual schedule',
    verified: true,
    photoUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=faces&q=80',
    credentials: [
      { label: 'CSCS', variant: 'verified', fullName: 'Certified Strength and Conditioning Specialist' },
    ],
    bio: 'Programs built around your actual schedule, not an ideal one.',
    fullBio:
      "Ten years coaching strength athletes and busy people who just want to feel strong. Programs built around your actual schedule, not an ideal one — three days a week, done right, beats seven days you'll quit on.",
    scopeNote:
      "Jordan provides strength and conditioning coaching — not physical therapy or a substitute for medical clearance if you're returning from injury.",
    tiers: [
      {
        variant: 'free',
        name: 'Community',
        description: 'Weekly programming tips, form breakdowns',
      },
      {
        variant: 'paid',
        name: '1:1 Coaching',
        description: 'Custom programming, weekly check-ins, form review',
        price: '$25',
      },
    ],
    checkIn: {
      time: 'Monday, 6:15am',
      message:
        "Deload week starting today for everyone on the 12-week block — pull back to 60% and focus on bar speed. Reply if you want the exact numbers, otherwise see you Wednesday.",
    },
  },
  {
    slug: 'sam-ortiz',
    name: 'Sam Ortiz',
    niche: 'Mental Health Coaching',
    tagline: 'Weekly check-ins that hold you accountable',
    verified: true,
    photoUrl:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=faces&q=80',
    credentials: [
      { label: 'LPC', variant: 'mauve', fullName: 'Licensed Professional Counselor' },
    ],
    bio: 'Weekly check-ins that actually hold you accountable.',
    fullBio:
      "I help people build the kind of consistency that therapy alone sometimes can't reach — weekly check-ins, honest accountability, and someone in your corner between sessions.",
    scopeNote:
      "Sam provides coaching and accountability support — not therapy, diagnosis, or crisis care. If you're in crisis, please contact a licensed provider or emergency services.",
    tiers: [
      {
        variant: 'free',
        name: 'Community',
        description: 'Weekly reflection prompts, public posts',
      },
      {
        variant: 'paid',
        name: '1:1 Coaching',
        description: 'Weekly check-ins, direct messages, accountability plan',
        price: '$22',
      },
    ],
    checkIn: {
      time: 'Wednesday, 8:00am',
      message:
        "Halfway through the week — how's the sleep tracking going? No judgment either way, just want to know what you're noticing so far.",
    },
  },
  {
    slug: 'priya-nair',
    name: 'Priya Nair',
    niche: 'Fitness Coaching',
    tagline: "Strength training for people who've never lifted",
    verified: true,
    photoUrl:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=faces&q=80',
    credentials: [
      { label: 'CPT', variant: 'verified', fullName: 'Certified Personal Trainer' },
    ],
    bio: "Strength training for people who've never lifted a weight before.",
    fullBio:
      "Most of my clients walk in intimidated by the weight room and walk out running it. I specialize in first-time lifters — proper form, realistic pacing, and zero judgment.",
    scopeNote:
      "Priya provides fitness coaching and exercise programming — not physical therapy, medical advice, or injury diagnosis.",
    tiers: [
      {
        variant: 'free',
        name: 'Community',
        description: 'Beginner-friendly workout breakdowns',
      },
      {
        variant: 'paid',
        name: '1:1 Coaching',
        description: 'Custom programming, form checks, weekly check-ins',
        price: '$20',
      },
    ],
    checkIn: {
      time: 'Thursday, 5:30pm',
      message:
        "First deadlift session for three of you this week — all three pulled their bodyweight off the floor with clean form. That's the whole game. Keep sending form videos, I love watching the progress.",
    },
  },
]

export function getCreatorBySlug(slug) {
  return CREATORS.find((creator) => creator.slug === slug)
}
