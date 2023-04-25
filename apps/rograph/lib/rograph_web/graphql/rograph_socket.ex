defmodule RographWeb.Graphql.RographSocket do
  use Phoenix.Socket
  alias Rograph.Auth

  use Absinthe.Phoenix.Socket,
    schema: RographWeb.Graphql.Schema

  def connect(params, socket) do
    IO.inspect(params)

    with %{"token" => token} <- params, {:ok, user} <- Auth.verify_user_from_token(token) do
      socket =
        Absinthe.Phoenix.Socket.put_options(socket,
          context: %{user: user, user_id: user.id, is_authenticated: true}
        )

      {:ok, socket}
    else
      _ ->
        socket =
          Absinthe.Phoenix.Socket.put_options(socket,
            context: %{user: nil, user_id: nil, is_authenticated: false}
          )

        {:ok, socket}
    end
  end

  def id(_socket), do: nil
end
