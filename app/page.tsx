'use client';

import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';

import { Cita } from "./lib/db/citas/types";
import MyCard from "./components/cards/CardCita";

const api_url = process.env.NEXT_PUBLIC_CITAS_DETALLES_URL;
if(!api_url){
    throw new Error('Missing API URL');
}

export default function Home() {
  const [citas, setCitas] = React.useState<Cita[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const hoy = dayjs().format('YYYY-MM-DD');
  const [fechaSeleccionada, setFechaSeleccionada] = React.useState(dayjs());

  const fechaSeleccionadaFormato = fechaSeleccionada.format('YYYY-MM-DD');

  const citasDelDiaSeleccionado = citas.filter(
    (cita) =>
      cita.estado === 'Agendada' &&
      dayjs(cita.fecha).format('YYYY-MM-DD') === fechaSeleccionadaFormato
  );

  const citasDeHoy = citas.filter(
    (cita) =>
      cita.estado === 'Agendada' &&
      dayjs(cita.fecha).format('YYYY-MM-DD') === hoy
  );

  const citasFuturas = citas.filter(
    (cita) =>
      cita.estado === 'Agendada' &&
      dayjs(cita.fecha).isAfter(fechaSeleccionadaFormato) &&
      dayjs(cita.fecha).format('YYYY-MM-DD') !== fechaSeleccionadaFormato
  );

  const citasCanceladas = citas.filter((cita) => cita.estado === 'No asistido');

  React.useEffect(() => {
    const getCitas = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token no disponible. Por favor, inicie sesión.");
        return;
      }

      try {
        const response = await fetch(api_url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const json = await response.json();

        if (!response.ok) {
          console.error("Error del servidor:", json);
          setError(`Error ${response.status}: ${json.message || "No se pudo obtener las citas."}`);
          return;
        }

        const citasDesdeApi = Array.isArray(json.data) ? json.data : [];

        const citasTransformadas: Cita[] = citasDesdeApi.map((item: any) => ({
          id: item.cita_id,
          fecha: dayjs(item.fecha),
          hora: dayjs(`2000-01-01T${item.hora}`, 'YYYY-MM-DDTHH:mm:ss'),
          estado: item.estado,
          motivo: item.motivo || "No especificado",
          paciente: {
            usuario_id: item.paciente.usuario_id,
            nombre: item.paciente.nombre,
            apellidos: item.paciente.apellidos,
            email: item.paciente.email,
            rol: item.paciente.rol,
          },
          dentista: {
            usuario_id: item.dentista.usuario_id,
            nombre: item.dentista.nombre,
            email: item.dentista.email,
            rol: item.dentista.rol,
          },
        }));

        setCitas(citasTransformadas);
      } catch (error) {
        setError("Error al obtener las citas. Por favor, inténtelo más tarde.");
      }
    };

    getCitas();
  }, []);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
        gap: 3,
        p: 3,
      }}
    >

      <Box className="border-r pr-5 border-gray-400 my-6">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={fechaSeleccionada}
            onChange={(newValue) => {
              if (newValue) setFechaSeleccionada(newValue);
            }}
            showDaysOutsideCurrentMonth
            fixedWeekNumber={6}
          />
        </LocalizationProvider>

        <Typography
          variant="h5"
          sx={{ fontWeight: 600, my: 3, textAlign: 'center' }}
        >
          {fechaSeleccionadaFormato === hoy
            ? 'Citas agendadas para hoy'
            : `Citas agendadas para el ${fechaSeleccionada.format('DD/MM/YYYY')}`}
        </Typography>

        <Box
          display="grid"
          gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }}
          gap={2}
        >
          {citasDelDiaSeleccionado.length > 0 ? (
            citasDelDiaSeleccionado.map((cita) => (
              <MyCard key={cita.id} cita={cita} />
            ))
          ) : (
            <Typography variant="body1" color="text.secondary" textAlign="center">
              No hay citas agendadas para este día.
            </Typography>
          )}
        </Box>
      </Box>

   
      <Box display="flex" flexDirection="column" gap={3}>
        <Box
          display="grid"
          gridTemplateColumns="1fr 1fr"
          gap={1}
          p={2}
          bgcolor="#fff"
          boxShadow={2}
          borderRadius={2}
          className="h-72 w-72 text-center mx-auto"
        >
          <Box
            textAlign="center"
            className="border-r border-gray-200"
            onClick={() => setFechaSeleccionada(dayjs())}
            sx={{ cursor: 'pointer' }}
          >
            <Typography variant="h2" fontWeight="bold">
              {citasDeHoy.length}
            </Typography>
            <Typography variant="h5">Citas Hoy</Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="h2" fontWeight="bold">
              {citasCanceladas.length}
            </Typography>
            <Typography variant="h5">Canceladas</Typography>
          </Box>
          <Box
            textAlign="center"
            gridColumn="span 2"
            pt={1}
            borderTop="1px solid #eee"
          >
            <Typography variant="h2" fontWeight="bold">2</Typography>
            <Typography variant="h5">Nuevos Pacientes</Typography>
          </Box>
        </Box>

        <Typography variant="h6" fontWeight="bold">
          Citas Próximas
        </Typography>

        <Box gap={2} sx={{ my: 2, display: 'flex', flexDirection: 'column' }}>
          {citasFuturas.length > 0 ? (
            citasFuturas.map((cita) => (
              <MyCard key={cita.id} cita={cita} />
            ))
          ) : (
            <Typography variant="body1" color="text.secondary" textAlign="center">
              No hay citas agendadas próximamente.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
