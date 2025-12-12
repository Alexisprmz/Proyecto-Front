import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { VerifyCodeComponent } from './pages/verify-code/verify-code.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Iniciar Sesión'
  },
  {
    path: 'register', 
    component: RegisterComponent,
    title: 'Crear Cuenta'
  },
  {
    path: 'forgot-password', // URL: /auth/forgot-password
    component: ForgotPasswordComponent,
    title: 'Recuperar Contraseña'
  },
  {
    path: 'verify-code', // URL: /auth/verify-code
    component: VerifyCodeComponent,
    title: 'Verificar Código'
  },
  {
    path: 'reset-password', // URL: /auth/reset-password
    component: ResetPasswordComponent,
    title: 'Nueva Contraseña'
  },

  // Redirección por defecto
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  
 
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];