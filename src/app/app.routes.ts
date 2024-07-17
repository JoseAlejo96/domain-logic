import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'user/:login',
    loadComponent: () =>
      import('./features/user-detail/user-detail.component').then(
        (m) => m.UserDetailComponent
      ),
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  },
];
