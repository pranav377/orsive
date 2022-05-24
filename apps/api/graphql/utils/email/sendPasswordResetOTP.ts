import emailApi from "./client";

export default function sendPasswordResetOTP(to: string, otp: string) {
  emailApi.sendTransacEmail({
    to: [
      {
        email: to,
      },
    ],
    templateId: 2,
    params: { otp: otp },
  });
}
