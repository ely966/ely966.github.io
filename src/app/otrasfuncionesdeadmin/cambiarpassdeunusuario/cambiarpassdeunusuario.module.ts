import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CambiarpassdeunusuarioComponent } from './cambiarpassdeunusuario/cambiarpassdeunusuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    CambiarpassdeunusuarioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    MatIconModule,
    //BrowserModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path:'cambiarpass', component: CambiarpassdeunusuarioComponent}
    ])
  ]
})
export class CambiarpassdeunusuarioModule { }
