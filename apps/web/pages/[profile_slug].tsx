import TopBar from "../components/app/TopBar";
import { useProfilePage } from "../hooks/pages/profile/useProfilePage";
import { CalendarIcon } from "@heroicons/react/solid";
import Spinner from "../components/app/Spinner";
import EditProfile from "../components/forms/profile/EditProfile";
import Moment from "react-moment";
import CONTENT_CASES from "../app/store/reducers/content/cases";
import ProfilePosts from "../components/profile/ProfilePosts";
import refreshData from "../utils/refreshProfileData";
import Comp404 from "../components/app/404";
import { NextSeo } from "next-seo";
import {
  EditProfileButton,
  FollowButton,
} from "../components/profile/ProfileButtons";
import LinkifyContent from "../components/app/LinkifyContent";
import { Layout } from "../components/app/Layout";
import { nFormatter } from "../components/app/nFormatter";

export interface ProfileType {
  username: string;
  name: string;
  avatar: string;
  banner: string | null;
  bio: string;
  joined: string;
  reputation: number;
  roles: Array<"Staff" | "Mod" | "Early User">;
  _count: {
    followers: number;
    following: number;
  };
}

export default function Profile() {
  const {
    profileBanner,
    shouldShowTopBar,
    user,
    dispatch,
    profileQuery,
    router,
  } = useProfilePage();

  if (profileQuery.loading) {
    return (
      <>
        <Layout title="Orsive">
          <TopBar loading />

          <div className="flex items-center justify-center h-[85vh]">
            <Spinner />
          </div>
        </Layout>
      </>
    );
  }

  if (profileQuery.data) {
    let profile: ProfileType = profileQuery.data.getUser;
    return (
      <>
        <NextSeo
          title={`${profile.name} | Orsive`}
          openGraph={{
            url: `https://orsive.com${router.asPath}`,
            title: `${profile.name} | Orsive`,
            type: "profile",
            profile: {
              username: profile.username,
            },
          }}
        />
        <TopBar
          transparent={!shouldShowTopBar}
          content={
            <div className="flex flex-col items-start pl-5">
              <span className="font-bold text-xl">{profile.name}</span>
              <span className="text-gray-400">
                {profile._count.followers} followers
              </span>
            </div>
          }
        />
        <Layout>
          <div className="w-full flex flex-col items-center">
            {profile.banner && (
              <div className="w-full bg-slate-900 bg-opacity-60 p-5 flex justify-center">
                <img
                  ref={profileBanner}
                  className="aspect-video max-h-[50vh] min-h-[20vh]"
                  src={profile.banner}
                  alt="profile_banner"
                />
              </div>
            )}

            <div
              className={`w-[90vw] md:max-w-3xl ${!profile.banner ? "mt-20" : "mt-4"}`}
            >
              <div className="flex flex-col items-center md:items-start">
                <div className="flex md:flex-col">
                  <img
                    src={profile.avatar}
                    className="flex rounded-full h-20 w-20 object-cover object-center"
                  />
                  <div className="flex flex-col justify-center ml-2">
                    <span className="font-semibold text-xl">
                      {profile.name}
                    </span>
                    <p className="font-normal text-gray-300">
                      ${profile.username}
                    </p>
                  </div>
                </div>
                {profile.roles.length !== 0 && (
                  <div className="mt-4 ml-2">
                    {profile.roles.map((role, idx) => {
                      if (role === "Early User") {
                        return (
                          <button
                            key={idx}
                            className="ripple-bg-blue-500 text-white text-sm font-medium mr-2 px-2.5 py-0.5 rounded-md"
                          >
                            Early User
                          </button>
                        );
                      }
                      if (role === "Mod") {
                        return (
                          <button
                            key={idx}
                            className="ripple-bg-purple-800 text-white text-sm font-medium mr-2 px-2.5 py-0.5 rounded-md"
                          >
                            Mod
                          </button>
                        );
                      }

                      if (role === "Staff") {
                        return (
                          <button
                            key={idx}
                            className="ripple-bg-red-500 text-white text-sm font-medium mr-2 px-2.5 py-0.5 rounded-md"
                          >
                            Staff
                          </button>
                        );
                      }

                      return null;
                    })}
                  </div>
                )}
                <div
                  {...(!profile.banner && {
                    ref: profileBanner,
                  })}
                  className="flex flex-col md:flex-row w-full items-center text-center md:text-left md:items-start"
                >
                  <div>
                    <div className="flex mt-2">
                      <div className="mr-3">
                        <span className=" font-semibold">
                          {nFormatter(profile._count.followers, 2)}
                        </span>{" "}
                        <span className="text-gray-300">followers</span>
                      </div>
                      <div className="mr-3">
                        <span className="font-semibold">
                          {nFormatter(profile._count.following, 2)}
                        </span>{" "}
                        <span className="text-gray-300">following</span>
                      </div>
                      <div>
                        <span className="font-semibold">
                          {nFormatter(profile.reputation, 2)}
                        </span>{" "}
                        <span className="text-gray-300">reputation</span>
                      </div>
                    </div>
                    <div className="text-gray-300 flex items-center justify-center md:justify-start">
                      <CalendarIcon className="w-4 h-4 mr-1" /> Joined
                      <Moment
                        className="ml-1"
                        date={profile.joined}
                        format="MMMM YYYY"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col p-2 md:ml-auto">
                    <LinkifyContent>
                      <div className="text-md text-break">{profile.bio}</div>
                    </LinkifyContent>
                    <div className="self-center mt-auto">
                      {user.username === profile.username ? (
                        <EditProfileButton
                          onClick={() => {
                            dispatch({ type: CONTENT_CASES.SHOW_EDIT_PROFILE });
                          }}
                        />
                      ) : (
                        <FollowButton username={profile.username} />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <ProfilePosts profile={profile} />
              </div>
            </div>
          </div>
          <EditProfile refreshData={refreshData} profile={profile} />
        </Layout>
      </>
    );
  }

  if (profileQuery.error) {
    return (
      <>
        <Comp404 />
      </>
    );
  }

  return null;
}
