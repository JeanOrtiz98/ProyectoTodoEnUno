// ===================================
// USERS PAGE
// ===================================

let currentUsers = [];
let editingUserId = null;
let deletingUserId = null;

document.addEventListener('DOMContentLoaded', function() {
    checkAdminPermission();
    loadUsers();
    initializeUserModal();
    initializeDeleteModal();
});

function checkAdminPermission() {
    const currentUser = getCurrentUser();
    const addUserBtn = document.getElementById('addUserBtn');
    const permissionAlert = document.getElementById('permissionAlert');
    
    if (currentUser.role !== 'admin') {
        addUserBtn.style.display = 'none';
        permissionAlert.style.display = 'flex';
    }
}

function loadUsers() {
    currentUsers = getUsers();
    renderUsers(currentUsers);
    updateUserCount(currentUsers.length);
}

function renderUsers(users) {
    renderUsersTable(users);
    renderUsersCards(users);
}

function renderUsersTable(users) {
    const tbody = document.getElementById('usersTable');
    const currentUser = getCurrentUser();
    const isAdmin = currentUser.role === 'admin';
    
    if (users.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center">No hay usuarios disponibles</td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = users.map(user => `
        <tr>
            <td>
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div class="user-avatar" style="width: 36px; height: 36px; font-size: 0.875rem;">
                        ${user.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p style="font-weight: 600; margin-bottom: 2px;">${user.username}</p>
                        ${user.id === currentUser.id ? '<span class="badge badge-info" style="font-size: 0.75rem;">Tú</span>' : ''}
                    </div>
                </div>
            </td>
            <td style="color: var(--text-secondary);">${user.email}</td>
            <td style="text-align: center;">
                <span class="badge ${user.role === 'admin' ? 'badge-primary' : 'badge-info'}">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        ${user.role === 'admin' 
                            ? '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>'
                            : '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>'
                        }
                    </svg>
                    ${user.role === 'admin' ? 'Administrador' : 'Empleado'}
                </span>
            </td>
            <td style="color: var(--text-secondary);">${user.createdAt}</td>
            <td>
                ${isAdmin ? `
                    <div style="display: flex; gap: 8px; justify-content: center;">
                        <button class="btn btn-ghost" style="padding: 8px;" onclick="editUser('${user.id}')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                        </button>
                        <button 
                            class="btn btn-ghost" 
                            style="padding: 8px; color: var(--danger);" 
                            onclick="confirmDeleteUser('${user.id}')"
                            ${user.id === currentUser.id ? 'disabled' : ''}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>
                    </div>
                ` : '-'}
            </td>
        </tr>
    `).join('');
}

function renderUsersCards(users) {
    const container = document.getElementById('usersCards');
    const currentUser = getCurrentUser();
    const isAdmin = currentUser.role === 'admin';
    
    if (users.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 32px; color: var(--text-secondary);">
                No hay usuarios disponibles
            </div>
        `;
        return;
    }
    
    container.innerHTML = users.map(user => `
        <div class="user-card">
            <div class="user-card-header">
                <div class="user-card-avatar">
                    ${user.username.charAt(0).toUpperCase()}
                </div>
                <div style="flex: 1; min-width: 0;">
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                        <div class="user-card-title" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                            ${user.username}
                        </div>
                        ${user.id === currentUser.id ? '<span class="badge badge-info" style="font-size: 0.75rem;">Tú</span>' : ''}
                    </div>
                    <div class="user-card-subtitle" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                        ${user.email}
                    </div>
                    <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 4px;">
                        Creado: ${user.createdAt}
                    </p>
                </div>
            </div>
            <div class="user-card-info">
                <span class="badge ${user.role === 'admin' ? 'badge-primary' : 'badge-info'}">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        ${user.role === 'admin' 
                            ? '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>'
                            : '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>'
                        }
                    </svg>
                    ${user.role === 'admin' ? 'Administrador' : 'Empleado'}
                </span>
                ${isAdmin ? `
                    <div class="user-card-actions">
                        <button class="btn btn-ghost" style="padding: 8px;" onclick="editUser('${user.id}')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                        </button>
                        <button 
                            class="btn btn-ghost" 
                            style="padding: 8px; color: var(--danger);" 
                            onclick="confirmDeleteUser('${user.id}')"
                            ${user.id === currentUser.id ? 'disabled' : ''}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>
                    </div>
                ` : ''}
            </div>
        </div>
    `).join('');
}

function updateUserCount(count) {
    const countElement = document.getElementById('userCount');
    if (countElement) {
        countElement.textContent = count;
    }
}

function initializeUserModal() {
    const addUserBtn = document.getElementById('addUserBtn');
    const closeModal = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelBtn');
    const userForm = document.getElementById('userForm');
    
    if (addUserBtn) {
        addUserBtn.addEventListener('click', () => openUserModal());
    }
    
    closeModal.addEventListener('click', () => closeUserModal());
    cancelBtn.addEventListener('click', () => closeUserModal());
    userForm.addEventListener('submit', handleUserSubmit);
}

function openUserModal(userId = null) {
    editingUserId = userId;
    const modal = document.getElementById('userModal');
    const modalTitle = document.getElementById('modalTitle');
    const form = document.getElementById('userForm');
    const passwordGroup = document.getElementById('passwordGroup');
    const passwordInput = document.getElementById('password');
    
    form.reset();
    
    if (userId) {
        const user = getUserById(userId);
        if (user) {
            modalTitle.textContent = 'Editar Usuario';
            document.getElementById('userId').value = user.id;
            document.getElementById('username').value = user.username;
            document.getElementById('email').value = user.email;
            document.getElementById('userRole').value = user.role;
            passwordInput.required = false;
            passwordGroup.querySelector('small').style.display = 'block';
        }
    } else {
        modalTitle.textContent = 'Nuevo Usuario';
        passwordInput.required = true;
        if (passwordGroup.querySelector('small')) {
            passwordGroup.querySelector('small').style.display = 'none';
        }
    }
    
    openModal('userModal');
}

function closeUserModal() {
    closeModal('userModal');
    editingUserId = null;
}

function handleUserSubmit(e) {
    e.preventDefault();
    
    const formData = {
        username: document.getElementById('username').value.trim(),
        email: document.getElementById('email').value.trim(),
        role: document.getElementById('userRole').value
    };
    
    const password = document.getElementById('password').value;
    
    // Si es nuevo usuario o se proporcionó una nueva contraseña
    if (!editingUserId || password) {
        formData.password = password;
    }
    
    if (editingUserId) {
        // Si es edición y no se cambió la contraseña, mantener la anterior
        if (!password) {
            const existingUser = getUserById(editingUserId);
            formData.password = existingUser.password;
        }
        updateUser(editingUserId, formData);
        showNotification('Usuario actualizado correctamente');
    } else {
        addUser(formData);
        showNotification('Usuario creado correctamente');
    }
    
    loadUsers();
    closeUserModal();
}

function editUser(id) {
    openUserModal(id);
}

function initializeDeleteModal() {
    const closeDeleteModal = document.getElementById('closeDeleteModal');
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    
    closeDeleteModal.addEventListener('click', () => closeDeleteConfirmation());
    cancelDeleteBtn.addEventListener('click', () => closeDeleteConfirmation());
    confirmDeleteBtn.addEventListener('click', () => executeDeleteUser());
}

function confirmDeleteUser(id) {
    const currentUser = getCurrentUser();
    
    if (id === currentUser.id) {
        showNotification('No puedes eliminar tu propio usuario');
        return;
    }
    
    deletingUserId = id;
    openModal('deleteModal');
}

function closeDeleteConfirmation() {
    closeModal('deleteModal');
    deletingUserId = null;
}

function executeDeleteUser() {
    if (deletingUserId) {
        deleteUser(deletingUserId);
        showNotification('Usuario eliminado correctamente');
        loadUsers();
        closeDeleteConfirmation();
    }
}
