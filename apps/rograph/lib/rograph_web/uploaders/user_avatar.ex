defmodule Rograph.Uploaders.UserAvatar do
  use Arc.Definition
  alias Rograph.Uploaders.UserAvatar
  alias RographWeb.Uploaders.Methods

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
    ~w(.jpeg .jpg .png .gif .tiff .bmp .raw .psd .eps .ai .svg .pdf .webp .heif .ico .tga .pbm .pgm .ppm .jif .jfif .jp2 .jps .jxr .miff .mng .otb .pam .pcd .pcx .pfm .pict .pvr .ras .sgi .wbmp .xbm .xcf .xpm .yuv)
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
    "uploads/avatars/#{scope.id}"
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
  def save_file!(%{name: name, binary: binary}) do
    identifier = Methods.generate_identifier(name, 12)

    {:ok, filename} =
      UserAvatar.store(
        {%{
           filename: name,
           binary: binary
         }, %{id: identifier}}
      )

    Methods.generate_url(%{
      filename: name,
      identifier: identifier,
      container: "avatars"
    })
  end
end
