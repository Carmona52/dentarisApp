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

interface MyCardProps {
    name: string;
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

const MyCard: React.FC<MyCardProps> = ({ name }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Card
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3,
                    boxShadow: 2,
                    p: 2,
                    bgcolor: '#fff',
                    cursor: 'pointer',
                }}
                onClick={handleOpen}
            >
                <Box display="flex" alignItems="center" mb={1}>
                    <Box
                        sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            backgroundColor: '#f0f0f0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 2,
                        }}
                    >
                        <PersonIcon fontSize="small" />
                    </Box>
                    <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                            {name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Limpieza Dental
                        </Typography>
                    </Box>
                </Box>

                <Box
                    display="flex"
                    alignItems="center"
                    gap={2}
                    bgcolor="#f4f6f8"
                    px={2}
                    py={1}
                    borderRadius={2}
                    mb={2}
                >
                    <Box display="flex" alignItems="center" gap={1}>
                        <CalendarMonthIcon fontSize="small" />
                        <Typography variant="body2">18-06-2024</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                        <AccessTimeIcon fontSize="small" />
                        <Typography variant="body2">11.00 – 12:00 AM</Typography>
                    </Box>
                </Box>

                <Box display="flex" justifyContent="space-between" mt="auto">
                    <Button
                        variant="outlined"
                        sx={{
                            borderRadius: 2,
                            borderColor: '#dee2e6',
                            color: '#343a40',
                            textTransform: 'none',
                            bgcolor: '#fff',
                            '&:hover': {
                                bgcolor: '#f8f9fa',
                            },
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            borderRadius: 2,
                            bgcolor: '#33bfff',
                            color: '#fff',
                            textTransform: 'none',
                            '&:hover': {
                                bgcolor: '#1daae8',
                            },
                        }}
                        onClick={handleOpen}
                    >
                        Más sobre la Cita
                    </Button>
                </Box>
            </Card>

            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{ backdrop: { timeout: 500 } }}
            >
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
                            }}
                        >
                            <CalendarMonthIcon sx={{ color: '#fff', fontSize: 30 }} />
                        </Box>

                        <Typography variant="h6" fontWeight="bold" mb={1} color="primary">
                            Detalles de la Cita
                        </Typography>

                        <Typography variant="body1" mb={1}>
                            <strong>Paciente:</strong> {name}
                        </Typography>
                        <Typography variant="body1" mb={1}>
                            <strong>Motivo:</strong> Limpieza Dental
                        </Typography>
                        <Typography variant="body1" mb={1}>
                            <strong>Fecha:</strong> 18-06-2024
                        </Typography>
                        <Typography variant="body1" mb={2}>
                            <strong>Hora:</strong> 11:00 – 12:00 AM
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
                                }}
                            >
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
                                }}
                            >
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
