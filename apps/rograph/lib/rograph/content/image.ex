defmodule Rograph.Content.Image do
  use Ecto.Schema
  alias Rograph.Content.Post

  schema "images" do
    field(:image, :string)
    field(:width, :integer)
    field(:height, :integer)
    field(:title, :string)

    has_one(:post, Post)
  end
end
