const userName = localStorage.getItem('userName');
const email = localStorage.getItem('email');
const isAdmin = email === 'Admin@gmail.com';

document.getElementById('navUserName').innerText = userName;

console.log("adminSection:", document.getElementById('adminSection'));

if (!userName) {
    window.location.href = 'login.html';
}


document.getElementById('logoutBtn').addEventListener('click', () => {

            localStorage.removeItem('userName');

            window.location.href = 'login.html';
        }
    );
if(isAdmin){

    document.getElementById('welcomeMessage').style.display = 'none';

    document.getElementById('userSection').style.display = 'none';

    document.getElementById('adminSection').style.display = 'block';

    loadAllUsers();
}
else{

    document.getElementById('welcomeMessage').innerText =
        `Welcome ${userName}`;
}

loadUserData();

async function loadUserData() {

    try {

        const userName =  localStorage.getItem('userName');

        const query =  encodeURIComponent(JSON.stringify({ userName: userName }));

        const response = await fetch(
            `https://siddharthadb-cc4e.restdb.io/rest/signup?q=${query}`,
            {
                method: 'GET',
                headers: {
                    'x-apikey':
                        '6a1fccf72199ff4802033cfb',
                    'cache-control':
                        'no-cache'
                }
            }
        );

        const users =
            await response.json();

        if (users.length > 0) {

            const currentUser = users[0];

            document.getElementById( 'displayUserName').innerText = currentUser.userName;

            document.getElementById( 'displayAge').innerText = currentUser.age;

            document.getElementById( 'displayPhone').innerText =  currentUser.mobileNumber;
        }

    } catch (error) {

        console.log(error);
    }
}

async function loadAllUsers() {

    try {

        const response =
            await fetch(
                'https://siddharthadb-cc4e.restdb.io/rest/signup',
                {
                    method: 'GET',
                    headers: {
                        'x-apikey':
                            '6a1fccf72199ff4802033cfb'
                    }
                }
            );

        const users = await response.json();

        const tableBody = document.getElementById( 'userTableBody' );

        tableBody.innerHTML = '';

        users.forEach(user => {

            tableBody.innerHTML += `
                <tr>
                    <td>${user.userName}</td>
                    <td>${user.age}</td>
                    <td>${user.email}</td>
                    <td>${user.mobileNumber}</td>

                    <td>
                        <button
                            class="edit-btn"
                            onclick="editUser('${user._id}')">
                            Edit
                        </button>
                        <button class="delete-btn"
                            onclick="deleteUser('${user._id}')"
                        >
                            Delete
                        </button>
                    </td>

                </tr>
            `;
        });

    } catch(error) {

        console.log(error);
    }
}

function editUser(id){

    window.location.href = `edit.html?id=${id}`;
}

async function deleteUser(id) {

    const confirmDelete = confirm( 'Delete this user?' );

    if (!confirmDelete) {

        return;
    }

    try {

        await fetch(
            `https://siddharthadb-cc4e.restdb.io/rest/signup/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'x-apikey':
                        '6a1fccf72199ff4802033cfb'
                }
            }
        );

        loadAllUsers();

    } catch(error) {

        console.log(error);
    }
}