import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateComponent } from './shared/template/template.component';
import { MainPrincipalComponent } from './shared/main-principal/main-principal.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule, MatToolbarModule, MatListModule, MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule} from '@angular/material';
import { RouterModule } from '@angular/router';
import { rootRouterConfing } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdicionarCandidatoComponent } from './candidatos/adicionar-candidato/adicionar-candidato.component';
import { AtualizarCandidatoComponent } from './candidatos/atualizar-candidato/atualizar-candidato.component';
import { ListarCandidatosComponent } from './candidatos/listar-candidatos/listar-candidatos.component';
import { CandidatosService } from './candidatos/candidatos.service';


@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    MainPrincipalComponent,
    AdicionarCandidatoComponent,
    AtualizarCandidatoComponent,
    ListarCandidatosComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule, 
    HttpClientModule,
    MatTableModule,
    HttpModule,
    AppRoutingModule,
    RouterModule.forRoot(rootRouterConfing, { useHash: false })
  ],
  providers: [
    CandidatosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
