defmodule RographWeb.Graphql.Schema.Types.ChatType do
  use Absinthe.Schema.Notation
  import_types(Absinthe.Type.Custom)

  alias RographWeb.Graphql.Resolvers
  alias RographWeb.Graphql.Middleware

  object :chat_user do
    field(:id, non_null(:id))
    field(:username, non_null(:string))
    field(:name, non_null(:string))
    field(:avatar, non_null(:string))
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
    field(:your_id, :id)
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

  object :chat_subscriptions do
    field :get_channels, list_of(:channel_type) do
      middleware(Middleware.BlockUnauthenticatedMiddleware)
      # The topic function is used to determine what topic a given subscription
      # cares about based on its arguments. You can think of it as a way to tell the
      # difference between
      # subscription {
      #   commentAdded(repoName: "absinthe-graphql/absinthe") { content }
      # }
      #
      # and
      #
      # subscription {
      #   commentAdded(repoName: "elixir-lang/elixir") { content }
      # }
      #
      # If needed, you can also provide a list of topics:
      #   {:ok, topic: ["absinthe-graphql/absinthe", "elixir-lang/elixir"]}
      config(fn args, context ->
        {:ok, topic: "pranav"}
      end)

      # this tells Absinthe to run any subscriptions with this field every time
      # the :submit_comment mutation happens.
      # It also has a topic function used to find what subscriptions care about
      # this particular comment
      trigger(:chat_create_single_channel,
        topic: fn _ ->
          "pranav"
        end
      )

      resolve(fn _, _, _ ->
        # this function is often not actually necessary, as the default resolver
        # for subscription functions will just do what we're doing here.
        # The point is, subscription resolvers receive whatever value triggers
        # the subscription, in our case a comment.
        {:ok, []}
      end)
    end
  end
end
