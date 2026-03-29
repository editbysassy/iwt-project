// Dashboard JavaScript
let complaints = JSON.parse(localStorage.getItem('complaints') || '[]');

// Initialize dashboard on page load
document.addEventListener('DOMContentLoaded', function () {
    loadUserInfo();
    loadComplaints();
});

// Load user information
function loadUserInfo() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const userName = document.getElementById('userName');

    if (currentUser.email) {
        userName.textContent = currentUser.email.split('@')[0];
    } else {
        // If not logged in, redirect to login page
        window.location.href = 'login.html';
    }
}

// Show content section (sidebar navigation)
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Remove active class from all nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
    });

    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }

    // Set active nav item
    event.target.classList.add('active');
}

// Show top section (top navbar navigation)
function showTopSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Remove active class from all navbar links
    const navbarLinks = document.querySelectorAll('.navbar-link');
    navbarLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }

    // Set active navbar link
    if (event && event.target) {
        event.target.classList.add('active');
    }
}

// Handle complaint submission
function handleComplaint(event) {
    event.preventDefault();

    const category = document.getElementById('complaintCategory').value;
    const title = document.getElementById('complaintTitle').value;
    const description = document.getElementById('complaintDescription').value;
    const contact = document.getElementById('complaintContact').value;
    const anonymous = document.getElementById('complaintAnonymous').checked;

    if (!category || !title || !description || !contact) {
        alert('Please fill all required fields');
        return;
    }

    // Create complaint object
    const complaint = {
        id: Date.now(),
        category: category,
        title: title,
        description: description,
        contact: contact,
        anonymous: anonymous,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        status: 'Pending',
        userEmail: anonymous ? 'Anonymous' : JSON.parse(localStorage.getItem('currentUser') || '{}').email
    };

    // Add to complaints array
    complaints.push(complaint);
    localStorage.setItem('complaints', JSON.stringify(complaints));

    // Clear form
    document.querySelector('.complaint-form').reset();

    // Show success message
    alert('Complaint submitted successfully!\nTicket ID: ' + complaint.id + '\nStatus: Pending');

    // Reload complaints
    loadComplaints();
}

// Load and display complaints
function loadComplaints() {
    const complaintsList = document.getElementById('complaintsList');
    complaints = JSON.parse(localStorage.getItem('complaints') || '[]');

    // Get current user
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    // Filter complaints for current user
    const userComplaints = complaints.filter(c => {
        return (c.userEmail === currentUser.email || c.anonymous === true);
    });

    if (userComplaints.length === 0) {
        complaintsList.innerHTML = '<p class="no-complaints">No complaints filed yet.</p>';
        return;
    }

    // Display complaints
    complaintsList.innerHTML = '';
    userComplaints.forEach(complaint => {
        const complaintElement = document.createElement('div');
        complaintElement.className = 'complaint-item';
        complaintElement.innerHTML = `
            <div class="item-date">${complaint.date} at ${complaint.time}</div>
            <div class="item-title">${complaint.title}</div>
            <p>${complaint.description}</p>
            <div class="item-status">${complaint.status}</div>
            <p style="margin-top: 10px; color: #999; font-size: 12px;">Ticket ID: #${complaint.id}</p>
        `;
        complaintsList.appendChild(complaintElement);
    });
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    }
}

// Add smooth scrolling for navigation
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function () {
        // Remove active class from all items
        document.querySelectorAll('.nav-item').forEach(nav => {
            nav.classList.remove('active');
        });

        // Add active class to clicked item
        if (!this.classList.contains('logout')) {
            this.classList.add('active');
        }
    });
});

// Initialize with dashboard section active
document.addEventListener('DOMContentLoaded', function () {
    const dashboardSection = document.getElementById('dashboard');
    if (dashboardSection) {
        dashboardSection.classList.add('active');
    }

    const firstNavItem = document.querySelector('.nav-item');
    if (firstNavItem) {
        firstNavItem.classList.add('active');
    }
});
