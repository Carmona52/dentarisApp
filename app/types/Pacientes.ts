interface Paciente {
    nombre: string;
    apellidos: string;
    email: string;
    telefono: string;
    fecha_nacimiento: string;
    genero: "Femenino" | "Masculino" | "Otro";
    pais_origen: string;
    direccion: string;
    notas: string;
    alergias: string[];
    profesion: string;
    numero_identificacion: string;
    nombre_contacto_emergencia: string;
    telefono_contacto_emergencia: string;
}
export type { Paciente }