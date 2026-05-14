// ===================================
// DATA MANAGEMENT
// ===================================

// Inicializar datos de ejemplo si no existen
function initializeData() {
    if (!localStorage.getItem('products')) {
        const defaultProducts = [
            {
                id: '1',
                name: 'Zapatillas Running Pro',
                category: 'Calzado',
                description: 'Zapatillas profesionales para running con tecnología de amortiguación avanzada',
                quantity: 45,
                price: 129.99,
                status: 'disponible',
                createdAt: '2024-01-15'
            },
            {
                id: '2',
                name: 'Balón de Fútbol Oficial',
                category: 'Equipamiento',
                description: 'Balón oficial de competición, tamaño 5',
                quantity: 8,
                price: 39.99,
                status: 'bajo stock',
                createdAt: '2024-01-20'
            },
            {
                id: '3',
                name: 'Camiseta Deportiva',
                category: 'Ropa',
                description: 'Camiseta transpirable para entrenamiento',
                quantity: 120,
                price: 24.99,
                status: 'disponible',
                createdAt: '2024-02-01'
            },
            {
                id: '4',
                name: 'Guantes de Boxeo',
                category: 'Equipamiento',
                description: 'Guantes profesionales de boxeo 12 oz',
                quantity: 15,
                price: 89.99,
                status: 'disponible',
                createdAt: '2024-02-10'
            },
            {
                id: '5',
                name: 'Raqueta de Tenis',
                category: 'Equipamiento',
                description: 'Raqueta profesional con marco de grafito',
                quantity: 0,
                price: 199.99,
                status: 'agotado',
                createdAt: '2024-02-15'
            },
            {
                id: '6',
                name: 'Mochila Deportiva',
                category: 'Accesorios',
                description: 'Mochila amplia con compartimento para portátil',
                quantity: 32,
                price: 49.99,
                status: 'disponible',
                createdAt: '2024-02-20'
            },
            {
                id: '7',
                name: 'Pantalón de Entrenamiento',
                category: 'Ropa',
                description: 'Pantalón cómodo para entrenamientos',
                quantity: 5,
                price: 34.99,
                status: 'bajo stock',
                createdAt: '2024-03-01'
            },
            {
                id: '8',
                name: 'Botella Térmica',
                category: 'Accesorios',
                description: 'Botella de acero inoxidable 750ml',
                quantity: 67,
                price: 19.99,
                status: 'disponible',
                createdAt: '2024-03-05'
            }
        ];
        localStorage.setItem('products', JSON.stringify(defaultProducts));
    }

    if (!localStorage.getItem('users')) {
        const defaultUsers = [
            {
                id: '1',
                username: 'admin',
                email: 'admin@sportstock.com',
                password: 'admin123',
                role: 'admin',
                createdAt: '2024-01-01'
            },
            {
                id: '2',
                username: 'empleado',
                email: 'empleado@sportstock.com',
                password: 'emp123',
                role: 'empleado',
                createdAt: '2024-01-15'
            },
            {
                id: '3',
                username: 'carlos',
                email: 'carlos@sportstock.com',
                password: '123456',
                role: 'empleado',
                createdAt: '2024-02-01'
            }
        ];
        localStorage.setItem('users', JSON.stringify(defaultUsers));
    }
}

// Funciones de utilidad
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function getCurrentDate() {
    return formatDate(new Date());
}

// Productos
function getProducts() {
    return JSON.parse(localStorage.getItem('products') || '[]');
}

function getProductById(id) {
    const products = getProducts();
    return products.find(p => p.id === id);
}

function addProduct(product) {
    const products = getProducts();
    const newProduct = {
        id: generateId(),
        ...product,
        createdAt: getCurrentDate()
    };
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    return newProduct;
}

function updateProduct(id, updates) {
    const products = getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products[index] = { ...products[index], ...updates };
        localStorage.setItem('products', JSON.stringify(products));
        return products[index];
    }
    return null;
}

function deleteProduct(id) {
    const products = getProducts();
    const filtered = products.filter(p => p.id !== id);
    localStorage.setItem('products', JSON.stringify(filtered));
    return true;
}

// Calcular estado según cantidad
function calculateStatus(quantity) {
    if (quantity === 0) return 'agotado';
    if (quantity <= 10) return 'bajo stock';
    return 'disponible';
}

// Usuarios
function getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
}

function getUserById(id) {
    const users = getUsers();
    return users.find(u => u.id === id);
}

function addUser(user) {
    const users = getUsers();
    const newUser = {
        id: generateId(),
        ...user,
        createdAt: getCurrentDate()
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return newUser;
}

function updateUser(id, updates) {
    const users = getUsers();
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
        users[index] = { ...users[index], ...updates };
        localStorage.setItem('users', JSON.stringify(users));
        return users[index];
    }
    return null;
}

function deleteUser(id) {
    const users = getUsers();
    const filtered = users.filter(u => u.id !== id);
    localStorage.setItem('users', JSON.stringify(filtered));
    return true;
}

// Autenticación
function authenticateUser(username, password) {
    const users = getUsers();
    return users.find(u => u.username === username && u.password === password);
}

function getCurrentUser() {
    const userStr = sessionStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
}

function setCurrentUser(user) {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
}

function clearCurrentUser() {
    sessionStorage.removeItem('currentUser');
}

// Inicializar datos al cargar
initializeData();
