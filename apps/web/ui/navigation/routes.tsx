import HomeIcon from '@/components/svgs/home/home.svg';
import NotificationsIcon from '@/components/svgs/home/notifications.svg';
import ChatIcon from '@/components/svgs/home/chat.svg';
import RoomsIcon from '@/components/svgs/home/rooms.svg';

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
        name: 'Chat',
        route: '/chat',
        icon: <ChatIcon />,
    },
    {
        name: 'Rooms',
        route: '/rooms',
        icon: <RoomsIcon />,
    },
];

export default routes;
