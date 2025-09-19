import { Route, Routes } from '@angular/router';
import { Dashboard } from './components/pages/dashboard/dashboard';
import { RegisterTasks } from './components/pages/register-tasks/register-tasks';
import { SearchTasks } from './components/pages/search-tasks/search-tasks';

export const routes: Routes = [
    {
        path: 'pages/dashboard',
        component: Dashboard
    },
    {
        path: 'pages/register-tasks',
        component: RegisterTasks
    },
    {
        path: 'pages/search-tasks',
        component: SearchTasks
    },
    {
        path: '', pathMatch: 'full', redirectTo: 'pages/dashboard'
    }
];
