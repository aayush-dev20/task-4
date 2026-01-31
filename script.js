// Form Design & Validation - JavaScript File
document.addEventListener('DOMContentLoaded', function() {
    console.log("Form Validation System Initialized");
    
    // ========== GLOBAL VARIABLES ==========
    let submissionCount = 0;
    let successfulSubmissions = 0;
    let failedAttempts = 0;
    let formTimer = 0;
    let formData = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dob: '',
        username: '',
        password: '',
        confirmPassword: '',
        country: '',
        zipCode: '',
        gender: '',
        newsletter: true,
        comments: '',
        terms: false
    };
    
    // ========== DOM ELEMENTS ==========
    const form = document.getElementById('registrationForm');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const dob = document.getElementById('dob');
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const country = document.getElementById('country');
    const zipCode = document.getElementById('zipCode');
    const comments = document.getElementById('comments');
    const terms = document.getElementById('terms');
    const newsletter = document.getElementById('newsletter');
    const charCount = document.getElementById('charCount');
    const togglePassword = document.getElementById('togglePassword');
    
    // Validation summary elements
    const validCount = document.getElementById('validCount');
    const errorCount = document.getElementById('errorCount');
    const requiredCount = document.getElementById('requiredCount');
    const summaryMessage = document.getElementById('summaryMessage');
    const summaryDetails = document.getElementById('summaryDetails');
    
    // Results elements
    const resultsContainer = document.getElementById('resultsContainer');
    const successSubmissionsEl = document.getElementById('successSubmissions');
    const failedAttemptsEl = document.getElementById('failedAttempts');
    const formTimerEl = document.getElementById('formTimer');
    const clearResultsBtn = document.getElementById('clearResultsBtn');
    const exportResultsBtn = document.getElementById('exportResultsBtn');
    
    // Preview elements
    const formDataPreview = document.getElementById('formDataPreview');
    const lastUpdate = document.getElementById('lastUpdate');
    
    // Buttons
    const submitBtn = document.getElementById('submitBtn');
    const resetBtn = document.getElementById('resetBtn');
    const demoBtn = document.getElementById('demoBtn');
    
    // Password strength elements
    const strengthBar = document.getElementById('strengthBar');
    const strengthLabel = document.getElementById('strengthLabel');
    const passwordRequirements = {
        length: document.getElementById('reqLength'),
        uppercase: document.getElementById('reqUppercase'),
        lowercase: document.getElementById('reqLowercase'),
        number: document.getElementById('reqNumber'),
        special: document.getElementById('reqSpecial')
    };
    
    // ========== FORM VALIDATION FUNCTIONS ==========
    
    // Validate First Name
    function validateFirstName() {
        const value = firstName.value.trim();
        const validationEl = document.getElementById('firstNameValidation');
        
        if (value === '') {
            showError(firstName, validationEl, "First name is required");
            return false;
        } else if (value.length < 2) {
            showError(firstName, validationEl, "First name must be at least 2 characters");
            return false;
        } else if (!/^[A-Za-z\s\-']+$/.test(value)) {
            showError(firstName, validationEl, "First name can only contain letters, spaces, hyphens, and apostrophes");
            return false;
        } else {
            showSuccess(firstName, validationEl, "First name is valid");
            return true;
        }
    }
    
    // Validate Last Name
    function validateLastName() {
        const value = lastName.value.trim();
        const validationEl = document.getElementById('lastNameValidation');
        
        if (value === '') {
            showError(lastName, validationEl, "Last name is required");
            return false;
        } else if (value.length < 2) {
            showError(lastName, validationEl, "Last name must be at least 2 characters");
            return false;
        } else if (!/^[A-Za-z\s\-']+$/.test(value)) {
            showError(lastName, validationEl, "Last name can only contain letters, spaces, hyphens, and apostrophes");
            return false;
        } else {
            showSuccess(lastName, validationEl, "Last name is valid");
            return true;
        }
    }
    
    // Validate Email
    function validateEmail() {
        const value = email.value.trim();
        const validationEl = document.getElementById('emailValidation');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (value === '') {
            showError(email, validationEl, "Email address is required");
            return false;
        } else if (!emailRegex.test(value)) {
            showError(email, validationEl, "Please enter a valid email address (e.g., user@example.com)");
            return false;
        } else if (value.length > 100) {
            showError(email, validationEl, "Email address is too long");
            return false;
        } else {
            showSuccess(email, validationEl, "Email address is valid");
            return true;
        }
    }
    
    // Validate Phone
    function validatePhone() {
        const value = phone.value.trim();
        const validationEl = document.getElementById('phoneValidation');
        
        // If empty, it's optional so it's valid
        if (value === '') {
            showSuccess(phone, validationEl, "");
            return true;
        }
        
        const phoneRegex = /^(\+\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/;
        
        if (!phoneRegex.test(value)) {
            showError(phone, validationEl, "Please enter a valid phone number (e.g., 123-456-7890 or (123) 456-7890)");
            return false;
        } else {
            showSuccess(phone, validationEl, "Phone number is valid");
            return true;
        }
    }
    
    // Validate Date of Birth
    function validateDOB() {
        const value = dob.value;
        const validationEl = document.getElementById('dobValidation');
        
        if (value === '') {
            showError(dob, validationEl, "Date of birth is required");
            return false;
        }
        
        const selectedDate = new Date(value);
        const today = new Date();
        const minDate = new Date();
        minDate.setFullYear(today.getFullYear() - 120); // 120 years ago
        const maxDate = new Date();
        maxDate.setFullYear(today.getFullYear() - 13); // Must be at least 13 years old
        
        if (selectedDate < minDate) {
            showError(dob, validationEl, "Please enter a valid date (you can't be older than 120 years)");
            return false;
        } else if (selectedDate > maxDate) {
            showError(dob, validationEl, "You must be at least 13 years old to register");
            return false;
        } else {
            showSuccess(dob, validationEl, "Date of birth is valid");
            return true;
        }
    }
    
    // Validate Username
    function validateUsername() {
        const value = username.value.trim();
        const validationEl = document.getElementById('usernameValidation');
        
        if (value === '') {
            showError(username, validationEl, "Username is required");
            return false;
        } else if (value.length < 4 || value.length > 20) {
            showError(username, validationEl, "Username must be between 4 and 20 characters");
            return false;
        } else if (!/^[A-Za-z0-9_]+$/.test(value)) {
            showError(username, validationEl, "Username can only contain letters, numbers, and underscores");
            return false;
        } else if (/^[0-9]/.test(value)) {
            showError(username, validationEl, "Username cannot start with a number");
            return false;
        } else {
            // Check if username is already taken (simulated)
            const takenUsernames = ['admin', 'user', 'test', 'demo', 'john'];
            if (takenUsernames.includes(value.toLowerCase())) {
                showError(username, validationEl, "This username is already taken");
                return false;
            } else {
                showSuccess(username, validationEl, "Username is available");
                return true;
            }
        }
    }
    
    // Validate Password
    function validatePassword() {
        const value = password.value;
        const validationEl = document.getElementById('passwordValidation');
        
        if (value === '') {
            showError(password, validationEl, "Password is required");
            updatePasswordStrength(value);
            return false;
        }
        
        // Check password requirements
        const hasLength = value.length >= 8;
        const hasUppercase = /[A-Z]/.test(value);
        const hasLowercase = /[a-z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
        
        // Update requirement indicators
        updateRequirementIndicator(passwordRequirements.length, hasLength);
        updateRequirementIndicator(passwordRequirements.uppercase, hasUppercase);
        updateRequirementIndicator(passwordRequirements.lowercase, hasLowercase);
        updateRequirementIndicator(passwordRequirements.number, hasNumber);
        updateRequirementIndicator(passwordRequirements.special, hasSpecial);
        
        // Calculate password strength
        updatePasswordStrength(value);
        
        if (!hasLength || !hasUppercase || !hasLowercase || !hasNumber || !hasSpecial) {
            showError(password, validationEl, "Password does not meet all requirements");
            return false;
        } else if (value.length > 50) {
            showError(password, validationEl, "Password is too long (max 50 characters)");
            return false;
        } else {
            showSuccess(password, validationEl, "Password meets all requirements");
            return true;
        }
    }
    
    // Validate Confirm Password
    function validateConfirmPassword() {
        const value = confirmPassword.value;
        const validationEl = document.getElementById('confirmPasswordValidation');
        
        if (value === '') {
            showError(confirmPassword, validationEl, "Please confirm your password");
            return false;
        } else if (value !== password.value) {
            showError(confirmPassword, validationEl, "Passwords do not match");
            return false;
        } else {
            showSuccess(confirmPassword, validationEl, "Passwords match");
            return true;
        }
    }
    
    // Validate Country
    function validateCountry() {
        const value = country.value;
        const validationEl = document.getElementById('countryValidation');
        
        if (value === '') {
            showError(country, validationEl, "Please select your country");
            return false;
        } else {
            showSuccess(country, validationEl, "");
            return true;
        }
    }
    
    // Validate ZIP Code
    function validateZipCode() {
        const value = zipCode.value.trim();
        const validationEl = document.getElementById('zipCodeValidation');
        const selectedCountry = country.value;
        
        // If empty, it's optional so it's valid
        if (value === '') {
            showSuccess(zipCode, validationEl, "");
            return true;
        }
        
        let zipRegex;
        
        // Different validation based on country
        switch(selectedCountry) {
            case 'US':
                zipRegex = /^\d{5}(-\d{4})?$/; // US ZIP code
                break;
            case 'CA':
                zipRegex = /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/; // Canadian postal code
                break;
            case 'UK':
                zipRegex = /^[A-Za-z]{1,2}\d[A-Za-z\d]? ?\d[A-Za-z]{2}$/; // UK postcode
                break;
            case 'AU':
                zipRegex = /^\d{4}$/; // Australian postcode
                break;
            default:
                zipRegex = /^[A-Za-z0-9\-\s]{3,10}$/; // Generic for other countries
        }
        
        if (!zipRegex.test(value)) {
            let errorMsg = "Please enter a valid ";
            switch(selectedCountry) {
                case 'US': errorMsg += "US ZIP code (e.g., 12345 or 12345-6789)"; break;
                case 'CA': errorMsg += "Canadian postal code (e.g., A1A 1A1)"; break;
                case 'UK': errorMsg += "UK postcode (e.g., SW1A 1AA)"; break;
                case 'AU': errorMsg += "Australian postcode (e.g., 2000)"; break;
                default: errorMsg += "postal/ZIP code";
            }
            showError(zipCode, validationEl, errorMsg);
            return false;
        } else {
            showSuccess(zipCode, validationEl, "ZIP/Postal code is valid");
            return true;
        }
    }
    
    // Validate Terms
    function validateTerms() {
        const validationEl = document.getElementById('termsValidation');
        
        if (!terms.checked) {
            showError(terms, validationEl, "You must agree to the terms and conditions");
            return false;
        } else {
            showSuccess(terms, validationEl, "");
            return true;
        }
    }
    
    // ========== HELPER FUNCTIONS ==========
    
    // Show error state
    function showError(inputElement, validationElement, message) {
        inputElement.classList.remove('valid');
        inputElement.classList.add('error');
        validationElement.textContent = message;
        validationElement.classList.remove('success');
        validationElement.classList.add('error');
    }
    
    // Show success state
    function showSuccess(inputElement, validationElement, message) {
        inputElement.classList.remove('error');
        inputElement.classList.add('valid');
        validationElement.textContent = message;
        validationElement.classList.remove('error');
        validationElement.classList.add('success');
    }
    
    // Update password requirement indicator
    function updateRequirementIndicator(element, isValid) {
        if (isValid) {
            element.classList.add('valid');
            element.querySelector('i').className = 'fas fa-check';
        } else {
            element.classList.remove('valid');
            element.querySelector('i').className = 'fas fa-times';
        }
    }
    
    // Update password strength indicator
    function updatePasswordStrength(password) {
        let strength = 0;
        let label = '';
        let color = '';
        
        if (password.length === 0) {
            strength = 0;
            label = 'Very Weak';
            color = '#e74c3c';
        } else if (password.length < 8) {
            strength = 20;
            label = 'Weak';
            color = '#e74c3c';
        } else {
            // Calculate strength based on requirements met
            const requirements = [
                password.length >= 8,
                /[A-Z]/.test(password),
                /[a-z]/.test(password),
                /[0-9]/.test(password),
                /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
            ];
            
            const metCount = requirements.filter(Boolean).length;
            
            switch(metCount) {
                case 1:
                    strength = 20;
                    label = 'Weak';
                    color = '#e74c3c';
                    break;
                case 2:
                    strength = 40;
                    label = 'Fair';
                    color = '#f39c12';
                    break;
                case 3:
                    strength = 60;
                    label = 'Good';
                    color = '#f1c40f';
                    break;
                case 4:
                    strength = 80;
                    label = 'Strong';
                    color = '#2ecc71';
                    break;
                case 5:
                    strength = 100;
                    label = 'Very Strong';
                    color = '#27ae60';
                    break;
                default:
                    strength = 0;
                    label = 'Very Weak';
                    color = '#e74c3c';
            }
        }
        
        // Update UI
        strengthBar.style.width = `${strength}%`;
        strengthBar.style.backgroundColor = color;
        strengthLabel.textContent = label;
        strengthLabel.style.color = color;
    }
    
    // Update character counter
    function updateCharCounter() {
        const count = comments.value.length;
        charCount.textContent = count;
        
        if (count > 500) {
            charCount.style.color = '#e74c3c';
        } else if (count > 400) {
            charCount.style.color = '#f39c12';
        } else {
            charCount.style.color = '#2ecc71';
        }
    }
    
    // Update validation summary
    function updateValidationSummary() {
        const validations = [
            validateFirstName(),
            validateLastName(),
            validateEmail(),
            validatePhone(),
            validateDOB(),
            validateUsername(),
            validatePassword(),
            validateConfirmPassword(),
            validateCountry(),
            validateZipCode(),
            validateTerms()
        ];
        
        const totalValid = validations.filter(Boolean).length;
        const totalErrors = validations.length - totalValid;
        const requiredFields = 9; // Number of required fields
        const filledRequired = validations.filter((valid, index) => index < requiredFields && valid).length;
        
        // Update counts
        validCount.textContent = totalValid;
        errorCount.textContent = totalErrors;
        requiredCount.textContent = filledRequired;
        
        // Update summary message
        if (totalErrors === 0) {
            summaryMessage.innerHTML = '<i class="fas fa-check-circle" style="color: #2ecc71;"></i> All fields are valid! You can submit the form.';
            summaryDetails.innerHTML = '';
        } else {
            summaryMessage.innerHTML = `<i class="fas fa-exclamation-triangle" style="color: #f39c12;"></i> There are ${totalErrors} validation error(s) to fix.`;
            
            // Show error details
            let detailsHTML = '<p><strong>Issues to fix:</strong></p><ul>';
            
            if (!validateFirstName()) detailsHTML += '<li><i class="fas fa-times" style="color: #e74c3c;"></i> First Name</li>';
            if (!validateLastName()) detailsHTML += '<li><i class="fas fa-times" style="color: #e74c3c;"></i> Last Name</li>';
            if (!validateEmail()) detailsHTML += '<li><i class="fas fa-times" style="color: #e74c3c;"></i> Email Address</li>';
            if (!validateDOB()) detailsHTML += '<li><i class="fas fa-times" style="color: #e74c3c;"></i> Date of Birth</li>';
            if (!validateUsername()) detailsHTML += '<li><i class="fas fa-times" style="color: #e74c3c;"></i> Username</li>';
            if (!validatePassword()) detailsHTML += '<li><i class="fas fa-times" style="color: #e74c3c;"></i> Password</li>';
            if (!validateConfirmPassword()) detailsHTML += '<li><i class="fas fa-times" style="color: #e74c3c;"></i> Confirm Password</li>';
            if (!validateCountry()) detailsHTML += '<li><i class="fas fa-times" style="color: #e74c3c;"></i> Country</li>';
            if (!validateTerms()) detailsHTML += '<li><i class="fas fa-times" style="color: #e74c3c;"></i> Terms & Conditions</li>';
            
            detailsHTML += '</ul>';
            summaryDetails.innerHTML = detailsHTML;
        }
    }
    
    // Update form data preview
    function updateFormDataPreview() {
        // Update formData object
        formData.firstName = firstName.value.trim();
        formData.lastName = lastName.value.trim();
        formData.email = email.value.trim();
        formData.phone = phone.value.trim();
        formData.dob = dob.value;
        formData.username = username.value.trim();
        formData.password = password.value ? '********' : '';
        formData.confirmPassword = confirmPassword.value ? '********' : '';
        formData.country = country.value;
        formData.zipCode = zipCode.value.trim();
        
        // Get selected gender
        const genderRadio = document.querySelector('input[name="gender"]:checked');
        formData.gender = genderRadio ? genderRadio.value : '';
        
        formData.newsletter = newsletter.checked;
        formData.comments = comments.value;
        formData.terms = terms.checked;
        
        // Update preview
        formDataPreview.textContent = JSON.stringify(formData, null, 2);
        
        // Update timestamp
        const now = new Date();
        lastUpdate.textContent = `Last update: ${now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}`;
    }
    
    // Add submission to results
    function addSubmissionToResults(isSuccess, data) {
        submissionCount++;
        const submissionId = `SUB-${String(submissionCount).padStart(3, '0')}`;
        const timestamp = new Date().toLocaleString();
        
        const submissionHTML = `
            <div class="submission-item ${isSuccess ? '' : 'error'}">
                <div class="submission-header">
                    <span class="submission-id">${submissionId}</span>
                    <span class="submission-time">${timestamp}</span>
                </div>
                <div class="submission-data">
                    <p><strong>Status:</strong> ${isSuccess ? '<span style="color: #2ecc71;">Success</span>' : '<span style="color: #e74c3c;">Failed</span>'}</p>
                    <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
                    <p><strong>Email:</strong> ${data.email}</p>
                    <p><strong>Username:</strong> ${data.username}</p>
                    <p><strong>Country:</strong> ${getCountryName(data.country)}</p>
                </div>
            </div>
        `;
        
        // Remove empty state if present
        const emptyResults = resultsContainer.querySelector('.empty-results');
        if (emptyResults) {
            emptyResults.remove();
        }
        
        // Add new submission at the top
        resultsContainer.insertAdjacentHTML('afterbegin', submissionHTML);
    }
    
    // Get country name from code
    function getCountryName(code) {
        const countries = {
            'US': 'United States',
            'CA': 'Canada',
            'UK': 'United Kingdom',
            'AU': 'Australia',
            'DE': 'Germany',
            'FR': 'France',
            'JP': 'Japan',
            'other': 'Other'
        };
        
        return countries[code] || code;
    }
    
    // Export results as JSON
    function exportResultsAsJSON() {
        const submissions = [];
        const submissionItems = resultsContainer.querySelectorAll('.submission-item');
        
        if (submissionItems.length === 0) {
            alert('No submissions to export.');
            return;
        }
        
        submissionItems.forEach(item => {
            const id = item.querySelector('.submission-id').textContent;
            const time = item.querySelector('.submission-time').textContent;
            const status = item.classList.contains('error') ? 'Failed' : 'Success';
            
            // Extract data from submission (simplified)
            const dataElements = item.querySelectorAll('.submission-data p');
            const name = dataElements[1]?.textContent.replace('Name:', '').trim() || '';
            const email = dataElements[2]?.textContent.replace('Email:', '').trim() || '';
            const username = dataElements[3]?.textContent.replace('Username:', '').trim() || '';
            const country = dataElements[4]?.textContent.replace('Country:', '').trim() || '';
            
            submissions.push({
                id,
                timestamp: time,
                status,
                name,
                email,
                username,
                country
            });
        });
        
        const dataStr = JSON.stringify(submissions, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `form-submissions-${new Date().toISOString().split('T')[0]}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }
    
    // Fill form with demo data
    function fillDemoData() {
        firstName.value = 'John';
        lastName.value = 'Doe';
        email.value = 'john.doe@example.com';
        phone.value = '(123) 456-7890';
        dob.value = '1990-01-15';
        username.value = 'johndoe2023';
        password.value = 'SecurePass123!';
        confirmPassword.value = 'SecurePass123!';
        country.value = 'US';
        zipCode.value = '12345';
        document.querySelector('input[name="gender"][value="male"]').checked = true;
        newsletter.checked = true;
        comments.value = 'This is a demo submission for testing the form validation system.';
        terms.checked = true;
        
        // Trigger validation for all fields
        validateFirstName();
        validateLastName();
        validateEmail();
        validatePhone();
        validateDOB();
        validateUsername();
        validatePassword();
        validateConfirmPassword();
        validateCountry();
        validateZipCode();
        validateTerms();
        updateCharCounter();
        updateValidationSummary();
        updateFormDataPreview();
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // ========== EVENT LISTENERS ==========
    
    // Real-time validation on input
    firstName.addEventListener('input', function() {
        validateFirstName();
        updateValidationSummary();
        updateFormDataPreview();
    });
    
    lastName.addEventListener('input', function() {
        validateLastName();
        updateValidationSummary();
        updateFormDataPreview();
    });
    
    email.addEventListener('input', function() {
        validateEmail();
        updateValidationSummary();
        updateFormDataPreview();
    });
    
    phone.addEventListener('input', function() {
        validatePhone();
        updateValidationSummary();
        updateFormDataPreview();
    });
    
    dob.addEventListener('input', function() {
        validateDOB();
        updateValidationSummary();
        updateFormDataPreview();
    });
    
    username.addEventListener('input', function() {
        validateUsername();
        updateValidationSummary();
        updateFormDataPreview();
    });
    
    password.addEventListener('input', function() {
        validatePassword();
        validateConfirmPassword(); // Also validate confirm password when password changes
        updateValidationSummary();
        updateFormDataPreview();
    });
    
    confirmPassword.addEventListener('input', function() {
        validateConfirmPassword();
        updateValidationSummary();
        updateFormDataPreview();
    });
    
    country.addEventListener('change', function() {
        validateCountry();
        validateZipCode(); // Re-validate ZIP code when country changes
        updateValidationSummary();
        updateFormDataPreview();
    });
    
    zipCode.addEventListener('input', function() {
        validateZipCode();
        updateValidationSummary();
        updateFormDataPreview();
    });
    
    comments.addEventListener('input', function() {
        updateCharCounter();
        updateFormDataPreview();
    });
    
    terms.addEventListener('change', function() {
        validateTerms();
        updateValidationSummary();
        updateFormDataPreview();
    });
    
    // Gender radio buttons
    document.querySelectorAll('input[name="gender"]').forEach(radio => {
        radio.addEventListener('change', function() {
            updateFormDataPreview();
        });
    });
    
    newsletter.addEventListener('change', function() {
        updateFormDataPreview();
    });
    
    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        
        const icon = this.querySelector('i');
        icon.className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isFirstNameValid = validateFirstName();
        const isLastNameValid = validateLastName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isDOBValid = validateDOB();
        const isUsernameValid = validateUsername();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        const isCountryValid = validateCountry();
        const isZipCodeValid = validateZipCode();
        const isTermsValid = validateTerms();
        
        const allValid = isFirstNameValid && isLastNameValid && isEmailValid && 
                         isPhoneValid && isDOBValid && isUsernameValid && 
                         isPasswordValid && isConfirmPasswordValid && 
                         isCountryValid && isZipCodeValid && isTermsValid;
        
        if (allValid) {
            // Form is valid - process submission
            successfulSubmissions++;
            successSubmissionsEl.textContent = successfulSubmissions;
            
            // Create submission data object
            const submissionData = {
                firstName: firstName.value.trim(),
                lastName: lastName.value.trim(),
                email: email.value.trim(),
                phone: phone.value.trim(),
                dob: dob.value,
                username: username.value.trim(),
                country: country.value,
                gender: document.querySelector('input[name="gender"]:checked')?.value || '',
                newsletter: newsletter.checked,
                comments: comments.value,
                timestamp: new Date().toISOString()
            };
            
            // Add to results
            addSubmissionToResults(true, submissionData);
            
            // Show success message
            summaryMessage.innerHTML = `
                <div style="background-color: #d4edda; color: #155724; padding: 15px; border-radius: 8px; border-left: 4px solid #28a745;">
                    <i class="fas fa-check-circle" style="color: #28a745; margin-right: 10px;"></i>
                    <strong>Form submitted successfully!</strong><br>
                    Your registration has been received. A confirmation email has been sent to ${email.value.trim()}.
                </div>
            `;
            
            // Reset form after successful submission (optional)
            // setTimeout(() => {
            //     form.reset();
            //     updateValidationSummary();
            //     updateFormDataPreview();
            //     updateCharCounter();
            // }, 3000);
            
        } else {
            // Form has errors
            failedAttempts++;
            failedAttemptsEl.textContent = failedAttempts;
            
            // Show error message
            summaryMessage.innerHTML = `
                <div style="background-color: #f8d7da; color: #721c24; padding: 15px; border-radius: 8px; border-left: 4px solid #dc3545;">
                    <i class="fas fa-exclamation-triangle" style="color: #dc3545; margin-right: 10px;"></i>
                    <strong>Form submission failed!</strong><br>
                    Please fix the validation errors highlighted above before submitting.
                </div>
            `;
            
            // Scroll to first error
            const firstError = document.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
        
        // Update validation summary
        updateValidationSummary();
    });
    
    // Reset form
    resetBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to reset the form? All entered data will be lost.')) {
            form.reset();
            
            // Clear all validation messages
            document.querySelectorAll('.validation-message').forEach(el => {
                el.textContent = '';
                el.classList.remove('error', 'success');
            });
            
            // Clear input classes
            document.querySelectorAll('.input-with-icon input, .input-with-icon select, textarea').forEach(input => {
                input.classList.remove('error', 'valid');
            });
            
            // Reset password strength
            updatePasswordStrength('');
            document.querySelectorAll('.password-requirements li').forEach(li => {
                li.classList.remove('valid');
                li.querySelector('i').className = 'fas fa-times';
            });
            
            // Reset character counter
            updateCharCounter();
            
            // Reset validation summary
            updateValidationSummary();
            
            // Reset form data preview
            updateFormDataPreview();
            
            // Reset summary message
            summaryMessage.textContent = 'Form has not been submitted yet. Please fill out the form and submit to see validation results.';
            summaryDetails.innerHTML = '';
        }
    });
    
    // Fill demo data
    demoBtn.addEventListener('click', fillDemoData);
    
    // Clear results
    clearResultsBtn.addEventListener('click', function() {
        if (resultsContainer.children.length > 0 && confirm('Are you sure you want to clear all submission results?')) {
            resultsContainer.innerHTML = `
                <div class="empty-results">
                    <i class="fas fa-inbox"></i>
                    <h4>No Submissions Yet</h4>
                    <p>Your submitted form data will appear here.</p>
                </div>
            `;
        }
    });
    
    // Export results
    exportResultsBtn.addEventListener('click', exportResultsAsJSON);
    
    // Terms link
    document.getElementById('termsLink').addEventListener('click', function(e) {
        e.preventDefault();
        alert('Terms and Conditions:\n\n1. You agree to provide accurate information.\n2. Your data will be processed according to our privacy policy.\n3. You must be at least 13 years old to register.\n4. You are responsible for maintaining the confidentiality of your account.\n\nBy checking the box, you acknowledge that you have read and agree to these terms.');
    });
    
    // ========== INITIALIZATION ==========
    
    // Set max date for DOB (13 years ago)
    const today = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(today.getFullYear() - 13);
    dob.max = maxDate.toISOString().split('T')[0];
    
    // Set min date for DOB (120 years ago)
    const minDate = new Date();
    minDate.setFullYear(today.getFullYear() - 120);
    dob.min = minDate.toISOString().split('T')[0];
    
    // Initialize character counter
    updateCharCounter();
    
    // Initialize validation summary
    updateValidationSummary();
    
    // Initialize form data preview
    updateFormDataPreview();
    
    // Start form timer
    setInterval(() => {
        formTimer++;
        formTimerEl.textContent = formTimer;
    }, 1000);
    
    console.log("Form Validation System Ready");
});