defmodule RographWeb.Graphql.Resolvers.AuthResolver do
  alias Rograph.Repo
  alias Rograph.Auth
  alias Rograph.Auth.User
  alias Rograph.Auth.OtpEmailLogin
  alias Rograph.Mailer
  alias Swoosh.Email
  alias Rograph.Uploaders.UserAvatar
  alias Rograph.HashColorAvatar
  alias RographWeb.Graphql.HandleChangesetError

  import Ecto.Query

  def send_auth_otp(_parent, %{email: email}, _context) do
    otp = generate_otp()

    case Repo.get_by(User, email: email) do
      # signup process
      nil ->
        {:ok, _} =
          %OtpEmailLogin{}
          |> OtpEmailLogin.changeset(%{
            otp: otp,
            email: email,
            type: "signup"
          })
          |> Repo.insert()

        # send otp to email
        email =
          Email.new()
          |> Email.from({"Orsive", "no-reply@orsive.com"})
          |> Email.to(email)
          |> Email.put_provider_option(
            :template_id,
            Application.get_env(:rograph, Rograph.Mailer)[:email_signup_template_id]
          )
          |> Email.put_provider_option(:params, %{otp: otp})

        {:ok, _} = Mailer.deliver(email)

        {:ok, %{type: "signup"}}

      # login process
      user ->
        {:ok, _} =
          %OtpEmailLogin{}
          |> OtpEmailLogin.changeset(%{
            otp: otp,
            email: user.email,
            type: "login"
          })
          |> Repo.insert()

        # send otp to email
        email =
          Email.new()
          |> Email.from({"Orsive", "no-reply@orsive.com"})
          |> Email.to(user.email)
          |> Email.put_provider_option(
            :template_id,
            Application.get_env(:rograph, Rograph.Mailer)[:email_login_template_id]
          )
          |> Email.put_provider_option(:params, %{otp: otp, fullname: user.name})

        {:ok, _} = Mailer.deliver(email)

        {:ok, %{type: "login"}}
    end
  end

  defp generate_otp() do
    # Generate a random 7-digit number
    otp = Enum.random(1_000_000..9_999_999)

    # Convert the number to a string and return it
    Integer.to_string(otp)
  end

  def login_auth_email(_parent, %{email: email, otp: otp}, _context) do
    generated_otp =
      Repo.one(
        from(o in OtpEmailLogin,
          where: o.email == ^email and o.type == "login",
          order_by: [desc: o.inserted_at],
          limit: 1
        )
      )

    if generated_otp != nil do
      with true <- OtpEmailLogin.is_valid?(generated_otp, otp) do
        user = Repo.get_by!(User, email: email)

        {:ok, jwt_token, _} = Auth.encode_and_sign(user, %{}, auth_time: true)

        {:ok,
         %{
           user: user,
           token: jwt_token
         }}
      else
        _ -> {:error, "OTP doesn't match"}
      end
    else
      {:error, "OTP not generated for user"}
    end
  end

  def signup_auth_email(
        _parent,
        %{email: email, username: username, name: name, otp: otp},
        _context
      ) do
    generated_otp =
      Repo.one(
        from(o in OtpEmailLogin,
          where: o.email == ^email and o.type == "signup",
          order_by: [desc: o.inserted_at],
          limit: 1
        )
      )

    if generated_otp != nil do
      with true <- OtpEmailLogin.is_valid?(generated_otp, otp) do
        user_id = UUID.uuid1()
        avatar = HashColorAvatar.gen_avatar(name, shape: "rect", size: 180)

        avatar_url =
          UserAvatar.save_file!(%{
            name: "avatar.svg",
            binary: avatar
          })

        case %User{}
             |> User.changeset(%{
               id: user_id,
               email: email,
               username: username,
               name: name,
               avatar: avatar_url,
               auth_method: "email"
             })
             |> Repo.insert() do
          {:ok, user} ->
            {:ok, jwt_token, _} = Auth.encode_and_sign(user, %{}, auth_time: true)

            {:ok,
             %{
               user: user,
               token: jwt_token
             }}

          {:error, changeset} ->
            HandleChangesetError.handle(changeset)
        end
      else
        _ ->
          {:error,
           %{
             field: "otp",
             message: "OTP doesn't match"
           }}
      end
    else
      {:error, "OTP not generated for user"}
    end
  end

  def check_username(_parent, %{username: username}, _context) do
    regex_check = ~r/[^a-zA-Z0-9-_~]/

    if !String.match?(username, regex_check) and username !== "" do
      user = Repo.get_by(User, username: username)

      case user do
        nil -> {:ok, %{available: true}}
        _ -> {:ok, %{available: false}}
      end
    else
      {:ok,
       %{
         available: false
       }}
    end
  end
end
