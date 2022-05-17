import { useOneTimePageSpinner } from "../../hooks/app/useOneTimePageSpinner";
import { useProfilePosts } from "../../hooks/pages/profile/useProfilePosts";
import { ProfileType } from "../../pages/[profile_slug]";
import OneTimePageSpinner from "../app/OneTimePageSpinner";
import ImagePostCard from "../post/cards/ImagePostCard";
import OrsicPostCard from "../post/cards/OrsicPostCard";
import BruhSVG from "../svgs/bruh.svg";

export default function ProfilePosts(props: { profile: ProfileType }) {
  const { query, loadMoreElement } = useProfilePosts(props.profile);

  const { spinnerShown } = useOneTimePageSpinner(query.data);

  return (
    <>
      {query.data && (
        <>
          {query.data.getProfilePosts.data.length == -0 && (
            <>
              <BruhSVG className="w-full" />
              <p className="text-xl text-center">This profile has no posts.</p>
            </>
          )}
          {query.data.getProfilePosts.data.map((post: any) => {
            if (post.__typename === "Image") {
              return <ImagePostCard post={post} key={post.post.id} />;
            }
            if (post.__typename === "Orsic") {
              return <OrsicPostCard post={post} key={post.post.id} />;
            }
          })}

          {query.data.getProfilePosts.hasNextPage && (
            <span className="text-center" ref={loadMoreElement}>
              There's more coming up🚀
            </span>
          )}
        </>
      )}
      <OneTimePageSpinner spinnerShown={spinnerShown} long data={query.data} />
    </>
  );
}
