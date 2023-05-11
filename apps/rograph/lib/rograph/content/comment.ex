defmodule Rograph.Content.Comment do
  use Ecto.Schema
  alias Rograph.Content.Post

  schema "comments" do
    field(:content, :string)
    belongs_to(:parent_comment, Comment, foreign_key: :parent_comment_id)
    belongs_to(:parent_post, Post, foreign_key: :parent_post_id)

    has_one(:post, Post)
  end
end
