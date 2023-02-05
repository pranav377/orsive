import LinkifyContent from '../../app/LinkifyContent';
import Link from 'next/link';
import Ripples from '../../app/Ripple';
import { useLike } from '../../../hooks/app/like/useLike';
import ExtraButtons from '../extra/ExtraButtons';
import DELETE_ORSIC_POST_MUTATION from '../../../logic/post/orsic/mutations/deleteOrsicPostMutation';
import { useMutation } from '@apollo/client';
import GET_POSTS_QUERY from '../../../../../packages/common/queries/post/getPostsQuery';
import GET_PROFILE_POSTS from '../../../logic/profile/queries/getProfilePostsQuery';
import AvatarArea from '../extra/AvatarArea';
import ContentParser from '../../app/ContentParser';
import TextContent from '../../app/TextContent';
import { memo } from 'react';

function OrsicPostCardComponent(props: { post: any; onClick?: () => void }) {
    let post = props.post;
    const likeFeatures = useLike(post);

    const [deleteOrsicPost] = useMutation(DELETE_ORSIC_POST_MUTATION, {
        variables: {
            slug: post.slug,
        },
        refetchQueries: [GET_POSTS_QUERY, GET_PROFILE_POSTS],
    });

    let postUrl = `/orsic/${post.slug}`;

    return (
        <Ripples>
            <div className="my-2 flex w-[90vw] flex-col rounded-md bg-slate-900 p-2 md:max-w-3xl">
                <AvatarArea
                    postId={post.post.id}
                    canEdit
                    url={postUrl}
                    uploadedBy={post.post.uploadedBy}
                    delete={deleteOrsicPost}
                />
                <div className="w-full">
                    <Link
                        href={postUrl}
                        passHref
                        scroll={false}
                        onClick={props.onClick}
                    >
                        <div>
                            {post.title && (
                                <span className="text-break text-2xl font-semibold text-gray-100">
                                    {post.title}
                                </span>
                            )}
                            <LinkifyContent>
                                <TextContent>
                                    {ContentParser(post.content)}
                                </TextContent>
                            </LinkifyContent>
                            {post.truncated && (
                                <div className="w-full rounded-b-xl bg-slate-700 p-1 text-center font-semibold transition-all duration-300 hover:bg-slate-800">
                                    Read More
                                </div>
                            )}
                        </div>
                    </Link>
                    <ExtraButtons
                        url={postUrl}
                        postUrl={postUrl}
                        {...likeFeatures}
                    />
                </div>
            </div>
        </Ripples>
    );
}

const OrsicPostCard = memo(OrsicPostCardComponent);
export default OrsicPostCard;
