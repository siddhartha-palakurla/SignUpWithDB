const params = new URLSearchParams(window.location.search);

const id = params.get('id');

loadUser();

async function loadUser(){

    const response = await fetch(
        `https://siddharthadb-cc4e.restdb.io/rest/signup/${id}`,
        {
            headers:{
                'x-apikey':'6a1fccf72199ff4802033cfb'
            }
        }
    );

    const user = await response.json();

    document.getElementById('userName').value =
        user.userName;

    document.getElementById('age').value =
        user.age;

    document.getElementById('phone').value =
        user.mobileNumber;
}

document.getElementById('updateBtn')
.addEventListener('click', updateUser);

async function updateUser(){

    const updatedUser = {

        userName: document.getElementById('userName').value,

        age: document.getElementById('age').value,

        mobileNumber: document.getElementById('phone').value
    };

    const response = await fetch(
        `https://siddharthadb-cc4e.restdb.io/rest/signup/${id}`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'x-apikey': '6a1fccf72199ff4802033cfb'
            },
            body: JSON.stringify(updatedUser)
        }
    );

    if (!response.ok) {

        const errorText = await response.text();

        console.log(errorText);

        alert('Update Failed');

        return;
    }

    alert('User Updated Successfully' );

    window.location.href = 'dashboard.html';
}