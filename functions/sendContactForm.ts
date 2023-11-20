import sendGridEmail from "./sendGridEmail";

export default function sendContactForm(formData: Record<string, string>, apiKey: string, recipientEmail: string): Promise<number> {
    const subject = "A new form from landing page";
    const text = "Mail text";
    const from = "yudi@bizmarketing.us";
    const to = recipientEmail;

    let html = `
    <h1>A new application from landing page</h1><br>
    <h2>Form data: </h2><br>
    ${collectHtmlFromFormData(formData)}
  `;

    return sendGridEmail(apiKey, to, from, subject, text, html);
}

function collectHtmlFromFormData(formData: Record<string, string>): string {
    let strHtml = "";
    for (const key in formData) {
        strHtml += `<strong>${key}:</strong> <span>${formData[key]}</span> <br>`;
    }
    return strHtml;
}
