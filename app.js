let rgstrBtn = document.getElementById("register");
let userArray = JSON.parse(localStorage.getItem("users")) || [];  // Load existing users from localStorage

rgstrBtn && rgstrBtn.addEventListener("click", function () {
    let userName = document.getElementById("accountName");
    let userEmail = document.getElementById("accountEmail");
    let userPass = document.getElementById("accountPassword");

    // Email validation pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation
    if (!emailPattern.test(userEmail.value)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Email",
            text: "Please enter a valid email address."
        });
        return; // Stop the registration process
    }

    if (userPass.value.length < 8) {
        Swal.fire({
            icon: "error",
            title: "Weak Password",
            text: "Password should be at least 8 characters long."
        });
        return; // Stop the registration process
    }

    let userObj = {
        name: userName.value,
        email: userEmail.value,
        password: userPass.value,
    };

    userArray.push(userObj);

    // Clear the input fields
    userName.value = "";
    userEmail.value = "";
    userPass.value = "";

    // Store updated userArray in localStorage
    localStorage.setItem("users", JSON.stringify(userArray));

    // Show success message with SweetAlert
    const Toast = Swal.mixin({
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({
        icon: "success",
        title: "Sign up successfully"
    });

    // Redirect to login page after 2 seconds
    setTimeout(function () {
        window.location.href = "login.html";
    }, 2000);
});

// Login functionality
let loginBtn = document.getElementById("login");

loginBtn && loginBtn.addEventListener("click", function (event) {
    event.preventDefault();
    let loginEmail = document.getElementById("loginEmail");
    let loginPass = document.getElementById("loginPass");

    var users = JSON.parse(localStorage.getItem("users"));

    let isRegistered = false;

    if (users) {
        for (var user of users) {
            if (user.email == loginEmail.value) {
                if (user.password == loginPass.value) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "center",
                        showConfirmButton: false,
                        timer: 1000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });
                    Toast.fire({
                        icon: "success",
                        title: "Signed in successfully"
                    });

                    setTimeout(function () {
                        window.location.href = "dashboard.html";
                    }, 2000);
                    isRegistered = true;
                    break;
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Incorrect Password",
                        text: "Please double-check your password and try again.",
                    });
                    isRegistered = true;
                    break;
                }
            }
        }
    }

    if (!isRegistered) {
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Account Not Found",
            text: "It seems like you haven't registered yet. Please sign up first.",
            showConfirmButton: false,
            timer: 2000
        });
    }

    loginEmail.value = "";
    loginPass.value = "";
});

// Logout functionality
let logoutBtn = document.getElementById("btn-logout");

logoutBtn && logoutBtn.addEventListener("click", function () {
    window.location.href = "index.html";
});
