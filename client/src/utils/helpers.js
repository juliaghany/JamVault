// Reference Module 20 -> Activity 16 -> src -> utils -> helpers.js
export function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
// Reference Zainab's regex gist
export function validatePassword(password) {
    const regex = /^[a-zA-Z\d@!#$%^&*()_-+=/\.,?<>"':;]{8,128}$/
    return regex.test(password);
}

if (validatePassword(password)) {
    console.log('Password is valid');
} else {
    console.log('Password is invalid');
}

