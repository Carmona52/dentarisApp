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

import ModalCrearDentista from "./modals/addDentist"; 


import { getDentist } from "../lib/db/dentists";
import { dentista } from "../lib/db/types";

export default function TablaPacientes() {
    const router = useRouter();
    const [dentistas, setDentistas] = useState<dentista[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [busqueda, setBusqueda] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchDentistas = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("No hay token disponible. Por favor, inicia sesión.");
            return;
        }

        try {
            const data = await getDentist(token);
            if (data && data.success) {
                // Asumiendo que `data.dentists` es el array de dentistas
                setDentistas(data.dentists); 
            } else {
                setError('La respuesta de la API no fue exitosa.');
            }
        } catch (err) {
            setError('No se pudieron obtener los dentistas.');
            console.error(err);
        }
    };

    useEffect(() => {
        fetchDentistas();
    }, []);

    const handleDentistCreated = () => {
        fetchDentistas();
    };

    // Filtrar los dentistas basándose en la búsqueda
    const filteredDentistas = dentistas.filter(dentista => 
        dentista.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        dentista.apellidos.toLowerCase().includes(busqueda.toLowerCase()) ||
        dentista.email.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <>
            <Box>
                <Box className="flex flex-row justify-between my-5 gap-4">
                    <TextField
                        label="Buscar Dentista"
                        variant="outlined"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="w-128" />

                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Añadir Nuevo Dentista
                    </Button>
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
                                    <TableCell>Cédula Profesional</TableCell>
                                    <TableCell>Carrera</TableCell>
                                    <TableCell>Empezó a trabajar</TableCell>
                                    <TableCell>Acción</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredDentistas.map((dentista) => (
                                    <TableRow key={dentista.usuario_id}>
                                        <TableCell>{dentista.nombre}</TableCell>
                                        <TableCell>{dentista.apellidos}</TableCell>
                                        <TableCell>{dentista.email}</TableCell>
                                        <TableCell>{dentista.telefono}</TableCell>
                                        <TableCell>{dentista.cedula_profesional}</TableCell>
                                        <TableCell>{dentista.carrera}</TableCell>
                                        <TableCell>{dentista.created_at}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                // La ruta debe coincidir con la de un dentista, no un paciente
                                                onClick={() => router.push(`/dentista/${dentista.usuario_id}`)} >
                                                Ver
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Box>

            <ModalCrearDentista
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onDentistCreated={handleDentistCreated}
            />
        </>
    );
}