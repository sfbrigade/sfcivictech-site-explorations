import type { APIRoute } from "astro";
import { Client } from '@notionhq/client';

const notion = new Client({
    auth: process.env.NOTION_API_KEY,
})

export const POST: APIRoute = async ({ request }) => {
    const data = await request.formData();
  // Do something with the data, then return a success response
    try{
        await notion.pages.create({
            "parent": {
                "type": "database_id",
                "database_id": "3664f66c7e894dd296b9182534f3b8db"
            },
            "properties": {
                "Full Name": {
                    "title": [
                        {
                            "text": {
                                "content": String(data.get('name'))
                            }
                        }
                    ]
                },
                "Email": {
                    "email": String(data.get('email'))
                },
                "LinkedIn": {
                    "url": String(data.get('linkedin'))
                },
                "Subscribe to newsletter": {
                    "checkbox": data.get('newsletter') === 'on' ? true : false
                }
            }
        })
        return new Response(
            JSON.stringify({
                message: 'Success',
            }),
            { status: 200 }
        );
    } catch (e) {
        return new Response(
            JSON.stringify({
                message: e,
            }),
            { status: 500 }
        );
    }
};