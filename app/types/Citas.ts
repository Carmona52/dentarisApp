import dayjs from "dayjs";
export interface Usuario {
  usuario_id: number;
  nombre: string | null;
  email: string;
  rol: number;
}

export interface Cita {
  id: number;
  fecha: dayjs.Dayjs;
  hora: dayjs.Dayjs;
  estado: string;
  paciente: Usuario;
  dentista: Usuario;
}
