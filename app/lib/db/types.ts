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

interface dentista {
    carrera: string;
    cedula_profesional: string;
    datos_usuario: usuario;
}

export type {usuario};
export type {dentista};

