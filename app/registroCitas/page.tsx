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

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const citasPaginadas = citasFiltradas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const getHoraFormateada = (hora: any) => {
    const horaValida = dayjs.isDayjs(hora) ? hora : dayjs(hora);
    return horaValida.isValid() ? horaValida.format('hh:mm A') : 'Hora inválida';
  };

  const getEstadoEstilo = (estado: string) => {
    switch (estado) {
      case 'Agendada':
        return { color: 'white', backgroundColor: '#81d4fa' };
      case 'Realizada':
        return { color: 'green', backgroundColor: '#e0f7e9' };
      case 'En proceso':
        return { color: '#b26a00', backgroundColor: '#fff8e1' };
      default:
        return { color: 'red', backgroundColor: '#ffebee' };
    }
  };

  return (
    <>
      <Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            my: 3,
          }}
        >
          <TextField
            label="Buscar Cita"
            variant="outlined"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            sx={{ flex: 1 }}
          />
          <Button variant="contained" onClick={abrirModal}>
            Registrar Nueva Cita
          </Button>
        </Box>

        {error ? (
          <Typography className="text-red-600 bg-red-100 p-3 rounded-md">
            {error}
          </Typography>
        ) : (
          <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Paciente</strong></TableCell>
                  <TableCell><strong>Motivo</strong></TableCell>
                  <TableCell><strong>Fecha</strong></TableCell>
                  <TableCell><strong>Hora</strong></TableCell>
                  <TableCell><strong>Estado</strong></TableCell>
                  <TableCell><strong>Acciones</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {citasPaginadas.map((cita) => (
                  <TableRow key={cita.id}>
                    <TableCell>
                      {cita.paciente.nombre} {cita.paciente.apellidos}
                    </TableCell>
                    <TableCell>
                      {cita.motivo?.trim() || 'No especificado'}
                    </TableCell>
                    <TableCell>
                      {dayjs(cita.fecha).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>
                      {getHoraFormateada(cita.hora)}
                    </TableCell>
                    <TableCell
                      style={{
                        textTransform: 'capitalize',
                        textAlign: 'center',
                        ...getEstadoEstilo(cita.estado),
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
