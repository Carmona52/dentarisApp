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
    Divider,
} from '@mui/material';
import {
    CalendarMonth as CalendarMonthIcon,
    AccessTime as AccessTimeIcon,
    Person as PersonIcon,
    Close as CloseIcon,
} from '@mui/icons-material';

import { Cita } from '../../lib/db/citas/types';
import { useRouter } from 'next/navigation';
import EditCitaModal from '@/app/registroCitas/PopUps/EditCita';

import { updateEstadoCita } from '@/app/lib/db/citas/citas';
import dayjs from 'dayjs';

interface MyCardProps {
    cita: Cita;
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

const IconCircle = ({ children }: { children: React.ReactNode }) => (
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
        {children}
    </Box>
);

const MyCard: React.FC<MyCardProps> = ({ cita }) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [modalAbierto, setModalAbierto] = useState(false);
    const hora = cita.hora;



    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const abrirModal = () => setModalAbierto(true) ;
    const cerrarModal = () => setModalAbierto(false);
    

    const CitaStart = async () => {
    const fechaFormateada = dayjs(cita.fecha).format("YYYY-MM-DD");
    const horaFormateada = dayjs(hora).format("HH:mm");
const horaParseada = dayjs(horaFormateada, "HH:mm");

    

 await updateEstadoCita(cita.id, {
    fecha: dayjs(fechaFormateada),
    hora: dayjs(hora).format("HH:mm"),
    motivo: cita.motivo,
    estado: "En proceso"
});

    router.push(`/registroCitas/${cita.id}`);
};

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
                <Box display="flex" alignItems="center" mb={2}>
                    <IconCircle>
                        <PersonIcon sx={{ color: '#00796b' }} />
                    </IconCircle>
                    <Box>
                        <Typography variant="h6" fontWeight="bold" color="text.primary">
                            {cita.paciente.nombre} {cita.paciente.apellidos}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Limpieza Dental
                        </Typography>
                    </Box>
                </Box>

                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    bgcolor="#f9fafb"
                    px={2}
                    py={1.5}
                    borderRadius={3}
                >
                    <Box display="flex" alignItems="center" gap={1}>
                        <CalendarMonthIcon sx={{ fontSize: 20, color: '#1976d2' }} />
                        <Typography variant="body2" fontWeight="medium" color="text.primary">
                            {cita.fecha.format('DD-MM-YYYY')}
                        </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                        <AccessTimeIcon sx={{ fontSize: 20, color: '#1976d2' }} />
                        <Typography variant="body2" fontWeight="medium" color="text.primary">
                            {cita.hora.format('hh:mm A')}
                        </Typography>
                    </Box>
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
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                top: 16,
                                right: 16,
                                p: '6px',
                                borderRadius: '50%',
                                backgroundColor: '#f44336',
                                color: '#fff',
                                cursor: 'pointer',
                                transition: '0.3s ease',
                                '&:hover': {
                                    backgroundColor: '#d32f2f',
                                    transform: 'scale(1.1)',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                },
                            }}
                        >
                            <CloseIcon />
                        </Box>

                        <Divider sx={{ bgcolor: 'black', mt: 4, mb: 2 }} />

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

                        <Typography variant="body1" mb={1}><strong>Paciente:</strong> {cita.paciente.nombre} {cita.paciente.apellidos}</Typography>
                        <Typography variant="body1" mb={1}>
                            <strong>Motivo:</strong> {cita.motivo?.trim() || 'No especificado'}
                        </Typography>
                        <Typography variant="body1" mb={1}><strong>Fecha:</strong> {cita.fecha.format("DD-MM-YYYY")}</Typography>
                        <Typography variant="body1" mb={2}><strong>Hora:</strong> {cita.hora.format("hh:mm A")}</Typography>

                        <Box display="flex" gap={2}>
                            {[{
                                text: "Editar Cita",
                                action: abrirModal
                            }, {
                                text: "Empezar Cita",
                                action: CitaStart
                            }].map(({ text, action }) => (
                                <Button
                                    key={text}
                                    onClick={action}
                                    variant="contained"
                                    sx={{
                                        borderRadius: 3,
                                        px: 3,
                                        bgcolor: '#33bfff',
                                        fontWeight: 500,
                                        textTransform: 'none',
                                        '&:hover': { bgcolor: '#1daae8' },
                                    }}
                                >
                                    {text}
                                </Button>
                            ))}
                        </Box>
                    </Box>
                </Fade>
            </Modal>

            <EditCitaModal id={cita.id} open={modalAbierto} handleClose={cerrarModal} />
        </>
    );
};

export default MyCard;
