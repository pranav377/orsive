defmodule RographWeb.Graphql.Schema.Types do
  use Absinthe.Schema.Notation
  alias RographWeb.Graphql.Schema.Types

  import_types(Types.HelloType)
end
