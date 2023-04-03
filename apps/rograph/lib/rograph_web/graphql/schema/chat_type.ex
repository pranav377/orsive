defmodule RographWeb.Graphql.Schema.Types.ChatType do
  use Absinthe.Schema.Notation
  import_types(Absinthe.Type.Custom)

  object :chat_message_type do
    field(:id, :id)
    field(:channel_id, :id)
    field(:user_id, :id)
    field(:message, :string)
    field(:created_at, :datetime)
    field(:updated_at, :datetime)
  end

  object :chat_send_message_type do
    field(:result, :string)
  end
end
