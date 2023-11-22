import mailChannelsPlugin from "@cloudflare/pages-plugin-mailchannels";
import {PagesFunction} from "@cloudflare/workers-types";

export const onRequest: PagesFunction = mailChannelsPlugin({
    personalizations: [
        {
            to: [{ name: "Web contact", email: "julioarhernandez@gmail.com" }],
        },
    ],
    from: {
        name: "ACME Support",
        email: "support@example.com",
    },
    respondWith: () => {
        return new Response(
            `Thank you for submitting your enquiry. A member of the team will be in touch shortly.`
        );
    },
});
