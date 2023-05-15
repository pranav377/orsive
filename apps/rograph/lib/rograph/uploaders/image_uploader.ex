defmodule Rograph.Uploaders.ImageUploader do
  use Arc.Definition
  alias Rograph.Uploaders.ImageUploader
  alias Rograph.Uploaders.Methods

  @acl :public_read

  # Include ecto support (requires package arc_ecto installed):
  # use Arc.Ecto.Definition

  @versions [:original]

  # To add a thumbnail version:
  # @versions [:original, :thumb]

  # Override the bucket on a per definition basis:
  # def bucket do
  #   :custom_bucket_name
  # end

  # Whitelist file extensions:
  def validate({file, _}) do
    ~w(.bmp .gif .ico .jpeg .jpg .jp2 .png .pnm .psd .tiff .webp)
    |> Enum.member?(Path.extname(file.file_name))
  end

  # Define a thumbnail transformation:
  # def transform(:thumb, _) do
  #   {:convert, "-strip -thumbnail 250x250^ -gravity center -extent 250x250 -format png", :png}
  # end

  # Override the persisted filenames:
  # def filename(version, _) do
  #   version
  # end

  # Override the storage directory:
  def storage_dir(version, {file, scope}) do
    "uploads/images/#{scope.id}"
  end

  # Provide a default URL if there hasn't been a file uploaded
  # def default_url(version, scope) do
  #   "/images/avatars/default_#{version}.png"
  # end

  # Specify custom headers for s3 objects
  # Available options are [:cache_control, :content_disposition,
  #    :content_encoding, :content_length, :content_type,
  #    :expect, :expires, :storage_class, :website_redirect_location]
  #
  def s3_object_headers(version, {file, _scope}) do
    [content_type: MIME.from_path(file.file_name)]
  end

  # returns relative file url in the end

  def save_file!(%Plug.Upload{filename: upload_filename, path: _path} = upload) do
    identifier = Methods.generate_identifier(upload_filename, 12)

    {:ok, filename} = ImageUploader.store({upload, %{id: identifier}})

    Methods.generate_url(%{
      filename: filename,
      identifier: identifier,
      container: "images"
    })
  end
end
