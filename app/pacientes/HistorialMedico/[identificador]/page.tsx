'use client';

import React, { useRef, useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Divider,
    Grid,
    CircularProgress,
} from '@mui/material';
import html2pdf from "html2pdf.js";
import { useParams } from 'next/navigation';
import { Paciente } from '../../../types/Pacientes';

const parseAlergias = (alergias: string | null | undefined): string[] =>
    alergias ? alergias.split(',').map(a => a.trim()) : [];

export default function HistorialMedicoPage({ params }: { params: { identificador: string } }) {
    const { identificador } = params;
    const id = Number(identificador);
    const pdfRef = useRef<HTMLDivElement>(null);

    const [formData, setFormData] = useState<Paciente | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
                const res = await fetch(`http://localhost:3001/api/auth/patients/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
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
    }, [id]);

    const handleDownloadPDF = () => {
        if (pdfRef.current) {
            html2pdf().from(pdfRef.current).set({
                margin: 0.5,
                filename: `Historial_Paciente_${identificador}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            }).save();
        }
    };

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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" fontWeight="bold">Historial Médico</Typography>
                <Button variant="contained" color="primary" onClick={handleDownloadPDF}>
                    Descargar PDF
                </Button>
            </Box>

            <Box ref={pdfRef} sx={{ p: 4, borderRadius: 3, backgroundColor: '#fff', boxShadow: 3 }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                    Paciente: <strong>{formData.nombre} {formData.apellidos}</strong>
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Grid container spacing={2}>
                    <Grid>
                        <Typography><strong>Nombre:</strong> {formData.nombre} {formData.apellidos}</Typography>
                        <Typography><strong>Edad:</strong> {formData.fecha_nacimiento ?? 'No disponible'}</Typography>
                        <Typography><strong>Género:</strong> {formData.genero ?? 'No especificado'}</Typography>
                        <Typography><strong>Correo:</strong> {formData.email}</Typography>
                    </Grid>
                    <Grid>
                        <Typography><strong>Fecha de Registro:</strong> {formData.created_at?.substring(0, 10)}</Typography>
                        <Typography><strong>Última Consulta:</strong> {formData.updated_at?.substring(0, 10) ?? '---'}</Typography>
                        <Typography><strong>Responsable:</strong> Dra. Laura Medina</Typography>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Typography variant="subtitle1" gutterBottom><strong>Motivo de Consulta:</strong></Typography>
                <Typography sx={{ mb: 2 }}>
                    {formData.motivo_consulta ?? 'No especificado'}
                </Typography>

                <Typography variant="subtitle1" gutterBottom><strong>Diagnóstico:</strong></Typography>
                <Typography sx={{ mb: 2 }}>
                    {formData.diagnostico ?? 'No registrado'}
                </Typography>

                 <Typography variant="subtitle1" gutterBottom><strong>Alergías:</strong></Typography>
                <Typography sx={{ mb: 2 }}>
                    {formData.alergias ?? 'No registrado'}
                </Typography>

                <Typography variant="subtitle1" gutterBottom><strong>Tratamientos Realizados:</strong></Typography>
                <ul style={{ marginLeft: '20px' }}>
                    {(formData.tratamientos ?? ['Sin tratamientos registrados']).map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>

                <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}><strong>Recomendaciones:</strong></Typography>
                <Typography>
                    {formData.recomendaciones ?? 'No hay recomendaciones'}
                </Typography>
            </Box>
        </Box>
    );
}
