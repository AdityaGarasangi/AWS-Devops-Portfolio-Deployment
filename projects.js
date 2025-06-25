const GITHUB_USERNAME = 'adityagarasangi';

document.addEventListener('DOMContentLoaded', () => {
  loadGitHubData();
  document.getElementById('year').textContent = new Date().getFullYear();
});

async function loadGitHubData() {
  const reposGrid = document.getElementById('repos-grid');

  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`);
    if (!res.ok) throw new Error(`GitHub API Error: ${res.status}`);
    const repos = await res.json();

    const sorted = repos
      .filter(r => !r.fork)
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));


    reposGrid.innerHTML = '';
    sorted.forEach(repo => reposGrid.appendChild(createRepoCard(repo)));
  } catch (err) {
    console.error(err);
    reposGrid.innerHTML = `<p class="text-center text-zinc-400">Failed to load repositories.</p>`;
  }
}

function createRepoCard(repo) {
  const div = document.createElement('div');
  div.className = 'bg-zinc-900 rounded-xl p-6 transition hover:scale-[1.02]';

  div.innerHTML = `
    <h3 class="text-xl font-semibold mb-2">${repo.name}</h3>
    <p class="text-zinc-400 mb-4">${repo.description || 'No description available.'}</p>
    <div class="flex flex-wrap gap-4">
      <button onclick="showRepoDetails('${repo.name}')" class="px-4 py-2 bg-indigo-600 text-white rounded-lg">View Details</button>
      <a href="${repo.html_url}" target="_blank" class="px-4 py-2 border border-zinc-700 rounded-lg hover:bg-zinc-800">GitHub →</a>
    </div>
  `;
  return div;
}

function showRepoDetails(repoName) {
    const modal = document.getElementById('repo-modal');
    const title = document.getElementById('modal-title');
    const content = document.getElementById('modal-content');
  
    title.textContent = repoName;
    content.innerHTML = `<p class="text-zinc-400">Loading README...</p>`;
    modal.classList.remove('hidden');
    modal.classList.add('flex', 'show');
  
    fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/readme`)
      .then(res => {
        if (!res.ok) throw new Error('README not found');
        return res.json();
      })
      .then(data => {
        let decoded = decodeURIComponent(escape(window.atob(data.content.replace(/\n/g, ''))));
  
        decoded = decoded.replace(/!\[(.*?)\]\((?!http)(.*?)\)/g, (match, alt, path) => {
          const rawURL = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repoName}/main/${path}`;
          return `![${alt}](${rawURL})`;
        });
  
        content.innerHTML = marked.parse(decoded);
      })
      .catch(err => {
        console.error(err);
        content.innerHTML = `<p class="text-zinc-400">Unable to load or render README.md.</p>`;
      });
  }
  
  
function closeModal() {
    const modal = document.getElementById('repo-modal');
    modal.classList.remove('flex', 'show');
    modal.classList.add('hidden');
  }
  
