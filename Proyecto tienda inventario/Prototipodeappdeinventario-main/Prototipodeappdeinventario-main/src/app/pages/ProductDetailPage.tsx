import { useParams, useNavigate, Link } from 'react-router';
import { useInventory } from '../context/InventoryContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import {
  ArrowLeft,
  Edit,
  Package,
  DollarSign,
  Tag,
  FileText,
  TrendingUp,
  TrendingDown,
  Calendar,
  User,
} from 'lucide-react';

export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProduct } = useInventory();

  const product = id ? getProduct(Number(id)) : undefined;

  if (!product) {
    return (
      <div className="p-4 md:p-8">
        <Card>
          <CardContent className="py-12 text-center">
            <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h2 className="mb-2">Producto no encontrado</h2>
            <p className="text-muted-foreground mb-6">
              El producto que buscas no existe o ha sido eliminado.
            </p>
            <Button onClick={() => navigate('/inventory')}>
              Volver al inventario
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const statusColor =
    product.status === 'disponible'
      ? 'bg-accent text-accent-foreground'
      : product.status === 'bajo stock'
      ? 'bg-orange-100 text-orange-700'
      : 'bg-destructive/10 text-destructive';

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <Button
            variant="ghost"
            className="gap-2 mb-4"
            onClick={() => navigate('/inventory')}
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inventario
          </Button>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1>{product.name}</h1>
              <div className="flex items-center gap-3 mt-2">
                <Badge variant="outline" className="gap-1">
                  <Tag className="w-3 h-3" />
                  {product.category}
                </Badge>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}>
                  {product.status}
                </span>
              </div>
            </div>
            <Link to={`/inventory/${product.id}/edit`}>
              <Button className="gap-2 w-full sm:w-auto">
                <Edit className="w-4 h-4" />
                Editar Producto
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Cantidad en Stock
            </CardTitle>
            <Package className="w-5 h-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{product.quantity}</div>
            <p className="text-xs text-muted-foreground mt-1">unidades disponibles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Precio Unitario
            </CardTitle>
            <DollarSign className="w-5 h-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">${product.price.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">por unidad</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Valor Total
            </CardTitle>
            <DollarSign className="w-5 h-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">
              ${(product.quantity * product.price).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">inventario</p>
          </CardContent>
        </Card>
      </div>

      {/* Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Información del Producto
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Nombre</p>
              <p className="font-medium">{product.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Categoría</p>
              <p className="font-medium">{product.category}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Descripción</p>
              <p className="font-medium">{product.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">ID</p>
                <p className="font-medium text-sm font-mono">{product.id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Estado</p>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                  {product.status}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Movement History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Historial de Movimientos
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!product.movements || product.movements.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No hay movimientos registrados</p>
              </div>
            ) : (
              <div className="space-y-3">
                {product.movements.map((movement) => (
                  <div
                    key={movement.id}
                    className="flex items-start gap-3 p-3 rounded-lg border border-border"
                  >
                    <div
                      className={`p-2 rounded-lg ${
                        movement.type === 'entrada'
                          ? 'bg-accent/20 text-accent-foreground'
                          : 'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {movement.type === 'entrada' ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium capitalize">{movement.type}</p>
                        <span className="text-sm text-muted-foreground">
                          {movement.date}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {movement.quantity} unidades
                      </p>
                      {movement.notes && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {movement.notes}
                        </p>
                      )}
                      <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                        <User className="w-3 h-3" />
                        {movement.user}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Stock Alert */}
      {product.status !== 'disponible' && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Package className="w-5 h-5 text-orange-700" />
              </div>
              <div>
                <p className="font-medium text-orange-900">
                  {product.status === 'agotado'
                    ? 'Producto agotado'
                    : 'Stock bajo - Se recomienda reposición'}
                </p>
                <p className="text-sm text-orange-700">
                  {product.status === 'agotado'
                    ? 'Este producto no tiene unidades disponibles'
                    : `Solo quedan ${product.quantity} unidades en inventario`}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}