import dayjs from "dayjs";

interface usuario{
    usuario_id: Number;
    rol_id: number;
    consultorio_id: number;
    nombre: string;
    apellidos: string;
    email: string;
    telefono: string;
    fecha_nacimiento: dayjs.Dayjs | Date;
    genero: "Femenino" | "Masculino" | "Otro";
    pais_origen: string;
    direccion: string;
    notas: string;
    alergias: string[];
    profesion: string;
    numero_identificacion: string;
    nombre_contacto_emergencia: string;
    telefono_contacto_emergencia: string;
    last_login: dayjs.Dayjs | Date;
}

interface clinica {
    clinica_name: string;
    telefono: string;
    email: string;
    password: string;
    rol: string;
}

interface dentista {
  usuario_id: number;
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  cedula_profesional: string;
  carrera: string;
  created_at?: string;
  updated_at?: string;
}

interface createDentist{
    rol:string;
     nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  cedula_profesional: string;
  carrera: string;

}

export type {usuario};
export type {dentista};
export type {clinica};
export type {createDentist};

