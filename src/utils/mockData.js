// Initial mock data mirroring the user's beautiful mockup screenshot exactly

export const initialTasks = [
  // 🔴 Q1: Do Immediately
  {
    id: 'mock-q1-1',
    title: 'Finalize Q4 architectural documentation',
    description: 'Complete the architecture design and hand over to engineering.',
    quadrant: 1,
    isCompleted: false,
    dueDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    badgeText: 'OVERDUE',
    badgeType: 'overdue',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-q1-2',
    title: 'Resolve critical server vulnerability',
    description: 'Patch CVE issues on main gateway server.',
    quadrant: 1,
    isCompleted: true,
    dueDate: null,
    badgeText: '',
    badgeType: '',
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
  },

  // 🟡 Q2: Schedule & Plan
  {
    id: 'mock-q2-1',
    title: 'Quarterly strategic vision workshop',
    description: 'Set team goals and align product vision for the next quarter.',
    quadrant: 2,
    isCompleted: false,
    dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days from now (e.g. Next Tuesday)
    badgeText: 'NEXT TUESDAY',
    badgeType: 'plan',
    metaText: '👥 5 Participants',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-q2-2',
    title: 'Market expansion research (Asia Pacific)',
    description: 'Collect statistics and design market entry playbook.',
    quadrant: 2,
    isCompleted: false,
    dueDate: null,
    badgeText: 'DRAFT PHASE',
    badgeType: 'draft',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },

  // 🔵 Q3: Delegate Tasks
  {
    id: 'mock-q3-1',
    title: 'Review weekly social analytics',
    description: 'Examine post engagement rate and CTR spikes.',
    quadrant: 3,
    isCompleted: false,
    dueDate: null,
    badgeText: 'DELEGATE TO SARAH',
    badgeType: 'delegate',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-q3-2',
    title: 'Routine maintenance request #402',
    description: 'Automated infrastructure status check.',
    quadrant: 3,
    isCompleted: false,
    dueDate: null,
    badgeText: 'Automated ticket',
    badgeType: 'ticket',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },

  // ⚫ Q4: Eliminate & Drop
  {
    id: 'mock-q4-1',
    title: 'Organize legacy email archives (2018)',
    description: 'Clean up ancient Outlook database folders.',
    quadrant: 4,
    isCompleted: false,
    dueDate: null,
    badgeText: 'LOW PRIORITY',
    badgeType: 'low',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'mock-q4-2',
    title: 'Browse hardware update rumors',
    description: 'Check up on new specs and benchmarks.',
    quadrant: 4,
    isCompleted: false,
    dueDate: null,
    badgeText: '',
    badgeType: '',
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
  }
];
