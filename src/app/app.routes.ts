import { Route, Routes } from '@angular/router';
import { Dashboard } from './components/pages/dashboard/dashboard';
import { RegisterTasks } from './components/pages/register-tasks/register-tasks';
import { SearchTasks } from './components/pages/search-tasks/search-tasks';
import { AuthenticateUser } from './components/pages/authenticate-user/authenticate-user';
import { authGuard } from './guards/auth-guard';
import { CreateUser } from './components/pages/create-user/create-user';

export const routes: Routes = [
    {
        path: 'pages/dashboard',
        component: Dashboard,
        canActivate: [authGuard]
    },
    {
        path: 'pages/register-tasks',
        component: RegisterTasks,
        canActivate: [authGuard]
    },
    {
        path: 'pages/search-tasks',
        component: SearchTasks,
        canActivate: [authGuard]
    },
    {
        path: 'pages/authenticate-user',
        component: AuthenticateUser
    },
    {
        path: 'pages/create-user',
        component: CreateUser
    },
    {
        path: '', pathMatch: 'full', redirectTo: 'pages/authenticate-user'
    }
];
