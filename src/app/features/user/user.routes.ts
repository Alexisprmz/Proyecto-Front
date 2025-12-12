import { Routes } from '@angular/router';
// Importa tu componente de perfil
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

export const USER_ROUTES: Routes = [
  {
    path: 'profile',
    component: UserProfileComponent,
    title: 'Mi Perfil'
  },
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full'
  }
];