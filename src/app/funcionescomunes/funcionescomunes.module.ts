import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(
      [
        {//Funcion comun , editar tus datos
          path:'funcioncomuneditartusdatos',
          loadChildren: () => import('./editartusdatos/editartusdatos.module').then(m=> m.EditartusdatosModule),
        }

      ]
    ),
    FormsModule
  ]
})
export class FuncionescomunesModule { }
