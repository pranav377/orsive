defmodule RographWeb.AuthController do
  use RographWeb, :controller
  alias Rograph.Repo
  alias Rograph.Auth.User
  alias Rograph.Auth
  plug(Ueberauth)

  @oauth_success_redirect_url Application.get_env(:rograph, Auth)[:success_redirect_url]
  @oauth_error_redirect_url Application.get_env(:rograph, Auth)[:error_redirect_url]

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
    |> redirect(external: @oauth_error_redirect_url)
  end

  def callback(%{assigns: %{ueberauth_auth: auth}} = conn, _params) do
    %{
      uid: oauth_id,
      provider: provider,
      info: %Ueberauth.Auth.Info{
        name: name,
        nickname: nickname,
        email: email
      }
    } = auth

    already_user = Repo.get_by(User, oauth_provider_id: oauth_id)

    name = if provider == :discord, do: nickname, else: name

    case already_user do
      nil ->
        case Auth.create_user(%{
               email: email,
               username: generate_unique_username(name),
               name: name,
               auth_method: Atom.to_string(provider),
               oauth_id: oauth_id
             }) do
          {:ok, new_user} ->
            {:ok, jwt_token, _} = Auth.encode_and_sign(new_user, %{}, auth_time: true)

            conn
            |> redirect(
              external:
                "#{@oauth_success_redirect_url}?#{URI.encode_query(Map.merge(%{id: new_user.id, username: new_user.username, name: new_user.name, avatar: new_user.avatar},
                %{token: jwt_token}))}"
            )

          {:error, _} ->
            existing_user = Repo.get_by!(User, email: email)

            conn
            |> redirect(
              external:
                "#{@oauth_error_redirect_url}?error=You already have an account created with #{existing_user.auth_method}. Please use that to sign in"
            )
        end

      # just login
      _ ->
        {:ok, jwt_token, _} = Auth.encode_and_sign(already_user, %{}, auth_time: true)

        conn
        |> redirect(
          external:
            "#{@oauth_success_redirect_url}?#{URI.encode_query(Map.merge(%{id: already_user.id, username: already_user.username, name: already_user.name, avatar: already_user.avatar},
            %{token: jwt_token}))}"
        )
    end
  end
end
