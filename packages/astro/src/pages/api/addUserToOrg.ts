import type { APIRoute } from 'astro';
import { Octokit } from 'octokit';

const octokit = new Octokit({
    auth: import.meta.env.GITHUB_TOKEN
});

/**
 * This is supposed to be called by the NocoDB webhook when
 * a new user is added to the database. It will then add the
 * user to the GitHub organization.
 * 
 *  This may not work as expected, as Astro endpoints may not 
 *  be accessible from external sources.
 */

export const POST: APIRoute = async ({ request }) => {
    const req = await request.text();

    const response = await octokit.request('POST /orgs/{org}/invitations', {
        org: 'ORG',
        invitee_id: JSON.parse(req).body.data.github_handle,
        role: 'direct_member',
        team_ids: [
            1,
            2
        ],
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })

    return new Response(JSON.stringify(response.data));

}