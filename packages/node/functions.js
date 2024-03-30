const { Octokit } = require('octokit');
require('dotenv').config();
const octokit = new Octokit({
    auth: process.env.GITHUB_API_TOKEN
}); 

const ORG = 'sfbrigade';

async function getRepos() {
    try {
        const response = await octokit.request(`GET /orgs/${ORG}/repos`, {
            org: 'sfbrigade',
            type: 'public',
            sort: 'updated',
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });
        const repoInfo = await Promise.all(response.data.map(async repo => ({
            name: repo.name,
            description: repo.description,
            readMe: `https://raw.githubusercontent.com/${ORG}/${repo.name}/${repo.default_branch}/README.md`,
            main_language: repo.language,
            languages: (await octokit.request(`GET ${repo.languages_url}`)).data,
            topics: repo.topics,
            contributors: repo.contributors_url,
            archived: repo.archived,
        })));
        console.log(repoInfo);
        
        return repoInfo;
    } catch (error) {
        console.error(error);
        return { message: 'Internal server error' };
    }
}

module.exports = { 
    getRepos 
};
