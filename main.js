const GITHUB_USERNAME = 'adityagarasangi';
const selectedRepos = [
    'AWS-Devops-Portfolio-Deployment',
    'dockerized-nodejs-mongo-app',
    'Kubernetes-Email-Submission-App',
    'ShopFusion-E-Commerce-Platform',
    'ChatterBox',
    'MERN-Ecommerce'
  ];
  

// Fetch & display GitHub projects
async function fetchGitHubProjects() {
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`);
    const repos = await response.json();
    const container = document.getElementById('github-projects');

    container.innerHTML = '';

    selectedRepos
      .map(name => repos.find(repo => repo.name === name && !repo.fork))
      .filter(Boolean)
      .forEach(repo => container.appendChild(createProjectCard(repo)));

  } catch (error) {
    console.error('GitHub API Error:', error);
  }
}

// Create each project card
function createProjectCard(repo) {
  const card = document.createElement('div');
  card.className = 'group bg-zinc-800 rounded-xl overflow-hidden transition-all hover:scale-[1.02]';

  card.innerHTML = `
    <div class="p-6">
      <h3 class="text-xl font-semibold mb-2">${repo.name}</h3>
      <p class="text-zinc-400 mb-4 h-20 overflow-hidden">${repo.description || 'No description available.'}</p>
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4 text-sm text-zinc-400">
          <span><i class="fas fa-star mr-1"></i>${repo.stargazers_count}</span>
          <span><i class="fas fa-code-branch mr-1"></i>${repo.forks_count}</span>
          <span><i class="fas fa-circle mr-1"></i>${repo.language || 'N/A'}</span>
        </div>
        <a href="${repo.html_url}" target="_blank" class="text-indigo-400 hover:text-indigo-300 transition-colors">
          View Project →
        </a>
      </div>
    </div>
  `;
  return card;
}

// Footer Year
function setCurrentYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetchGitHubProjects();
  setCurrentYear();
});
