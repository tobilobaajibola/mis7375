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
// function showReviewModal() {
//     reviewContent.innerHTML = "";

//     const excludedNames = ['password', 'g-recaptcha-response'];
//     const excludedTypes = ['password', 'hidden'];
//     const excludedIds = ['g-recaptcha']; // Add your CAPTCHA div ID if needed

//     let reviewData = {};

//     for (let element of form.elements) {
//         const label = document.querySelector(`label[for='${element.id}']`)?.textContent || element.name;

//         if (
//             element.type === "submit" ||
//             element.type === "button" ||
//             excludedTypes.includes(element.type) ||
//             excludedNames.includes(element.name) ||
//             excludedIds.includes(element.id)
//         ) {
//             continue;
//         }

//         if (element.type === "radio" || element.type === "checkbox") {
//             if (element.checked) {
//                 if (!reviewData[label]) {
//                     reviewData[label] = [];
//                 }
//                 reviewData[label].push(element.value);
//             }
//         } else if (element.value.trim() !== "") {
//             reviewData[label] = element.value;
//         }
//     }

//     for (let key in reviewData) {
//         const value = Array.isArray(reviewData[key]) ? reviewData[key].join(", ") : reviewData[key];
//         reviewContent.innerHTML += `<p><strong>${key}:</strong> ${value}</p>`;
//     }

//     reviewModal.style.display = "block";
// }

function showReviewModal() {
   reviewContent.innerHTML = "";

    const formElements = form.elements;
        const excludedNames = ['password', 'g-recaptcha-response'];
    const excludedTypes = ['password', 'hidden'];
    const excludedIds = ['g-recaptcha']; // Add your CAPTCHA div ID if needed
    let reviewData = {};

    for (let element of formElements) {
         if (
            element.type === "submit" ||
            element.type === "button" ||
            excludedTypes.includes(element.type) ||
            excludedNames.includes(element.name) ||
            excludedIds.includes(element.id)
        ) {
            continue;
        }
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

    // confirmSubmit.addEventListener("click", function () {
    //     saveName();   // <-- Save the cookie first
    //     form.submit();
    // });
});
  function clearForm() {
    document.querySelector('form').reset();
  }
// confirmSubmit

// close button to refresh the page:
// document.getElementById("closeThankYou").addEventListener("click", function () {
//   location.reload(); // Refresh the page (preserves localStorage)
// });

  // assignment 4

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("patientform");
  const fieldsets = form.querySelectorAll("fieldset");
  const steps = document.querySelectorAll("#step-tracker .step");
  const progressBar = document.getElementById("progress-bar");
  let currentStep = 0;

  const heading = document.getElementById("welcomeHeading");
  const firstNameInput = form.querySelector('input[name="first_name"]');
  const rememberMe = document.getElementById("rememberMe");

  const storedName = getCookie("firstName");
  const storedForm = localStorage.getItem("formData");

  // Show welcome message and restoration options
  if (storedName) {
    heading.innerHTML = `
      Welcome back, ${storedName}!
      <button id="continueBtn">Continue where I left off</button>
      <button onclick="newUser()">Not ${storedName}? Click here</button>
    `;
    if (firstNameInput) {
      firstNameInput.value = storedName;
    }

    document.getElementById("continueBtn").addEventListener("click", () => {
      if (storedForm) loadFormData();
    });
  } else {
    heading.innerText = "Welcome New User!";
  }

  // Show the first step and update progress
  fieldsets[currentStep].classList.add("active");
  updateUI();

  // Navigation
  form.querySelectorAll(".next").forEach(btn =>
    btn.addEventListener("click", () => {
      if (validateCurrentStep()) {
        currentStep = Math.min(currentStep + 1, fieldsets.length - 1);
        showStep(currentStep);
      }
    })
  );

  form.querySelectorAll(".prev").forEach(btn =>
    btn.addEventListener("click", () => {
      currentStep = Math.max(currentStep - 1, 0);
      showStep(currentStep);
    })
  );

  // Save to localStorage on input change
  form.querySelectorAll("input, select, textarea").forEach(field => {
    field.addEventListener("input", saveFormData);
  });

  // Save cookie if "Remember Me" is checked
  form.addEventListener("submit", (e) => {
    if (rememberMe && firstNameInput.value.trim()) {
      setCookie("firstName", firstNameInput.value.trim(), 2);
    } else {
      deleteCookie("firstName");
    }
  });

  function showStep(index) {
    fieldsets.forEach((fs, i) => fs.classList.toggle("active", i === index));
    currentStep = index;
    updateUI();
  }

  function updateUI() {
    steps.forEach((step, i) => {
      step.classList.toggle("active", i === currentStep);
    });
    const progressPercent = ((currentStep + 1) / fieldsets.length) * 100;
    progressBar.style.width = `${progressPercent}%`;
  }

  function validateCurrentStep() {
    const currentFields = fieldsets[currentStep].querySelectorAll("input, select, textarea");
    for (let field of currentFields) {
      if (!field.checkValidity()) {
        field.reportValidity();
        return false;
      }
    }
    return true;
  }


  function loadFormData() {
    const data = JSON.parse(localStorage.getItem("formData") || "{}");
    form.querySelectorAll("input, select, textarea").forEach(field => {
      if (data.hasOwnProperty(field.name)) {
        if (field.type === "checkbox" || field.type === "radio") {
          field.checked = data[field.name];
        } else {
          field.value = data[field.name];
        }
      }
    });
  }

  // Cookie Helpers
  function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
  }

  function getCookie(name) {
    return document.cookie
      .split("; ")
      .find(row => row.startsWith(name + "="))
      ?.split("=")[1];
  }

  function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

  window.newUser = () => {
    deleteCookie("firstName");
    localStorage.removeItem("formData");
    location.reload();
  };
});

document.getElementById("confirmSubmit").addEventListener("click", () => {
  saveFormData();

  reviewContent.innerHTML = "<h4>Thank you for submitting!</h4><button id='closeModal'>Close</button>";
  document.getElementById("editButton").style.display = "none";
  document.getElementById("confirmSubmit").style.display = "none";
  // Trigger actual form submission so the cookie logic runs
  document.getElementById("patientform").requestSubmit(); // this triggers the submit event properly

  document.getElementById("closeModal").addEventListener("click", () => {
    location.reload();
  });
});


  function saveFormData() {
    const formData = {};
    form.querySelectorAll("input, select, textarea").forEach(field => {
      if (field.type === "checkbox" || field.type === "radio") {
        formData[field.name] = field.checked;
      } else {
        formData[field.name] = field.value;
      }
    });
    localStorage.setItem("formData", JSON.stringify(formData));
 
  }


// get the list of states in j
document.addEventListener("DOMContentLoaded", () => {
  const stateSelect = document.getElementById("state");

  fetch("assets/js/states.json") // replace with your actual API URL
    .then(response => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then(data => {
      data.forEach(state => {
        const option = document.createElement("option");
        option.value = state.code || state.name; // use appropriate key
        option.textContent = state.name;
        stateSelect.appendChild(option);
      });
    })
    .catch(error => {
      console.error("Error loading states:", error);
      // Optionally show an error message in the UI
    });
});
