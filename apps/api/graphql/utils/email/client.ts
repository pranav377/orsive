import {
  AccountApi,
  AccountApiApiKeys,
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys,
} from "@sendinblue/client";

let apiInstance = new AccountApi();

apiInstance.setApiKey(AccountApiApiKeys.apiKey, process.env.EMAIL_API_KEY!);

apiInstance
  .getAccount()
  .then(() => {})
  .catch(() => {});

let emailApi = new TransactionalEmailsApi();
emailApi.setApiKey(
  TransactionalEmailsApiApiKeys.apiKey,
  process.env.EMAIL_API_KEY!
);

export default emailApi;
