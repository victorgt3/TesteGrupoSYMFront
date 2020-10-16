import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Candidatos } from '../candidatos';
import { CandidatosService } from '../candidatos.service';

@Component({
  selector: 'app-listar-candidatos',
  templateUrl: './listar-candidatos.component.html',
  styleUrls: ['./listar-candidatos.component.css']
})
export class ListarCandidatosComponent implements OnInit {
  displayedColumns = ['nome','telefone', 'urlLinkedin', 'usuarioGithub','acao'];
  public candidatos: Candidatos[];
  public errorMessage: string = "";
  public errors: any[] = [];
  constructor(private candaditoService: CandidatosService,private router: Router) { }

  ngOnInit() {
    this.candaditoService.obterTodos()
    .subscribe(
      pessoas => this.candidatos = pessoas,
      error => this.errorMessage
    );
  }

  removerCandidato(id: string){
    this.candaditoService.excluir(id)
      .subscribe(
        result => {this.onSaveComplete(result)},
        error => {
          this.errors = error.errors;
        }
      );
  }

  onSaveComplete(response: any): void{
    
    this.errors = [];

    this.router.navigate(['/home']);
  }
}
