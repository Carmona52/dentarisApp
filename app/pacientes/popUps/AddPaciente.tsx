'use client';

import React, { useState } from 'react';
import {
    Modal,
    Box,
    Fade,
    Backdrop,
    Button,
    TextField,
    Typography,
    Grid,
    MenuItem,
    Divider,
    CircularProgress, 
} from '@mui/material';

interface AddPacienteProps {
    onPacienteAdded?: () => void;
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

const generos = [
    { label: 'Femenino', value: 'F' },
    { label: 'Masculino', value: 'M' },
    { label: 'Otro', value: 'O' }
];


const AddPaciente: React.FC<AddPacienteProps> = ({ onPacienteAdded }) => {
    const apiUrl = process.env.NEXT_PUBLIC_PACIENTE_URL;
    if(!apiUrl) {
        throw new Error('No API returned');
    }
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        apellidos: '',
        email: '',
        telefono: '',
        fecha_nacimiento: '',
        genero: '',
        pais_origen: '',
        direccion: '',
        notas: '',
        alergias: '',
        profesion: '',
        numero_identificacion: '',
        nombre_contacto_emergencia: '',
        telefono_contacto_emergencia: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false);
        setFormData({
            nombre: '', apellidos: '', email: '', telefono: '',
            fecha_nacimiento: '', genero: '', pais_origen: '',
            direccion: '', notas: '', alergias: '', profesion: '',
            numero_identificacion: '', nombre_contacto_emergencia: '',
            telefono_contacto_emergencia: '',
        });
        setError(null);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        setError(null);
        const requiredFields = ['nombre', 'apellidos', 'email', 'fecha_nacimiento', 'genero'];
        const missing = requiredFields.filter((field) => !formData[field as keyof typeof formData]);

        if (missing.length > 0) {
            setError(`Campos obligatorios faltantes: ${missing.join(', ')}`);
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Token no disponible');
                setLoading(false);
                return;
            }

            const body = {
                ...formData,
                fecha_nacimiento: formData.fecha_nacimiento,
                rol: 'Paciente',
            };

            const res = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(body),
            });

            if (!res.ok) {
                const errorData = await res.json();
                console.error('Error del servidor:', errorData);
                setError(`Error ${res.status}: ${errorData.message || 'Error al registrar el paciente'}`);
                setLoading(false);
                return;
            }
            
     
            if (onPacienteAdded) {
                onPacienteAdded();
            }

            alert('Paciente registrado correctamente');
            handleClose();
        } catch (err) {
            console.error(err);
            setError('Error al conectar con el servidor');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Button variant="contained" onClick={handleOpen}>
                Registrar Paciente
            </Button>
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
                            Registro de Paciente
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        {error && (
                            <Typography color="error" sx={{ mb: 2 }}>
                                {error}
                            </Typography>
                        )}

                        <Grid container spacing={2}>
                            <Grid >
                                <TextField name='nombre' label='Ingrese el nombre' value={formData.nombre} required fullWidth onChange={handleChange} />
                            </Grid>
                            <Grid>
                                <TextField name='apellidos' label='Ingrese los apellidos' value={formData.apellidos} required fullWidth onChange={handleChange} />
                            </Grid>

                            
                                <TextField
                                    select
                                    name='genero'
                                    label='Seleccione el género'
                                    value={formData.genero}
                                    required
                                    fullWidth
                                    onChange={handleChange}
                                >
                                    {generos.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                          

                            <Grid>
                                <TextField
                                    name='fecha_nacimiento'
                                    label='Ingrese la fecha de nacimiento'
                                    type='date'
                                    value={formData.fecha_nacimiento}
                                    required
                                    fullWidth
                                    onChange={handleChange}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>

                            <Grid>
                                <TextField name='email' label='Ingrese el email' value={formData.email} required fullWidth onChange={handleChange} />
                            </Grid>
                            <Grid >
                                <TextField name='telefono' label='Ingrese el teléfono' value={formData.telefono} fullWidth onChange={handleChange} />
                            </Grid>
                            <Grid >
                                <TextField name='pais_origen' label='Ingrese el país de origen' value={formData.pais_origen} fullWidth onChange={handleChange} />
                            </Grid>
                            <Grid>
                                <TextField name='direccion' label='Ingrese la dirección' value={formData.direccion} fullWidth onChange={handleChange} />
                            </Grid>
                            <Grid>
                                <TextField name='notas' label='Ingrese notas adicionales' value={formData.notas} multiline rows={2} fullWidth onChange={handleChange} />
                            </Grid>
                            <Grid >
                                <TextField name='alergias' label='Ingrese alergias' value={formData.alergias} multiline rows={2} fullWidth onChange={handleChange} />
                            </Grid>
                            <Grid >
                                <TextField name='profesion' label='Ingrese la profesión' value={formData.profesion} fullWidth onChange={handleChange} />
                            </Grid>
                            <Grid >
                                <TextField name='numero_identificacion' label='Ingrese el número de identificación' value={formData.numero_identificacion} fullWidth onChange={handleChange} />
                            </Grid>
                            <Grid >
                                <TextField name='nombre_contacto_emergencia' label='Ingrese el nombre del contacto de emergencia' value={formData.nombre_contacto_emergencia} fullWidth onChange={handleChange} />
                            </Grid>
                            <Grid >
                                <TextField name='telefono_contacto_emergencia' label='Ingrese el teléfono del contacto de emergencia' value={formData.telefono_contacto_emergencia} fullWidth onChange={handleChange} />
                            </Grid>
                        </Grid>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 3 }}>
                            <Button onClick={handleClose} sx={{
                                backgroundColor: "white", color: "gray", p: 2, px: 10,
                                '&:hover': {
                                    bgcolor: '#d32f2f',
                                    color: '#fff',
                                }
                            }} disabled={loading}>
                                <Typography variant="body2" component="h2">
                                    Cancelar
                                </Typography>
                            </Button>
                            <Button
                                variant='contained'
                                onClick={handleSubmit}
                                sx={{
                                    backgroundColor: "#0647A0", color: "white", p: 2, px: 10,
                                    '&:hover': {
                                        bgcolor: '#0661D9',
                                        color: '#fff',
                                    }
                                }}
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24} color="inherit" /> : 'Guardar'}
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};

export default AddPaciente;