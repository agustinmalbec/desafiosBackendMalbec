function login() {
    const username = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const data = { username, password };
    fetch('/api/users/authentication', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
        .then((response) => {
            alert(document.cookie);
        })
        .catch((error) => {
            console.error('Error:', error);
            alert(error);
        });
}