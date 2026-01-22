export enum UserRole {
  CREATOR = 'CREATOR',
  PHOTOGRAPHER = 'PHOTOGRAPHER',
  AGENCY = 'AGENCY'
}

export enum VerificationLevel {
  NONE = 'NONE',
  ID_VERIFIED = 'ID_VERIFIED',
  PROFESSIONAL_VERIFIED = 'PROFESSIONAL_VERIFIED', // Peer reviewed
  SAFE_SET_CERTIFIED = 'SAFE_SET_CERTIFIED' // History of safe collaborations
}

export enum PostType {
  CASTING = 'CASTING', // Jobs
  SOCIAL = 'SOCIAL',   // Networking, BTS, Updates
  PREMIUM = 'PREMIUM'  // Locked Content
}

export interface User {
  id: string;
  name: string;
  handle: string;
  role: UserRole;
  avatar: string;
  badges: VerificationLevel[];
  rating: number; // 0-5
  reviewCount: number;
}

export interface CastingDetails {
  location: string;
  date: string;
  rate: string;
  requirements: string[];
  gender: string;
}

export interface SocialDetails {
  location?: string;
  category: string; // e.g. "Behind the Scenes", "New Work", "Life Update"
  techInfo?: string; // e.g. "Sony A7III", "Natural Light"
  availabilityStatus?: 'OPEN' | 'BUSY' | 'LIMITED';
}

export interface ContentDetails {
  isLocked: boolean;
  price?: number;
  mediaType: 'image' | 'video';
  thumbnail: string;
  isSensitive?: boolean;
}

export interface Post {
  id: string;
  author: User;
  type: PostType;
  content: string;
  timestamp: string;
  casting?: CastingDetails; // Only for CASTING type
  social?: SocialDetails;   // For SOCIAL and PREMIUM types
  media?: ContentDetails;   // For SOCIAL and PREMIUM types
  likes: number;
  comments: number;
}
