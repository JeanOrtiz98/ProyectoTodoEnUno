import { Link } from 'react-router';
import { useInventory } from '../context/InventoryContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import {
  Package,
  AlertTriangle,
  TrendingUp,
  Users,
  Plus,
  ArrowRight,
  DollarSign,
} from 'lucide-react';

export function Dashboard() {
  const { products, users } = useInventory();

  const totalProducts = products.reduce((sum, p) => sum + p.quantity, 0);
  const lowStockProducts = products.filter(p => p.status === 'bajo stock' || p.status === 'agotado');
  const totalValue = products.reduce((sum, p) => sum + (p.quantity * p.price), 0);

  const recentProducts = products.slice(0, 5);

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1>Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Resumen general del inventario deportivo
          </p>
        </div>
        <Link to="/inventory/new">
          <Button className="gap-2 w-full sm:w-auto">
            <Plus className="w-4 h-4" />
            Nuevo Producto
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Productos
            </CardTitle>
            <Package className="w-5 h-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {products.length} artículos diferentes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Productos Bajos
            </CardTitle>
            <AlertTriangle className="w-5 h-5 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{lowStockProducts.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Requieren reposición
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Valor Total
            </CardTitle>
            <DollarSign className="w-5 h-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">${totalValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Inventario completo
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Usuarios Activos
            </CardTitle>
            <Users className="w-5 h-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{users.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              En el sistema
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Recent Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Accesos Rápidos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/inventory/new">
              <Button variant="outline" className="w-full justify-start gap-3">
                <Plus className="w-4 h-4" />
                Agregar Producto
              </Button>
            </Link>
            <Link to="/inventory">
              <Button variant="outline" className="w-full justify-start gap-3">
                <Package className="w-4 h-4" />
                Ver Inventario
              </Button>
            </Link>
            <Link to="/users">
              <Button variant="outline" className="w-full justify-start gap-3">
                <Users className="w-4 h-4" />
                Gestionar Usuarios
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Productos con Stock Bajo</CardTitle>
            <Link to="/inventory">
              <Button variant="ghost" size="sm" className="gap-2">
                Ver todos
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {lowStockProducts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <TrendingUp className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>¡Excelente! Todos los productos tienen stock suficiente.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {lowStockProducts.slice(0, 4).map((product) => (
                  <Link key={product.id} to={`/inventory/${product.id}`}>
                    <div className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent transition-colors">
                      <div className="flex-1">
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.category}</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${
                          product.status === 'agotado' ? 'text-destructive' : 'text-orange-500'
                        }`}>
                          {product.quantity} unidades
                        </p>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          product.status === 'agotado'
                            ? 'bg-destructive/10 text-destructive'
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {product.status}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Products Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Productos Recientes</CardTitle>
          <Link to="/inventory">
            <Button variant="ghost" size="sm" className="gap-2">
              Ver inventario completo
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Producto</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Categoría</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Cantidad</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Precio</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">Estado</th>
                </tr>
              </thead>
              <tbody>
                {recentProducts.map((product) => (
                  <tr key={product.id} className="border-b border-border hover:bg-accent/50 transition-colors">
                    <td className="py-3 px-4 font-medium">{product.name}</td>
                    <td className="py-3 px-4 text-muted-foreground">{product.category}</td>
                    <td className="py-3 px-4 text-right">{product.quantity}</td>
                    <td className="py-3 px-4 text-right">${product.price.toFixed(2)}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                        product.status === 'disponible'
                          ? 'bg-accent/50 text-accent-foreground'
                          : product.status === 'bajo stock'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-destructive/10 text-destructive'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}