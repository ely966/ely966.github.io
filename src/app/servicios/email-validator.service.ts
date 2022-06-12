import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { delay, map, Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator{

  constructor(private HttpClient: HttpClient) { }

  //validar en el formulario reactive, que el correo este disponible
  validate( control: AbstractControl): Observable<ValidationErrors | null> {

    const email = control.value;

    return this.HttpClient.get<any[]>(`https://proyectodawveterinaria.herokuapp.com/auth/comprobar/${ email }`)
    .pipe(delay(5000),//
      map( resp => {//si el email existía en la bd

        return { emailTomado: true }
      }),
      catchError(() => {return of(null)})
    );

  }
}
