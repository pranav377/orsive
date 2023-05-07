defmodule RographWeb.AuthController do
  use RographWeb, :controller
  alias Rograph.Repo
  alias Rograph.Auth.User
  alias Rograph.Auth
  import Ecto.Query
  plug(Ueberauth)

  defp random_string(length) do
    :crypto.strong_rand_bytes(length) |> Base.url_encode64() |> binary_part(0, length)
  end

  defp generate_unique_username(name) do
    username = String.downcase(name) |> String.replace(~r/[^a-z0-9]/, "-")
    username = String.replace(username, ~r/^-/, "")
    username = String.replace(username, ~r/-$/, "")
    username = String.replace(username, ~r/-+/, "-")

    username = String.slice(username, 0, 7)
    identifier = random_string(4)

    username = username <> "-" <> identifier

    case Repo.get_by(User, username: username) do
      nil -> username
      _ -> generate_unique_username(name)
    end
  end

  def callback(%{assigns: %{ueberauth_failure: _fails}} = conn, _params) do
    conn
    |> put_flash(:error, "Failed to authenticate.")
    |> redirect(to: "/")
  end

  def callback(%{assigns: %{ueberauth_auth: auth}} = conn, _params) do
    %{
      uid: oauth_id,
      provider: provider,
      info: %Ueberauth.Auth.Info{
        name: name,
        email: email,
        image: image
      }
    } = auth

    already_user =
      Repo.one(
        from(u in User,
          where:
            u.google_id == ^oauth_id or
              u.discord_id == ^oauth_id
        )
      )

    case already_user do
      nil ->
        case provider do
          :google ->
            {:ok, new_user} =
              Auth.create_user(%{
                email: email,
                username: generate_unique_username(name),
                name: name,
                google_id: oauth_id
              })

            {:ok, jwt_token, _} = Auth.encode_and_sign(new_user, %{}, auth_time: true)

            conn
            |> redirect(
              external:
                "http://localhost:3000/auth?#{URI.encode_query(Map.merge(%{id: new_user.id, username: new_user.username, name: new_user.name, avatar: new_user.avatar},
                %{token: jwt_token}))}"
            )

          :discord ->
            {:ok, new_user} =
              Auth.create_user(%{
                email: email,
                username: generate_unique_username(name),
                name: name,
                discord_id: oauth_id
              })

            {:ok, jwt_token, _} = Auth.encode_and_sign(new_user, %{}, auth_time: true)

            conn
            |> redirect(
              external:
                "http://localhost:3000/auth?#{URI.encode_query(Map.merge(%{id: new_user.id, username: new_user.username, name: new_user.name, avatar: new_user.avatar},
                %{token: jwt_token}))}"
            )
        end

      # just login
      _ ->
        {:ok, jwt_token, _} = Auth.encode_and_sign(already_user, %{}, auth_time: true)

        conn
        |> redirect(
          external:
            "http://localhost:3000/auth?#{URI.encode_query(Map.merge(%{id: already_user.id, username: already_user.username, name: already_user.name, avatar: already_user.avatar},
            %{token: jwt_token}))}"
        )
    end

    # case UserFromAuth.find_or_create(auth) do
    #   {:ok, user} ->
    #     conn
    #     |> put_flash(:info, "Successfully authenticated.")
    #     |> put_session(:current_user, user)
    #     |> configure_session(renew: true)
    #     |> redirect(to: "/")

    #   {:error, reason} ->
    #     conn
    #     |> put_flash(:error, reason)
    #     |> redirect(to: "/")
    # end
  end
end
