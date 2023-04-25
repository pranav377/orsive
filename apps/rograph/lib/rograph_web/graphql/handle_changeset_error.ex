defmodule RographWeb.Graphql.HandleChangesetError do
  def handle(changeset) do
    errors =
      Enum.map(changeset.errors, fn {field, {message, _}} ->
        %{field: field, message: message}
      end)

    {:error,
     %{
       message: "Invalid input",
       errors: errors
     }}
  end
end
