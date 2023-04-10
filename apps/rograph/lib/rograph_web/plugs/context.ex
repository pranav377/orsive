defmodule RographWeb.Plugs.Context do
  @behaviour Plug

  import Plug.Conn
  alias Rograph.Auth

  def init(opts), do: opts

  def call(conn, _opts) do
    context = build_context(conn)
    Absinthe.Plug.put_options(conn, context: context)
  end

  defp build_context(conn) do
    with ["Bearer " <> token] <- get_req_header(conn, "authorization"),
         {:ok, user} <- Auth.verify_user_from_token(token),
         {:ok, user_id} <- BSON.ObjectId.encode(user._id) do
      %{user: user, user_id: user_id, is_authenticated: true}
    else
      _ -> %{user: nil, user_id: nil, is_authenticated: false}
    end
  end
end
