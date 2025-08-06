'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
    Box,
    Typography,
    Button,
    Divider,
    CircularProgress,
    Grid,
} from '@mui/material';
import dayjs from 'dayjs';
import { updateEstadoCita } from '@/app/lib/db/citas/citas';
import { Cita } from '../../lib/db/citas/types';
import { getCitaDetalle } from '@/app/lib/db/citas/citas';
import EditCitaModal from '../PopUps/EditCita';

const DetalleCitaPage = () => {
    const router = useRouter();
    const params = useParams();
    const [cita, setCita] = useState<Cita | null>(null);
    const [loading, setLoading] = useState(true);
    const [editModalOpen, setEditModalOpen] = useState(false);

    const id = Number(Array.isArray(params.identificador)
        ? params.identificador[0]
        : params.identificador
    );

    useEffect(() => {
        const fetchCita = async () => {
            try {
                const citaData = await getCitaDetalle(id);
                setCita(citaData);
            } catch (err) {
                console.error(err);
                alert('Error al cargar la cita');
            } finally {
                setLoading(false);
            }
        };

        id ? fetchCita() : setLoading(false);
    }, [id]);


    const handleEliminar = async () => {
        if (!window.confirm('¿Seguro que deseas eliminar esta cita?')) return;

        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:3002/api/citas/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
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
        if (cita?.paciente?.usuario_id) {
            router.push(`/pacientes/HistorialMedico/${cita.paciente.usuario_id}`);
        }
    };

    const handleTerminarCita = async () => {
        const confirmar = window.confirm('¿Seguro que desea terminar con la cita?');
        if (!confirmar || !cita) return;

        try {
            await updateEstadoCita(cita.id, {
                fecha: cita.fecha,
                hora: dayjs(cita.hora).format('HH:mm'),
                motivo: cita.motivo,
                estado: 'Realizada',
            });

            alert('La cita ha sido marcada como realizada.');
            router.push('/registroCitas');
        } catch (err: any) {
            console.error(err);
            alert(err.message || 'Error al actualizar la cita');
        }
    };


    if (loading || !cita) {
        return (
            <Box sx={{ p: 4, textAlign: 'center' }}>
                <CircularProgress />
                <Typography variant="body1" mt={2}>Cargando cita...</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: { xs: 3, md: 6 }, maxWidth: 1000, mx: 'auto' }}>
            <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>
                Detalles de la Cita
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Grid container spacing={3}>
                <Grid >
                    <Typography variant="subtitle2"><strong>ID Cita:</strong></Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>{cita.id}</Typography>

                    <Typography variant="subtitle2"><strong>Paciente:</strong></Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>{cita.paciente?.nombre ?? cita.paciente?.email}</Typography>



                    <Typography variant="subtitle2"><strong>Fecha:</strong></Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>{dayjs(cita.fecha).format('DD/MM/YYYY')}</Typography>


                </Grid>

                <Grid >
                    <Typography variant="subtitle2"><strong>Dentista:</strong></Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>{cita.dentista?.nombre ?? 'Sin nombre'}</Typography>
                    {/* 
                    <Typography variant="subtitle2"><strong>Email Dentista:</strong></Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>{cita.dentista?.email}</Typography> */}

                    {/* <Typography variant="subtitle2"><strong>Email Paciente:</strong></Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>{cita.paciente?.email}</Typography> */}

                    <Typography variant="subtitle2"><strong>Motivo de Consulta</strong></Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>{cita.motivo ?? 'No especificado'}</Typography>

                    <Typography variant="subtitle2"><strong>Hora:</strong></Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        {cita.hora.format('HH:mm')}
                    </Typography>



                </Grid>

            </Grid>
            <Typography variant="subtitle2" className='text-center'><strong>Estado:</strong></Typography>
            <Typography variant="body1" style={{
                textTransform: 'capitalize',
                color: cita.estado === 'Agendada' || 'Realizada'? '#2e7d32' : '#b26a00',
                backgroundColor: cita.estado === 'Agendada' || 'Realizada' ? '#e0f7e9' : '#ffff72',
                textAlign: 'center',
            }}>{cita.estado}</Typography>

            <Divider sx={{ my: 4 }} />

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2,
                    justifyContent: 'center',
                }}
            >
                <Button
                    variant="outlined"
                    color="error"
                    onClick={handleEliminar}
                    sx={{ px: 4 }}
                >
                    Eliminar Cita
                </Button>

                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleVerHistorial}
                    sx={{ px: 4 }}
                >
                    Ver Historial Médico
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setEditModalOpen(true)}
                    sx={{ px: 4 }}
                >
                    Editar Cita
                </Button>

                <Button
                    variant="outlined"
                    onClick={handleTerminarCita}
                    sx={{ px: 4 }}
                >
                    Volver
                </Button>


            </Box>

            <EditCitaModal
                id={cita.id}
                open={editModalOpen}
                handleClose={() => setEditModalOpen(false)}
            />
        </Box>
    );
};

export default DetalleCitaPage;
