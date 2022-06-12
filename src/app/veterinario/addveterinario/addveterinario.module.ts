import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddveterinarioComponent } from './addveterinario/addveterinario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    AddveterinarioComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule, //para poder recoger todo y poder hacer validacion de cada uno
    HttpClientModule,
    FormsModule,
    RouterModule,
    RouterModule.forChild([
      {path:'addVeterinario', component: AddveterinarioComponent}
    ])
  ]
})
export class AddveterinarioModule { }
