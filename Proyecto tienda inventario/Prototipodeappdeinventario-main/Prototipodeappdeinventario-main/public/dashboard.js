// ===================================
// DASHBOARD PAGE
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    loadDashboardData();
});

function loadDashboardData() {
    const products = getProducts();
    
    // Calculate stats
    const totalProducts = products.reduce((sum, p) => sum + p.quantity, 0);
    const availableProducts = products.filter(p => p.status === 'disponible').length;
    const lowStockProducts = products.filter(p => p.status === 'bajo stock' || p.status === 'agotado').length;
    const totalValue = products.reduce((sum, p) => sum + (p.quantity * p.price), 0);
    
    // Update stats
    document.getElementById('totalProducts').textContent = totalProducts;
    document.getElementById('availableProducts').textContent = availableProducts;
    document.getElementById('lowStockProducts').textContent = lowStockProducts;
    document.getElementById('totalValue').textContent = formatCurrency(totalValue);
    
    // Load recent products
    loadRecentProducts(products);
    
    // Load low stock alerts
    loadLowStockAlerts(products);
}

function loadRecentProducts(products) {
    const recentProducts = products.slice(0, 5);
    const tbody = document.getElementById('recentProductsTable');
    
    if (recentProducts.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center">No hay productos disponibles</td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = recentProducts.map(product => `
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
        </tr>
    `).join('');
}

function loadLowStockAlerts(products) {
    const lowStock = products.filter(p => p.status === 'bajo stock' || p.status === 'agotado');
    const lowStockCard = document.getElementById('lowStockCard');
    const lowStockCount = document.getElementById('lowStockCount');
    const lowStockList = document.getElementById('lowStockList');
    
    if (lowStock.length === 0) {
        lowStockCard.style.display = 'none';
        return;
    }
    
    lowStockCard.style.display = 'block';
    lowStockCount.textContent = lowStock.length;
    
    lowStockList.innerHTML = `
        <div style="margin-top: 16px;">
            ${lowStock.map(product => `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; border: 1px solid var(--border-color); border-radius: var(--border-radius); margin-bottom: 8px; background: var(--bg-primary);">
                    <div>
                        <p style="font-weight: 600; margin-bottom: 4px;">${product.name}</p>
                        <p style="font-size: 0.875rem; color: var(--text-secondary); margin: 0;">
                            Cantidad: ${product.quantity} unidades
                        </p>
                    </div>
                    <span class="badge ${getStatusBadgeClass(product.status)}">
                        ${getStatusText(product.status)}
                    </span>
                </div>
            `).join('')}
        </div>
    `;
}
