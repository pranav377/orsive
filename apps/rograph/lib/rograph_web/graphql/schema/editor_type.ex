defmodule RographWeb.Graphql.Schema.EditorType do
  use Absinthe.Schema.Notation

  alias RographWeb.Graphql.Resolvers
  alias RographWeb.Graphql.Middleware
  import_types(Absinthe.Plug.Types)

  object :editor_image_upload_type do
    field(:file, non_null(:string))
  end

  object :editor_mutations do
    field :editor_image_upload, :editor_image_upload_type do
      middleware(Middleware.BlockUnauthenticatedMiddleware)
      arg(:image, non_null(:upload))
      resolve(&Resolvers.EditorResolver.editor_image_upload/3)
    end
  end
end
