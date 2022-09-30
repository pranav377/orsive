import {
  AccountApi,
  AccountApiApiKeys,
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys,
} from "@sendinblue/client";
import { EMAIL_API_KEY } from "../../config";

let apiInstance = new AccountApi();

apiInstance.setApiKey(AccountApiApiKeys.apiKey, EMAIL_API_KEY);

apiInstance
  .getAccount()
  .then(() => {})
  .catch(() => {});

let emailApi = new TransactionalEmailsApi();
emailApi.setApiKey(TransactionalEmailsApiApiKeys.apiKey, EMAIL_API_KEY);

export default emailApi;
