const userName = document.getElementById('userName-input')
const age = document.getElementById('age-input')
const mobileNumber = document.getElementById('mobileNumber-input')
const email = document.getElementById('email-input')
const password = document.getElementById('password-input')
const confirmPassword = document.getElementById('confirmPassword-input')
const form = document.getElementById('form')
const errorElement = document.getElementById('error')

function isValidEmail(email) {
    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function isStrongPassword(password) {
    const passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/;
    return passwordPattern.test(password);
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

form.addEventListener('submit', async (e) =>{
    let errors = []

    if (userName.value === '' || userName.value === null) {
        errors.push('User Name is required')
    }

    if (age.value < 21 ){
        errors.push ('Eligible age is between 21')
    }

    if (password.value.length <= 6){
        errors.push ('Password must be longer than 6 characters')
    }
    if (password.value.length >= 20){
        errors.push ('Password must be less than 20 characters')
    }
    if (!isStrongPassword(password.value)) {
        errors.push(
        'Password must contain uppercase, lowercase, number and special character'
        );
    }

    if (password.value !== confirmPassword.value) {
       errors.push('Password and Confirm Password must match');
    }

     if (mobileNumber.value.length !== 10){
        errors.push ('Phone Number should be of 10 digits')
    }

    if (!isValidEmail(email.value)) {
        errors.push('Enter a valid email address');
    }  

    async function saveUser(userData) {

        try {

            const response = await fetch(
                'https://siddharthadb-cc4e.restdb.io/rest/signup',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-apikey':
                            '6a1fccf72199ff4802033cfb',
                        'cache-control': 'no-cache'
                    },
                    body: JSON.stringify(userData)
                }
            );

            const result = await response.json();

            console.log(result);

            localStorage.setItem('userName', userData.userName );

            window.location.href = 'login.html';

        } catch(error) {
            console.log("FULL ERROR:", error);
            errorElement.innerText = error.message;
        }
    }

     if (errors.length > 0){
         e.preventDefault()
         errorElement.innerText = errors.join(', ')
    }else {

    e.preventDefault();

    const hashedPassword =
    await hashPassword(
        password.value
    );

    const userData = {
        userName: userName.value,
        age: Number(age.value),
        mobileNumber: mobileNumber.value,
        email: email.value,
        password: hashedPassword
    };

    saveUser(userData);
}

})