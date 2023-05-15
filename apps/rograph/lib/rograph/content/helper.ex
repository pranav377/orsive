defmodule Rograph.Content.Helper do
  def generate_slug(title) when is_bitstring(title) do
    identifier =
      :crypto.strong_rand_bytes(6)
      |> Base.encode16()
      |> String.slice(0, 6)

    "#{identifier}_#{title}" |> String.slice(0, 35)
  end

  def generate_slug(param) when is_nil(param) do
    :crypto.strong_rand_bytes(35)
    |> Base.encode16()
    |> String.slice(0, 35)
  end
end
