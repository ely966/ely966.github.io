import { ClienteFull } from './clienteFull.interface';
/*La mascota que recibe de la base de datos*/

export interface mascotaFullUser {
  "id": number;
  "nombre": string;
  "tipo": string;
  "raza": string;
  "edad": number;
  "usuario": ClienteFull;
  "image": string;
}
