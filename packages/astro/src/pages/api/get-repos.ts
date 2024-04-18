import type { APIRoute } from 'astro';
import { Octokit } from 'octokit';

import dotenv from 'dotenv';
dotenv.config();

const octokit = new Octokit({
    auth: process.env.GITHUB_PAT, // add PAT environment variable to increase request quota for GitHub API
});

export const GET: APIRoute = async ({ params }) => {
    
    const ORG = 'sfbrigade';

    try {
        const response = await octokit.request(`GET /orgs/${ORG}/repos`, {
            org: 'sfbrigade',
            type: 'public',
            sort: 'pushed',
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });
        const repoInfo = await Promise.all(response.data.map(async (repo: { name: string; html_url: string; description: string; default_branch: string; language: string; languages_url: object; topics: string[]; contributors_url: string; archived: string; pushed_at: Date; updated_at: Date; created_at:Date  }) => ({
            name: repo.name,
            url: repo.html_url,
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

