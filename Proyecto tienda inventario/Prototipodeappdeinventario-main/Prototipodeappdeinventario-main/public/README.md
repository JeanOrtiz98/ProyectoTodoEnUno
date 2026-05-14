# SportStock - Sistema de Gestión de Inventario Deportivo

## 📋 Descripción

SportStock es un sistema web completo de gestión de inventario para un almacén deportivo. Desarrollado con **HTML5, CSS3 y JavaScript vanilla** (sin frameworks), cumpliendo con principios modernos de UI/UX.

## ✨ Características Principales

### 🔐 Autenticación
- Sistema de login seguro
- Gestión de sesiones con `sessionStorage`
- Opción de "Recordar sesión"
- Usuarios de prueba incluidos

### 📊 Dashboard
- Resumen visual con estadísticas clave
- Total de productos y valor del inventario
- Alertas de productos con bajo stock
- Productos recientes
- Gráficos y tarjetas informativas

### 📦 Gestión de Inventario
- **CRUD completo**: Crear, Leer, Actualizar y Eliminar productos
- Filtros por nombre, categoría y estado
- Cálculo automático de estados (Disponible, Bajo Stock, Agotado)
- Vista de tabla en escritorio y tarjetas en móvil
- Modales para formularios y confirmaciones

### 👥 Gestión de Usuarios
- Control de acceso por roles (Admin / Empleado)
- Solo administradores pueden gestionar usuarios
- CRUD completo de usuarios
- Visualización de información de usuario actual

## 🎨 Diseño UI/UX

### Colores Deportivos
- **Azul Principal**: `#0066cc` - Profesionalismo y confianza
- **Verde Acento**: `#10b981` - Éxito y disponibilidad
- **Naranja Advertencia**: `#f59e0b` - Alertas de stock bajo
- **Rojo Peligro**: `#ef4444` - Acciones críticas

### Principios de Diseño
- ✅ **Interfaz limpia y minimalista**
- ✅ **Jerarquía visual clara**
- ✅ **Espaciado consistente**
- ✅ **Tipografía legible** (System fonts)
- ✅ **Iconos SVG simples y visuales**
- ✅ **Componentes reutilizables** (cards, botones, tablas)
- ✅ **Estados interactivos** (hover, focus, active)
- ✅ **Feedback visual** (modales, notificaciones)

## 📱 Responsive Design

### Escritorio (> 1024px)
- Barra lateral fija de navegación
- Vista de tabla para datos
- Layout de múltiples columnas

### Tablet (768px - 1024px)
- Menú hamburguesa colapsable
- Sidebar deslizable desde la izquierda
- Grids adaptables

### Móvil (< 768px)
- Navegación con menú hamburguesa
- Vista de tarjetas en lugar de tablas
- Layout de una columna
- Botones de ancho completo

## 🗂️ Estructura de Archivos

```
public/
├── index.html          # Página de login
├── dashboard.html      # Dashboard principal
├── inventory.html      # Gestión de inventario
├── users.html          # Gestión de usuarios
├── styles.css          # Estilos globales
├── data.js             # Manejo de datos (localStorage)
├── auth.js             # Autenticación
├── app.js              # Funcionalidad común
├── dashboard.js        # Lógica del dashboard
├── inventory.js        # Lógica de inventario
├── users.js            # Lógica de usuarios
└── README.md           # Este archivo
```

## 🚀 Instalación y Uso

### Opción 1: Abrir directamente
1. Descarga todos los archivos en una carpeta
2. Abre `index.html` en tu navegador web
3. ¡Listo! No requiere servidor

### Opción 2: Servidor local (recomendado)
```bash
# Con Python 3
python -m http.server 8000

# Con Node.js
npx http-server

# Luego abre: http://localhost:8000
```

## 👤 Usuarios de Prueba

### Administrador
- **Usuario**: `admin`
- **Contraseña**: `admin123`
- **Permisos**: Acceso completo

### Empleado
- **Usuario**: `empleado`
- **Contraseña**: `emp123`
- **Permisos**: Solo lectura en usuarios

## 💾 Almacenamiento de Datos

Los datos se almacenan localmente usando:
- **localStorage**: Productos y usuarios (persistente)
- **sessionStorage**: Sesión del usuario actual (temporal)

### Datos Incluidos
- 8 productos de ejemplo en diferentes categorías
- 3 usuarios con diferentes roles

## 🔧 Funcionalidades Técnicas

### Sin Frameworks
- ✅ HTML5 puro para estructura
- ✅ CSS3 nativo con variables CSS
- ✅ JavaScript vanilla (ES6+)
- ✅ Sin dependencias externas

### Características JavaScript
- Manipulación del DOM
- Event listeners
- LocalStorage API
- Validación de formularios
- Filtrado y búsqueda en tiempo real
- Modales dinámicos
- Sistema de menú hamburguesa

### Características CSS
- Variables CSS (Custom Properties)
- Flexbox y Grid Layout
- Media Queries para responsive
- Transiciones y animaciones
- Sistema de colores consistente
- Componentes modulares

## 📐 Navegación del Sistema

```
Login (index.html)
    ↓
Dashboard (dashboard.html)
    ├── Inventario (inventory.html)
    │   ├── Agregar Producto
    │   ├── Editar Producto
    │   └── Eliminar Producto
    └── Usuarios (users.html)
        ├── Agregar Usuario (Solo Admin)
        ├── Editar Usuario (Solo Admin)
        └── Eliminar Usuario (Solo Admin)
```

## 🎯 Casos de Uso

### Como Administrador:
1. Iniciar sesión con credenciales de admin
2. Ver resumen del inventario en el dashboard
3. Agregar nuevos productos al inventario
4. Editar información de productos existentes
5. Eliminar productos obsoletos
6. Gestionar usuarios del sistema
7. Asignar roles a usuarios

### Como Empleado:
1. Iniciar sesión con credenciales de empleado
2. Consultar el inventario disponible
3. Buscar y filtrar productos
4. Ver detalles de productos
5. Ver lista de usuarios (solo lectura)

## ⚡ Características Destacadas

### Validación de Formularios
- Campos requeridos marcados con `*`
- Validación HTML5 nativa
- Feedback visual en tiempo real

### Filtros Inteligentes
- Búsqueda en tiempo real
- Filtros combinables
- Actualización instantánea de resultados

### Estados Automáticos
Los productos cambian de estado automáticamente:
- **Disponible**: Cantidad > 10
- **Bajo Stock**: Cantidad 1-10
- **Agotado**: Cantidad = 0

### Seguridad Básica
- Verificación de autenticación en cada página
- Control de permisos por rol
- Protección contra eliminación del propio usuario

## 🌐 Compatibilidad

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

## 📱 Dispositivos Soportados

- ✅ Desktop (1920x1080 y superiores)
- ✅ Laptop (1366x768 y superiores)
- ✅ Tablet (768x1024)
- ✅ Mobile (320x568 y superiores)

## 🎓 Propósito Académico

Este proyecto está diseñado para:
- ✅ Demostrar conocimientos de HTML5, CSS3 y JavaScript
- ✅ Mostrar principios de UI/UX modernos
- ✅ Implementar un sistema CRUD funcional
- ✅ Aplicar diseño responsive
- ✅ Cumplir con estándares web

## 🔄 Mejoras Futuras Posibles

1. **Backend Real**: Integrar con API REST (Node.js, PHP, etc.)
2. **Base de Datos**: MySQL, PostgreSQL o MongoDB
3. **Autenticación Avanzada**: JWT, OAuth
4. **Exportación de Datos**: PDF, Excel
5. **Gráficos Avanzados**: Chart.js o D3.js
6. **Notificaciones**: Sistema de toast notifications
7. **Búsqueda Avanzada**: Autocompletado
8. **Historial**: Log de cambios en productos
9. **Imágenes**: Upload de fotos de productos
10. **Reportes**: Generación de reportes estadísticos

## 📝 Licencia

Este proyecto es de código abierto y está disponible para fines educativos.

## 👨‍💻 Desarrollo

Desarrollado con HTML5, CSS3 y JavaScript vanilla.
Compatible con despliegue en Windows y cualquier sistema operativo.

---

**SportStock** © 2024 - Sistema de Gestión de Inventario Deportivo
