import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import SignIn from "../../../app/auth/signIn";
import Button from "../../base/button";
import InputField from "../fields/inputField";
import { LOGIN_SCHEMA } from "../../../../../packages/common/forms";

export default function LoginForm() {
  const router = useRouter();

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={LOGIN_SCHEMA}
      onSubmit={(values, { setSubmitting }) => {
        toast
          .promise(SignIn(values), {
            loading: "Signing In....",
            success: <p>Signed in Successfully🚀🚀</p>,
            error: (
              <p>
                <span className="font-bold">Email</span> or{" "}
                <span className="font-bold">Password</span> is wrong!😑
              </p>
            ),
          })
          .then(() => {
            router.push("/");
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => setSubmitting(false));
      }}
    >
      {({ isSubmitting, handleSubmit, errors }: any) => (
        <Form onSubmit={handleSubmit}>
          <InputField type="email" name="email" label="Email" />
          <InputField type="password" name="password" label="Password" />
          <Button
            type="submit"
            disabled={isSubmitting || errors.email || errors.password}
            className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue ripple-bg-blue-700 disabled:cursor-not-allowed"
          >
            Let's Go🚀
          </Button>
        </Form>
      )}
    </Formik>
  );
}
