function validateUsername() {
    const username = document.getElementById("username").value;
    const usernameError = document.getElementById("usernameError");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const submitButton = document.querySelector('button[type="submit"]');

    const nameRegex = /^[A-Za-z\s]+$/; // يسمح فقط بالحروف والمسافات

    if (username.length < 5 &&!nameRegex.test(username)) {
        usernameError.textContent = "The name must be 5 or more characters.";
        passwordInput.disabled = true; 
        confirmPasswordInput.disabled = true;
        submitButton.disabled = true; 
        return false;
    } else {
        usernameError.textContent = ""; 
        passwordInput.disabled = false; 
        confirmPasswordInput.disabled = false;
        return true;
    }
}

function validatePassword() {
    const password = document.getElementById("password").value;
    const passwordError = document.getElementById("passwordError");
    const submitButton = document.querySelector('button[type="submit"]');
    const passwordRegex = /^[0-9]{8,}$/;

    if (password.length > 0 && !passwordRegex.test(password)) {
        passwordError.textContent = "The password must contain at least 8 digits.";
        submitButton.disabled = true;  
        return false;
    } else {
        passwordError.textContent = ""; 
        return true;
    }
}


function validateConfirmPassword() {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const confirmPasswordError = document.getElementById("confirmPasswordError");
    const submitButton = document.querySelector('button[type="submit"]');

    if (confirmPassword.length > 0 && confirmPassword !== password) {
        confirmPasswordError.textContent = "The password does not match.";
        submitButton.disabled = true;  
        return false;
    } else {
        confirmPasswordError.textContent = "";  
        return true;
    }
}

function validateForm() {
    const isUsernameValid = validateUsername();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    const submitButton = document.querySelector('button[type="submit"]');
    if (isUsernameValid && isPasswordValid && isConfirmPasswordValid) {
        submitButton.disabled = false;
       
    } else {
        console.log("form is not valid");
        submitButton.disabled = true;
    }
}
document.getElementById("username").addEventListener("input", function() {
    validateUsername();  
    validateForm(); 
});

document.getElementById("password").addEventListener("input", function() {
    validatePassword();
    validateForm();
});

document.getElementById("confirmPassword").addEventListener("input", function() {
    validateConfirmPassword();
    validateForm();
});
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    if (validateForm()) {
        alert("Done");
    }
    const username = document.getElementById("username").value;
    localStorage.setItem('username', username);
    window.location.href = '../index.html';
});

/////////////////////////////////////////////////////////////////
document.getElementById('loginForm').addEventListener('submit', function(event) {
    //event.preventDefault();
    const username = document.getElementById('username').value;
    localStorage.setItem('username', username);
    window.location.href = '../index.html';
 });

let username = localStorage.getItem('username');
      if (username) {
          document.getElementById('greeting').textContent = ` ${username}`;
      } else {
          document.getElementById('greeting').textContent = "Hello, guest! Please log in.";
      }
////////////////////////////////////////footter/////////////////////////////////////////////////
const scrollTopButton = document.getElementById("scrollTopButton");

scrollTopButton.addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
