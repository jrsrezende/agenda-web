import { Routes } from '@angular/router';
import { CadastrarTarefas } from './components/pages/cadastrar-tarefas/cadastrar-tarefas';
import { ConsultarTarefas } from './components/pages/consultar-tarefas/consultar-tarefas';
import { EditarTarefas } from './components/pages/editar-tarefas/editar-tarefas';
import { Dashboard } from './components/pages/dashboard/dashboard';

export const routes: Routes = [
    {
        path: 'pages/cadastrar-tarefas',
        component: CadastrarTarefas
    },
    {
        path: 'pages/consultar-tarefas',
        component: ConsultarTarefas
    },
    {
        path: 'pages/editar-tarefas',
        component: EditarTarefas
    },
    {
        path: 'pages/dashboard',
        component: Dashboard
    },
    {
        path: '', pathMatch: 'full', redirectTo: 'pages/dashboard'
    }
];
