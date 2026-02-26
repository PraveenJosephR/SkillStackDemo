export interface Activity {
  id: string;
  name: string;
  tokens: number;
  description?: string;
}

export interface CurrentActivity {
  id: string;
  activityName: string;
  status: 'In Progress' | 'Pending Approval' | 'Completed';
  tokensToEarn: number;
  progress: number;
}

export interface CompletedActivity {
  id: string;
  activityName: string;
  tokensEarned: number;
  completedDate: string;
}

export interface FeedItem {
  id: string;
  studentName: string;
  activity: string;
  tokensEarned: number;
  timestamp: string;
  totalTokens: number;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  totalTokens: number;
  rank: number;
}

export const availableActivities: Activity[] = [
  { id: '1', name: 'Startup', tokens: 12, description: 'Launch your own startup project' },
  { id: '2', name: 'Internship', tokens: 6, description: 'Complete an internship program' },
  { id: '3', name: 'Club Activity', tokens: 3, description: 'Participate in college club activities' },
  { id: '4', name: 'Sports', tokens: 3, description: 'Participate in sports events' },
  { id: '5', name: 'NCC or NSS', tokens: 3, description: 'Join NCC or NSS programs' },
  { id: '6', name: 'Global Certificate', tokens: 4, description: 'Earn recognized certifications' },
  { id: '7', name: 'Other College Event', tokens: 3, description: 'Join various college events' },
  { id: '8', name: 'Organizing Event', tokens: 3, description: 'Organize college events' },
  { id: '9', name: 'Volunteering', tokens: 2, description: 'Volunteer for social causes' },
];

export const mockCurrentActivities: CurrentActivity[] = [
  {
    id: '1',
    activityName: 'Internship',
    status: 'In Progress',
    tokensToEarn: 6,
    progress: 65,
  },
  {
    id: '2',
    activityName: 'Club Activity',
    status: 'Pending Approval',
    tokensToEarn: 3,
    progress: 100,
  },
];

export const mockCompletedActivities: CompletedActivity[] = [
  {
    id: '1',
    activityName: 'Global Certificate',
    tokensEarned: 4,
    completedDate: '2024-01-15',
  },
  {
    id: '2',
    activityName: 'Sports',
    tokensEarned: 3,
    completedDate: '2024-01-10',
  },
  {
    id: '3',
    activityName: 'Volunteering',
    tokensEarned: 2,
    completedDate: '2024-01-05',
  },
];

export const mockFeedItems: FeedItem[] = [
  {
    id: '1',
    studentName: 'Sarah Johnson',
    activity: 'Startup',
    tokensEarned: 12,
    timestamp: '2 hours ago',
    totalTokens: 18,
  },
  {
    id: '2',
    studentName: 'Michael Chen',
    activity: 'Internship',
    tokensEarned: 6,
    timestamp: '3 hours ago',
    totalTokens: 15,
  },
  {
    id: '3',
    studentName: 'Emma Williams',
    activity: 'Global Certificate',
    tokensEarned: 4,
    timestamp: '5 hours ago',
    totalTokens: 20,
  },
  {
    id: '4',
    studentName: 'James Brown',
    activity: 'Club Activity',
    tokensEarned: 3,
    timestamp: '6 hours ago',
    totalTokens: 12,
  },
  {
    id: '5',
    studentName: 'Olivia Martinez',
    activity: 'Organizing Event',
    tokensEarned: 3,
    timestamp: '8 hours ago',
    totalTokens: 19,
  },
  {
    id: '6',
    studentName: 'William Davis',
    activity: 'Sports',
    tokensEarned: 3,
    timestamp: '10 hours ago',
    totalTokens: 9,
  },
  {
    id: '7',
    studentName: 'Sophia Garcia',
    activity: 'NCC or NSS',
    tokensEarned: 3,
    timestamp: '12 hours ago',
    totalTokens: 17,
  },
  {
    id: '8',
    studentName: 'Alexander Wilson',
    activity: 'Volunteering',
    tokensEarned: 2,
    timestamp: '1 day ago',
    totalTokens: 14,
  },
];

export const mockLeaderboard: LeaderboardEntry[] = [
  { id: '1', name: 'Mohana Krishnan', totalTokens:240, rank: 1 },
  { id: '2', name: 'Ashish', totalTokens: 180, rank: 2 },
  { id: '3', name: 'Sarah Johnson', totalTokens: 90, rank: 3 },
  { id: '4', name: 'Sophia Garcia', totalTokens: 80, rank: 4 },
  { id: '5', name: 'Michael Chen', totalTokens: 68, rank: 5 },
  { id: '6', name: 'Alexander Wilson', totalTokens: 50, rank: 6 },
  { id: '7', name: 'James Brown', totalTokens: 42, rank: 7 },
  { id: '8', name: 'William Davis', totalTokens: 39, rank: 8 },
  { id: '9', name: 'David Lee', totalTokens: 38, rank: 9 },
  { id: '10', name: 'Isabella Taylor', totalTokens: 27, rank: 10 },
];

export const currentUserTokens = 9;
