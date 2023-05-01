defmodule RographWeb.Graphql.Resolvers.AuthResolver do
  alias Rograph.Repo
  alias Rograph.Auth.User

  def send_auth_otp(_parent, %{email: email}, _context) do
    case Repo.get_by(User, email: email) do
      # signup process
      nil ->
        IO.puts("signup")
        {:ok, %{}}

      # login process
      user ->
        # generate 7 digit otp
        otp = generate_otp()

        {:ok, %{}}
    end
  end

  def generate_otp() do
    # Generate a random 7-digit number
    otp = Enum.random(1_000_000..9_999_999)

    # Convert the number to a string and return it
    Integer.to_string(otp)
  end
end
