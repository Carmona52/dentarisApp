export default function Card(){
    return (
        <>
            <Card
                key={paciente.numero_identificacion}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3,
                    boxShadow: 2,
                    p: 2,
                    bgcolor: '#fff',
                }}>

                <Box display="flex" alignItems="center" mb={1}>
                    <Box
                        sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            backgroundColor: '#f0f0f0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 2,
                        }}>
                        <PersonIcon fontSize="small"/>
                    </Box>
                    <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                            {paciente.nombre}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Limpieza Dental
                        </Typography>
                    </Box>
                </Box>

                <Box
                    display="flex"
                    alignItems="center"
                    gap={2}
                    bgcolor="#f4f6f8"
                    px={2}
                    py={1}
                    borderRadius={2}
                    mb={2}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <CalendarMonthIcon fontSize="small"/>
                        <Typography variant="body2">18-06-2024</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                        <AccessTimeIcon fontSize="small"/>
                        <Typography variant="body2">11.00 – 12:00 AM</Typography>
                    </Box>
                </Box>

                <Box display="flex" justifyContent="space-between" mt="auto">
                    <Button
                        variant="outlined"
                        sx={{
                            borderRadius: 2,
                            borderColor: '#dee2e6',
                            color: '#343a40',
                            textTransform: 'none',
                            bgcolor: '#fff',
                            '&:hover': {
                                bgcolor: '#f8f9fa',
                            },
                        }}>
                        Cancelar
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            borderRadius: 2,
                            bgcolor: '#33bfff',
                            color: '#fff',
                            textTransform: 'none',
                            '&:hover': {
                                bgcolor: '#1daae8',
                            },
                        }}>
                        Re-Agendar
                    </Button>
                </Box>
            </Card>
        </>
    )
}