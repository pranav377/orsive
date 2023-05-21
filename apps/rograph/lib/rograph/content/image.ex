defmodule Rograph.Content.Image do
  use Ecto.Schema
  alias Rograph.Content.Post
  alias Rograph.Content.Helper

  import Ecto.Changeset

  schema "images" do
    field(:image, :string)
    field(:width, :integer)
    field(:height, :integer)
    field(:description, :string)

    has_one(:post, Post)
  end

  @doc false
  def changeset(image, attrs, user, post_changeset \\ %Post{}) do
    image
    |> cast(attrs, [:image, :width, :height, :description])
    |> validate_required([:image, :width, :height])
    |> validate_length(:description, max: 255)
    |> put_assoc(
      :post,
      change(post_changeset, %{
        user: user,
        slug: Helper.generate_slug(Map.get(attrs, :description))
      })
    )
  end
end
