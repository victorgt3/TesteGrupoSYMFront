import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fromEvent, merge, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { GenericValidartor } from 'src/app/utils/generic-form-validator';
import { Candidatos } from '../candidatos';
import { CandidatosService } from '../candidatos.service';

@Component({
  selector: 'app-adicionar-candidato',
  templateUrl: './adicionar-candidato.component.html',
  styleUrls: ['./adicionar-candidato.component.css']
})
export class AdicionarCandidatoComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  candidatoForm: FormGroup;
  public candiato: Candidatos;
  public errors: any[] = [];

  constructor(private fb: FormBuilder, private candaditoService: CandidatosService,
    private router: Router) 
    { 
      this.validationMessages = {
        nome: {
          required: 'O Nome é requerido.',
          minlength: 'O Nome presisa ter no mínimo 4 caracteres',
          maxlength: 'O Nome precisa ter no máximo 150 caracteres'
        }
      };
      this.genericValidator = new GenericValidartor(this.validationMessages);
      this.candiato = new Candidatos();
    }

    ngAfterViewInit(): void {
      let controlBlurs: Observable<any>[] = this.formInputElements
        .map((FormControl: ElementRef) => fromEvent(FormControl.nativeElement, 'blur'));
  
      merge(this.candidatoForm.valueChanges, controlBlurs).pipe(debounceTime(100)).subscribe(value => {
        this.displayMessage = this.genericValidator.processMessages(this.candidatoForm);
      });
    }

  ngOnInit() {
    this.candidatoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(150)]],
      telefone: [''],
      urlLinkedin: [''],
      usuarioGithub: ['']
    });
  }

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidartor;
  
  salvar(){
    if(this.candidatoForm.dirty && this.candidatoForm){
      let p = Object.assign({}, this.candiato, this.candidatoForm.value);
      console.log(p);
      this.candaditoService.adiciona(p)
        .subscribe(
          result => {this.onSaveComplete(result)},
          error => {
            this.errors = error.errors;
          }
        );
    }
  }

  onSaveComplete(response: any): void{
    this.candidatoForm.reset();
    this.errors = [];

    this.router.navigateByUrl('/listar-candidatos');
  }


}
