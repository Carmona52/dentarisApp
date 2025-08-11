'use client';

import {
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    TextField,
    TablePagination, 
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import AddPaciente from "./popUps/AddPaciente";
import { Paciente } from "../types/Pacientes"
import dayjs from "dayjs";

export default function TablaPacientes() {

    const pacientesURL = process.env.NEXT_PUBLIC_PACIENTE_URL;
    if(!pacientesURL) {
        throw new Error("No se paciente encontrado");
    }

    const router = useRouter();
    const [pacientes, setPacientes] = useState<Paciente[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [busqueda, setBusqueda] = useState("");


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const getPacientes = useCallback(async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            setError("Token no disponible. Por favor, inicie sesión.");
            return;
        }

        try {
            const response = await fetch(pacientesURL, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error del servidor:", errorData);
                setError(
                    `Error ${response.status}: ${
                        errorData.message || "No se pudo obtener pacientes."
                    }`
                );
                return;
            }

            const data = await response.json();
            const pacientesArray: Paciente[] = Array.isArray(data)
                ? data
                : data.pacientes || [];
       
            pacientesArray.sort((a, b) => (a.nombre ?? '').localeCompare(b.nombre ?? ''));
            setPacientes(pacientesArray);
            setError(null);
        } catch (err) {
            console.error("Error de red:", err);
            setError("No se pudo conectar con el servidor.");
        }
    }, []);

    useEffect(() => {
        getPacientes();
    }, [getPacientes]);

    const formatGenero = (g: string) => {
        const map: Record<string, string> = {
            M: "Masculino",
            F: "Femenino",
            O: "Otro",
        };
        return map[g] || "No especificado";
    };

    const pacientesFiltrados = pacientes.filter((p) =>
        `${p.nombre} ${p.apellidos} ${p.email} ${p.telefono}`.toLowerCase().includes(busqueda.toLowerCase())
    );


    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); 
    };

    const pacientesPaginados = pacientesFiltrados.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);


    return (
        <Box>
            <Box className="flex flex-row justify-between my-5 gap-4">
                <TextField
                    label="Buscar Paciente"
                    variant="outlined"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-128"
                />
                <AddPaciente onPacienteAdded={getPacientes} />
            </Box>

            {error ? (
                <Typography className="text-red-600 bg-red-100 p-3 rounded-md">
                    {error}
                </Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Apellidos</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Teléfono</TableCell>
                                <TableCell>Fecha Nacimiento</TableCell>
                                <TableCell>Género</TableCell>
                                <TableCell>Contacto Emergencia</TableCell>
                                <TableCell>Acción</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pacientesPaginados.map((paciente) => (
                                <TableRow key={paciente.usuario_id ?? `${paciente.nombre}-${Math.random()}`}>
                                    <TableCell>{paciente.nombre}</TableCell>
                                    <TableCell>{paciente.apellidos}</TableCell>
                                    <TableCell>{paciente.email}</TableCell>
                                    <TableCell>{paciente.telefono ?? "N/A"}</TableCell>
                                    <TableCell>{dayjs(paciente.fecha_nacimiento).format('YYYY-MM-DD')}</TableCell>
                                    <TableCell>{formatGenero(paciente.genero)}</TableCell>
                                    <TableCell>
                                        {paciente.nombre_contacto_emergencia || "N/A"}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() => router.push(`/pacientes/${paciente.usuario_id}`)}>
                                            Ver Paciente
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
             
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={pacientesFiltrados.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            )}
        </Box>
    );
}