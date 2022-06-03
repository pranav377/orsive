import { gql } from "@apollo/client";

const REPORT_AGAINST_MUTATION = gql`
  mutation ReportFavorMutation($postId: ID!) {
    reportAgainst(post_id: $postId)
  }
`;

export default REPORT_AGAINST_MUTATION;
