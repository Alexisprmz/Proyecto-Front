import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { sidebarComponent } from './shared/components/sidebar/sidebar.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },

  
  {
    path: 'dashboard',
    component: sidebarComponent, 
    canActivate: [authGuard],       
    children: [
      {
       
        path: 'user',
        loadChildren: () => import('./features/user/user.routes').then(m => m.USER_ROUTES)
      },
      
      {
        path: '',
        redirectTo: 'user/profile', 
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];