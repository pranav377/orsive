import {
  AccountApi,
  AccountApiApiKeys,
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys,
} from "sib-api-v3-typescript";

let apiInstance = new AccountApi();

apiInstance.setApiKey(AccountApiApiKeys.apiKey, process.env.EMAIL_API_KEY!);

apiInstance.getAccount().then(
  function (data) {
    console.log("API called successfully. Returned data: " + data);
  },
  function (error) {
    console.error(error);
  }
);

let emailApi = new TransactionalEmailsApi();
emailApi.setApiKey(
  TransactionalEmailsApiApiKeys.apiKey,
  process.env.EMAIL_API_KEY!
);

export default emailApi;
