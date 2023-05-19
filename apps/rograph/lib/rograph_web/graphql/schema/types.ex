defmodule RographWeb.Graphql.Schema.Types do
  use Absinthe.Schema.Notation
  alias RographWeb.Graphql.Schema.Types

  import_types(Types.HelloType)
  import_types(Types.ChatType)
  import_types(Types.AuthType)
  import_types(Types.ContentType)
  import_types(Types.EditorType)
end
