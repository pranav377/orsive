import HomeIcon from '@/components/svgs/home/home.svg';
import NotificationsIcon from '@/components/svgs/home/notifications.svg';
import ChatIcon from '@/components/svgs/home/chat.svg';
import RoomsIcon from '@/components/svgs/home/rooms.svg';
import CommunityIcon from '@/components/svgs/home/communities.svg';

const routes = [
    {
        name: 'Home',
        route: '/feed',
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
