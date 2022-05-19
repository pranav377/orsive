import { gql } from "apollo-server-express";

const POST_SCHEMA = gql`
  union PostUnion = Image | Orsic

  type Post {
    id: ID
    uploadedBy: User
    createdAt: Date
    updatedAt: Date
    _count: PostLikeObjCount
  }

  type PostLikeObjCount {
    likes: Int
    dislikes: Int
  }

  type GetPostsResponse {
    data: [PostUnion!]
    hasNextPage: Boolean
    nextPage: Int
  }

  type CUDResponse {
    post: Post
    slug: String
  }

  type Query {
    getPosts(page: Int): GetPostsResponse
  }
`;

export default POST_SCHEMA;
