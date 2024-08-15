// Fetch and display users on page load
document.addEventListener('DOMContentLoaded', fetchUsers);

// Function to fetch users
function fetchUsers() {
    fetch('/api/users')
        .then(response => response.json())
        .then(users => {
            const userList = document.getElementById('userList');
            userList.innerHTML = '';
            users.forEach(user => {
                const li = document.createElement('li');
                li.textContent = `${user.username} - ${user.email}`;
                userList.appendChild(li);
            });
        });
}

// Handle form submission
document.getElementById('userForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const user = { username, email };

    fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(() => {
        fetchUsers();
        this.reset();
    });
});