"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const baseUrl =
  "https://ms.myplace4parts.com/vehicle/1.2/vehicle/decode?catalogId=111&covListId=23702&countryId=US&mclOrgId=23702";
// IL:2061033b     "https://ms.myplace4parts.com/vehicle/1.2/vehicle/decode?catalogId=111&covListId=23702&countryId=US&mclOrgId=23702"

export const getCarInfo = async (license: string) => {
  //   const cookieStore = await cookies();
  //   const accessToken = cookieStore.get("access_token")?.value;
  const res = await fetch(`${baseUrl}`, {
    method: "POST",
    headers: {
      Authorization: `eyJraWQiOiJjaENVK0ZpU3crMmdGR1lsalJwZkdiTEx2YXl0WEg4dTk5cE9tY0JhcThBPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI0MTYwMmMwZC1hOWUxLTQyOGQtYmRmOC01ZWVlYTAwNTE3MjYiLCJjdXN0b206Zmlyc3RuYW1lIjoiU2VydmljZSIsImlzcyI6Imh0dHBzOi8vY29nbml0by1pZHAudXMtd2VzdC0yLmFtYXpvbmF3cy5jb20vdXMtd2VzdC0yX3pWMFVENWJoZCIsImNvZ25pdG86dXNlcm5hbWUiOiIyNDE2MzY1IiwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWMwMDNjaHVja3MiLCJjdXN0b206dXNlcklkIjoiMjQxNjM2NSIsImF1ZCI6InB0N2NmcGEwdGhsbjNlOWdjOWJjcTRyMW4iLCJldmVudF9pZCI6IjgzN2MyNjU1LTEzMTYtNDk2Zi05MTU4LTgyNjI5ZTM1…YXV0aF90aW1lIjoxNzMyNTQ5OTY5LCJjdXN0b206bGFzdG5hbWUiOiJNYW5hZ2VyIiwiZXhwIjoxNzkwODg5MzU3LCJpYXQiOjE3OTA4MDI5NTcsImVtYWlsIjoiaGluc29ucmVwYWlyc2NhcnNAc2JjZ2xvYmFsLm5ldCJ9.G-rJRIHuGMrxby4PFAA4y6nfQP8gC2JqZuUHwPf-crqYlWr8eILLvSfQpnhYncgbJGBK-Ykpqffof5QBP4K1zgW4lFhI1Fk-3yiJz3itk34DwqFxX7qs-A0dRJfUo5AOrWMKQmfYj1mt4x46-wqKZ7N5N7WCX0o2wHWdtWWC2JchC39NVkC_9pHShDjXwtxJA6pMXwgZU8Ajchn3cyCjQnNF_bhdSo_HicadADcsJOC9z9iCBCk2kFkqOnnc4WqPrGHTWQLZwFj0bqOT8ARXa2Hq7SCe80CrC7CCwuD5NdEZC_tKlopHg-g0VsjO9CQJjPsPOSSC8wWp-yXTmHm9mQ}`,
    },
  });
  if (!res.ok) {
    console.error("Failed to fetch customer phones:", res.statusText);
    throw new Error("Failed to fetch customer phones");
  }
  console.log("vin result",res.json())
  return res.json();
};

// Authorization
// 	eyJraWQiOiJjaENVK0ZpU3crMmdGR1lsalJwZkdiTEx2YXl0WEg4dTk5cE9tY0JhcThBPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI0MTYwMmMwZC1hOWUxLTQyOGQtYmRmOC01ZWVlYTAwNTE3MjYiLCJjdXN0b206Zmlyc3RuYW1lIjoiU2VydmljZSIsImlzcyI6Imh0dHBzOi8vY29nbml0by1pZHAudXMtd2VzdC0yLmFtYXpvbmF3cy5jb20vdXMtd2VzdC0yX3pWMFVENWJoZCIsImNvZ25pdG86dXNlcm5hbWUiOiIyNDE2MzY1IiwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWMwMDNjaHVja3MiLCJjdXN0b206dXNlcklkIjoiMjQxNjM2NSIsImF1ZCI6InB0N2NmcGEwdGhsbjNlOWdjOWJjcTRyMW4iLCJldmVudF9pZCI6IjgzN2MyNjU1LTEzMTYtNDk2Zi05MTU4LTgyNjI5ZTM1…YXV0aF90aW1lIjoxNzMyNTQ5OTY5LCJjdXN0b206bGFzdG5hbWUiOiJNYW5hZ2VyIiwiZXhwIjoxNzkwODg5MzU3LCJpYXQiOjE3OTA4MDI5NTcsImVtYWlsIjoiaGluc29ucmVwYWlyc2NhcnNAc2JjZ2xvYmFsLm5ldCJ9.G-rJRIHuGMrxby4PFAA4y6nfQP8gC2JqZuUHwPf-crqYlWr8eILLvSfQpnhYncgbJGBK-Ykpqffof5QBP4K1zgW4lFhI1Fk-3yiJz3itk34DwqFxX7qs-A0dRJfUo5AOrWMKQmfYj1mt4x46-wqKZ7N5N7WCX0o2wHWdtWWC2JchC39NVkC_9pHShDjXwtxJA6pMXwgZU8Ajchn3cyCjQnNF_bhdSo_HicadADcsJOC9z9iCBCk2kFkqOnnc4WqPrGHTWQLZwFj0bqOT8ARXa2Hq7SCe80CrC7CCwuD5NdEZC_tKlopHg-g0VsjO9CQJjPsPOSSC8wWp-yXTmHm9mQ
