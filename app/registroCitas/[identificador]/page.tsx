'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
    Box,
    Typography,
    Button,
    Divider,
    CircularProgress,
} from '@mui/material';
import dayjs from 'dayjs';
import { Cita } from '../../types/Citas';
import EditCitaModal from '../PopUps/EditCita';

const DetalleCitaPage = () => {
    const router = useRouter();
    const params = useParams();
    const [cita, setCita] = useState<Cita | null>(null);
    const [loading, setLoading] = useState(true);

    const id = Number(
        Array.isArray(params.identificador) ? params.identificador[0] : params.identificador
    );

    useEffect(() => {
        const token = localStorage.getItem('token');

        const obtenerCita = async () => {
            try {
                const res = await fetch(`http://localhost:3002/api/citas/${id}/detalle`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const json = await res.json();

                if (!json.success || !json.data) {
                    throw new Error('Respuesta inválida del servidor');
                }

                const data = json.data;

                const citaTransformada: Cita = {
                    id: data.cita_id,
                    fecha: dayjs(data.fecha),
                    hora: dayjs(`2000-01-01T${data.hora}`, 'HH:mm:ss'),
                    estado: data.estado,
                    paciente: data.paciente,  
                    dentista: data.dentista,   
                };


                setCita(citaTransformada);
                setLoading(false);
            } catch (err) {
                console.error(err);
                alert('Error al cargar la cita');
            }
        };

        if (id) obtenerCita();
    }, [id]);

    const handleEditar = () => {
        router.push(`/editarCita/${id}`);
    };

    const handleEliminar = async () => {
        const confirm = window.confirm('¿Seguro que deseas eliminar esta cita?');
        if (!confirm) return;

        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:3002/api/citas/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                const error = await res.json();
                alert(`Error: ${error.message}`);
                return;
            }

            alert('Cita eliminada correctamente');
            router.push('/registroCitas');
        } catch (err) {
            console.error(err);
            alert('Error al conectar con el servidor');
        }
    };

    const handleVerHistorial = () => {
        router.push(`/historial/${cita?.paciente.usuario_id}`);
    };


    if (loading || !cita) {
        return (
            <Box sx={{ p: 4, textAlign: 'center' }}>
                <CircularProgress />
                <Typography variant="body1" mt={2}>
                    Cargando cita...
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{
            p: 4,
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            gap: 4
        }}>
            <Typography variant="h4" sx={{ fontWeight: 600, color: '#0A447C' }}>
                Detalles de la Cita
            </Typography>

            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 2,
                backgroundColor: '#fff',
                p: 3,
                borderRadius: 2,
                boxShadow: '0 0 6px rgba(0,0,0,0.08)',
            }}>
                <Typography><strong>ID Cita:</strong> {cita.id}</Typography>
                <Typography><strong>Paciente:</strong> {cita.paciente?.nombre ?? cita.paciente?.email}</Typography>
                <Typography><strong>Email Paciente:</strong> {cita.paciente?.email}</Typography>


                <Typography><strong>Dentista:</strong> {cita.dentista?.nombre ?? 'Sin nombre'}</Typography>
                <Typography><strong>Email Dentista:</strong> {cita.dentista?.email}</Typography>

                <Typography><strong>Fecha:</strong> {cita.fecha.format('YYYY-MM-DD')}</Typography>
                <Typography><strong>Hora:</strong> {cita.hora.format('hh:mm A')}</Typography>
                <Typography><strong>Estado:</strong> {cita.estado}</Typography>
            </Box>

            <Divider />

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'space-around', width: '70%', flex: "flex-end", margin: "0 auto" }}>

                <Button onClick={handleEliminar} sx={{
                    backgroundColor: "white", color: "gray", p: 2, px: 5,
                    '&:hover': {
                        bgcolor: '#d32f2f',
                        color: '#fff',
                    }
                }} >
                    <Typography variant="body2" component="h2">
                        Eliminar Cita
                    </Typography>
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    sx={{ px: 4 }}
                    onClick={handleVerHistorial}
                >
                    Ver Historial Médico
                </Button>
                <EditCitaModal id={cita.id} />
                <Button
                    variant="contained"
                    sx={{ px: 4 }}
                    onClick={() => router.push('/registroCitas')}
                >
                    Volver
                </Button>


            </Box>
        </Box>

    );
};

export default DetalleCitaPage;
