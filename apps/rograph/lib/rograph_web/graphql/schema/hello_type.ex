defmodule RographWeb.Graphql.Schema.Types.HelloType do
  use Absinthe.Schema.Notation

  import_types(Absinthe.Plug.Types)

  object :hello_type do
    field(:hello, :string)
  end
end
