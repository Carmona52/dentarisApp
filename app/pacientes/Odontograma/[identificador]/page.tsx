import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

const teeth = Array.from({ length: 32 }, (_, i) => ({
  id: i + 1,
  label: i < 16 ? `🦷 ${i + 1} (Sup)` : `🦷 ${i + 1} (Inf)`,
}));

export default function ConsultaOdontograma() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Odontograma
      </Typography>

      <Typography variant="body1" gutterBottom>
        Seleccione o visualice el estado de cada diente del paciente.
      </Typography>

      <Box sx={{ mt: 4 }}>

        <Grid container spacing={1} justifyContent="center">
          {teeth.slice(0, 16).map((tooth) => (
            <Grid key={tooth.id}>
              <Paper
                elevation={2}
                sx={{
                  width: 50,
                  height: 70,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  flexDirection: 'column',
                  bgcolor: '#e3f2fd',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: '#90caf9',
                  },
                }}
              >
                <span>{tooth.id}</span>
                <span role="img" aria-label="tooth">
                  🦷
                </span>
              </Paper>
            </Grid>
          ))}
        </Grid>


        <Box sx={{ height: 32 }} />

        {/* Dientes Inferiores */}
        <Grid container spacing={1} justifyContent="center">
          {teeth.slice(16).map((tooth) => (
            <Grid key={tooth.id}>
              <Paper
                elevation={2}
                sx={{
                  width: 50,
                  height: 70,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  flexDirection: 'column',
                  bgcolor: '#e8f5e9',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: '#a5d6a7',
                  },
                }}
              >
                <span>{tooth.id}</span>
                <span role="img" aria-label="tooth">
                  🦷
                </span>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
