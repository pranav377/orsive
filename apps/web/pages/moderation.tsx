import { Layout } from "../components/app/Layout";
import ModerationImagePostCard from "../components/moderation/ModerationImagePostCard";

export default function Moderation() {
  return (
    <>
      <Layout title={"Moderation | Orsive"}>
        <div className="flex items-center mb-1 flex-col">
          <ModerationImagePostCard />
        </div>
      </Layout>
    </>
  );
}
