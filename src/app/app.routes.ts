import { Dashboard } from './components/pages/dashboard/dashboard';
import { RegisterTasks } from './components/pages/register-tasks/register-tasks';

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
        path: '', pathMatch: 'full', redirectTo: 'pages/dashboard'
    }
];
