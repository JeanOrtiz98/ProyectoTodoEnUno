import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useInventory } from '../context/InventoryContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { ArrowLeft, Save, X } from 'lucide-react';
import { toast } from 'sonner';

const categories = [
  'Fútbol',
  'Básquetbol',
  'Tenis',
  'Running',
  'Boxeo',
  'Ciclismo',
  'Natación',
  'Gimnasio',
  'Yoga',
  'Otro',
];

export function ProductFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addProduct, updateProduct, getProduct } = useInventory();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    quantity: 0,
    price: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isEditMode && id) {
      const product = getProduct(Number(id));
      if (product) {
        setFormData({
          name: product.name,
          category: product.category,
          description: product.description,
          quantity: product.quantity,
          price: product.price,
        });
      } else {
        toast.error('Producto no encontrado');
        navigate('/inventory');
      }
    }
  }, [id, isEditMode, getProduct, navigate]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.category) {
      newErrors.category = 'La categoría es requerida';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    }

    if (formData.quantity < 0) {
      newErrors.quantity = 'La cantidad no puede ser negativa';
    }

    if (formData.price <= 0) {
      newErrors.price = 'El precio debe ser mayor a 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Por favor, corrige los errores en el formulario');
      return;
    }

    if (isEditMode && id) {
      updateProduct(Number(id), formData);
      toast.success('Producto actualizado correctamente');
    } else {
      addProduct(formData);
      toast.success('Producto creado correctamente');
    }

    navigate('/inventory');
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpiar error del campo al escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Button
          variant="ghost"
          className="gap-2 mb-4"
          onClick={() => navigate('/inventory')}
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al inventario
        </Button>
        <h1>{isEditMode ? 'Editar Producto' : 'Nuevo Producto'}</h1>
        <p className="text-muted-foreground mt-1">
          {isEditMode
            ? 'Modifica la información del producto'
            : 'Completa los campos para agregar un nuevo producto'}
        </p>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Información del Producto</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">
                Nombre del Producto <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Ej: Balón de Fútbol Nike"
                className={errors.name ? 'border-destructive' : ''}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">
                Categoría <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleChange('category', value)}
              >
                <SelectTrigger className={errors.category ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-destructive">{errors.category}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">
                Descripción <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Describe las características del producto..."
                rows={4}
                className={errors.description ? 'border-destructive' : ''}
              />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description}</p>
              )}
            </div>

            {/* Quantity and Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="quantity">
                  Cantidad <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  min="0"
                  value={formData.quantity}
                  onChange={(e) => handleChange('quantity', parseInt(e.target.value) || 0)}
                  className={errors.quantity ? 'border-destructive' : ''}
                />
                {errors.quantity && (
                  <p className="text-sm text-destructive">{errors.quantity}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">
                  Precio (USD) <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
                  className={errors.price ? 'border-destructive' : ''}
                />
                {errors.price && (
                  <p className="text-sm text-destructive">{errors.price}</p>
                )}
              </div>
            </div>

            {/* Status Preview */}
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Estado del producto:</p>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  formData.quantity === 0
                    ? 'bg-destructive/10 text-destructive'
                    : formData.quantity < 10
                    ? 'bg-orange-100 text-orange-700'
                    : 'bg-accent text-accent-foreground'
                }`}
              >
                {formData.quantity === 0
                  ? 'Agotado'
                  : formData.quantity < 10
                  ? 'Bajo Stock'
                  : 'Disponible'}
              </span>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button type="submit" className="gap-2 flex-1 sm:flex-none">
                <Save className="w-4 h-4" />
                {isEditMode ? 'Guardar Cambios' : 'Crear Producto'}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="gap-2"
                onClick={() => navigate('/inventory')}
              >
                <X className="w-4 h-4" />
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}