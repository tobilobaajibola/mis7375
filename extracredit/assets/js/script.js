document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    // Helper function to show error messages
    function showError(input, message) {
        let errorSpan = input.nextElementSibling;
        if (!errorSpan || !errorSpan.classList.contains("error")) {
            errorSpan = document.createElement("span");
            errorSpan.classList.add("error");
            input.parentNode.appendChild(errorSpan);
        }
        errorSpan.textContent = message;
    }

    function clearError(input) {
        let errorSpan = input.nextElementSibling;
        if (errorSpan && errorSpan.classList.contains("error")) {
            errorSpan.textContent = "";
        }
    }

    // Name validation (only letters, max 30 characters)
    document.querySelectorAll("input[name='first_name'], input[name='middle_name'], input[name='last_name']").forEach(input => {
        input.addEventListener("input", function () {
            const regex = /^[A-Za-z]{1,30}$/;
            if (!regex.test(this.value)) {
                showError(this, "Only letters allowed (max 30 characters)");
            } else {
                clearError(this);
            }
        });
    });

    // Date validation (age must be at least 18)
    document.querySelector("input[name='date_of_birth']").addEventListener("change", function () {
        const dob = new Date(this.value);
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();
        if (age < 18) {
            showError(this, "You must be at least 18 years old");
        } else {
            clearError(this);
        }
    });

    // SSN obscured input (must be 9 digits)
    document.querySelector("input[name='ssn']").addEventListener("input", function () {
        const regex = /^\d{9}$/;
        if (!regex.test(this.value)) {
            showError(this, "SSN must be exactly 9 digits");
        } else {
            clearError(this);
        }
    });

    // Email validation
    document.querySelector("input[name='email']").addEventListener("input", function () {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!regex.test(this.value)) {
            showError(this, "Enter a valid email address");
        } else {
            clearError(this);
        }
    });

    // Phone validation (10 digits only)
    document.querySelector("input[name='phone']").addEventListener("input", function () {
        const regex = /^\d{10}$/;
        if (!regex.test(this.value)) {
            showError(this, "Enter a valid 10-digit phone number");
        } else {
            clearError(this);
        }
    });

    // Address validation (at least 5 characters)
    document.querySelectorAll("input[name='address1'], input[name='address2']").forEach(input => {
        input.addEventListener("input", function () {
            if (this.value.length < 5) {
                showError(this, "Address must be at least 5 characters long");
            } else {
                clearError(this);
            }
        });
    });

    // Zip code validation (5-10 digits)
    document.querySelector("input[name='zipcode']").addEventListener("input", function () {
        const regex = /^\d{5,10}$/;
        if (!regex.test(this.value)) {
            showError(this, "Enter a valid zip code (5-10 digits)");
        } else {
            clearError(this);
        }
    });

    // Dynamic range slider value display
    const rangeInput = document.querySelector("input[type='range']");
    const rangeDisplay = document.createElement("span");
    rangeInput.parentNode.appendChild(rangeDisplay);
    rangeInput.addEventListener("input", function () {
        rangeDisplay.textContent = " " + this.value;
    });

    // Password validation (min 8 characters, at least one letter, one number, and one special character)
    document.querySelector("input[name='password']").addEventListener("input", function () {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!regex.test(this.value)) {
            showError(this, "Password must be at least 8 characters, include a letter, number, and special character");
        } else {
            clearError(this);
        }
    });

    // Confirm password validation
    document.querySelector("input[name='confirmpassword']").addEventListener("input", function () {
        const password = document.querySelector("input[name='password']").value;
        if (this.value !== password) {
            showError(this, "Passwords do not match");
        } else {
            clearError(this);
        }
    });

    // Form submission validation
    form.addEventListener("submit", function (event) {
        let isValid = true;
        document.querySelectorAll("input[required], select[required]").forEach(input => {
            if (!input.value.trim()) {
                showError(input, "This field is required");
                isValid = false;
            }
        });
        if (!isValid) {
            event.preventDefault();
        }
    });
});



// Review
const reviewButton = document.getElementById('reviewButton');
const form = document.getElementById('patientform'); // Replace with your form's ID
const reviewModal = document.getElementById('reviewModal');
reviewButton.addEventListener('click', function (e) {
    if (!form.checkValidity()) {
        // If the form is invalid, trigger the browser's built-in validation UI
        form.classList.add('was-validated');
        form.reportValidity();
        return; // Stop - do NOT show the review modal
    }
    
    // If the form is valid, proceed to show the review modal
    showReviewModal(); // Replace this with your actual function to open the review
});
// Function to open review modal
function showReviewModal() {
   reviewContent.innerHTML = "";

    const formElements = form.elements;
    let reviewData = {};

    for (let element of formElements) {
        if (element.type !== "submit" && element.type !== "button") {
            let label = document.querySelector(`label[for='${element.id}']`)?.textContent || element.name;

            if (element.type === "radio" || element.type === "checkbox") {
                if (element.checked) {
                    if (!reviewData[label]) {
                        reviewData[label] = [];
                    }
                    reviewData[label].push(element.value);
                }
            } else if (element.value && element.value.trim() !== "") { // Fix applied here
                reviewData[label] = element.value;
            }
        }
    }

    for (let key in reviewData) {
        let value = Array.isArray(reviewData[key]) ? reviewData[key].join(", ") : reviewData[key];
        reviewContent.innerHTML += `<p><strong>${key}:</strong> ${value}</p>`;
    }

    reviewModal.style.display = "block";
}
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const reviewButton = document.getElementById("reviewButton");
    const reviewContent = document.getElementById("reviewContent");
    const reviewModal = document.getElementById("reviewModal");
    const editButton = document.getElementById("editButton");
    const confirmSubmit = document.getElementById("confirmSubmit");

    function showError(input, message) {
        let errorSpan = input.nextElementSibling;
        if (!errorSpan || !errorSpan.classList.contains("error")) {
            errorSpan = document.createElement("span");
            errorSpan.classList.add("error");
            input.parentNode.appendChild(errorSpan);
        }
        errorSpan.textContent = message;
    }

    function clearError(input) {
        let errorSpan = input.nextElementSibling;
        if (errorSpan && errorSpan.classList.contains("error")) {
            errorSpan.textContent = "";
        }
    }

    function validateInput(input, regex, message) {
        if (!regex.test(input.value)) {
            showError(input, message);
            return false;
        } else {
            clearError(input);
            return true;
        }
    }

    document.querySelector("input[name='date_of_birth']").addEventListener("change", function () {
        const dob = new Date(this.value);
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();
        if (age < 18) {
            showError(this, "You must be at least 18 years old");
        } else {
            clearError(this);
        }
    });

    document.querySelector("input[name='password']").addEventListener("input", function () {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        validateInput(this, regex, "Password must be at least 8 characters, include a letter, number, and special character");
    });

    document.querySelector("input[name='confirmpassword']").addEventListener("input", function () {
        const password = document.querySelector("input[name='password']").value;
        if (this.value !== password) {
            showError(this, "Passwords do not match");
        } else {
            clearError(this);
        }
    });

//   reviewButton.addEventListener("click", function () {
//     reviewContent.innerHTML = "";

//     const formElements = form.elements;
//     let reviewData = {};

//     for (let element of formElements) {
//         if (element.type !== "submit" && element.type !== "button") {
//             let label = document.querySelector(`label[for='${element.id}']`)?.textContent || element.name;

//             if (element.type === "radio" || element.type === "checkbox") {
//                 if (element.checked) {
//                     if (!reviewData[label]) {
//                         reviewData[label] = [];
//                     }
//                     reviewData[label].push(element.value);
//                 }
//             } else if (element.value && element.value.trim() !== "") { // Fix applied here
//                 reviewData[label] = element.value;
//             }
//         }
//     }

//     for (let key in reviewData) {
//         let value = Array.isArray(reviewData[key]) ? reviewData[key].join(", ") : reviewData[key];
//         reviewContent.innerHTML += `<p><strong>${key}:</strong> ${value}</p>`;
//     }

//     reviewModal.style.display = "block";
// });


    editButton.addEventListener("click", function () {
        reviewModal.style.display = "none";
    });

    confirmSubmit.addEventListener("click", function () {
        saveName();   // <-- Save the cookie first
        form.submit();
    });
});
  function clearForm() {
    document.querySelector('form').reset();
  }


  // assignment 4

  function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 86400 * 1000).toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + "; expires=" + expires + "; path=/";
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
}

function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

window.onload = function() {
    let firstName = getCookie('firstName');
    const heading = document.getElementById('welcomeHeading');
    const firstNameInput = document.querySelector('input[name="first_name"]');

    if (firstName) {
        heading.innerHTML = `Welcome back, ${firstName}! <button onclick="newUser()">Not ${firstName}? Click here</button>`;
        if (firstNameInput) {
            firstNameInput.value = firstName;
        }
    } else {
        heading.innerText = "Welcome New User!";
    }
}

function newUser() {
    deleteCookie('firstName');
    location.reload();
}

function saveName(event) {
    const firstName = document.querySelector('input[name="first_name"]').value.trim();
    const rememberMe = document.getElementById('rememberMe').checked;

    if (rememberMe && firstName) {
        setCookie('firstName', firstName, 2); // expires in 2 days
    } else {
        deleteCookie('firstName');
    }
}