import { mascotaFull } from 'src/app/interfaces/mascotaFull.interface';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MascotaService } from 'src/app/servicios/mascota.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-editarmascota',
  templateUrl: './editarmascota.component.html',
  styles: [
  ]
})
export class EditarmascotaComponent implements OnInit {
  //parametros del formulario.
  id:any;
  usuario!:number;
  mascotaAeditar !:mascotaFull;//con el usuario completo
  mascotaEditada !:any; //usuario id solo tiene
  submitted = false;
  loading = false;
  comprobar:any;
  datosMascota!:mascotaFull;

  private fotoSeleccionada !: File;



  miFormulario: FormGroup = this.formB.group({
    id: [, [Validators.required ]],
    nombre: [ , [ Validators.required ]],
    tipo: [ , [ Validators.required ]],
    raza: [, [  ]],
    edad: [ , [ Validators.required]],
    usuario: [ , [ ]]

  })
  constructor(private router:Router, private formB: FormBuilder, private mascotaServi:MascotaService) { }



  ngOnInit(): void {
    //recogemos la amscota que queremos editar
    this.mascotaServi.datosMascota(JSON.parse(<string>localStorage.getItem('idMascotaEdit'))).subscribe(
      mascota => {
        this.mascotaAeditar= mascota;
      })
      //this.mascotaAeditar=this.mascotaServi.recogerMascotaGuardadaParaEditar();

  }
/*===========================================================================================*/

/*Foto de la amscota*/
/*Metodo que al selecciona una imagen, inmediatamente lo recogerá y comprobara si es válido*/
    //el metodo que al seleccionar la foto
    seleccinarFoto(event:any){
      this.fotoSeleccionada= event.target.files[0];
      //Comprobar el tipo de la foto
      //.type es del string que busca en este caso
      //si esta dentro o si encuentra alguna ocurrencia con image, sino devuelve -1
      if (this.fotoSeleccionada.type.indexOf('image') < 0) {
        Swal.fire("Error al seleccionar imagen", "Se debe seleccionar un archivo que sea una imagen", 'error');
        return ;

      }

  }
/*Método que al pulsar el botón de seleecion d efoto, subirá la foto a la base de datos. Si está vacia mandará un error*/
  subirFoto(){
    if (!this.fotoSeleccionada){  //si no eleccionas una foto
      Swal.fire("Error encontrado", "Dee seleccionar una foto", 'error');

    }else{//sí si selecciono una foto

    this.id=this.mascotaServi.devolverid();
    this.mascotaServi.subirFoto(this.fotoSeleccionada, this.id).subscribe(
      mascota => {
             this.datosMascota= mascota;
             Swal.fire("la foto se a añadido a la mascota correctamente", "", "success");

      }
    )
    }
  }
//*Fin subida de foto de mascota*//

//editar datos de la mascota*//

  editarMascota(){
    this.mascotaEditada = this.miFormulario.value;


    this.mascotaServi.editarMascotaSelecionada(this.mascotaEditada).subscribe(
      {
        next: (
          datos => {
            Swal.fire({ //Notificación de que se ha editado correctamente
              title: 'Editado correctamente',
              text: "La mascota ha sido editada. ¿Quieres volver a la tabla de mostrar mascota?",
              icon: 'success',

              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Si',
              showCancelButton: true,
              cancelButtonColor: '#d33',
              }).then((result) => { //si quiere volver a la tabla
                if (result.isConfirmed) {
                  //this.router.navigate(['/mascota/mostrarM/mostrarMascota']);
                  window.history.back();
                }
              })

          }
        ),
        error: resp => { //Si muestra algún error//

           Swal.fire('Error', resp.error.message, 'error')
           //this.router.navigateByUrl('/login')
         }
      })


  }

  //volver
  volverListaMascota(){
    window.history.back();
  }

}
