'use client';

import * as React from 'react';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DateCalendar} from '@mui/x-date-pickers/DateCalendar';
import {
    Box,
    Card,
    Typography,
    Button,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';

import Pacientes from "./dataTest/data.json";

export default function Home() {
    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: {xs: '1fr', md: '2fr 1fr'},
                gap: 3,
                p: 3,
            }}>
            <Box className="border-r pr-5 border-gray-400 my-6">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar
                        showDaysOutsideCurrentMonth
                        fixedWeekNumber={6}
                    />
                </LocalizationProvider>
                <Typography variant="h4" sx={{fontWeight:"semi-bold", marginY:5}} className="text-center">
                    Citas programadas para el día de hoy
                </Typography>

                <Box
                    display="grid"
                    gridTemplateColumns={{xs: '1fr', sm: '1fr 1fr'}}
                    gap={2}>
                    {Pacientes.map((paciente) => (

                    ))}
                </Box>
            </Box>




            <Box display="flex" flexDirection="column" gap={3} >
                <Box display="grid" gridTemplateColumns="1fr 1fr" gap={1} p={2} bgcolor="#fff" boxShadow={2}
                     borderRadius={2} className="h-96 w-96 text-center mx-auto">
                    <Box textAlign="center">
                        <Typography variant="h2" fontWeight="bold">{Pacientes.length}</Typography>
                        <Typography variant="h5">Citas Hoy</Typography>
                    </Box>
                    <Box textAlign="center">
                        <Typography variant="h2" fontWeight="bold">1</Typography>
                        <Typography variant="h5">Cancelada</Typography>
                    </Box>
                    <Box textAlign="center" gridColumn="span 2" pt={1} borderTop="1px solid #eee">
                        <Typography variant="h2" fontWeight="bold">2</Typography>
                        <Typography variant="h5">Nuevos Pacientes</Typography>
                    </Box>
                </Box>

                <Typography variant="h6" fontWeight="bold">
                    Citas Próximas
                </Typography>

                {[...Pacientes.slice(0, 2)].map((paciente) => (
                    <Card
                        key={paciente.numero_identificacion + "_proxima"}
                        sx={{
                            p: 2,
                            borderRadius: 3,
                            boxShadow: 1,
                            bgcolor: '#fff',
                        }}>
                        <Box display="flex" alignItems="center" mb={1}>
                            <Box
                                sx={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: '50%',
                                    backgroundColor: '#f0f0f0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mr: 2,
                                }}>
                                <PersonIcon fontSize="small"/>
                            </Box>
                            <Box>
                                <Typography variant="subtitle2" fontWeight="bold">
                                    {paciente.nombre}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Limpieza Dental
                                </Typography>
                            </Box>
                        </Box>

                        <Box
                            display="flex"
                            justifyContent="space-between"
                            bgcolor="#f4f6f8"
                            px={2}
                            py={1}
                            borderRadius={2}
                            mb={2}>
                            <Box display="flex" alignItems="center" gap={1}>
                                <CalendarMonthIcon fontSize="small"/>
                                <Typography variant="caption">18-06-2024</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" gap={1}>
                                <AccessTimeIcon fontSize="small"/>
                                <Typography variant="caption">11.00 – 12:00 AM</Typography>
                            </Box>
                        </Box>

                        <Box display="flex" justifyContent="space-between">
                            <Button
                                size="small"
                                variant="outlined"
                                sx={{borderRadius: 2, textTransform: 'none'}}>
                                Citar
                            </Button>
                            <Button
                                size="small"
                                variant="contained"
                                sx={{
                                    bgcolor: '#33bfff',
                                    color: '#fff',
                                    textTransform: 'none',
                                    borderRadius: 2,
                                    '&:hover': {bgcolor: '#1daae8'},
                                }}>
                                Re-Agendar
                            </Button>
                        </Box>
                    </Card>
                ))}
            </Box>
        </Box>
    );
}
