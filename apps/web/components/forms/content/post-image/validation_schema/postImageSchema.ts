import * as yup from "yup";

export const POST_IMAGE_SCHEMA = yup.object({
  title: yup.string().max(255, "Description is too long"),
  image: yup.mixed().required("Image is required"),
});
