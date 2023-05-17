'use client';

import MobileBottomBar from '../Navigation/MobileBottomBar';
import MobileNavbar from '../Navigation/MobileNavbar';

export default function MobileComponents({
    showNavbar = true,
    showBottomBar = true,
}: {
    showNavbar?: boolean;
    showBottomBar?: boolean;
}) {
    return (
        <>
            {showNavbar && <MobileNavbar />}
            {showBottomBar && <MobileBottomBar />}
        </>
    );
}
