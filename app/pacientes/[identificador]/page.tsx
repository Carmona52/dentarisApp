'use client'

import dayjs from 'dayjs';
import React, { useEffect, useState, useCallback } from 'react';
import {
    Box, Button, TextField, CircularProgress, Typography, MenuItem,
    Grid
} from '@mui/material';
import { useParams } from 'next/navigation';
import { Paciente } from '../../types/Pacientes';
import { useRouter } from 'next/navigation'

const parseAlergias = (alergias: string | null | undefined): string[] =>
    alergias?.split(',').map(a => a.trim()).filter(Boolean) ?? [];


const stringifyAlergias = (alergias: string[]): string =>
    alergias.join(',');

export default function ConsultaForm() {
     const router = useRouter();
 
    const params = useParams();
    const id = Number(Array.isArray(params.identificador) ? params.identificador[0] : params.identificador);

    const [formData, setFormData] = useState<Paciente | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!id || isNaN(id)) {
            setError('Identificador de paciente no válido');
            setLoading(false);
            return;
        }
        if (!token) {
            setError('Token no disponible');
            setLoading(false);
            return;
        }

        const fetchPaciente = async () => {
            try {
                const res = await fetch(`http://localhost:3001/api/auth/patients/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const { paciente, error } = await res.json();

                if (!res.ok) {
                    setError(error ?? 'No se pudo obtener el paciente');
                } else {
                    setFormData({
                        ...paciente,
                        alergias: parseAlergias(paciente.alergias)
                    });
                }
            } catch {
                setError('Error de red al obtener paciente');
            } finally {
                setLoading(false);
            }
        };

        fetchPaciente();
    }, [id]);

    const handleChange = useCallback(
        (field: keyof Paciente) => (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData(prev => prev ? { ...prev, [field]: e.target.value } : prev);
        },
        []
    );

    const handleAlergiasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFormData(prev =>
            prev ? { ...prev, alergias: parseAlergias(value) } : prev
        );
    };

    const handleSubmit = async () => {
        const token = localStorage.getItem('token');
        if (!token || !formData) return;

        try {
            const res = await fetch(`http://localhost:3001/api/auth/patients/${id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    alergias: stringifyAlergias(formData.alergias ?? []),
                    fecha_de_nacimiento: dayjs(formData.fecha_nacimiento).format('YYYY-MM-DD')
                }),
            });

            const { error } = await res.json();
            if (!res.ok) alert(`Error: ${error ?? 'No se pudo actualizar'}`);
            else alert('Paciente actualizado correctamente'), 
            setTimeout(() => {router.push('/pacientes'),1000});
        } catch {
            alert('Error de red al actualizar');
        }
    };

    const handleDelete = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        if (!confirm('¿Estás seguro de que deseas eliminar este paciente?')) return;

        try {
            const res = await fetch(`http://localhost:3001/api/auth/patients/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });

            const { error } = await res.json();
            if (!res.ok) alert(`Error: ${error ?? 'No se pudo eliminar'}`);
            else alert('Paciente eliminado correctamente'), 
            setTimeout(() => {router.push('/pacientes'),1000});
        } catch {
            alert('Error de red al eliminar');
        }
    };

    if (loading) {
        return (
            <Box p={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box p={4} textAlign="center">
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    const generos = [
        { label: 'Femenino', value: 'F' },
        { label: 'Masculino', value: 'M' },
        { label: 'Otro', value: 'O' }
    ];

     const handleVerHistorial = () => {
            router.push(`/pacientes/HistorialMedico/${id}`);
    };
      


    return (
        
        <>
            <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
                <Grid>
                    <img
                        src='/images/profile.png'
                        alt="Foto del Paciente"
                        style={{ width: '80%', height: 'auto', borderRadius: '8px' }}
                    />
                </Grid>

                <Grid sx={{ width: '60%' }}>
                    <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mt: 2 }}>
                        Editar Paciente
                    </Typography>

                    <Box display="flex" flexDirection="column" gap={2}>
                        <TextField
                            label="Nombre"
                            value={formData?.nombre || ''}
                            onChange={handleChange('nombre')}
                            fullWidth
                        />
                        <TextField
                            label="Apellidos"
                            value={formData?.apellidos || ''}
                            onChange={handleChange('apellidos')}
                            fullWidth
                        />
                        <TextField
                            label="Email"
                            value={formData?.email || ''}
                            onChange={handleChange('email')}
                            fullWidth
                        />
                        <TextField
                            label="Teléfono"
                            value={formData?.telefono || ''}
                            onChange={handleChange('telefono')}
                            fullWidth
                        />
                        <TextField
                            label="Fecha de Nacimiento"
                            type="date"
                            value={dayjs(formData?.fecha_nacimiento).format('YYYY-MM-DD')}
                            onChange={handleChange('fecha_nacimiento')}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            select
                            name="genero"
                            label="Seleccione el género"
                            value={formData?.genero || ''}
                            required
                            fullWidth
                            onChange={handleChange('genero')}
                        >
                            {generos.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label="Alergias"
                            value={formData?.alergias?.join(', ') || ''}
                            onChange={handleAlergiasChange}
                            fullWidth
                        />
                        <TextField
                            label="Notas"
                            multiline
                            rows={3}
                            value={formData?.notas || ''}
                            onChange={handleChange('notas')}
                            fullWidth
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 3 }}>

                            <Button onClick={handleDelete} sx={{
                                backgroundColor: "white", color: "gray", p: 2, px: 10,
                                '&:hover': {
                                    bgcolor: '#d32f2f',
                                    color: '#fff',
                                }
                            }} >
                                <Typography variant="body2" component="h2">
                                    Eliminar Paciente
                                </Typography>
                            </Button>


                            <Button onClick={()=>{router.push("/pacientes")}} sx={{
                                backgroundColor: "#d32f2f", color: "white", p: 2, px: 10,
                                '&:hover': {
                                    bgcolor: '#d32f2f',
                                    color: '#fff',
                                }
                            }} >
                                <Typography variant="body2" component="h2">
                                    Cancelar
                                </Typography>
                            </Button>

                            <Button variant='outlined' onClick={handleSubmit} sx={{
                                backgroundColor: "#0647A0", color: "white", p: 2, px: 10,
                                '&:hover': {
                                    bgcolor: '#0661D9',
                                    color: '#fff',
                                }
                            }} >
                                <Typography variant="body2" component="h2">
                                    Guardar
                                </Typography>
                            </Button>

                        </Box>
                    </Box>
                </Grid>
            </Grid>

        </>
    );
}
