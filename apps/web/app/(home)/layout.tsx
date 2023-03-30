'use client';

import Navbar from '@/ui/navigation/Navbar';
import BottomBar from '@/ui/navigation/BottomBar';
import SideBar from '@/ui/navigation/SideBar';

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navbar />
            {children}
            <SideBar />
            <BottomBar />
        </>
    );
}
