// Check form errors
document.addEventListener("DOMContentLoaded", function () {
    // Get the form element
    var form = document.getElementById("conversion-form");

    // Add a submit event listener to the form
    form.addEventListener("submit", function (event) {
        // Prevent the default form submission
        event.preventDefault();

        // Perform your error checking here
        var nameInput = document.getElementById("dfName").value;
        var phoneInput = document.getElementById("dfPhone").value;
        var emailInput = document.getElementById("dfEmail").value;

        // Clean the phone number input
        phoneInput = cleanPhoneNumber(phoneInput);


        if (nameInput.trim() === "") {
            alert("Please enter your name.");
            return; // Prevent form submission if there's an error
        }

        if (!isValidPhoneNumber(phoneInput)) {
            alert("Please enter your phone number.");
            return; // Prevent form submission if there's an error
        }

        if (!isValidEmail(emailInput)) {
            alert("Please enter a valid email address.");
            return; // Prevent form submission if there's an error
        }

        // If there are no errors, you can submit the form and send the conversion to gtag
        gtag_report_conversion();
        form.submit();
    });

    // Find all elements with data-id="phoneConversion" and add a click event listener
    const phoneConversionLinks = document.querySelectorAll('[data-id="phoneConversion"]');
    phoneConversionLinks.forEach(link => {
        link.addEventListener("click", () => {
            gtag_report_conversion();
        });
    });

    function isValidPhoneNumber(phone) {
        var phonePattern = /^\d+$/;
        return phonePattern.test(phone);
    }

    // Function to validate email format
    function isValidEmail(email) {
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    }

    // Function to clean phone number input
    function cleanPhoneNumber(phone) {
        // Remove common symbols and non-numeric characters
        return phone.replace(/[^0-9]/g, "");
    }
});
