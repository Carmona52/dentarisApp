'use client';

import React from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  useTheme,
  Button,
} from '@mui/material';
import { useRouter } from 'next/navigation';

const AvisoPrivacidad = () => {
  const theme = useTheme();
  const router = useRouter();

  const handleBack = () => {
    router.push('register'); 
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        py: { xs: 4, md: 6 },
        maxHeight: '90vh',
        overflowY: 'auto',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 3,
          backgroundColor: 'white',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          fontWeight="bold"
          textAlign="center"
          sx={{ mb: 4 }}
        >
          Aviso de Privacidad
        </Typography>

        <Typography paragraph>
          De conformidad con lo establecido por la Ley Federal de Protección de Datos Personales en Posesión de los Particulares, el presente Aviso de Privacidad tiene como finalidad informarle sobre el tratamiento que se le dará a sus datos personales recabados por el sistema <strong>Dentaris</strong>.
        </Typography>

        <Section title="1. Identidad del Responsable">
          <Typography paragraph>
            <strong>Dentaris</strong> es un sistema de gestión clínica orientado a consultorios dentales. Responsable del tratamiento:
            <br />
            <strong>Nombre:</strong> Kevin Diego Cruz
            <br />
            <strong>Domicilio:</strong> UTTehuacan
            <br />
            <strong>Email:</strong> dentaris@gmail.com
          </Typography>
        </Section>

        <Section title="2. Datos Personales que se Recaban">
          <Typography component="ul" sx={{ pl: 3 }}>
            {[
              'Nombre completo',
              'Fecha de nacimiento',
              'Sexo',
              'Teléfono y correo electrónico',
              'Dirección',
              'Datos de emergencia',
              'Historial clínico y odontológico',
              'Alergias, enfermedades, tratamientos',
              'Archivos adjuntos (radiografías, recetas, notas médicas)',
            ].map((item, index) => (
              <li key={index}>
                <Typography variant="body2" component="span">{item}</Typography>
              </li>
            ))}
          </Typography>
        </Section>

        <Section title="3. Finalidades del Tratamiento">
          <Typography component="ul" sx={{ pl: 3 }}>
            {[
              'Registro y administración de pacientes',
              'Gestión de citas',
              'Elaboración y consulta de historiales médicos',
              'Comunicación clínica-paciente',
              'Reportes médicos y administrativos',
              'Cumplimiento de obligaciones legales',
            ].map((item, index) => (
              <li key={index}>
                <Typography variant="body2" component="span">{item}</Typography>
              </li>
            ))}
          </Typography>
        </Section>

        <Section title="4. Transferencia de Datos">
          <Typography paragraph>
            No se compartirán datos con terceros sin consentimiento expreso, salvo requerimientos legales.
          </Typography>
        </Section>

        <Section title="5. Medidas de Seguridad">
          <Typography paragraph>
            Dentaris aplica medidas técnicas y administrativas para proteger sus datos de accesos no autorizados.
          </Typography>
        </Section>

        <Section title="6. Derechos ARCO">
          <Typography paragraph>
            Usted puede Acceder, Rectificar, Cancelar u Oponerse al tratamiento de sus datos personales.
            <br />
            Solicitudes: <strong>dentaris@gmail.com</strong>
          </Typography>
        </Section>

        <Section title="7. Cambios al Aviso de Privacidad">
          <Typography paragraph>
            Este aviso puede modificarse sin previo aviso. Los cambios estarán disponibles dentro del sistema Dentaris o vía correo electrónico.
          </Typography>
        </Section>

        <Box textAlign="center" mt={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleBack}
          >
            Aceptar y Continuar
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Box sx={{ mb: 4 }}>
    <Typography
      variant="h6"
      gutterBottom
      sx={{ fontWeight: 'bold', color: 'primary.main' }}
    >
      {title}
    </Typography>
    {children}
  </Box>
);

export default AvisoPrivacidad;
