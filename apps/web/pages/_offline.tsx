import { Layout } from "../components/app/Layout";
import OfflineSVG from "../components/svgs/offline.svg";

export default function Offline() {
  return (
    <Layout title="Orsive">
      <div className="w-full flex flex-col items-center justify-center h-[70vh] mt-7 pb-20">
        <OfflineSVG className="w-[50%] max-w-sm" />
        <p className="text-2xl font-semibold mt-3 text-center">
          You are <span className="text-red-600">offline</span>😭
        </p>
      </div>
    </Layout>
  );
}
