import { Routes } from '@angular/router';
import { TemplateComponent } from './shared/template/template.component';
import { AdicionarCandidatoComponent } from './candidatos/adicionar-candidato/adicionar-candidato.component';
import { AtualizarCandidatoComponent } from './candidatos/atualizar-candidato/atualizar-candidato.component';
import { ListarCandidatosComponent } from './candidatos/listar-candidatos/listar-candidatos.component';

export const rootRouterConfing: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: TemplateComponent },
    { path: 'adicionar-candidato', component: AdicionarCandidatoComponent },
    { path: 'listar-candidatos', component: ListarCandidatosComponent},
    { path: 'atualizar-candidato/:id', component: AtualizarCandidatoComponent}
]