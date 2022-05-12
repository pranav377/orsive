import { SearchIcon } from "@heroicons/react/solid";
import Empty from "../components/app/Empty";
import { Layout } from "../components/app/Layout";
import UserCard from "../components/app/UserCard";
import ImagePostCard from "../components/post/cards/ImagePostCard";
import OrsicPostCard from "../components/post/cards/OrsicPostCard";
import { useSearch } from "../hooks/app/search/useSearch";

export default function Search() {
  const { router, results } = useSearch();

  return (
    <>
      <Layout title={"Search | Orsive"}>
        <div className="mt-5">
          <div className="flex justify-center">
            <div className="mb-3 p-5 w-full md:w-2/3 xl:w-2/3">
              <div className="flex w-full mb-4 rounded">
                <input
                  onChange={(e) => {
                    e.preventDefault();

                    router.push(`/search?q=${e.target.value}`, undefined, {
                      shallow: true,
                    });
                  }}
                  type="search"
                  className="form-control flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal bg-slate-800 placeholder-gray-400 border focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-clip-padding rounded transition ease-in-out m-0"
                  placeholder="Search"
                  aria-label="Search"
                />
                <span className=" flex items-center px-3 py-1.5 text-base font-normal text-gray-700 text-center whitespace-nowrap rounded">
                  <SearchIcon className="w-7" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Layout>

      <div className="flex items-center mb-24 flex-col">
        {results.map((result: any) => {
          if (result.type === "Post") {
            if (result.post.postType === "image") {
              return <ImagePostCard post={result} key={result.post.id} />;
            }
            if (result.post.postType === "orsic") {
              return <OrsicPostCard post={result} key={result.post.id} />;
            }
          }

          if (result.type === "Profile") {
            return <UserCard user={result} key={result.id} />;
          }
        })}
        {results.length === 0 && <Empty message="No results found" />}
      </div>
    </>
  );
}
