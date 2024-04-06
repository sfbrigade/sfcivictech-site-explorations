import type { APIRoute } from 'astro';
import { Octokit } from 'octokit';
import dotenv from 'dotenv';
dotenv.config();

export const GET: APIRoute = async () => {
    

    const octokit = new Octokit({
        auth: process.env.GITHUB_API_TOKEN,
    });


    const ORG = 'sfbrigade';

    try {
        const response = await octokit.request(`GET /orgs/${ORG}/repos`, {
            org: 'sfbrigade',
            type: 'public',
            sort: 'updated',
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });
        const repoInfo = await Promise.all(response.data.map(async (repo: { name: any; description: any; default_branch: any; language: any; languages_url: any; topics: any; contributors_url: any; archived: any; pushed_at: any; updated_at: any; created_at:any  }) => ({
            name: repo.name,
            description: repo.description,
            readMe: `https://raw.githubusercontent.com/${ORG}/${repo.name}/${repo.default_branch}/README.md`,
            main_language: repo.language,
            languages: (await octokit.request(`GET ${repo.languages_url}`)).data,
            topics: repo.topics,
            contributors: repo.contributors_url,
            archived: repo.archived,
            last_pushed: repo.pushed_at,
            last_updated: repo.updated_at,
            created: repo.created_at
        })));
        console.log(repoInfo);
        
        return new Response(JSON.stringify(repoInfo));
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: 'Internal server error' }));
    }
}
