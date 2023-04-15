defmodule RographWeb.Graphql.Schema.Types.ChatType do
  use Absinthe.Schema.Notation
  import_types(Absinthe.Type.Custom)

  alias RographWeb.Graphql.Resolvers
  alias RographWeb.Graphql.Middleware

  object :chat_message_type do
    field(:id, :id)
    field(:channel_id, :id)
    field(:user_id, :id)
    field(:message, :string)
    field(:created_at, :datetime)
  end

  object :chat_type do
    field(:channel_id, :id)
    field(:name, :string)
    field(:avatar, :string)
    field(:type, :string)
    field(:last_message, :string)
    field(:last_message_time, :datetime)
    field(:who_is_typing, list_of(:string))
    field(:is_active, :boolean)
    field(:is_pinned, :boolean)
    field(:unread_count, :integer)
  end

  object :chat_send_message_type do
    field(:result, :string)
  end

  object :chat_mutations do
    @desc "Create a message channel (single)"
    field :chat_create_single_channel, :chat_type do
      middleware(Middleware.BlockUnauthenticatedMiddleware)
      arg(:user_id, non_null(:id))
      resolve(&Resolvers.ChatResolver.create_single_channel/3)
    end

    @desc "Send a message to a channel (can have single user or multiple users)"
    field :chat_send_message, :chat_send_message_type do
      middleware(Middleware.BlockUnauthenticatedMiddleware)
      arg(:channel_id, non_null(:id))
      arg(:message, non_null(:string))
      resolve(&Resolvers.ChatResolver.send_message/3)
    end
  end
end
