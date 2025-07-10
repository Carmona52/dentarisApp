'use client'
import React from 'react';
import {
    Box,
    Typography,
    TextField,
    MenuItem,
    Button,
    Avatar,
    Chip,
    FormControlLabel,
    Checkbox,
    Paper,
    IconButton,
    InputAdornment
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {useParams} from "next/navigation";

import paciente from "../../types/Pacientes";
import datapacientes from "../../dataTest/data.json";



export default function ConsultaForm() {
    const params = useParams();
    const identificador = params.identificador;

    const Paciente:paciente = datapacientes.find((p) => p.numero_identificacion === identificador);
    return (
        <Box
            display="grid"
            gridTemplateColumns={{ xs: '1fr', md: '300px 1fr' }}
            gap={3}
            p={3}>

            <Box
                p={3}
                bgcolor="#f8f9fa"
                borderRadius={2}
                display="flex"
                flexDirection="column"
                gap={2}>
                <Avatar
                    alt={Paciente.nombre}
                    src="images/profile.png"
                    sx={{ width: 72, height: 72, mb: 1 }}
                />
                <Typography variant="h6">{Paciente.nombre} {Paciente.apellidos}</Typography>
                <Typography variant="body2" color="text.secondary">
                    22 años, {Paciente.genero}
                </Typography>

                <Box>
                    <Typography variant="caption" color="text.secondary">Email</Typography>
                    <Typography variant="body2">{Paciente.email}</Typography>
                </Box>

                <Box>
                    <Typography variant="caption" color="text.secondary">Teléfono</Typography>
                    <Typography variant="body2">{Paciente.telefono}</Typography>
                </Box>

                <Box>
                    <Typography variant="caption" color="text.secondary">Fecha de Nacimiento</Typography>
                    <Typography variant="body2">{Paciente.fecha_nacimiento}</Typography>
                </Box>

                <Box>
                    <Typography variant="caption" color="text.secondary">Alergias</Typography>


                    {Paciente.alergias? <Typography variant="body2">{Paciente.alergias}</Typography> :
                        <Typography variant="body2">Ninguna</Typography>}

                </Box>

                <Button variant="contained" sx={{ mt: 2, borderRadius: 2 }}>
                    Gestionar Paciente
                </Button>
            </Box>

            <Box display="flex" flexDirection="column" gap={3}>
                <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }} gap={2}>
                    <TextField
                        label="Médico Encargado"
                        defaultValue="Dr. Stephen Conley"
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="Motivo de Consulta"
                        select
                        defaultValue="Clinic Consulting"
                        fullWidth
                    >
                        <MenuItem value="Clinic Consulting">Consulta Medica</MenuItem>
                        <MenuItem value="Evaluación">Evaluación</MenuItem>
                        <MenuItem value="Otro">Otro</MenuItem>
                    </TextField>
                </Box>

                <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }} gap={2}>
                    <TextField label="Hora de la cita" defaultValue="11:20 PM" fullWidth />
                    <TextField label="Fecha de la cita" type="date" defaultValue="2025-06-14" fullWidth InputLabelProps={{ shrink: true }} />
                </Box>

                <TextField
                    label="Motivo de Consulta"
                    multiline
                    rows={2}
                    placeholder="Ingrese el motivo de la consulta"
                    fullWidth
                />
                {
                    Paciente.notas?  <TextField
                        label="Notas"
                        multiline
                        rows={3}
                        defaultValue={Paciente.notas}
                        fullWidth
                    />: <TextField
                        label="Notas"
                        multiline
                        rows={3}
                        placeholder="Ingrese aquí sus notas"
                        fullWidth
                    />
                }



                <FormControlLabel control={<Checkbox defaultChecked />} label="Visible para el Paciente" />

                <Box>
                    <Typography variant="subtitle2" gutterBottom>
                        Añadir imágenes (Opcional)
                    </Typography>

                    <Paper
                        variant="outlined"
                        sx={{
                            borderStyle: 'dashed',
                            p: 2,
                            textAlign: 'center',
                            bgcolor: '#fcfcfc',
                        }}
                    >
                        <CloudUploadIcon sx={{ fontSize: 40, color: '#ccc' }} />
                        <Typography variant="body2" color="text.secondary">
                            Drop your file here, or <strong>Browse</strong>
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Max size: 10MB
                        </Typography>
                    </Paper>

                    <Box
                        mt={2}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        p={1}
                        border="1px solid #e0e0e0"
                        borderRadius={1}
                    >
                        <Typography variant="body2">HistorialPaciente.pdf</Typography>
                        <IconButton size="small">
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
