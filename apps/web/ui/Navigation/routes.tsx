import HomeIcon from '@/components/svgs/Home/home.svg';
import NotificationsIcon from '@/components/svgs/Home/notifications.svg';
import ChatIcon from '@/components/svgs/Home/chat.svg';
import RoomsIcon from '@/components/svgs/Home/rooms.svg';
import CommunityIcon from '@/components/svgs/Home/communities.svg';

const routes = [
    {
        name: 'Home',
        route: '/home',
        icon: <HomeIcon />,
    },
    {
        name: 'Notifications',
        route: '/notifications',
        icon: <NotificationsIcon />,
    },
    {
        name: 'Rooms',
        route: '/rooms',
        icon: <RoomsIcon />,
    },
    {
        name: 'Chat',
        route: '/chat',
        icon: <ChatIcon />,
    },
    {
        name: 'Clans',
        route: '/clans',
        icon: <CommunityIcon />,
    },
];

export default routes;
