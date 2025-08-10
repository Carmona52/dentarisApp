'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
    Box,
    Typography,
    Button,
    Divider,
    Grid,
    CircularProgress,
    Paper,
} from '@mui/material';
import html2pdf from 'html2pdf.js';
import { Paciente } from '../../../types/Pacientes';
import dayjs from 'dayjs';

const parseAlergias = (alergias: string | null | undefined): string[] =>
    alergias ? alergias.split(',').map(a => a.trim()) : [];

const calcularEdad = (fechaNacimiento: string | Date): number => {
    const nacimiento = dayjs(fechaNacimiento);
    const hoy = dayjs();
    return hoy.diff(nacimiento, 'year');
};

const InfoRow = ({ label, value }: { label: string; value?: string | number }) => (
    <Typography variant="body2" sx={{ mb: 0.5 }}>
        <strong>{label}:</strong> {value ?? 'No registrado'}
    </Typography>
);

export default function HistorialMedicoPage({ params }: { params: { identificador: string } }) {
    const { identificador } = params;
    const id = Number(identificador);
    const pdfRef = useRef<HTMLDivElement>(null);

    const [formData, setFormData] = useState<Paciente | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const apiURL = process.env.NEXT_PUBLIC_PACIENTE_URL;
    if (!apiURL) throw new Error('Missing API URL');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!id || isNaN(id)) {
            setError('ID de paciente no válido');
            setLoading(false);
            return;
        }
        if (!token) {
            setError('Token no disponible');
            setLoading(false);
            return;
        }

        const fetchPaciente = async () => {
            try {
                const res = await fetch(`${apiURL}/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const { paciente, error } = await res.json();
                if (!res.ok) {
                    setError(error ?? 'No se pudo obtener el paciente');
                } else {
                    setFormData({
                        ...paciente,
                        alergias: parseAlergias(paciente.alergias),
                    });
                }
            } catch {
                setError('Error de red al obtener paciente');
            } finally {
                setLoading(false);
            }
        };

        fetchPaciente();
    }, [id, apiURL]);

    const handleDownloadPDF = useCallback(() => {
        if (pdfRef.current) {
            html2pdf()
                .from(pdfRef.current)
                .set({
                    margin: 0.5,
                    filename: `Historial_Paciente_${identificador}.pdf`,
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 2 },
                    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
                })
                .save();
        }
    }, [identificador]);

    if (loading) {
        return (
            <Box sx={{ p: 4, textAlign: 'center' }}>
                <CircularProgress />
                <Typography mt={2}>Cargando historial médico...</Typography>
            </Box>
        );
    }

    if (error || !formData) {
        return (
            <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography color="error">{error || 'Paciente no encontrado'}</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 4 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4" fontWeight="bold">
                    Historial Médico
                </Typography>
                <Button variant="contained" color="primary" onClick={handleDownloadPDF}>
                    Descargar PDF
                </Button>
            </Box>

            {/* Content */}
            <Paper ref={pdfRef} sx={{ p: 4, borderRadius: 3, backgroundColor: '#fff' }} elevation={3}>
                <Typography variant="h6" gutterBottom>
                    Paciente: <strong>{formData.nombre} {formData.apellidos}</strong>
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Grid container spacing={2}>
                    <Grid >
                        <InfoRow label="Nombre" value={`${formData.nombre} ${formData.apellidos}`} />
                        <InfoRow label="Edad" value={`${calcularEdad(formData.fecha_nacimiento)} años`} />
                        <InfoRow label="Género" value={formData.genero} />
                        <InfoRow label="Correo" value={formData.email} />
                    </Grid>
                    <Grid>
                        <InfoRow label="Fecha de Registro" value={formData.created_at?.substring(0, 10)} />
                        <InfoRow label="Última Consulta" value={formData.updated_at?.substring(0, 10) ?? '---'} />
                        <InfoRow label="Responsable" value="Dra. Laura Medina" />
                    </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Section title="Motivo de Consulta" content={formData.motivo_consulta} />
                <Section title="Diagnóstico" content={formData.diagnostico} />

                <Section
                    title="Alergias"
                    content={
                        formData.alergias?.length
                            ? <ul>{formData.alergias.map((a, i) => <li key={i}>{a}</li>)}</ul>
                            : 'No registrado'
                    }
                />

                <Section
                    title="Tratamientos Realizados"
                    content={
                        (formData.tratamientos ?? []).length
                            ? <ul>{formData.tratamientos.map((t, i) => <li key={i}>{t}</li>)}</ul>
                            : 'Sin tratamientos registrados'
                    }
                />

                <Section title="Recomendaciones" content={formData.recomendaciones} />
            </Paper>
        </Box>
    );
}

const Section = ({ title, content }: { title: string; content?: React.ReactNode }) => (
    <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            {title}:
        </Typography>
        <Typography variant="body2" component="div">
            {content ?? 'No registrado'}
        </Typography>
    </Box>
);
