import HomeIcon from '@/components/svgs/Home/home.svg';
import NotificationsIcon from '@/components/svgs/Home/notifications.svg';
import ChatIcon from '@/components/svgs/Home/chat.svg';

const routes = [
    {
        name: 'Home',
        route: '/home',
        icon: <HomeIcon />,
    },
    {
        name: 'Chat',
        route: '/chat',
        icon: <ChatIcon />,
    },
    {
        name: 'Notifications',
        route: '/notifications',
        icon: <NotificationsIcon />,
    },
];

export default routes;
