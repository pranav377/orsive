defmodule Rograph.Content.Helper do
  def generate_slug(title) when is_bitstring(title) do
    identifier =
      :crypto.strong_rand_bytes(6)
      |> Base.url_encode64()
      |> String.slice(0, 6)

    "#{identifier}-#{title}" |> String.slice(0, 35)
  end

  def generate_slug(param) when is_nil(param) do
    :crypto.strong_rand_bytes(35)
    |> Base.url_encode64()
    |> String.slice(0, 35)
  end

  defp get_image_dimensions_from_url(url) when is_bitstring(url) do
    {:ok, %{body: image_binary}} = HTTPoison.get(url)

    {_, width, height, _} = ExImageInfo.info(image_binary)

    %{width: to_string(width), height: to_string(height)}
  end

  def add_image_dimensions_in_html(html) when is_bitstring(html) do
    document = Floki.parse_document!(html)

    document
    |> Floki.traverse_and_update(fn
      {"img", attrs, children} ->
        [img_src] = Floki.attribute([{"img", attrs, children}], "src")
        %{width: width, height: height} = get_image_dimensions_from_url(img_src)
        {"img", [{"src", img_src}, {"width", width}, {"height", height}], children}

      other ->
        other
    end)
    |> Floki.raw_html()
  end
end
