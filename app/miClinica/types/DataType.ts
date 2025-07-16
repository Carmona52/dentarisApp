import {GridColDef} from '@mui/x-data-grid';

interface Paciente {
    nombre: string;
    apellidos: string;
    email: string;
    telefono: string;
    fecha_nacimiento: string;
    genero: string;
    pais_origen: string;
    direccion: string;
    notas: string;
    alergias: string[];
    profesion: string;
    numero_identificacion: string;
    nombre_contacto_emergencia: string;
    telefono_contacto_emergencia: string;
}

interface tablePacienteProps {
    columns: GridColDef[];
    data: Paciente[];
    getRowId?: (row: Paciente) => string;
}

export type {Paciente}
export type {tablePacienteProps}