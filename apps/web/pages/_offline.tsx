import { Layout } from '../components/app/Layout';
import OfflineSVG from '../components/svgs/offline.svg';

export default function Offline() {
    return (
        <Layout title="Orsive">
            <div className="mt-7 flex h-[70vh] w-full flex-col items-center justify-center pb-20">
                <OfflineSVG className="w-[50%] max-w-sm" />
                <p className="mt-3 text-center text-2xl font-semibold">
                    You are <span className="text-red-600">offline</span>😭
                </p>
            </div>
        </Layout>
    );
}
