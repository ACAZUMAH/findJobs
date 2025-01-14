import createError from 'http-errors';

export const sendSms = async (phone: string, token: string) => {
  const message = `Your verification code is ${token}`;
  const phoneFormat = phone.replace("+", "");
  const url = `${process.env.SMS_API_URL}`;
  const apiKey = `${process.env.SMS_API_KEY}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      key: apiKey,
      msisdn: `${phoneFormat}, 233xxxxxxxx`,
      message: message,
      sender_id: "findjobs",
    }),
  });
  if (!response.ok) {
    throw new createError.BadGateway("Failed to send sms");
  }
  return true;
};
