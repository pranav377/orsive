defmodule RographWeb.Graphql.Schema do
  use Absinthe.Schema
  alias RographWeb.Graphql.Resolvers

  import_types(RographWeb.Graphql.Schema.Types)

  query do
    @desc "🤘"
    field :hello, :hello_type do
      resolve(&Resolvers.HelloResolver.hello/3)
    end
  end

  mutation do
    import_fields(:chat_mutations)
  end

  # subscription do
  #   import_fields(:chat_subscriptions)
  # end
end
