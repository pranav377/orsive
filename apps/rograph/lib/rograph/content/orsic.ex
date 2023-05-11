defmodule Rograph.Content.Orsic do
  use Ecto.Schema
  alias Rograph.Content.Post

  schema "orsics" do
    field(:title, :string)
    field(:content, :string)

    has_one(:post, Post)
  end
end
