defmodule Rograph.Content.Image do
  use Ecto.Schema
  alias Rograph.Content.Post
  alias Rograph.Auth.User
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
  def changeset(image, attrs) do
    image
    |> cast(attrs, [:image, :width, :height, :description])
    |> validate_required([:image, :width, :height])
    |> validate_length(:description, max: 255)
    |> cast_assoc(:post)
  end
end
