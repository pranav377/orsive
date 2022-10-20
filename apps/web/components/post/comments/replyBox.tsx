import { useEffect, useState } from "react";
import Spinner from "../../app/Spinner";
import { useMutation } from "@apollo/client";
import CREATE_COMMENT_MUTATION from "./mutation/createCommentMutation";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import Button from "../../base/button";
import CREATE_REPLY_MUTATION from "./mutation/createReplyMutation";
import GET_REPLIES_QUERY from "./queries/getRepliesQuery";
import Modal from "../../app/Modal";
import dynamic from "next/dynamic";
import { useUser } from "../../../hooks/auth/useUser";
import AccessDenied from "../../forms/content/accessDenied";
import { useAppState } from "../../../hooks/app/useAppState";
import { useDispatch } from "react-redux";
import APP_CASES from "../../../app/store/reducers/app/cases";
import { RichEditorSkeleton } from "../../app/RichEditor";
import GET_MY_COMMENTS_QUERY from "./queries/getMyCommentsQuery";

const RichEditor = dynamic(() => import("../../app/RichEditor"), {
  ssr: false,
});

interface ReplyBoxProps {
  loading?: boolean;
  pId?: string; // parentId or postId
  postUrl?: string;
  type: "comment" | "reply";
}

interface ReplyBoxFormProps extends ReplyBoxProps {
  closeReplyModal: any;
}

export default function ReplyBox(props: ReplyBoxProps) {
  const dispatch = useDispatch();

  const appState = useAppState();

  const [showReply, setShowReply] = useState(false);

  useEffect(() => {
    if (appState.showReply && !props.loading) {
      setShowReply(true);
    } else {
      setShowReply(false);
    }
  }, [appState.showReply, props.loading]);

  function closeReplyModal() {
    dispatch({ type: APP_CASES.HIDE_REPLY });
  }

  function showReplyModal() {
    dispatch({ type: APP_CASES.SHOW_REPLY });
  }
  const user = useUser();

  return (
    <>
      <Modal
        closeModal={closeReplyModal}
        show={showReply}
        content={
          <>
            <div className="w-full flex justify-center">
              {user.is ? (
                <ReplyBoxForm
                  loading={props.loading}
                  pId={props.pId}
                  postUrl={props.postUrl}
                  type={props.type}
                  closeReplyModal={closeReplyModal}
                />
              ) : (
                <div className="h-[70vh]">
                  <AccessDenied />
                </div>
              )}
            </div>
          </>
        }
      />

      <div className="w-full bg-slate-900 fixed bottom-0 flex items-center p-4 md:p-5 h-20">
        {props.loading ? (
          <div className="flex items-center justify-center w-full">
            <Spinner />
          </div>
        ) : (
          <div className="w-full mt-2 flex justify-center">
            <Button
              onClick={(event) => {
                event.preventDefault();
                showReplyModal();
              }}
              type="submit"
              className="w-full max-w-lg bg-blue-600 hover:bg-blue-700 ripple-bg-blue-600 p-2 rounded-md m-2"
            >
              Reply
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

function ReplyBoxForm(props: ReplyBoxFormProps) {
  const [createCommentMutation] = useMutation(CREATE_COMMENT_MUTATION, {
    refetchQueries: [GET_MY_COMMENTS_QUERY],
  });
  const [createReplyMutation] = useMutation(CREATE_REPLY_MUTATION, {
    refetchQueries: [GET_REPLIES_QUERY],
  });

  const [content, setContent] = useState("");

  const router = useRouter();

  return (
    <Formik
      initialValues={{}}
      onSubmit={(_values, { setSubmitting }) => {
        toast
          .promise(
            (async () => {
              if (props.type === "comment") {
                return createCommentMutation({
                  variables: {
                    content: content,
                    postId: props.pId,
                  },
                });
              } else {
                return createReplyMutation({
                  variables: {
                    content: content,
                    parentId: props.pId,
                  },
                });
              }
            })(),
            {
              loading: "Posting...",
              error: "Something went wrong. Please try again.",
              success: "Posted Successfully!🚀🚀",
            }
          )
          .then((response) => {
            if (props.type === "comment") {
              let slug = response.data.createComment.post.id;

              router.push(`${props.postUrl}/comments/${slug}`);
            }
            props.closeReplyModal();
            setContent("");
          })
          .catch((err) => console.error(err))
          .finally(() => setSubmitting(false));
      }}
    >
      {({ isSubmitting, handleSubmit }: any) => (
        <Form
          onSubmit={handleSubmit}
          className="w-full lg:w-3/4 mt-2 flex flex-col"
        >
          <p className="mb-1 font-semibold text-lg text-center md:text-left">
            What do you think?
          </p>
          {RichEditor ? (
            <RichEditor onChange={(data) => setContent(data)} value={content} />
          ) : (
            <RichEditorSkeleton />
          )}
          <div className="flex w-full justify-center">
            <Button
              disabled={isSubmitting}
              type="submit"
              className="w-full max-w-lg bg-blue-600 hover:bg-blue-700 ripple-bg-blue-600 p-2 rounded-md m-2"
            >
              Reply
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
