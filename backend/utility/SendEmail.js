import brevo from "@getbrevo/brevo";

const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

const SendEmail = async ({ to, subject, text, html }) => {
  try {
    const sendSmtpEmail = new brevo.SendSmtpEmail();

    sendSmtpEmail.sender = {
      name: "No Limit King",
      email: "l@nolimitking.com",
    };

    sendSmtpEmail.to = [{ email: to }];
    sendSmtpEmail.subject = subject;

    if (text) sendSmtpEmail.textContent = text;
    if (html) sendSmtpEmail.htmlContent = html;

    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    return response;
  } catch (error) {
    console.log("Brevo email error:", error);
    throw error;
  }
};

export default SendEmail;
