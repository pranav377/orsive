defmodule RographWeb.Graphql.Resolvers.EditorResolver do
  alias Rograph.Uploaders.ImageUploader

  def editor_image_upload(
        _parent,
        %{
          image: image
        },
        _info
      ) do
    image_url = ImageUploader.save_file!(image)

    {:ok,
     %{
       file: image_url
     }}
  end
end
