defmodule Rograph.Content.Post do
  use Ecto.Schema
  alias Rograph.Auth.User
  alias Rograph.Content.Orsic
  alias Rograph.Content.Image
  alias Rograph.Content.Comment

  @timestamps_opts [type: :utc_datetime]

  schema "posts" do
    belongs_to(:user, User, type: :string)
    belongs_to(:orsic, Orsic)
    belongs_to(:image, Image)
    belongs_to(:comment, Comment)

    has_many(:comments, Comment)
    field(:slug, :string)

    timestamps()
  end
end
