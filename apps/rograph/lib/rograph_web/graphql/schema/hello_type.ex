defmodule RographWeb.Graphql.Schema.Types.HelloType do
  use Absinthe.Schema.Notation

  object :hello_type do
    field(:hello, :string)
  end
end
