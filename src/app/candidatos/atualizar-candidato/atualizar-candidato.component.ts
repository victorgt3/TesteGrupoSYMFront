import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Candidatos } from '../candidatos';
import { CandidatosService } from '../candidatos.service';

@Component({
  selector: 'app-atualizar-candidato',
  templateUrl: './atualizar-candidato.component.html',
  styleUrls: ['./atualizar-candidato.component.css']
})
export class AtualizarCandidatoComponent implements OnInit {
  candidatoForm: FormGroup;
  public sub: Subscription;
  public candiato: Candidatos;
  public errors: any[] = [];
  public candidatoId: string;
  constructor(private route: ActivatedRoute,
    private fb: FormBuilder, private candaditoService: CandidatosService,
    private router: Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      params => {
        this.candidatoId = params['id'];
        this.obterCandiadto(this.candidatoId);
      }
    );
    this.candidatoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(150)]],
      telefone: [''],
      urlLinkedin: [''],
      usuarioGithub: ['']
    });
  }

  obterCandiadto(id: string) {
    this.candaditoService.obterPorId(id)
      .subscribe(candiato => {
        this.preencherFormEvento(candiato);
      },
      response => {
          if (response.status == 404) {
            this.router.navigate(['session/404']);
          }
    });
  }

  preencherFormEvento(obj: Candidatos): void {
    this.candiato = obj;
    this.candidatoForm.patchValue({
      nome: this.candiato.nome,
      telefone: this.candiato.telefone,
      urlLinkedin: this.candiato.urlLinkedin,
      usuarioGithub: this.candiato.usuarioGithub
    });
  }

  salvar() {
    if (this.candidatoForm.dirty && this.candidatoForm.valid) {
      let p = Object.assign({}, this.candiato, this.candidatoForm.value);
      this.candaditoService.atualizar(p)
        .subscribe(() => 
        {
          this.router.navigate(['/listar-candidatos'])
        },
        error => 
        {
          this.errors = error.errors;
        }
      )
    }
  }
}
