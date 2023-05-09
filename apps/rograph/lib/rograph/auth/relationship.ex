defmodule Rograph.Auth.Relationship do
  use Ecto.Schema

  @timestamps_opts [type: :utc_datetime]

  schema "relationships" do
    field(:user_id, :string)
    field(:relation_id, :string)
    timestamps()
  end

  @attrs [:user_id, :relation_id]

  def changeset(struct, params \\ %{}) do
    struct
    |> Ecto.Changeset.cast(params, @attrs)
    |> Ecto.Changeset.unique_constraint(
      [:user_id, :relation_id],
      name: :relationships_user_id_relation_id_index
    )
    |> Ecto.Changeset.unique_constraint(
      [:relation_id, :user_id],
      name: :relationships_relation_id_user_id_index
    )
  end
end
