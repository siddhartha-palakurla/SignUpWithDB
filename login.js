const email = document.getElementById('email-input')
const password = document.getElementById('password-input')
const form = document.getElementById('form')
const errorElement = document.getElementById('error')


function isValidEmail(email) {
    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}


async function hashPassword(password) {

    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer =
        await crypto.subtle.digest(
            'SHA-256',
            data
        );

    const hashArray =
        Array.from(
            new Uint8Array(hashBuffer)
        );

    const hashHex =
        hashArray
            .map(byte =>
                byte.toString(16).padStart(2, '0')
            )
            .join('');

    return hashHex;
}

async function loginUser(emailValue, passwordValue) {

    try {

        const query =  encodeURIComponent( JSON.stringify({ email: emailValue }) );

        const response = await fetch(`https://siddharthadb-cc4e.restdb.io/rest/signup?q=${query}`,
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

        const users = await response.json();

        if (users.length === 0) {
            errorElement.innerText ='User not found';
            return;
        }

        const currentUser = users[0];

        const enteredHash = await hashPassword(passwordValue);

        if ( enteredHash !== currentUser.password ) {

            errorElement.innerText =
                'Invalid Password';

            return;
        }

        localStorage.setItem( 'userName',  currentUser.userName );
        localStorage.setItem( 'email',    currentUser.email);


        window.location.href =  'dashboard.html';

    } catch(error) {

        console.log(error);

        errorElement.innerText =
            'Login Failed';
    }
}


form.addEventListener('submit', async (e) => {
            e.preventDefault();

            let errors = [];

            if ( !isValidEmail( email.value )
            ) {

                errors.push('Enter a valid email address');
            }

            if ( password.value === '') {

                errors.push('Password is required' );
            }

            if ( errors.length > 0 ) {

                errorElement.innerText =
                    errors.join(', ');

                return;
            }

            await loginUser(
                email.value,
                password.value
            );
        }
    );