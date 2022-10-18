import { gql } from "@apollo/client";

const EDIT_PROFILE_MUTATION = gql`
  mutation EditProfileMutation(
    $username: String
    $name: String!
    $avatar: Upload
    $banner: Upload
    $bio: String
  ) {
    editProfile(
      input: {
        username: $username
        name: $name
        avatar: $avatar
        banner: $banner
        bio: $bio
      }
    ) {
      username
      name
      avatar
      banner
      bio
      joined
      _count {
        followers
        following
      }
    }
  }
`;

export default EDIT_PROFILE_MUTATION;
