import emailApi from "./client";

export default function sendOTP(to: string, otp: string) {
  emailApi.sendTransacEmail({
    to: [
      {
        email: to,
      },
    ],
    templateId: 1,
    params: { otp: otp },
  });
}
