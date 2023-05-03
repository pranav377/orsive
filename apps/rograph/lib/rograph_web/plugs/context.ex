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
    ip = conn.remote_ip
    client_ip = Enum.join(Tuple.to_list(ip), ".")

    with ["Bearer " <> token] <- get_req_header(conn, "authorization"),
         {:ok, claims} <- Auth.decode_and_verify(token, %{}, max_age: {365, :days}),
         {:ok, user} <- Auth.resource_from_claims(claims) do
      %{user: user, is_authenticated: true, client_ip: client_ip}
    else
      _ -> %{user: nil, is_authenticated: false, client_ip: client_ip}
    end
  end
end
