defmodule Rograph.Auth do
  use Joken.Config
  alias Rograph.DataStore.Mongodb.Collections.Profile

  def token_config do
    %{}
    |> add_claim("iss", fn -> "Orsive" end, &(&1 == "Orsive"))
    |> add_claim("aud", fn -> "Orsive" end, &(&1 == "Orsive"))
  end

  def verify_user_from_token(token) do
    with {:ok, %{"id" => id}} <- verify_and_validate(token),
         {:ok, user} <- Profile.get_user(id) do
      {:ok, user}
    else
      _ -> {:error, "Unable to verify user"}
    end
  end
end
