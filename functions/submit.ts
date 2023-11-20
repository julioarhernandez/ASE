import postContactForm from "./postContactForm";


export interface Env {
    SENDGRID_API_KEY: string;
    SITE_HOST: string;
}

export default {
    async fetch(request: Request, env: Env) {
        if (request.method === "POST") {
            return handlePostRequest(request, env);
        }
    },
};

async function handlePostRequest(request: Request, env: Env) {
  const actionURL = new URL(request.url); // Provide a base URL if necessary
  const action = actionURL.searchParams.get('action');

  // Extracting email from the action string
  const emailParam = actionURL.searchParams.get('r');
  const recipientEmail = emailParam ? decodeURIComponent(emailParam) : null;

  if (action === 'contact-form' && recipientEmail) {
    console.log('Recipient Email:', recipientEmail);
    return postContactForm(request, env, recipientEmail);
    } else {
        return notFound();
    }
}

async function notFound() {
    return new Response("Object Not Found", {
        statusText: "Object Not Found",
        status: 404,
    });
}
