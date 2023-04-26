import ChatDefault from '@/ui/Chat/ChatDefault';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Chat | Orsive',
    description: 'Chat with your friends and family',
};

export default function ChatHome() {
    return <ChatDefault />;
}
