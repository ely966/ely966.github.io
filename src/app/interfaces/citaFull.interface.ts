import { Time } from '@angular/common';
import { ClienteFull } from './clienteFull.interface';
import { mascotaFull } from './mascotaFull.interface';

export interface Cita {
  id: number;
  pet: mascotaFull;
  fecha: Date;
  hora: Date;
  motivo: string;
  idVeterinario: number;
  numeroContacto:number;

}
