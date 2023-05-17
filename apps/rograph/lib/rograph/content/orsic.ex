defmodule Rograph.Content.Orsic do
  use Ecto.Schema
  alias Rograph.Content.Post
  alias Rograph.Content.Helper
  import Ecto.Changeset

  schema "orsics" do
    field(:title, :string)
    field(:content, :string)

    has_one(:post, Post)
  end

  def changeset(orsic, attrs, user, post_changeset \\ %Post{}) do
    orsic
    |> cast(attrs, [:content, :title])
    |> validate_required([:content])
    |> validate_html()
    |> get_title(user)
    |> set_image_dimensions()
    |> put_assoc(
      :post,
      change(post_changeset, %{
        user: user,
        slug: Helper.generate_slug(Map.get(attrs, :description))
      })
    )
  end

  defp validate_html(changeset) do
    content = get_change(changeset, :content)
    content = HtmlSanitizeEx.basic_html(content)

    put_change(changeset, :content, content)
  end

  defp get_title(changeset, user) do
    content = get_change(changeset, :content)
    {:ok, document} = Floki.parse_document(content)

    all_titles = Floki.find(document, "h1")

    curr_datetime = DateTime.utc_now()
    formatted_datetime = Datex.Date.format_date(curr_datetime, "MONTH_NAME_SHORT DATE YYYY")

    title =
      case Enum.at(all_titles, 0) do
        nil -> "#{formatted_datetime} - #{user.name} Posted An Orsic"
        title -> Floki.text(title)
      end

    put_change(changeset, :title, title)
  end

  defp set_image_dimensions(changeset) do
    # will set this up if needed
    changeset
  end
end
