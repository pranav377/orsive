defmodule RographWeb.Graphql.Resolvers.AuthResolver do
  alias Rograph.Repo
  alias Rograph.Auth.User
  alias(Rograph.Auth.OtpEmailLogin)

  def send_auth_otp(_parent, %{email: email}, _context) do
    case Repo.get_by(User, email: email) do
      # signup process
      nil ->
        IO.puts("signup")
        {:ok, %{type: "signup"}}

      # login process
      user ->
        # generate 7 digit otp
        otp = generate_otp()

        %OtpEmailLogin{}
        |> OtpEmailLogin.changeset(%{
          otp: otp,
          user: user
        })
        |> Repo.insert()

        # send otp to email

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
