// Get references to HTML elements
const searchForm = document.getElementById('github-form');
const searchInput = document.getElementById('search');
const userList = document.getElementById('user-list');
const reposList = document.getElementById('repos-list');

// Event listener for the form submission
searchForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const searchQuery = searchInput.value;

  // Implement the logic to search GitHub users by name
  searchGitHubUsers(searchQuery);
});

// Function to search GitHub users
function searchGitHubUsers(query) {
  // Make an API request to search GitHub users by name
  // You'll need to use the GitHub API here
  const apiUrl = `https://api.github.com/search/users?q=${query}`;
  
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Handle the API response and display user information
      // can update the 'userList' element with the results
      userList.innerHTML = ''; // Clear previous results
      data.items.forEach((user) => {
        displayUser(user);
      });
    })
    .catch((error) => console.error('Error:', error));
}

// Function to display user information in the 'user-list'
function displayUser(user) {
  const userCard = document.createElement('li');
  userCard.innerHTML = `
    <div class='content'>
      <h3>User: ${user.login}</h3>
      <p>URL: ${user.html_url}</p>
      <div class='repos'>
        <button class='repo-button' style='margin-bottom: 25px'>Repositories</button>
      </div>
      <img src=${user.avatar_url} />
    </div>`;
  userList.appendChild(userCard);
}

// Event listener for clicking on a user
userList.addEventListener('click', function (e) {
  if (e.target.tagName === 'button') {
    const username = e.target.parentElement.previousElementSibling.textContent.split(':')[1].trim();
    // Implement logic to get repositories for the selected user
    getUserRepositories(username);
  }
});

// Function to get repositories for a user
function getUserRepositories(username) {
  // Make an API request to get repositories for the user
  const apiUrl = `https://api.github.com/users/${username}/repos`;
  
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Handle the API response and display the list of repositories
      // You can update the 'reposList' element with the results
      reposList.innerHTML = ''; // Clear previous results
      data.forEach((repo) => {
        displayRepositories(repo);
      });
    })
    .catch((error) => console.error('Error:', error));
}

// Function to display a list of repositories
function displayRepositories(repository) {
  const repoCard = document.createElement('li');
  repoCard.innerHTML = `
    <h4>${repository.name}</h4>
    <p>${repository.html_url}</p>
  `;
  reposList.appendChild(repoCard);
}
