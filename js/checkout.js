// Exercise 6
function validate(event) {
  event.preventDefault();
  var error = 0;
  // Get the input fields
  var fName = document.getElementById("fName");
  var fEmail = document.getElementById("fEmail");
  var fAddress = document.getElementById("fAddress");
  var fLastN = document.getElementById("fLastN");
  var fPassword = document.getElementById("fPassword");
  var fPhone = document.getElementById("fPhone");

  // Get the error elements
  var errorName = document.getElementById("errorName");
  var errorEmail = document.getElementById("errorEmail");
  var errorAddress = document.getElementById("errorAddress");
  var errorLastN = document.getElementById("errorLastN");
  var errorPassword = document.getElementById("errorPassword");
  var errorPhone = document.getElementById("errorPhone");

  // Validate fields entered by the user: name, phone, password, and email
  [fName, fEmail, fAddress, fLastN, fPassword, fPhone].forEach((input) => {
    input.classList.remove("is-invalid");
  });

  if (fName.value === "" || /^[a-zA-Z ]{3,30}$/.test(fName.value) == false) {
    fName.classList.add("is-invalid");
    error++;
  }

  if (
    fEmail.value == "" ||
    fEmail.value.length < 3 ||
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(fEmail.value) ===
      false
  ) {
    fEmail.classList.add("is-invalid");
    error++;
  }

  if (fAddress.value === "" || fAddress.value.length < 3) {
    fAddress.classList.add("is-invalid");
    error++;
  }

  if (fLastN.value === "" || /^[a-zA-Z ]{3,30}$/.test(fLastN.value) == false) {
    fLastN.classList.add("is-invalid");
    error++;
  }

  if (
    fPassword.value.trim() === "" ||
    fPassword.value.trim().length < 3 ||
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/.test(
      fPassword.value.trim()
    ) == false
  ) {
    fPassword.classList.add("is-invalid");
    error++;
  }

  if (
    fPhone.value === "" ||
    fPhone.value.length < 3 ||
    /^\d{9}$/.test(fPhone.value) === false
  ) {
    fPhone.classList.add("is-invalid");
    error++;
  }

  if (error === 0) {
    event.target.submit();
  }
}
