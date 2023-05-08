defmodule Rograph.Auth do
  use Guardian, otp_app: :rograph
  alias Rograph.Auth.User
  alias Rograph.Uploaders.UserAvatar
  alias Rograph.HashColorAvatar
  alias Rograph.Repo

  def subject_for_token(%{id: id}, _claims) do
    # You can use any value for the subject of your token but
    # it should be useful in retrieving the resource later, see
    # how it being used on `resource_from_claims/1` function.
    # A unique `id` is a good subject, a non-unique email address
    # is a poor subject.
    sub = to_string(id)
    {:ok, sub}
  end

  def subject_for_token(_, _) do
    {:error, :reason_for_error}
  end

  def resource_from_claims(%{"sub" => id}) do
    case Repo.get(User, id) do
      nil -> {:error, :resource_not_found}
      user -> {:ok, user}
    end
  end

  def resource_from_claims(_claims) do
    {:error, :reason_for_error}
  end

  defp generate_id_and_avatar(name) when is_bitstring(name) do
    user_id = UUID.uuid1()
    avatar = HashColorAvatar.gen_avatar(name, shape: "rect", size: 180)

    avatar_url =
      UserAvatar.save_file!(%{
        name: "avatar.svg",
        binary: avatar
      })

    %{
      user_id: user_id,
      avatar_url: avatar_url
    }
  end

  def create_user(%{
        email: email,
        username: username,
        name: name,
        auth_method: "email"
      }) do
    %{
      user_id: user_id,
      avatar_url: avatar_url
    } = generate_id_and_avatar(name)

    %User{}
    |> User.changeset(%{
      id: user_id,
      email: email,
      username: username,
      name: name,
      avatar: avatar_url,
      auth_method: "email"
    })
    |> Repo.insert()
  end

  def create_user(%{
        email: email,
        username: username,
        name: name,
        auth_method: auth_method,
        oauth_id: oauth_id
      }) do
    %{
      user_id: user_id,
      avatar_url: avatar_url
    } = generate_id_and_avatar(name)

    %User{}
    |> User.changeset(%{
      id: user_id,
      email: email,
      username: username,
      name: name,
      avatar: avatar_url,
      auth_method: auth_method,
      oauth_provider_id: oauth_id
    })
    |> Repo.insert()
  end
end
