// Toggle between login and register forms
function toggleForms() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    loginForm.classList.toggle('active');
    registerForm.classList.toggle('active');
}

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const userType = document.getElementById('userType').value;

    if (!email || !password || !userType) {
        alert('Please fill all fields');
        return;
    }

    // Validate credentials (simple validation for demo)
    if (email && password && userType) {
        // Store user info in localStorage
        localStorage.setItem('currentUser', JSON.stringify({
            email: email,
            userType: userType
        }));

        alert(`Welcome ${userType.charAt(0).toUpperCase() + userType.slice(1)}!\nRedirecting to dashboard...`);

        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    }
}

// Handle register form submission
function handleRegister(event) {
    event.preventDefault();

    const fullName = document.getElementById('regFullName').value;
    const email = document.getElementById('regEmail').value;
    const phone = document.getElementById('regPhone').value;
    const rollNo = document.getElementById('regRollNo').value;
    const userType = document.getElementById('regUserType').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;

    // Validate all fields
    if (!fullName || !email || !phone || !rollNo || !userType || !password || !confirmPassword) {
        alert('Please fill all fields');
        return;
    }

    // Validate password match
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    // Validate password length
    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }

    // Store user data in localStorage
    const userData = {
        fullName: fullName,
        email: email,
        phone: phone,
        rollNo: rollNo,
        userType: userType,
        password: password,
        registeredDate: new Date().toLocaleDateString()
    };

    // Save to localStorage (in a real app, this would be sent to a server)
    let users = JSON.parse(localStorage.getItem('collegeUsers') || '[]');

    // Check if email already exists
    if (users.some(user => user.email === email)) {
        alert('Email already registered. Please use a different email.');
        return;
    }

    users.push(userData);
    localStorage.setItem('collegeUsers', JSON.stringify(users));

    alert(`Registration successful, ${fullName}!\nYour account has been created.\nPlease login to continue.`);

    // Clear form and switch back to login
    document.querySelector('.complaint-form')?.reset();
    toggleForms();
}
