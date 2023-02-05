import { SearchIcon } from '@heroicons/react/solid';
import Empty from '../components/app/Empty';
import { Layout } from '../components/app/Layout';
import UserCard from '../components/app/UserCard';
import ImagePostCard from '../components/post/cards/ImagePostCard';
import OrsicPostCard from '../components/post/cards/OrsicPostCard';
import { useSearch } from '../hooks/app/search/useSearch';

export default function Search() {
    const { searchQuery, setSearchQuery, results } = useSearch();
    return (
        <>
            <Layout title={'Search | Orsive'}>
                <div className="mt-5">
                    <div className="flex justify-center">
                        <div className="mb-3 w-full p-5 md:w-2/3 xl:w-2/3">
                            <div className="mb-4 flex w-full rounded">
                                <input
                                    value={searchQuery || ''}
                                    onChange={(e) => {
                                        e.preventDefault();
                                        setSearchQuery(e.target.value, {
                                            scroll: false,
                                            shallow: true,
                                        });
                                    }}
                                    type="search"
                                    className="form-control m-0 block w-full min-w-0 flex-auto rounded border bg-slate-800 bg-clip-padding px-3 py-1.5 text-base font-normal placeholder-gray-400 transition ease-in-out focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                    placeholder="Search"
                                    aria-label="Search"
                                />
                                <span className=" flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-gray-700">
                                    <SearchIcon className="w-7" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-24 flex flex-col items-center">
                    {results.map((result: any) => {
                        if (result.type === 'Post') {
                            if (result.post.postType === 'image') {
                                return (
                                    <ImagePostCard
                                        post={result}
                                        key={result.post.id}
                                    />
                                );
                            }
                            if (result.post.postType === 'orsic') {
                                return (
                                    <OrsicPostCard
                                        post={result}
                                        key={result.post.id}
                                    />
                                );
                            }
                        }

                        if (result.type === 'Profile') {
                            return <UserCard user={result} key={result.id} />;
                        }
                    })}
                    {results.length === 0 && (
                        <Empty message="No results found" />
                    )}
                </div>
            </Layout>
        </>
    );
}
