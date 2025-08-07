'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Modal,
  Box,
  Typography,
  Button,
  Fade,
  Backdrop,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface AvisoPrivacidadModalProps {
  open: boolean;
  onAccept: () => void;
}

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
};

const AvisoPrivacidadModal: React.FC<AvisoPrivacidadModalProps> = ({
  open,
  onAccept,
}) => {
  const router = useRouter();

  const handleReject = () => {
    router.push('login');
  };

  return (
    <Modal
      open={open}
      onClose={handleReject}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500 } }}
    >
      <Fade in={open}>
        <Box sx={modalStyle}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" fontWeight="bold">
              Acuerdo de Privacidad
            </Typography>
            <Button onClick={handleReject} size="small" sx={{ minWidth: 'unset' }}>
              <CloseIcon />
            </Button>
          </Box>

          <Typography variant="body2" color="text.secondary">
            Este sistema protege y trata tus datos conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares. Te recomendamos leer el aviso de privacidad completo antes de continuar.
          </Typography>

          <Typography variant="caption" color="text.secondary" textAlign="center" mt={1}>
            Al dar clic en Aceptar, aceptas el acuerdo de privacidad.
          </Typography>

          <Typography variant="caption" textAlign="center" mt={0.5}>
            <Link
              href="acuerdoprivacidad"
              style={{ color: '#1976d2', textDecoration: 'underline' }}
              target="_blank"
            >
              Leer aviso de privacidad
            </Link>
          </Typography>

          <Box display="flex" justifyContent="flex-end" mt={2} gap={1}>
            <Button onClick={handleReject} variant="outlined">
              Cancelar
            </Button>
            <Button onClick={onAccept} variant="contained" sx={{ bgcolor: '#1976d2' }}>
              Aceptar
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AvisoPrivacidadModal;
