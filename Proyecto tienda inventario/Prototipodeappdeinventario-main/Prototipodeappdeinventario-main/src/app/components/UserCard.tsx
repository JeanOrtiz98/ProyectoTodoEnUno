import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Edit, Trash2, Shield, User as UserIcon } from 'lucide-react';
import type { User } from '../context/InventoryContext';

interface UserCardProps {
  user: User;
  currentUserId?: number;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
  canManage: boolean;
}

export function UserCard({ user, currentUserId, onEdit, onDelete, canManage }: UserCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-lg font-medium text-primary-foreground">
            {user.username.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium truncate">{user.username}</h3>
            {user.id === currentUserId && (
              <Badge variant="outline" className="text-xs">Tú</Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground truncate">{user.email}</p>
          <p className="text-xs text-muted-foreground mt-1">Creado: {user.createdAt}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <Badge
          variant={user.role === 'admin' ? 'default' : 'secondary'}
          className="gap-1"
        >
          {user.role === 'admin' ? (
            <Shield className="w-3 h-3" />
          ) : (
            <UserIcon className="w-3 h-3" />
          )}
          {user.role === 'admin' ? 'Administrador' : 'Empleado'}
        </Badge>

        {canManage && (
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(user)}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive"
              onClick={() => onDelete(user.id)}
              disabled={user.id === currentUserId}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
