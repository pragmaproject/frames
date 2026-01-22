import { User, UserRole, VerificationLevel, Post, PostType } from './types';

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Alex Rivera',
  handle: 'arivera_visuals',
  role: UserRole.PHOTOGRAPHER,
  avatar: 'https://picsum.photos/200/200?random=99',
  badges: [VerificationLevel.ID_VERIFIED, VerificationLevel.PROFESSIONAL_VERIFIED],
  rating: 4.8,
  reviewCount: 24,
};

export const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    author: {
      id: 'u2',
      name: 'Lumina Agency',
      handle: 'lumina_mgmt',
      role: UserRole.AGENCY,
      avatar: 'https://picsum.photos/200/200?random=1',
      badges: [VerificationLevel.ID_VERIFIED, VerificationLevel.SAFE_SET_CERTIFIED],
      rating: 4.9,
      reviewCount: 150
    },
    type: PostType.CASTING,
    content: 'Casting for a high-fashion editorial shoot in downtown LA. Looking for creators with athletic build.',
    timestamp: '2h ago',
    casting: {
      location: 'Los Angeles, CA',
      date: 'Oct 24 - Oct 26',
      rate: '$2,500 / day',
      requirements: ['Valid ID', 'Model Release', 'Athletic Wear'],
      gender: 'Female / Non-Binary'
    },
    likes: 45,
    comments: 12
  },
  {
    id: 'p2',
    author: {
      id: 'u3',
      name: 'Sarah V.',
      handle: 'sarah_v',
      role: UserRole.CREATOR,
      avatar: 'https://picsum.photos/200/200?random=2',
      badges: [VerificationLevel.ID_VERIFIED],
      rating: 4.5,
      reviewCount: 12
    },
    type: PostType.PREMIUM,
    content: 'Behind the scenes from my latest set! The lighting was incredible. Full 4K set available now.',
    timestamp: '4h ago',
    media: {
      isLocked: true,
      price: 15,
      mediaType: 'image',
      thumbnail: 'https://picsum.photos/600/400?random=3',
      isSensitive: true
    },
    social: {
      location: 'Studio 54, NYC',
      category: 'Exclusive Set',
      techInfo: 'Sony A7R IV',
      availabilityStatus: 'OPEN'
    },
    likes: 230,
    comments: 45
  },
   {
    id: 'p3',
    author: {
      id: 'u4',
      name: 'Marcus Chen',
      handle: 'marcus_lens',
      role: UserRole.PHOTOGRAPHER,
      avatar: 'https://picsum.photos/200/200?random=4',
      badges: [VerificationLevel.PROFESSIONAL_VERIFIED],
      rating: 5.0,
      reviewCount: 8
    },
    type: PostType.SOCIAL,
    content: 'Had a fantastic collaboration with @SarahV yesterday. The studio vibes were immaculate. Here is a safe-for-work preview of what we created.',
    timestamp: '5h ago',
    social: {
      location: 'Miami, FL',
      category: 'Collaboration',
      techInfo: 'Natural Light',
      availabilityStatus: 'LIMITED'
    },
    media: {
        isLocked: false,
        mediaType: 'image',
        thumbnail: 'https://picsum.photos/600/400?random=5',
        isSensitive: false
    },
    likes: 124,
    comments: 24
  },
  {
    id: 'p4',
    author: {
      id: 'u4',
      name: 'Marcus Chen',
      handle: 'marcus_lens',
      role: UserRole.PHOTOGRAPHER,
      avatar: 'https://picsum.photos/200/200?random=4',
      badges: [VerificationLevel.PROFESSIONAL_VERIFIED],
      rating: 5.0,
      reviewCount: 8
    },
    type: PostType.CASTING,
    content: 'Urgent: Looking for MUA for a shoot this weekend.',
    timestamp: '1d ago',
    casting: {
      location: 'Miami, FL',
      date: 'This Saturday',
      rate: '$300',
      requirements: ['Portfolio Required'],
      gender: 'Any'
    },
    likes: 5,
    comments: 2
  }
];