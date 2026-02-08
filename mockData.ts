
import { Post, Course, Comment } from './types';

export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    title: 'Mua Tim Tiktok NHANH CHÓNG, CHẤT LƯỢNG tại AppTangLike',
    excerpt: 'Bạn đã từng đăng một video TikTok đầy tâm huyết nhưng chỉ nhận được vài lượt tim lác đác, hãy khám phá bí mật này ngay hôm nay để video của bạn lên xu hướng...',
    content: 'Full content here...',
    author: 'Thắng Phạm',
    category: 'My Blog',
    views: 5,
    date: '11/05/2025',
    imageUrl: 'https://picsum.photos/seed/tiktok-post/800/450',
    type: 'blog'
  },
  {
    id: '2',
    title: 'Cafe với Anh Thắng nghe kể chuyện hành trình fonttiengviet.com',
    excerpt: '',
    content: '',
    author: 'Thắng Phạm',
    category: 'My Blog',
    views: 4245,
    date: '24/08/2023',
    imageUrl: 'https://picsum.photos/seed/cafe-post/400/300',
    type: 'blog'
  },
  {
    id: '3',
    title: 'Giới thiệu thiết kế web Quảng Nam Web - quangnamweb.com',
    excerpt: '',
    content: '',
    author: 'Thắng Phạm',
    category: 'My Blog',
    views: 8753,
    date: '02/08/2023',
    imageUrl: 'https://picsum.photos/seed/web-post/400/300',
    type: 'blog'
  },
  {
    id: '4',
    title: 'Hướng dẫn viết widget bài viết theo chuyên mục trong wordpress',
    excerpt: '',
    content: '',
    author: 'Thắng Phạm',
    category: 'WordPress',
    views: 14034,
    date: '05/06/2023',
    imageUrl: 'https://picsum.photos/seed/wp-widget/400/300',
    type: 'blog'
  },
  {
    id: 's1',
    title: 'Share mẫu website blog cá nhân cực nhẹ, giống hocwordpress.vn',
    excerpt: '',
    content: '',
    author: 'Thắng Phạm',
    category: 'Share code',
    views: 21654,
    date: '15/05/2023',
    imageUrl: 'https://picsum.photos/seed/sc1/400/300',
    type: 'share-code'
  },
  {
    id: 's2',
    title: 'Share plugin toolset types phiên bản mới nhất cập nhật thường xuyên',
    excerpt: '',
    content: '',
    author: 'Thắng Phạm',
    category: 'Share code',
    views: 16015,
    date: '30/07/2019',
    imageUrl: 'https://picsum.photos/seed/sc2/400/300',
    type: 'share-code'
  },
  {
    id: 's3',
    title: 'Share plugin iThemes Security Pro phiên bản mới nhất cập nhật thường xuyên',
    excerpt: '',
    content: '',
    author: 'Thắng Phạm',
    category: 'Share code',
    views: 11004,
    date: '25/07/2019',
    imageUrl: 'https://picsum.photos/seed/sc3/400/300',
    type: 'share-code'
  },
  {
    id: 's4',
    title: 'Share theme Flatsome phiên bản mới nhất cập nhật thường xuyên',
    excerpt: '',
    content: '',
    author: 'Thắng Phạm',
    category: 'Share code',
    views: 18561,
    date: '22/07/2019',
    imageUrl: 'https://picsum.photos/seed/sc4/400/300',
    type: 'share-code'
  },
  {
    id: 's5',
    title: 'Share plugin Elementor PRO cập nhật thường xuyên',
    excerpt: '',
    content: '',
    author: 'Thắng Phạm',
    category: 'Share code',
    views: 17360,
    date: '13/07/2019',
    imageUrl: 'https://picsum.photos/seed/sc5/400/300',
    type: 'share-code'
  },
  {
    id: 's6',
    title: 'Share plugin WP Rocket cập nhật thường xuyên cho anh em blog',
    excerpt: '',
    content: '',
    author: 'Thắng Phạm',
    category: 'Share code',
    views: 11772,
    date: '11/07/2019',
    imageUrl: 'https://picsum.photos/seed/sc6/400/300',
    type: 'share-code'
  }
];

export const MOCK_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Khóa Học WordPress Cơ Bản Dành Cho Người Mới Bắt Đầu',
    price: 'Miễn Phí',
    oldPrice: '1.000.000 đ',
    image: 'https://picsum.photos/seed/course1/100/100',
    isFree: true
  },
  {
    id: 'c2',
    title: 'Khóa Học Lập Trình Theme WordPress chuyên nghiệp',
    price: '1.500.000 đ',
    oldPrice: '1.800.000 đ',
    image: 'https://picsum.photos/seed/course2/100/100'
  },
  {
    id: 'c3',
    title: 'Khóa Học Tìm Hiểu Custom Database WordPress',
    price: '550.000 đ',
    oldPrice: '700.000 đ',
    image: 'https://picsum.photos/seed/course3/100/100'
  }
];

export const MOCK_COMMENTS: Comment[] = [
  { id: '1', user: 'HoangLong', avatar: 'https://i.pravatar.cc/150?u=hl', text: 'Thanks your share' },
  { id: '2', user: 'Jr', avatar: 'https://i.pravatar.cc/150?u=jr', text: 'Ok' },
  { id: '3', user: 'Thanh', avatar: 'https://i.pravatar.cc/150?u=th', text: 'source trang bán hàng wp đâu bạn' },
  { id: '4', user: 'Huy Nguyen', avatar: 'https://i.pravatar.cc/150?u=hn', text: 'không cập nhật bản mới nữa à bác ơi!' }
];
