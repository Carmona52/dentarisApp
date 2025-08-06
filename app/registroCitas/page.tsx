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
import { Cita } from "../lib/db/citas/types";
import { fetchCitas } from "../lib/db/citas/citas";
import dayjs from "dayjs";

import AddCitaModal from "./PopUps/AddCita";

export default function TablaCitas() {
    const router = useRouter();
    const [citas, setCitas] = useState<Cita[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [busqueda, setBusqueda] = useState("");
    const [modalAbierto, setModalAbierto] = useState(false);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const abrirModal = () => setModalAbierto(true);
    const cerrarModal = () => setModalAbierto(false);

    const getCitas = useCallback(async () => {
        try {
            const citasTransformadas = await fetchCitas();
            setCitas(citasTransformadas);
            setError(null);
        } catch (err: any) {
            setError(err.message || "No se pudo conectar con el servidor.");
        }
    }, []);

    useEffect(() => {
        getCitas();
    }, [getCitas]);

    const handleCitaCreated = () => {
        getCitas();
        cerrarModal();
    };

    const citasFiltradas = citas.filter((cita) =>
        `${cita.paciente.nombre ?? ''} ${cita.paciente.apellidos ?? ''} ${cita.estado}`.toLowerCase().includes(busqueda.toLowerCase()) ||
        (cita.dentista?.nombre ?? '').toLowerCase().includes(busqueda.toLowerCase()) ||
        (cita.dentista?.email ?? '').toLowerCase().includes(busqueda.toLowerCase())
    );

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };


    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const citasPaginadas = citasFiltradas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);




    return (
        <>
            <Box>
                <Box className="flex flex-row justify-between my-5 gap-4">
                    <TextField
                        label="Buscar Cita"
                        variant="outlined"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="w-128"
                    />
                    <Button variant="contained" onClick={abrirModal}>Registrar Nueva Cita</Button>
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
                                    <TableCell>Nombre del Paciente</TableCell>
                                    <TableCell>Nombre del Dentista</TableCell>
                                    <TableCell>Fecha</TableCell>
                                    <TableCell>Hora</TableCell>
                                    <TableCell>Estado</TableCell>
                                    <TableCell>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {citasPaginadas.map((cita) => (
                                    <TableRow key={cita.id}>
                                        <TableCell>
                                            {`${cita.paciente?.nombre ?? ''} ${cita.paciente?.apellidos ?? ''}`.trim() || cita.paciente?.email || 'Sin nombre'}
                                        </TableCell>
                                        <TableCell>
                                            {cita.dentista?.nombre ?? cita.dentista?.email ?? 'Sin nombre'}
                                        </TableCell>
                                        <TableCell>{dayjs(cita.fecha).format('YYYY-MM-DD')}</TableCell>
                                        <TableCell>{cita.hora.format('hh:mm A')}</TableCell>

                                        <TableCell
                                            style={{
                                                textTransform: 'capitalize',
                                                textAlign: 'center',
                                                color:
                                                    cita.estado === 'Agendada' ? 'green' :
                                                        cita.estado === 'En proceso' ? '#b26a00' : 'red',
                                                backgroundColor:
                                                    cita.estado === 'Agendada' ? '#e0f7e9' :
                                                        cita.estado === 'En proceso' ? '#fff8e1' :
                                                            '#ffebee',
                                            }}
                                        >
                                            {cita.estado}
                                        </TableCell>



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

                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={citasFiltradas.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>
                )}
            </Box>

            <AddCitaModal
                open={modalAbierto}
                handleClose={cerrarModal}
                onCitaCreated={handleCitaCreated}
            />
        </>
    );
}