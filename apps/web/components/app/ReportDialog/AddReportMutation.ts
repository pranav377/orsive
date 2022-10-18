import { gql } from "@apollo/client";

const ADD_REPORT_MUTATION = gql`
  mutation AddReportMutation($postId: ID!, $reason: ReportReason!) {
    addReport(post_id: $postId, reason: $reason)
  }
`;

export default ADD_REPORT_MUTATION;
