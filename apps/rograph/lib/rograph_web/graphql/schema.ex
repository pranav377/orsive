defmodule RographWeb.Graphql.Schema do
  use Absinthe.Schema
  alias RographWeb.Graphql.Resolvers

  import_types(RographWeb.Graphql.Schema.Types)

  query do
    @desc "🤘"
    field :hello, :hello_type do
      resolve(&Resolvers.HelloResolver.hello/3)
    end

    import_fields(:auth_queries)
    import_fields(:content_queries)
  end

  mutation do
    import_fields(:chat_mutations)
    import_fields(:auth_mutations)
    import_fields(:content_mutations)
  end

  subscription do
    import_fields(:chat_subscriptions)
  end
end
