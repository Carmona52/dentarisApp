'use client';

import React, { useEffect, useState } from 'react';
import {
    Modal, Box, Fade, Backdrop, Button, Typography, Grid,
    Divider, TextField, MenuItem
} from '@mui/material';
import { Usuario } from '../types/DataType';


interface openModalProps {
    open: boolean;
    handleClose: () => void;
    onCitaCreated: () => void;
}

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

const motivosConsulta = [
    "Limpieza dental",
    "Revisión general",
    "Tratamiento de caries",
    "Ortodoncia",
    "Dolor o molestia",
    "Otro"
];

const api_url = process.env.NEXT_PUBLIC_CITAS_URL;
const paciente_url = process.env.NEXT_PUBLIC_PACIENTE_URL;
if (!api_url || !paciente_url) {
   throw new Error("Falta URL");
}

const AddCitaModal: React.FC<openModalProps> = ({ open, handleClose, onCitaCreated }) => {


    const [pacientes, setPacientes] = useState<Usuario[]>([]);
    const [dentistas, setDentistas] = useState<Usuario[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        paciente_id: '',
        dentista_id: '',
        fecha: '',
        hora: '',
        motivo: ''
    });

    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (!open) return;

        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Token no disponible. Por favor, inicie sesión.');
                return;
            }

            try {

                const resPacientes = await fetch(paciente_url, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const dataPacientes = await resPacientes.json();
                if (!resPacientes.ok) throw new Error(dataPacientes.message || 'Error al obtener pacientes');
                setPacientes(Array.isArray(dataPacientes) ? dataPacientes : dataPacientes.pacientes || []);


                const resDentistas = await fetch(paciente_url, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const dataDentistas = await resDentistas.json();
                if (!resDentistas.ok) throw new Error(dataDentistas.message || 'Error al obtener dentistas');
                setDentistas(Array.isArray(dataDentistas) ? dataDentistas : dataDentistas.dentists || []);

                setError(null);
            } catch (err: any) {
                console.error(err);
                setError(err.message || 'No se pudo conectar con el servidor.');
            }
        };

        fetchData();
    }, [open]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        const { paciente_id, dentista_id, fecha, hora} = formData;
        if (!paciente_id || !dentista_id || !fecha || !hora) {
            alert('Todos los campos son obligatorios.');
            setLoading(false);
            return;
        }

        const citaDateTime = new Date(`${fecha}T${hora}`);
        if (citaDateTime < new Date()) {
            alert('La cita no puede ser en el pasado.');
            setLoading(false);
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const res = await fetch(api_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ ...formData, estado: 'Agendada' }),
            });

            if (!res.ok) throw new Error('Error al crear la cita');


            onCitaCreated();


            handleClose();
            setFormData({
                paciente_id: '',
                dentista_id: '',
                fecha: '',
                hora: '',
                motivo: ''
            });
            alert('Cita registrada correctamente');

        } catch (err) {
            console.error(err);
            alert('Error al registrar la cita');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal open={open} onClose={handleClose} closeAfterTransition slots={{ backdrop: Backdrop }} slotProps={{ backdrop: { timeout: 500 } }}>
            <Fade in={open}>
                <Box sx={style}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Registro de Cita</Typography>
                    <Divider sx={{ mb: 2 }} />

                    <Grid container spacing={2} sx={{ mb: 2 }}>
                        {error && (
                            <Grid>
                                <Typography color="error">{error}</Typography>
                            </Grid>
                        )}

                        <TextField
                            select
                            name="paciente_id"
                            label="Seleccione Paciente"
                            value={formData.paciente_id}
                            fullWidth
                            required
                            onChange={handleChange}
                        >
                            {pacientes.map((p) => (
                                <MenuItem key={p.usuario_id} value={p.usuario_id}>
                                    {p.nombre} {p.apellidos || ''}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            select
                            name="motivo"
                            label="Motivo de consulta"
                            value={formData.motivo}
                            fullWidth
                            required
                            onChange={handleChange}
                        >
                            {motivosConsulta.map((motivo) => (
                                <MenuItem key={motivo} value={motivo}>
                                    {motivo}
                                </MenuItem>
                            ))}
                        </TextField>



                        <TextField
                            select
                            name="dentista_id"
                            label="Seleccione Dentista"
                            value={formData.dentista_id}
                            fullWidth
                            required
                            onChange={handleChange}
                        >
                            {dentistas.map((d) => (
                                <MenuItem key={d.usuario_id} value={d.usuario_id}>
                                    {d.nombre} {d.apellidos || ''}
                                </MenuItem>
                            ))}
                        </TextField>


                        <Grid>
                            <TextField
                                name="fecha"
                                label="Fecha"
                                type="date"
                                value={formData.fecha}
                                required
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid>
                            <TextField
                                name="hora"
                                label="Hora"
                                type="time"
                                value={formData.hora}
                                required
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                inputProps={{ min: '09:00', max: '17:00' }}
                                onChange={handleChange}

                            />

                        </Grid>
                    </Grid>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                        <Button
                            onClick={handleClose}
                            sx={{
                                bgcolor: "white", color: "gray", px: 6,
                                '&:hover': { bgcolor: '#d32f2f', color: '#fff' }
                            }}
                            disabled={loading}
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            sx={{
                                bgcolor: "#0647A0", px: 6,
                                '&:hover': { bgcolor: '#0661D9' }
                            }}
                            disabled={loading}
                        >
                            {loading ? 'Guardando...' : 'Guardar'}
                        </Button>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
};

export default AddCitaModal;