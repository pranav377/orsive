import { gql, useMutation } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showLoginDialog } from "../../../app/auth/showLoginDialog";
import LIKE_CASES from "../../../app/store/reducers/like/cases";
import { initialState } from "../../../app/store/store";
import { client } from "../../../pages/_app";
import { useUser } from "../../auth/useUser";
import ADD_LIKE_MUTATION from "./addLikeMutation";
import LIKE_STATUS_QUERY from "./likeStatusQuery";

export const useLike = (post: any, client_side_fetch?: boolean) => {
  const likeStore = useSelector((state: typeof initialState) => state.like);
  const dispatch = useDispatch();
  let initialLikeCount = client_side_fetch ? 0 : post?.post?._count?.likes || 0;
  const [likes, setLikes] = useState<number>(initialLikeCount);

  useEffect(() => {
    if (post?.post?._count?.likes && !client_side_fetch) {
      setLikes(post.post._count.likes);
    }

    if (post && client_side_fetch) {
      client
        .query({
          query: gql`
            query GetLikes($postId: ID!) {
              getLikes(post_id: $postId)
            }
          `,
          variables: {
            postId: post?.post?.id,
          },
        })
        .then((response) => {
          let numOfLikes = response.data.getLikes;

          setLikes(numOfLikes);
        });
    }
  }, [post]);

  const likeStatus = useMemo(() => {
    return likeStore.filter((likeObj) => likeObj.postId === post?.post?.id)[0]
      ?.type;
  }, [likeStore]);

  const setLikeStatus = (type: "like" | "dislike" | "nope") => {
    dispatch({
      type: LIKE_CASES.SET_LIKE,
      payload: {
        postId: post?.post?.id,
        type,
      },
    });
  };

  const [addLikeMutation] = useMutation(ADD_LIKE_MUTATION);

  const user = useUser();

  useMemo(async () => {
    if (user.is && post && !likeStatus) {
      let response = await client.query({
        query: LIKE_STATUS_QUERY,
        variables: {
          postId: post?.post?.id,
        },
      });

      let likeType = response.data.likeStatus;

      setLikeStatus(likeType);
    }
  }, [post, user]);

  const like = async () => {
    if (user.is) {
      if (likeStatus === "nope" || likeStatus === "dislike") {
        setLikes((prevLikes) => prevLikes + 1);
        setLikeStatus("like");
      } else {
        setLikeStatus("nope");
        setLikes((prevLikes) => prevLikes - 1);
      }

      await addLikeMutation({
        variables: {
          postId: post?.post?.id,
          likeType: "like",
        },
      });
    } else {
      showLoginDialog();
    }
  };

  const dislike = async () => {
    if (user.is) {
      if (likeStatus === "nope" || likeStatus === "like") {
        if (likeStatus === "like") {
          setLikes((prevLikes) => prevLikes - 1);
        }
        setLikeStatus("dislike");
      } else {
        setLikeStatus("nope");
      }

      await addLikeMutation({
        variables: {
          postId: post?.post?.id,
          likeType: "dislike",
        },
      });
    } else {
      showLoginDialog();
    }
  };

  return { likeStatus, like, dislike, likes };
};
