import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Activity, Lock, User } from 'lucide-react';
import { registerUser } from '../services/userService';

export function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Por favor, completa todos los campos');
      return;
    }

    const success = await login(
        username,
        password
    );

    if (success) {
      navigate('/');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  const handleForgotPassword = () => {

    setShowForgotPassword(true);

    setTimeout(() => {
      setShowForgotPassword(false);
    }, 4000);
  };

  const handleRegister = async (
      e: React.FormEvent
  ) => {
    e.preventDefault();
    try {
      await registerUser(registerData);
      alert('Usuario registrado correctamente');

      setIsRegister(false);
      setRegisterData({
        username: '',
        email: '',
        password: '',
      });

    } catch (error) {
      console.error(error);
      alert(
          'Error registrando usuario'
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <Activity className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-3xl">SportStock</CardTitle>
          <CardDescription>
            Sistema de Gestión de Inventario Deportivo
          </CardDescription>
        </CardHeader>
        <CardContent>
          {
            !isRegister ? (

                <>

                  <form
                      onSubmit={handleSubmit}
                      className="space-y-5"
                  >

                    <div className="space-y-2">

                      <Label htmlFor="username">
                        Usuario
                      </Label>

                      <div className="relative">

                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />

                        <Input
                            id="username"
                            type="text"
                            placeholder="Ingresa tu usuario"
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                            className="pl-10"
                        />

                      </div>

                    </div>

                    <div className="space-y-2">

                      <Label htmlFor="password">
                        Contraseña
                      </Label>

                      <div className="relative">

                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />

                        <Input
                            id="password"
                            type="password"
                            placeholder="Ingresa tu contraseña"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            className="pl-10"
                        />

                      </div>

                    </div>

                    {error && (

                        <Alert variant="destructive">
                          <AlertDescription>
                            {error}
                          </AlertDescription>
                        </Alert>
                    )}

                    {showForgotPassword && (
                        <Alert>
                          <AlertDescription>
                            Para recuperar tu contraseña contacta a:
                            <br/>
                            <span className="font-medium">admin@sportstock.com</span>
                          </AlertDescription>
                        </Alert>
                    )}

                    <Button
                        type="submit"
                        className="w-full"
                    >
                      Iniciar Sesión
                    </Button>

                    <button
                        type="button"
                        onClick={handleForgotPassword}
                        className="w-full text-sm text-primary hover:underline"
                    >
                      ¿Olvidaste tu contraseña?
                    </button>

                  </form>

                  <Button
                      type="button"
                      variant="outline"
                      className="w-full mt-4"
                      onClick={() =>
                          setIsRegister(true)
                      }
                  >
                    Crear cuenta
                  </Button>

                </>

            ) : (

                <>

                  <form
                      onSubmit={handleRegister}
                      className="space-y-4"
                  >

                    <div className="space-y-2">

                      <Label>
                        Usuario
                      </Label>

                      <Input
                          type="text"
                          placeholder="Nuevo usuario"
                          value={registerData.username}
                          onChange={(e) =>
                              setRegisterData({
                                ...registerData,
                                username: e.target.value
                              })
                          }
                      />

                    </div>

                    <div className="space-y-2">

                      <Label>
                        Correo
                      </Label>

                      <Input
                          type="email"
                          placeholder="correo@gmail.com"
                          value={registerData.email}
                          onChange={(e) =>
                              setRegisterData({
                                ...registerData,
                                email: e.target.value
                              })
                          }
                      />

                    </div>

                    <div className="space-y-2">

                      <Label>
                        Contraseña
                      </Label>

                      <Input
                          type="password"
                          placeholder="********"
                          value={registerData.password}
                          onChange={(e) =>
                              setRegisterData({
                                ...registerData,
                                password: e.target.value
                              })
                          }
                      />

                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                    >
                      Registrarse
                    </Button>

                  </form>

                  <Button
                      type="button"
                      variant="outline"
                      className="w-full mt-4"
                      onClick={() =>
                          setIsRegister(false)
                      }
                  >
                    Ya tengo cuenta
                  </Button>

                </>
            )
          }
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              Usuarios de prueba:
              <br />
              <span className="font-medium">admin / admin123</span> o{' '}
              <span className="font-medium">empleado / empleado123</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
