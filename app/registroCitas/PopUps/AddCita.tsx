import React, { useEffect, useState } from 'react';
import {
    Modal, Box, Fade, Backdrop, Button, Typography, Grid,
    Divider, TextField, MenuItem
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { Usuario } from '../types/DataType';


interface openModalProps {    
    open: boolean;
    handleClose: () => void;
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



const AddCitaModal: React.FC<openModalProps> = ({open, handleClose}) => {

    if (!open) return null;

    const router = useRouter();
    const [paciente, setPaciente] = useState<Usuario[]>([]);
    const [dentista, setDentista] = useState<Usuario[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        paciente_id: '',
        dentista_id: '',
        fecha: '',
        hora: '',
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        const { paciente_id, dentista_id, fecha, hora } = formData;
        if (!paciente_id || !dentista_id || !fecha || !hora) {
            alert('Todos los campos son obligatorios.');
            return;
        }

        const citaDateTime = new Date(`${fecha}T${hora}`);
        if (citaDateTime < new Date()) {
            alert('La cita no puede ser en el pasado.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:3002/api/citas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ ...formData, estado: 'Agendada' }),
            });

            if (!res.ok) throw new Error('Error al crear la cita');
            alert('Cita registrada correctamente');
            router.refresh();
            router.push('/registroCitas');
            handleClose();
        } catch (err) {
            console.error(err);
            alert('Error al registrar la cita');
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Token no disponible. Por favor, inicie sesión.');
                return;
            }

            try {
                const response = await fetch('http://localhost:3001/api/auth/patients', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Error del servidor:', errorData);
                    setError(
                        `Error ${response.status}: ${errorData.message || 'No se pudo obtener pacientes.'
                        }`
                    );
                    return;
                }

                const data = await response.json();
                console.log('Datos de pacientes:', data);
                const pacientesArray: Usuario[] = Array.isArray(data)
                    ? data
                    : data.pacientes || [];
                setPaciente(pacientesArray);
            } catch (err) {
                console.error('Error de red:', err);
                setError('No se pudo conectar con el servidor.');
            }
        }

        const fetchDentistas = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("Token no disponible. Por favor, inicie sesión.");
                return;
            }

            try {
                const response = await fetch("http://localhost:3001/api/auth/dentists", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    setError(
                        `Error ${response.status}: ${errorData.message || "No se pudo obtener dentistas."}`
                    );
                    return;
                }

                const data = await response.json();
                const dentistasArray = Array.isArray(data) ? data : data.dentists || data;

                setDentista(
                    dentistasArray.map(d => ({
                        usuario_id: d.usuario_id,
                        nombre: d.nombre || "Sin nombre",
                        apellido: d.apellidos || ""
                    }))
                );


                console.log("Dentistas obtenidos:", dentista);
            } catch (err: any) {
                console.error("Error de red:", err);
                setError("No se pudo conectar con el servidor.");
            }
        };

        fetchDentistas()
        fetchData();
    }, []);


    return (
        <div>
            
            <Modal open={open} onClose={handleClose} closeAfterTransition slots={{ backdrop: Backdrop }} slotProps={{ backdrop: { timeout: 500 } }}>
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography variant="h6" sx={{ mb: 2 }}>Registro de Cita</Typography>
                        <Divider sx={{ mb: 2 }} />

                        <Grid container spacing={2}>

                            <TextField
                                select
                                name="paciente_id"
                                label="Seleccione Paciente"
                                value={formData.paciente_id}
                                fullWidth
                                required
                                onChange={handleChange}>
                                {paciente.map((p) => (
                                    <MenuItem key={p.usuario_id} value={p.usuario_id}>
                                        {p.nombre}
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
                                {dentista.map((d) => (
                                    <MenuItem key={d.usuario_id} value={d.usuario_id}>
                                        {d.nombre}
                                    </MenuItem>
                                ))}
                            </TextField>


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



                            <TextField
                                name="hora"
                                label="Hora"
                                type="time"
                                value={formData.hora}
                                required
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                onChange={handleChange}
                            />
                        </Grid>


                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                            <Button onClick={handleClose} sx={{
                                bgcolor: "white", color: "gray", px: 6,
                                '&:hover': { bgcolor: '#d32f2f', color: '#fff' }
                            }}>
                                Cancelar
                            </Button>

                            <Button onClick={handleSubmit} variant="contained" sx={{
                                bgcolor: "#0647A0", px: 6,
                                '&:hover': { bgcolor: '#0661D9' }
                            }}>
                                Guardar
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div >
    );
};

export default AddCitaModal;
