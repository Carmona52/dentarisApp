'use client';

import React, { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    TextField,
    Chip,
    Stack
} from '@mui/material';

// Estados posibles de los dientes
const estados = ['Bueno', 'Picado', 'Caries', 'Fracturado', 'Ausente'];

// Inicializamos los 32 dientes
const teeth = Array.from({ length: 32 }, (_, i) => ({
    id: i + 1,
    label: i < 16 ? `Diente ${i + 1} (Sup)` : `Diente ${i + 1} (Inf)`,
    estado: 'Bueno',
    descripcion: 'Sin observaciones',
}));

export default function ConsultaOdontograma() {
    const [odontograma, setOdontograma] = useState(teeth);
    const [selectedTooth, setSelectedTooth] = useState<any>(null);

    const handleOpen = (tooth: any) => setSelectedTooth(tooth);
    const handleClose = () => setSelectedTooth(null);

    const handleEstadoChange = (nuevoEstado: string) => {
        setOdontograma((prev) =>
            prev.map((t) =>
                t.id === selectedTooth.id ? { ...t, estado: nuevoEstado } : t
            )
        );
        setSelectedTooth({ ...selectedTooth, estado: nuevoEstado });
    };

    const handleDescripcionChange = (nuevaDescripcion: string) => {
        setOdontograma((prev) =>
            prev.map((t) =>
                t.id === selectedTooth.id ? { ...t, descripcion: nuevaDescripcion } : t
            )
        );
        setSelectedTooth({ ...selectedTooth, descripcion: nuevaDescripcion });
    };

    // Colores dinámicos según estado
    const getColorByEstado = (estado: string) => {
        switch (estado) {
            case 'Bueno':
                return { bg: '#c8e6c9', hover: '#81c784', color: '#1b5e20' };
            case 'Picado':
                return { bg: '#ffe0b2', hover: '#ffb74d', color: '#e65100' };
            case 'Caries':
                return { bg: '#ffcdd2', hover: '#ef5350', color: '#b71c1c' };
            case 'Fracturado':
                return { bg: '#d1c4e9', hover: '#9575cd', color: '#311b92' };
            case 'Ausente':
                return { bg: '#eceff1', hover: '#90a4ae', color: '#263238' };
            default:
                return { bg: '#e3f2fd', hover: '#90caf9', color: '#0d47a1' };
        }
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom className="text-center p-5">
                Odontograma Del Paciente
            </Typography>

            <Stack direction="row" spacing={2} sx={{ my: 3, flexWrap: 'wrap', marginLeft: 'auto', marginRight: 'auto', justifyContent: 'center' }}>
                {estados.map((estado) => {
                    const colors = getColorByEstado(estado);
                    return (
                        <Chip
                            key={estado}
                            label={estado}
                            sx={{
                                bgcolor: colors.bg,
                                color: colors.color,
                                fontWeight: 'bold',
                            }}
                        />
                    );
                })}
            </Stack>


            <Box sx={{ mt: 4 }}>
                {/* Dientes Superiores */}
                <Grid container spacing={1} justifyContent="center">
                    {odontograma.slice(0, 16).map((tooth) => {
                        const colors = getColorByEstado(tooth.estado);
                        return (
                            <Grid key={tooth.id}>
                                <Paper
                                    elevation={4}
                                    onClick={() => handleOpen(tooth)}
                                    sx={{
                                        width: 70,
                                        height: 100,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexDirection: 'column',
                                        cursor: 'pointer',
                                        bgcolor: colors.bg,
                                        color: colors.color,
                                        borderRadius: 2,
                                        p: 1,
                                        '&:hover': { bgcolor: colors.hover },
                                    }}
                                >
                                    <Typography variant="caption">#{tooth.id}</Typography>
                                    <span style={{ fontSize: '1.8rem' }}>🦷</span>
                                    <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                                        {tooth.estado}
                                    </Typography>

                                </Paper>
                            </Grid>
                        );
                    })}
                </Grid>

                <Box sx={{ height: 40 }} />

                {/* Dientes Inferiores */}
                <Grid container spacing={1} justifyContent="center">
                    {odontograma.slice(16).map((tooth) => {
                        const colors = getColorByEstado(tooth.estado);
                        return (
                            <Grid key={tooth.id}>
                                <Paper
                                    elevation={4}
                                    onClick={() => handleOpen(tooth)}
                                    sx={{
                                        width: 70,
                                        height: 100,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexDirection: 'column',
                                        cursor: 'pointer',
                                        bgcolor: colors.bg,
                                        color: colors.color,
                                        borderRadius: 2,
                                        p: 1,
                                        '&:hover': { bgcolor: colors.hover },
                                    }}
                                >
                                    <Typography variant="caption">#{tooth.id}</Typography>
                                    <span style={{ fontSize: '1.8rem' }}>🦷</span>
                                    <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                                        {tooth.estado}
                                    </Typography>
                                </Paper>
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>

            {/* Modal para editar estado y descripción */}
            <Dialog open={!!selectedTooth} onClose={handleClose}>
                <DialogTitle>Detalles del {selectedTooth?.label}</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel>Estado</InputLabel>
                        <Select
                            value={selectedTooth?.estado || ''}
                            label="Estado"
                            onChange={(e) => handleEstadoChange(e.target.value)}
                        >
                            {estados.map((estado) => (
                                <MenuItem key={estado} value={estado}>
                                    {estado}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        label="Descripción"
                        multiline
                        rows={3}
                        value={selectedTooth?.descripcion || ''}
                        onChange={(e) => handleDescripcionChange(e.target.value)}
                        sx={{ mt: 3 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cerrar</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}