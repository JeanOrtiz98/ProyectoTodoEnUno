// ===================================
// COMMON APP FUNCTIONALITY
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    checkAuth();
    
    // Initialize UI
    initializeSidebar();
    initializeUserInfo();
    
    // Setup logout
    setupLogout();
});

function checkAuth() {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }
}

function initializeSidebar() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    
    if (!menuToggle || !sidebar || !overlay) return;
    
    // Toggle sidebar on mobile
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    });
    
    // Close sidebar when clicking overlay
    overlay.addEventListener('click', function() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    });
    
    // Close sidebar when clicking nav item on mobile
    const navItems = sidebar.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 1024) {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
            }
        });
    });
}

function initializeUserInfo() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;
    
    const userAvatar = document.getElementById('userAvatar');
    const userName = document.getElementById('userName');
    const userRole = document.getElementById('userRole');
    
    if (userAvatar) {
        userAvatar.textContent = currentUser.username.charAt(0).toUpperCase();
    }
    
    if (userName) {
        userName.textContent = currentUser.username;
    }
    
    if (userRole) {
        userRole.textContent = currentUser.role === 'admin' ? 'Administrador' : 'Empleado';
    }
}

function setupLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (!logoutBtn) return;
    
    logoutBtn.addEventListener('click', function() {
        if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
            clearCurrentUser();
            window.location.href = 'index.html';
        }
    });
}

// Modal utilities
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    const overlay = document.getElementById('overlay');
    if (modal) {
        modal.classList.add('active');
        if (overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    const overlay = document.getElementById('overlay');
    if (modal) {
        modal.classList.remove('active');
        if (overlay && !document.querySelector('.sidebar.active')) {
            overlay.classList.remove('active');
        }
        document.body.style.overflow = '';
    }
}

// Format currency
function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(value);
}

// Get badge class for status
function getStatusBadgeClass(status) {
    switch(status) {
        case 'disponible':
            return 'badge-success';
        case 'bajo stock':
            return 'badge-warning';
        case 'agotado':
            return 'badge-danger';
        default:
            return 'badge-info';
    }
}

// Get status text in Spanish
function getStatusText(status) {
    switch(status) {
        case 'disponible':
            return 'Disponible';
        case 'bajo stock':
            return 'Bajo Stock';
        case 'agotado':
            return 'Agotado';
        default:
            return status;
    }
}

// Show notification (simple alert for now)
function showNotification(message, type = 'success') {
    // En una implementación más avanzada, usarías un toast/notification component
    alert(message);
}
