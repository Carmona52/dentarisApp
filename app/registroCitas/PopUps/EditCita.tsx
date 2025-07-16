'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Modal,
    Box,
    Fade,
    Backdrop,
    Button,
    TextField,
    Typography,
    Grid,
    Divider,
} from '@mui/material';

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: 700,
    maxHeight: '90vh',
    overflowY: 'auto',
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 3,
};

interface EditCitaModalProps {
    id: number;
    open: boolean;
    handleClose: () => void;
}



const EditCitaModal: React.FC<EditCitaModalProps> = ({ id,open,handleClose }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fecha: '',
        hora: '',
    });

    const handleOpen = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Token no disponible');

            const res = await fetch(`http://localhost:3002/api/citas/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) {
                const { message } = await res.json();
                throw new Error(message || 'Error al obtener cita');
            }

            const cita = await res.json();

            setFormData({
                fecha: cita.fecha?.split('T')[0] || '',
                hora: cita.hora?.slice(0, 5) || '',
            });
        } catch (err: any) {
            alert(err.message || 'Error al cargar los datos de la cita');
        } finally {
            setLoading(false);
        }
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        const requiredFields = ['fecha', 'hora'];
        const missing = requiredFields.filter(
            (field) => !formData[field as keyof typeof formData]
        );

        if (missing.length > 0) {
            alert(`Campos obligatorios faltantes: ${missing.join(', ')}`);
            return;
        }

        const citaDateTime = new Date(`${formData.fecha}T${formData.hora}`);
        if (citaDateTime < new Date()) {
            alert('La fecha y hora de la cita no pueden ser anteriores al momento actual.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Token no disponible');

            const res = await fetch(`http://localhost:3002/api/citas/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...formData,
                    estado: "Agendada"
                }),
            });

            if (!res.ok) {
                const { message } = await res.json();
                throw new Error(message || 'Error al actualizar cita');
            }

            alert('Cita actualizada correctamente');
            handleClose();
            router.refresh();
            router.push('/registroCitas');
        } catch (err: any) {
            alert(err.message || 'Error al actualizar cita');
        }
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{ backdrop: { timeout: 500 } }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                            Editar Cita
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        {loading ? (
                            <Typography textAlign="center">Cargando datos...</Typography>
                        ) : (
                            <>
                                <Box gap={5} display="flex" flexDirection="column">
                                    <TextField
                                        name="fecha"
                                        label="Fecha de la Cita"
                                        type="date"
                                        value={formData.fecha}
                                        required
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                        onChange={handleChange}
                                    />

                                    <TextField
                                        name="hora"
                                        label="Hora de la Cita"
                                        type="time"
                                        value={formData.hora}
                                        required
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                        onChange={handleChange}
                                    />
                                </Box>
                            </>
                        )}


                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                            <Button onClick={handleClose} sx={{
                                bgcolor: "white", color: "gray", px: 6,
                                '&:hover': {
                                    bgcolor: '#d32f2f',
                                    color: '#fff',
                                }
                            }}>
                                <Typography variant="body2">Cancelar</Typography>
                            </Button>

                            <Button variant="contained" onClick={handleSubmit} sx={{
                                bgcolor: "#0647A0", color: "white", px: 6,
                                '&:hover': {
                                    bgcolor: '#0661D9',
                                    color: '#fff',
                                }
                            }}>
                                <Typography variant="body2">Guardar</Typography>
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};

export default EditCitaModal;
