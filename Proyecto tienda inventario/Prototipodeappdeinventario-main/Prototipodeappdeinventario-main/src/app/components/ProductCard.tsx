import { Link } from 'react-router';
import { Button } from './ui/button';
import { Edit, Trash2, Eye } from 'lucide-react';
import type { Product } from '../context/InventoryContext';

interface ProductCardProps {
  product: Product;
  onDelete: (id: number) => void;
}

export function ProductCard({ product, onDelete }: ProductCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium truncate">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.category}</p>
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-2 ${
            product.status === 'disponible'
              ? 'bg-accent text-accent-foreground'
              : product.status === 'bajo stock'
              ? 'bg-orange-100 text-orange-700'
              : 'bg-destructive/10 text-destructive'
          }`}
        >
          {product.status}
        </span>
      </div>

      <p className="text-sm text-muted-foreground line-clamp-2">
        {product.description}
      </p>

      <div className="flex items-center justify-between pt-2 border-t border-border">
        <div className="flex gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Cantidad</p>
            <p className="font-medium">{product.quantity}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Precio</p>
            <p className="font-medium">${product.price.toFixed(2)}</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Link to={`/inventory/${product.id}`}>
            <Button variant="ghost" size="sm">
              <Eye className="w-4 h-4" />
            </Button>
          </Link>
          <Link to={`/inventory/${product.id}/edit`}>
            <Button variant="ghost" size="sm">
              <Edit className="w-4 h-4" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive"
            onClick={() => onDelete(product.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
