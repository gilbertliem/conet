export interface Amenity {
  id: string;
  label: string;
  iconName: string; // Lucide icon identifier
  description?: string;
}

export interface Seat {
  id: string;
  label: string; // e.g. "Desk A-04" or "Pod 2B"
  status: 'available' | 'reserved' | 'occupied' | 'selected';
  x: number; // percentage coordinate on map floorplan
  y: number; // percentage coordinate on map floorplan
  type: 'hot_desk' | 'standing_desk' | 'quiet_pod' | 'lounge_chair' | 'booth';
  features?: string[];
  powerOutlet?: boolean;
  monitors?: number;
}

export interface SeatZone {
  id: string;
  name: string;
  description: string;
  zoneType: 'hot_desk' | 'collaborative_lounge' | 'quiet_pod' | 'meeting_room';
  totalSeats: number;
  availableSeats: number;
  hourlyRate: number; // USD per hour
  seats: Seat[];
}

export interface TimelineItem {
  id: string;
  period: string; // e.g., "2022 - Present"
  role: string;
  company: string;
  companyLogo?: string;
  location: string;
  summary: string;
  highlights: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  description: string;
  impactMetric: string; // e.g., "3.4x LLM throughput"
  tags: string[];
  linkUrl?: string;
}

export interface UserQA {
  id: string;
  question: string;
  askedBy: string;
  askedByTitle?: string;
  askedByAvatar?: string;
  timestamp: string;
  upvotes: number;
  hasUpvoted?: boolean;
  answer?: {
    text: string;
    timestamp: string;
    isVerifiedAnswer?: boolean;
  };
}

export interface Professional {
  id: string;
  name: string;
  avatar: string;
  age: number;
  birthDateInfo: string; // e.g. "Born Aug 1994 • San Francisco, CA"
  jobTitle: string;
  company: string;
  companyLogo?: string;
  department: string; // e.g., "AI & Machine Learning", "Fintech Engineering", "UX Strategy"
  industryTag: string; // e.g., "Artificial Intelligence", "Financial Tech", "Biotech"
  checkedInSpaceId: string;
  checkedInSpaceName: string;
  checkedInTime: string; // e.g., "Checked in 8:30 AM"
  statusBadge: 'In Hub Today' | 'Available for Pod Sync' | 'Deep Focus Mode' | 'Open to Cross-Dept Ideas';
  availabilityStatus: 'available' | 'do_not_disturb'; // 'available' (Green - Available to talk) | 'do_not_disturb' (Red - Do Not Disturb)
  availabilityNote?: string;
  bio: string;
  skills: string[];
  synergyScore: number; // 0-100 match rating
  contactEmail: string;
  linkedInUrl?: string;
  timeline: TimelineItem[];
  portfolio: PortfolioItem[];
  questionsAndAnswers?: UserQA[];
}

export interface CoWorkingSpace {
  id: string;
  name: string;
  district: string; // e.g., "Financial District", "SoMa Tech Corridor"
  address: string;
  coords: {
    x: number; // % position on custom district map (0 - 100)
    y: number; // % position on custom district map (0 - 100)
    lat: number;
    lng: number;
  };
  occupancyCurrent: number;
  occupancyCapacity: number;
  pricePerHour: number;
  rating: number;
  reviewsCount: number;
  image: string;
  coverImage: string;
  amenities: Amenity[];
  description: string;
  noiseLevel: 'Quiet Focus' | 'Collaborative Vibrant' | 'Balanced Flow';
  activeProjectsCount: number;
  topDepartments: string[];
  peakOccupancyHours: string;
  analyticsHourly: { hour: string; occupancyPct: number; crossCollabs: number }[];
  analyticsWeekly: { day: string; avgOccupancyPct: number; meetingsHeld: number }[];
  seatZones: SeatZone[];
}

export interface BookingState {
  spaceId: string;
  spaceName: string;
  date: string;
  timeStart: string;
  durationHours: number;
  zoneId: string;
  seatId?: string;
  seatLabel?: string;
  totalPrice: number;
  purposeNote: string;
  crossDeptGoal?: string;
}

export interface CheckInLog {
  id: string;
  professionalName: string;
  avatar: string;
  jobTitle: string;
  company: string;
  spaceName: string;
  timestamp: string;
  departmentTag: string;
}
