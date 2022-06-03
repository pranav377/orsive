import { gql } from "@apollo/client";

const REPORT_FAVOR_MUTATION = gql`
  mutation ReportFavorMutation($postId: ID!) {
    reportFavor(post_id: $postId)
  }
`;

export default REPORT_FAVOR_MUTATION;
