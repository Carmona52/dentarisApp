'use client'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography, Box,
} from "@mui/material";

import { Paciente } from "../types/Pacientes";
import pacientes from "../dataTest/data.json";
import {useRouter} from "next/navigation";

export default function registroCitas() {
    const router = useRouter();

    const handleClick = (numeroIdentificador: string) => {
        router.push(`/pacientes/${numeroIdentificador}`);
    };
    return (
        <>
            <Box></Box>
            <TableContainer
                component={Paper}
                sx={{
                    height: '100%', // Ocupa todo el alto disponible
                    borderRadius: 2,
                    boxShadow: 3,
                    mt: 4,
                }}
            >
                <Table stickyHeader aria-label="tabla de pacientes">
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Nombre</strong></TableCell>
                            <TableCell>CURP</TableCell>
                            <TableCell>Fecha Nac.</TableCell>
                            <TableCell>Género</TableCell>
                            <TableCell>Profesión</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Teléfono</TableCell>
                            <TableCell>Contacto Emergencia</TableCell>
                            <TableCell>Notas</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pacientes.map((paciente: Paciente) => (
                            <TableRow
                                key={paciente.numero_identificacion}
                                hover
                                onClick={() => handleClick(paciente.numero_identificacion)}
                                sx={{ cursor: "pointer" }}
                            >
                                <TableCell>
                                    <Typography variant="body2" fontWeight="medium">
                                        {paciente.nombre} {paciente.apellidos}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">{paciente.numero_identificacion}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">{paciente.fecha_nacimiento}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">{paciente.genero}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" noWrap>{paciente.profesion}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" noWrap>{paciente.email}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" noWrap>{paciente.telefono}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">
                                        <strong>{paciente.nombre_contacto_emergencia}</strong><br />
                                        <span style={{ fontSize: '0.85em' }}>{paciente.telefono_contacto_emergencia}</span>
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                                        {paciente.notas}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>
        </>
    );
}
