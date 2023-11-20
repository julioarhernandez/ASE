import sendContactForm from "./sendContactForm";
import type { Env } from "./submit";

export default async function postContactForm(request: Request, env: Env, recipientEmail: string | null) {
    const reqBody = await readRequestBody(request);
    const form = JSON.parse(reqBody);

  // Pass recipientEmail to sendContactForm function
  const responseCode = await sendContactForm(form, env.SENDGRID_API_KEY, recipientEmail);

    if (responseCode === 202) {
        console.log("Message sent successfully!");
        return Response.redirect(`${env.SITE_HOST}/contact-us-success`);
    } else {
        console.error("[Error] Mail was not delivered!");
        return Response.redirect(`${env.SITE_HOST}/contact-us?error=true`);
    }
}

async function readRequestBody(request: Request) {
    const { headers } = request;
    const contentType = headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
        const body = await request.text();
        return body;
    } else if (contentType.includes("form")) {
        const formData = await request.formData();
        let body: Record<string, unknown> = {};
        for (let entry of formData.entries()) {
            body[entry[0]] = entry[1];
        }
        return JSON.stringify(body);
    } else {
        return "{}";
    }
}
