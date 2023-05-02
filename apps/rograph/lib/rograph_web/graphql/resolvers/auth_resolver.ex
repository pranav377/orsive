defmodule RographWeb.Graphql.Resolvers.AuthResolver do
  alias Rograph.Repo
  alias Rograph.Auth.User
  alias Rograph.Auth.OtpEmailLogin
  alias Rograph.Mailer

  import Swoosh.Email

  def send_auth_otp(_parent, %{email: email}, _context) do
    otp = generate_otp()

    case Repo.get_by(User, email: email) do
      # signup process
      nil ->
        {:ok, _} =
          %OtpEmailLogin{}
          |> OtpEmailLogin.changeset(%{
            otp: otp,
            email: email
          })
          |> Repo.insert()

        # send otp to email
        email =
          new()
          |> from({"Orsive", "no-reply@orsive.com"})
          |> to(email)
          |> put_provider_option(
            :template_id,
            Application.get_env(:rograph, Rograph.Mailer)[:email_signup_template_id]
          )
          |> put_provider_option(:params, %{otp: otp})

        {:ok, _} = Mailer.deliver(email)

        {:ok, %{type: "signup"}}

      # login process
      user ->
        {:ok, _} =
          %OtpEmailLogin{}
          |> OtpEmailLogin.changeset(%{
            otp: otp,
            email: user.email
          })
          |> Repo.insert()

        # send otp to email
        email =
          new()
          |> from({"Orsive", "no-reply@orsive.com"})
          |> to(user.email)
          |> put_provider_option(
            :template_id,
            Application.get_env(:rograph, Rograph.Mailer)[:email_login_template_id]
          )
          |> put_provider_option(:params, %{otp: otp, fullname: user.name})

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
end
