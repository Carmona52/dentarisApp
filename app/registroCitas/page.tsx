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
import { Cita } from "../types/Citas";
import dayjs from "dayjs";
import AddCitaModal from "./PopUps/AddCita";

export default function TablaCitas() {
    const router = useRouter();
    const [citas, setCitas] = useState<Cita[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [busqueda, setBusqueda] = useState("");

    useEffect(() => {
        const getCitas = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("Token no disponible. Por favor, inicie sesión.");
                return;
            }

            try {
                const response = await fetch("http://localhost:3002/api/citas/detalle", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                const json = await response.json();

                if (!response.ok) {
                    console.error("Error del servidor:", json);
                    setError(`Error ${response.status}: ${json.message || "No se pudo obtener las citas."}`);
                    return;
                }

                const citasDesdeApi = Array.isArray(json.data) ? json.data : [];

                const citasTransformadas: Cita[] = citasDesdeApi.map((item: any) => ({
                    id: item.cita_id,
                    fecha: dayjs(item.fecha),
                    hora: dayjs(`2000-01-01T${item.hora}`, 'YYYY-MM-DDTHH:mm:ss'),
                    estado: item.estado,
                    paciente: {
                        usuario_id: item.paciente?.usuario_id,
                        nombre: item.paciente?.nombre ?? null,
                        email: item.paciente?.email ?? '',
                        rol: item.paciente?.rol_id,
                    },
                    dentista: {
                        usuario_id: item.dentista?.usuario_id,
                        nombre: item.dentista?.nombre ?? null,
                        email: item.dentista?.email ?? '',
                    },
                }));


                setCitas(citasTransformadas);

            } catch (err) {
                console.error("Error de red:", err);
                setError("No se pudo conectar con el servidor.");
            }
        };

        getCitas();
    }, []);

    const citasFiltradas = citas.filter((cita) =>
        `${cita.paciente.nombre} ${cita.estado}`.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <Box>
            <Box className="flex flex-row justify-between my-5 gap-4">
                <TextField
                    label="Buscar Cita"
                    variant="outlined"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-128"
                />
                <AddCitaModal />
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
                                <TableCell>ID</TableCell>
                                <TableCell>Nombre del Paciente</TableCell>
                                <TableCell>Nombre del dentista</TableCell>
                                <TableCell>Fecha</TableCell>
                                <TableCell>Hora</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {citasFiltradas.filter((cita) => cita.paciente?.rol === 3).map((cita) => (
                                    <TableRow key={cita.id}>
                                        <TableCell>{cita.id}</TableCell>
                                        <TableCell>
                                            {cita.paciente?.nombre ?? cita.paciente?.email ?? 'Sin nombre'}
                                        </TableCell>
                                        <TableCell>
                                            {cita.dentista?.nombre ?? cita.dentista?.email ?? 'Sin nombre'}
                                        </TableCell>

                                        <TableCell>{dayjs(cita.fecha).format('YYYY-MM-DD')}</TableCell>
                                        <TableCell>{cita.hora.format('hh:mm A')}</TableCell>

                                        <TableCell>{cita.estado}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                onClick={() => router.push(`/registroCitas/${cita.id}`)}
                                            >
                                                Ver Cita
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
