import VirtualScroller from "virtual-scroller/react";
import { useOneTimePageSpinner } from "../../hooks/app/useOneTimePageSpinner";
import { useProfilePosts } from "../../hooks/pages/profile/useProfilePosts";
import { ProfileType } from "../../pages/[profile_slug]";
import OneTimePageSpinner from "../app/OneTimePageSpinner";
import Spinner from "../app/Spinner";
import PostListRenderer from "../post/postListRenderer";
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
          <VirtualScroller
            className="flex flex-col items-center"
            items={query.data.getProfilePosts.data}
            itemComponent={PostListRenderer}
          />

          {query.data.getProfilePosts.hasNextPage && (
            <div
              ref={loadMoreElement}
              className={`flex items-center justify-center m-2`}
            >
              <Spinner />
            </div>
          )}
        </>
      )}
      <OneTimePageSpinner spinnerShown={spinnerShown} long data={query.data} />
    </>
  );
}
