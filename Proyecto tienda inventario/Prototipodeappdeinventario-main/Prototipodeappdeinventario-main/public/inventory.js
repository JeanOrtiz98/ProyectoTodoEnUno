// ===================================
// INVENTORY PAGE
// ===================================

let currentProducts = [];
let editingProductId = null;
let deletingProductId = null;

document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    initializeFilters();
    initializeProductModal();
    initializeDeleteModal();
});

function loadProducts() {
    currentProducts = getProducts();
    renderProducts(currentProducts);
    updateProductCount(currentProducts.length);
}

function renderProducts(products) {
    renderProductsTable(products);
    renderProductsCards(products);
}

function renderProductsTable(products) {
    const tbody = document.getElementById('productsTable');
    
    if (products.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center">No se encontraron productos</td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = products.map(product => `
        <tr>
            <td>
                <div>
                    <p style="font-weight: 600; margin-bottom: 4px;">${product.name}</p>
                    <p style="font-size: 0.875rem; color: var(--text-secondary); margin: 0;">${product.description || 'Sin descripción'}</p>
                </div>
            </td>
            <td>${product.category}</td>
            <td>${product.quantity}</td>
            <td>${formatCurrency(product.price)}</td>
            <td>
                <span class="badge ${getStatusBadgeClass(product.status)}">
                    ${getStatusText(product.status)}
                </span>
            </td>
            <td>
                <div style="display: flex; gap: 8px;">
                    <button class="btn btn-ghost" style="padding: 8px;" onclick="editProduct('${product.id}')">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
                    <button class="btn btn-ghost" style="padding: 8px; color: var(--danger);" onclick="confirmDeleteProduct('${product.id}')">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function renderProductsCards(products) {
    const container = document.getElementById('productsCards');
    
    if (products.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 32px; color: var(--text-secondary);">
                No se encontraron productos
            </div>
        `;
        return;
    }
    
    container.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-card-header">
                <div>
                    <div class="product-card-title">${product.name}</div>
                    <div class="product-card-subtitle">${product.category}</div>
                </div>
                <span class="badge ${getStatusBadgeClass(product.status)}">
                    ${getStatusText(product.status)}
                </span>
            </div>
            <div class="product-card-description">
                ${product.description || 'Sin descripción'}
            </div>
            <div class="product-card-info">
                <div class="product-card-stats">
                    <div class="product-card-stat">
                        <p>Cantidad</p>
                        <p>${product.quantity}</p>
                    </div>
                    <div class="product-card-stat">
                        <p>Precio</p>
                        <p>${formatCurrency(product.price)}</p>
                    </div>
                </div>
                <div class="product-card-actions">
                    <button class="btn btn-ghost" style="padding: 8px;" onclick="editProduct('${product.id}')">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
                    <button class="btn btn-ghost" style="padding: 8px; color: var(--danger);" onclick="confirmDeleteProduct('${product.id}')">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function updateProductCount(count) {
    const countElement = document.getElementById('productCount');
    if (countElement) {
        countElement.textContent = count;
    }
}

function initializeFilters() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const statusFilter = document.getElementById('statusFilter');
    
    searchInput.addEventListener('input', applyFilters);
    categoryFilter.addEventListener('change', applyFilters);
    statusFilter.addEventListener('change', applyFilters);
}

function applyFilters() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    const status = document.getElementById('statusFilter').value;
    
    let filtered = currentProducts;
    
    if (searchTerm) {
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(searchTerm) ||
            p.description.toLowerCase().includes(searchTerm)
        );
    }
    
    if (category) {
        filtered = filtered.filter(p => p.category === category);
    }
    
    if (status) {
        filtered = filtered.filter(p => p.status === status);
    }
    
    renderProducts(filtered);
    updateProductCount(filtered.length);
}

function initializeProductModal() {
    const addProductBtn = document.getElementById('addProductBtn');
    const closeModal = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelBtn');
    const productForm = document.getElementById('productForm');
    
    addProductBtn.addEventListener('click', () => openProductModal());
    closeModal.addEventListener('click', () => closeProductModal());
    cancelBtn.addEventListener('click', () => closeProductModal());
    
    productForm.addEventListener('submit', handleProductSubmit);
}

function openProductModal(productId = null) {
    editingProductId = productId;
    const modal = document.getElementById('productModal');
    const modalTitle = document.getElementById('modalTitle');
    const form = document.getElementById('productForm');
    
    form.reset();
    
    if (productId) {
        const product = getProductById(productId);
        if (product) {
            modalTitle.textContent = 'Editar Producto';
            document.getElementById('productId').value = product.id;
            document.getElementById('productName').value = product.name;
            document.getElementById('productCategory').value = product.category;
            document.getElementById('productDescription').value = product.description || '';
            document.getElementById('productQuantity').value = product.quantity;
            document.getElementById('productPrice').value = product.price;
        }
    } else {
        modalTitle.textContent = 'Nuevo Producto';
    }
    
    openModal('productModal');
}

function closeProductModal() {
    closeModal('productModal');
    editingProductId = null;
}

function handleProductSubmit(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('productName').value.trim(),
        category: document.getElementById('productCategory').value,
        description: document.getElementById('productDescription').value.trim(),
        quantity: parseInt(document.getElementById('productQuantity').value),
        price: parseFloat(document.getElementById('productPrice').value)
    };
    
    // Calculate status based on quantity
    formData.status = calculateStatus(formData.quantity);
    
    if (editingProductId) {
        updateProduct(editingProductId, formData);
        showNotification('Producto actualizado correctamente');
    } else {
        addProduct(formData);
        showNotification('Producto creado correctamente');
    }
    
    loadProducts();
    closeProductModal();
}

function editProduct(id) {
    openProductModal(id);
}

function initializeDeleteModal() {
    const closeDeleteModal = document.getElementById('closeDeleteModal');
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    
    closeDeleteModal.addEventListener('click', () => closeDeleteConfirmation());
    cancelDeleteBtn.addEventListener('click', () => closeDeleteConfirmation());
    confirmDeleteBtn.addEventListener('click', () => executeDeleteProduct());
}

function confirmDeleteProduct(id) {
    deletingProductId = id;
    openModal('deleteModal');
}

function closeDeleteConfirmation() {
    closeModal('deleteModal');
    deletingProductId = null;
}

function executeDeleteProduct() {
    if (deletingProductId) {
        deleteProduct(deletingProductId);
        showNotification('Producto eliminado correctamente');
        loadProducts();
        closeDeleteConfirmation();
    }
}
