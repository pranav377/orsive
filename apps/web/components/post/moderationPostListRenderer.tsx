import { memo } from "react";
import ModerationCommentCard from "../moderation/ModerationCommentCard";
import ModerationImagePostCard from "../moderation/ModerationImagePostCard";
import ModerationOrsicPostCard from "../moderation/ModerationOrsicPostCard";

function ModerationPostListRendererComponent(props: {
  report: any;
  objIdx: number;
  setObj: (objIdx: number) => void;
}) {
  const report = props.report;
  if (report.post.__typename === "Image") {
    return (
      <ModerationImagePostCard
        report={report}
        key={report.post.post.id}
        onClick={() => {
          props.setObj(props.objIdx);
        }}
      />
    );
  }
  if (report.post.__typename === "Orsic") {
    return (
      <ModerationOrsicPostCard
        report={report}
        key={report.post.post.id}
        onClick={() => {
          props.setObj(props.objIdx);
        }}
      />
    );
  }

  if (
    report.post.__typename === "Comment" ||
    report.post.__typename === "Reply"
  ) {
    return (
      <ModerationCommentCard
        report={report}
        key={report.post.post.id}
        onClick={() => {
          props.setObj(props.objIdx);
        }}
      />
    );
  }

  return null;
}

const ModerationPostListRenderer = memo(ModerationPostListRendererComponent);
export default ModerationPostListRenderer;
