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
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Paciente } from "../types/Pacientes";
import dayjs from "dayjs";

export default function TablaPacientes() {
    const router = useRouter();
    const [pacientes, setPacientes] = useState<Paciente[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [busqueda, setBusqueda] = useState("");

    useEffect(() => {
        const getPacientes = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("Token no disponible. Por favor, inicie sesión.");
                return;
            }

            try {
                const response = await fetch("http://localhost:3001/api/auth/dentist", {
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
                            errorData.message || "No se pudo obtener dentistas."
                        }`
                    );
                    return;
                }

                const data = await response.json();
                const pacientesArray: Paciente[] = Array.isArray(data)
                    ? data
                    : data.pacientes || [];

                setPacientes(pacientesArray);
            } catch (err) {
                console.error("Error de red:", err);
                setError("No se pudo conectar con el servidor.");
            }
        };

        getPacientes();
    }, []);

    const formatFecha = (fechaIso: string) => {
        try {
            const date = new Date(fechaIso);
            return date.toLocaleDateString("es-MX");
        } catch {
            return "Fecha inválida";
        }
    };

    const formatGenero = (g: string) => {
        const map: Record<string, string> = {
            M: "Masculino",
            F: "Femenino",
            O: "Otro",
        };
        return map[g] || "No especificado";
    };

    const pacientesFiltrados = pacientes.filter((p) =>
        `${p.nombre} ${p.apellidos}`.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <Box>
            <Box className="flex flex-row justify-between my-5 gap-4">
                <TextField
                    label="Buscar Paciente"
                    variant="outlined"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-128"/>
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
                            {pacientesFiltrados.map((paciente) => (
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
                                            onClick={() => router.push(`/pacientes/${paciente.usuario_id}`)} >
                                            Ver Paciente
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
}
