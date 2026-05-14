// ===================================
// AUTHENTICATION
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    // Check if already logged in
    const currentUser = getCurrentUser();
    if (currentUser) {
        window.location.href = 'dashboard.html';
        return;
    }
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;
        
        // Validate
        if (!username || !password) {
            alert('Por favor, completa todos los campos');
            return;
        }
        
        // Authenticate
        const user = authenticateUser(username, password);
        
        if (user) {
            // Store user info (sin la contraseña)
            const userInfo = {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            };
            
            if (remember) {
                localStorage.setItem('rememberedUser', username);
            }
            
            setCurrentUser(userInfo);
            window.location.href = 'dashboard.html';
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    });
    
    // Pre-fill username if remembered
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
        document.getElementById('username').value = rememberedUser;
        document.getElementById('remember').checked = true;
    }
});
