import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../shared/config.service';
import { ServiceBase } from '../shared/service-base';
import { Candidatos } from './candidatos';
import { catchError } from 'rxjs/operators';


@Injectable()
export class CandidatosService extends ServiceBase {

  constructor(private http: HttpClient) {
    super();
  }

  atualizar(obj: Candidatos): Observable<Candidatos> {
    return this.http.put<Candidatos>(ConfigService.getUrlApi('Candidatos'), obj, super.obterHttpOptions()).pipe(catchError(super.serviceError));
  };

  adiciona(obj: Candidatos): Observable<Candidatos> {
    return this.http.post<Candidatos>(ConfigService.getUrlApi('Candidatos'), obj, super.obterHttpOptions()).pipe(catchError(super.serviceError));
  };

  obterTodos(): Observable<Candidatos[]>{
      return this.http.get<Candidatos[]>(ConfigService.getUrlApi('Candidatos'), super.obterHttpOptions()).pipe(catchError(super.serviceError));
  }

  obterPorId(id: string): Observable<Candidatos> {
    return this.http.get<Candidatos>(ConfigService.getUrlApi(`Candidatos/${id}`), super.obterHttpOptions()).pipe(catchError(super.serviceError));
  }

  excluir(id: string): Observable<Candidatos> {
    return this.http.delete<Candidatos>(ConfigService.getUrlApi(`Candidatos/${id}`), super.obterHttpOptions()).pipe(catchError(super.serviceError));
  }

}