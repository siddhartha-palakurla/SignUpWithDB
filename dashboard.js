const userName = localStorage.getItem('userName');

document.getElementById( 'welcomeMessage').innerText = `Welcome ${userName}`;

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

            const currentUser =
                users[0];

            document.getElementById(
                'displayUserName'
            ).innerText =
                currentUser.userName;

            document.getElementById(
                'displayAge'
            ).innerText =
                currentUser.age;

            document.getElementById(
                'displayPhone'
            ).innerText =
                currentUser.mobileNumber;
        }

    } catch (error) {

        console.log(error);
    }
}