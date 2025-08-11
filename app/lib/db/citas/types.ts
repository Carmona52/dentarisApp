import dayjs from "dayjs";

interface Usuario {
  usuario_id: number;
  nombre: string | null;
  apellidos: string | null;
  email: string;
  rol: number;
}

interface Cita {
  id?: number;
  fecha: dayjs.Dayjs;
  hora: dayjs.Dayjs;
  estado: string;
  paciente: Usuario;
  dentista: Usuario;
  motivo?: string;
}


interface updateCita {
    estado: string;
    fecha:dayjs.Dayjs;
    hora: string;
    motivo?: string;
}



export type { Cita };
export type { Usuario };
export type { updateCita };