defmodule RographWeb.Graphql.Schema.Types.ChatType do
  use Absinthe.Schema.Notation
  import_types(Absinthe.Type.Custom)

  alias RographWeb.Graphql.Resolvers
  alias RographWeb.Graphql.Middleware

  object :chat_user do
    field(:id, :id)
    field(:username, :string)
    field(:name, :string)
    field(:avatar, :string)
  end

  object :chat_message do
    field(:id, :id)
    field(:content, :string)
    field(:created_at, :datetime)
    field(:user, :chat_user)
  end

  object :channel_metadata do
    field(:name, :string)
    field(:avatar, :string)
    # only for single channel
    field(:is_active, :boolean)
    field(:is_pinned, :boolean)

    field(:who_is_typing, list_of(:string))
    field(:unread_count, :integer)
  end

  object :channel_type do
    field(:id, :id)
    field(:type, :string)
    field(:metadata, :channel_metadata)
    field(:last_message, :chat_message)
  end

  object :chat_mutations do
    @desc "Create a message channel (single)"
    field :chat_create_single_channel, :channel_type do
      middleware(Middleware.BlockUnauthenticatedMiddleware)
      arg(:user_id, non_null(:id))
      resolve(&Resolvers.ChatResolver.create_single_channel/3)
    end

    # @desc "Send a message to a channel (can have single user or multiple users)"
    # field :chat_send_message, :chat_send_message_type do
    #   middleware(Middleware.BlockUnauthenticatedMiddleware)
    #   arg(:channel_id, non_null(:id))
    #   arg(:message, non_null(:string))
    #   resolve(&Resolvers.ChatResolver.send_message/3)
    # end
  end
end
