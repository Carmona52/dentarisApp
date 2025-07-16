'use client';

import React, { useState } from 'react';
import {
    Box,
    Card,
    Typography,
    Button,
    Modal,
    Backdrop,
    Fade,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';

import { Cita } from '../../types/Citas';

interface MyCardProps {
    cita: Cita
}


const modalStyle = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 520,
    bgcolor: 'background.default',
    borderRadius: 4,
    boxShadow: '0px 10px 30px rgba(0,0,0,0.2)',
    p: 4,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

const MyCard: React.FC<MyCardProps> = ({ cita }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Card
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 4,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
                    p: 3,
                    bgcolor: '#ffffff',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    cursor: 'pointer',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)',
                    },
                }}
                onClick={handleOpen}
            >
                {/* Encabezado: paciente y tipo de cita */}
                <Box display="flex" alignItems="center" mb={2}>
                    <Box
                        sx={{
                            width: 48,
                            height: 48,
                            borderRadius: '50%',
                            backgroundColor: '#e0f7fa',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 2,
                        }}
                    >
                        <PersonIcon sx={{ color: '#00796b' }} />
                    </Box>
                    <Box>
                        <Typography variant="h6" fontWeight="bold" color="text.primary">
                            {cita.paciente.nombre}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Limpieza Dental
                        </Typography>
                    </Box>
                </Box>

                {/* Detalles: fecha y hora */}
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    bgcolor="#f9fafb"
                    px={2}
                    py={1.5}
                    borderRadius={3}
                >
                    <Box display="flex" alignItems="center" gap={1}>
                        <CalendarMonthIcon sx={{ fontSize: 20, color: '#1976d2' }} />
                        <Typography variant="body2" fontWeight="medium" color="text.primary">
                            {cita.fecha.format("DD-MM-YYYY")}
                        </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                        <AccessTimeIcon sx={{ fontSize: 20, color: '#1976d2' }} />
                        <Typography variant="body2" fontWeight="medium" color="text.primary">
                            {cita.hora.format("hh:mm A")}
                        </Typography>
                    </Box>
                </Box>
            </Card>


            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{ backdrop: { timeout: 500 } }}>
                <Fade in={open}>
                    <Box sx={modalStyle}>
                        <Box
                            sx={{
                                width: 60,
                                height: 60,
                                background: 'linear-gradient(135deg, #33bfff 0%, #1daae8 100%)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mb: 2,
                            }}>
                            <CalendarMonthIcon sx={{ color: '#fff', fontSize: 30 }} />
                        </Box>

                        <Typography variant="h6" fontWeight="bold" mb={1} color="primary">
                            Detalles de la Cita
                        </Typography>

                        <Typography variant="body1" mb={1}>
                            <strong>Paciente:</strong> {cita.paciente.nombre} {cita.paciente.apellidos}
                        </Typography>
                        <Typography variant="body1" mb={1}>
                            <strong>Motivo:</strong> Limpieza Dental
                        </Typography>
                        <Typography variant="body1" mb={1}>
                            <strong>Fecha:</strong> {cita.fecha.format("DD-MM-YYYY")}
                        </Typography>
                        <Typography variant="body1" mb={2}>
                            <strong>Hora:</strong> {cita.hora.format("hh:mm A")}
                        </Typography>

                        <Box display="flex" gap={2} mt={2}>
                            <Button
                                onClick={handleClose}
                                variant="outlined"
                                sx={{
                                    borderRadius: 3,
                                    px: 3,
                                    borderColor: '#33bfff',
                                    color: '#33bfff',
                                    fontWeight: 500,
                                    textTransform: 'none',
                                    '&:hover': {
                                        bgcolor: '#e6f7ff',
                                    },
                                }}>
                                Re-Agendar
                            </Button>
                            <Button
                                onClick={handleClose}
                                variant="contained"
                                sx={{
                                    borderRadius: 3,
                                    px: 3,
                                    bgcolor: '#33bfff',
                                    fontWeight: 500,
                                    textTransform: 'none',
                                    '&:hover': {
                                        bgcolor: '#1daae8',
                                    },
                                }}>
                                Empezar Cita
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
};

export default MyCard;
