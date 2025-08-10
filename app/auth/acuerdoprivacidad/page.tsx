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
                elevation={4}
                sx={{
                    p: { xs: 3, md: 5 },
                    borderRadius: 3,
                    backgroundColor: '#fff',
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
                    En cumplimiento con lo dispuesto por la Ley Federal de Protección de Datos Personales en Posesión de los Particulares y su Reglamento, el presente Aviso de Privacidad tiene como propósito informarle sobre la forma en que <strong>Dentaris</strong> recaba, utiliza, protege y, en su caso, transfiere sus datos personales.
                </Typography>

                <Section title="1. Identidad y Domicilio del Responsable">
                    <Typography paragraph>
                        <strong>Dentaris</strong>, sistema de gestión clínica para consultorios dentales, es responsable del tratamiento de sus datos personales.
                        <br />
                        <strong>Nombre del responsable:</strong> Kevin Diego Cruz
                        <br />
                        <strong>Domicilio:</strong> UTTehuacán
                        <br />
                        <strong>Correo electrónico:</strong> dentaris@gmail.com
                    </Typography>
                </Section>

                <Section title="2. Datos Personales Recabados">
                    <Typography component="ul" sx={{ pl: 3 }}>
                        {[
                            'Nombre completo',
                            'Fecha de nacimiento',
                            'Sexo',
                            'Teléfono y correo electrónico',
                            'Dirección',
                            'Datos de contacto de emergencia',
                            'Historial clínico y odontológico',
                            'Alergias, enfermedades y tratamientos',
                            'Archivos adjuntos (radiografías, recetas, notas médicas)',
                            'Datos de facturación en caso de requerirlos',
                        ].map((item, index) => (
                            <li key={index}>
                                <Typography variant="body2" component="span">{item}</Typography>
                            </li>
                        ))}
                    </Typography>
                </Section>

                <Section title="3. Finalidades del Tratamiento de Datos">
                    <Typography paragraph>
                        Sus datos serán tratados para las siguientes finalidades primarias:
                    </Typography>
                    <Typography component="ul" sx={{ pl: 3, mb: 2 }}>
                        {[
                            'Registro y administración de pacientes',
                            'Gestión y control de citas',
                            'Elaboración, consulta y resguardo de historiales médicos',
                            'Comunicación clínica-paciente',
                            'Generación de reportes médicos y administrativos',
                            'Cumplimiento de obligaciones legales aplicables',
                        ].map((item, index) => (
                            <li key={index}>
                                <Typography variant="body2" component="span">{item}</Typography>
                            </li>
                        ))}
                    </Typography>
                    <Typography paragraph>
                        De forma secundaria, sus datos podrán utilizarse para fines estadísticos, de investigación clínica interna y para la mejora de nuestros servicios, siempre garantizando su anonimato.
                    </Typography>
                </Section>

                <Section title="4. Transferencia de Datos Personales">
                    <Typography paragraph>
                        No se transferirán sus datos a terceros sin su consentimiento expreso, salvo en los casos previstos por la Ley, como requerimientos de autoridades competentes o por mandato judicial.
                    </Typography>
                </Section>

                <Section title="5. Medidas de Seguridad">
                    <Typography paragraph>
                        Implementamos medidas de seguridad administrativas, técnicas y físicas para proteger su información contra daño, pérdida, alteración, destrucción o uso, acceso o tratamiento no autorizado.
                    </Typography>
                </Section>

                <Section title="6. Derechos ARCO y Revocación del Consentimiento">
                    <Typography paragraph>
                        Usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse al tratamiento de sus datos personales (Derechos ARCO), así como a revocar en cualquier momento el consentimiento otorgado.
                        <br />
                        Para ejercer estos derechos, envíe su solicitud al correo: <strong>dentaris@gmail.com</strong>
                    </Typography>
                </Section>

                <Section title="7. Uso de Cookies y Tecnologías Similares">
                    <Typography paragraph>
                        Este sistema puede utilizar cookies para mejorar la experiencia del usuario, optimizar el rendimiento y personalizar la interacción. Usted puede deshabilitar el uso de cookies desde la configuración de su navegador.
                    </Typography>
                </Section>

                <Section title="8. Cambios al Aviso de Privacidad">
                    <Typography paragraph>
                        El presente aviso puede ser modificado en cualquier momento para adaptarse a cambios legales, regulatorios o administrativos. Las actualizaciones estarán disponibles en el sistema Dentaris o se le notificarán vía correo electrónico.
                    </Typography>
                </Section>

                <Box textAlign="center" mt={4}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleBack}
                        sx={{ px: 4, py: 1.2, fontWeight: 'bold' }}
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
