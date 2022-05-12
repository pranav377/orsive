import * as yup from "yup";

export const POST_ORSIC_SCHEMA = yup.object({
  title: yup.string().max(255, "Title is too long"),
  content: yup.string().required("Content is required"),
  thumbnail: yup.mixed(),
});
