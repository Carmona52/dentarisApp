'use client';

import * as React from 'react';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DateCalendar} from '@mui/x-date-pickers/DateCalendar';
import {Box, Typography,} from '@mui/material';

import Pacientes from "./dataTest/data.json";

import MyCard from "././components/cards/Card"

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
                        fixedWeekNumber={6}/>
                </LocalizationProvider>
                <Typography variant="h4" sx={{fontWeight:"semi-bold", marginY:5}} className="text-center">
                    Citas programadas para el día de hoy
                </Typography>

                <Box
                    display="grid"
                    gridTemplateColumns={{xs: '1fr', sm: '1fr 1fr'}}
                    gap={2}>
                    {Pacientes.map((paciente) => (
                        <MyCard key={paciente.numero_identificacion} name={paciente.nombre}/>
                    ))}
                </Box>
            </Box>


            <Box display="flex" flexDirection="column" gap={3} >
                <Box display="grid" gridTemplateColumns="1fr 1fr" gap={1} p={2} bgcolor="#fff" boxShadow={2}
                     borderRadius={2} className="h-72 w-72 text-center mx-auto">
                    <Box textAlign="center" className="border-r border-gray-200">
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
                   <MyCard name={paciente.nombre} key={paciente.numero_identificacion}/>
                ))}
            </Box>
        </Box>
    );
}
