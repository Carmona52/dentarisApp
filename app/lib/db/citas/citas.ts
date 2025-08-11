import dayjs from "dayjs";

import { updateCita } from "./types";
import { Cita } from "./types";

const api_url = process.env.NEXT_PUBLIC_CITAS_URL;
const detalles_url = process.env.NEXT_PUBLIC_CITAS_DETALLES_URL;

if (!api_url || !detalles_url) {
    throw new Error("API URL doesn't exist");
}

export const createCita = async (cita:Cita,token:string) => {
    const response = await fetch(api_url, {
        method: "POST",
        headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            cita: cita,
            "estado":"Agendada"
        })
    });

    const data = await response.json();
    if (!data.ok) {
       throw new Error(data.message);
    }
    return data;

}

export const fetchCitas = async (): Promise<Cita[]> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token no disponible. Por favor, inicie sesión.");
  }

  const response = await fetch(detalles_url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const json = await response.json();

  if (!response.ok) {
    const message = json?.message || "No se pudo obtener las citas.";
    throw new Error(`Error ${response.status}: ${message}`);
  }

  const citasDesdeApi = Array.isArray(json.data) ? json.data : [];

  const citasTransformadas: Cita[] = citasDesdeApi.map((item: any) => ({
    id: item.cita_id,
    fecha: dayjs(item.fecha),
    hora: dayjs(`2000-01-01T${item.hora}`, 'HH:mm:'),
    estado: item.estado,
    motivo: item.motivo ?? "No especificado",
    paciente: {
      usuario_id: item.paciente?.usuario_id,
      nombre: item.paciente?.nombre ?? null,
      apellidos: item.paciente?.apellidos ?? '',
      email: item.paciente?.email ?? '',
      rol: item.paciente?.rol_id,
    },
    dentista: {
      usuario_id: item.dentista?.usuario_id,
      nombre: item.dentista?.nombre ?? null,
      email: item.dentista?.email ?? '',
    },
  }));

  citasTransformadas.sort((a, b) => {
    const fechaA = a.fecha.valueOf();
    const fechaB = b.fecha.valueOf();
    if (fechaA !== fechaB) return fechaB - fechaA;
    return b.hora.valueOf() - a.hora.valueOf();
  });

  return citasTransformadas;
};

export const getCitaDetalle = async (id: number): Promise<Cita> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token no disponible. Por favor, inicia sesión.');

    const res = await fetch(`${api_url}/${id}/detalle`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    const json = await res.json();
    if (!json.success || !json.data) throw new Error('Respuesta inválida del servidor');

    const data = json.data;
    console.log('Cita Detalle:', data);
    const fechaCompleta = dayjs(`${data.fecha}T${data.hora}`, 'YYYY-MM-DDTHH:mm:ss');


    return {
        id: data.cita_id,
        fecha: fechaCompleta,
  hora: fechaCompleta,
        estado: data.estado,
        paciente: data.paciente,
        dentista: data.dentista,
        motivo: data.motivo || 'No especificado',
    };
};

export const updateEstadoCita = async (id: number, cita: updateCita) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token no disponible. Por favor, inicia sesión.");
  }

  const payload = {
    fecha: dayjs(cita.fecha).format("YYYY-MM-DD"),
    hora:cita.hora,
    motivo:cita.motivo,
    estado: cita.estado,
  };

  const response = await fetch(`${api_url}${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Error al actualizar la cita");
  }
};