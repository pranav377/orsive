// for bottombar
import BottomBar from '@/ui/Navigation/BottomBar';

export default function HomePageLayout(props: { children: React.ReactNode }) {
    const { children } = props;

    return (
        <>
            {children}
            <BottomBar />
        </>
    );
}
