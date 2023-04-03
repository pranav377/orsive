defmodule RographWeb.Graphql.Schema do
  use Absinthe.Schema
  alias RographWeb.Graphql.Resolvers
  alias RographWeb.Graphql.Middleware

  import_types(RographWeb.Graphql.Schema.Types)

  query do
    @desc "🤘"
    field :hello, :hello_type do
      resolve(&Resolvers.HelloResolver.hello/3)
    end
  end

  mutation do
    @desc "Send a message to a channel (can have single user or multiple users)"
    field :chat_send_message, :chat_send_message_type do
      middleware(Middleware.BlockUnauthenticatedMiddleware)
      arg(:channel_id, non_null(:id))
      arg(:message, non_null(:string))
      resolve(&Resolvers.ChatResolver.send_message/3)
    end
  end
end
