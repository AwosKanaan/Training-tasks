const password_characters = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function generatePassword() {
    const password_length = 12;
    let password = "";
    for (let i = 0; i < password_length; i++) { 
        var randomNumber = Math.floor(Math.random() * password_characters.length); 
        password += password_characters.charAt(randomNumber); 
    }
    return password;
}

const generate_button = document.getElementById("password");

generate_button.addEventListener("click", function() {
    const input = document.querySelector(".input"); 
    const randomPassword = generatePassword();
    input.value = randomPassword;
});