defmodule RographWeb.Graphql.Schema.Types.ContentType do
  use Absinthe.Schema.Notation

  alias RographWeb.Graphql.Middleware
  alias RographWeb.Graphql.Resolvers
  import_types(Absinthe.Plug.Types)

  object :post_type do
    field(:id, non_null(:id))
    field(:user, non_null(:user))
    field(:inserted_at, non_null(:datetime))
    field(:updated_at, non_null(:datetime))
    field(:slug, non_null(:string))
  end

  object :image_type do
    field(:image, non_null(:string))
    field(:width, non_null(:integer))
    field(:height, non_null(:integer))
    field(:title, :string)
    field(:post, non_null(:post_type))
  end

  object :orsic_type do
    field(:title, :string)
    field(:content, non_null(:string))
    field(:post, non_null(:post_type))
  end

  object :comment_type do
    field(:post, non_null(:post_type))
    field(:content, non_null(:string))
  end

  object :content_mutations do
    field :create_image, :image_type do
      middleware(Middleware.BlockUnauthenticatedMiddleware)
      arg(:title, :string)
      arg(:image, non_null(:upload))
      resolve(&Resolvers.ContentMutations.create_image/3)
    end
  end
end
