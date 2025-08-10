'use client';

import React from 'react';
import {
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Button,
    Typography,
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    EventNote as EventNoteIcon,
    People as PeopleIcon,
    // LocalHospital as LocalHospitalIcon,
    // AccountCircle as AccountCircleIcon,
    Settings as SettingsIcon,
    ExitToApp as ExitToAppIcon,
    HelpOutline as HelpOutlineIcon,
    SupervisedUserCircle as SupervisedUserCircleIcon,
} from '@mui/icons-material';
import { useRouter, usePathname } from 'next/navigation';

interface NavItem {
    text: string;
    icon: React.ReactElement;
    path: string;
}

const NavigationSidebar: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();

    const cerrarSesion = () => {
        localStorage.clear();
        router.push('/auth/login');
    };

    const section1: NavItem[] = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
        { text: 'Registro de Citas', icon: <EventNoteIcon />, path: '/registroCitas' },
        { text: 'Lista de Pacientes', icon: <PeopleIcon />, path: '/pacientes' },
    ];

    const section2: NavItem[] = [
          { text: 'Personal Médico', icon: <SupervisedUserCircleIcon />, path: '/dentistas' },
        // { text: 'Mi clínica', icon: <LocalHospitalIcon />, path: '/miClinica' },
        // { text: 'Cuenta', icon: <AccountCircleIcon />, path: '/cuenta' },
    ];

    const section3: NavItem[] = [
        { text: 'Ajustes', icon: <SettingsIcon />, path: '/ajustes' },
        { text: 'Cerrar Sesión', icon: <ExitToAppIcon />, path: 'logout' },
    ];

    const renderSection = (items: NavItem[]) => (
        <List>
            {items.map(({ text, icon, path }) => {
                const isActive = pathname === path;

                return (
                    <ListItem
                        key={text}
                        onClick={() => {
                            if (path === 'logout') {
                                cerrarSesion();
                            } else {
                                router.push(path);
                            }
                        }}
                        sx={{
                            px: 2,
                            py: 1.5,
                            borderRadius: 2,
                            mb: 0.5,
                            cursor: 'pointer',
                            bgcolor: isActive ? '#E6F6FD' : 'transparent',
                            '&:hover': {
                                bgcolor: '#F0F4F8',
                            },
                        }}
                    >
                        <ListItemIcon sx={{ color: '#567287', minWidth: 36 }}>
                            {icon}
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography sx={{ color: '#2F4858', fontSize: '0.9rem' }}>
                                    {text}
                                </Typography>
                            }
                        />
                    </ListItem>
                );
            })}
        </List>
    );

    return (
        <Box
            sx={{
                width: 250,
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'white',
                borderRight: '1px solid #E0E0E0',
                px: 1,
            }}>
    
            <Box
                sx={{
                    flexGrow: 1,
                    p: 2,
                    pr: 1,
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                        backgroundColor: '#f0f0f0',
                        borderRadius: '8px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#b0bec5',
                        borderRadius: '8px',
                    },
                   
                }}
            >
                {renderSection(section1)}
                <Divider sx={{ my: 1 }} />
                {renderSection(section2)}
                <Divider sx={{ my: 1 }} />
                {renderSection(section3)}
            </Box>

 
            <Box
                sx={{
                    bgcolor: '#E6F6FD',
                    borderRadius: 2,
                    textAlign: 'center',
                    p: 2,
                    m: 2,
                    boxShadow: 1,
                    flexShrink: 0,
                }}
            >
                <HelpOutlineIcon sx={{ color: '#2F4858', fontSize: 28 }} />
                <Typography variant="body1" fontWeight="bold" mt={1}>
                    ¿Necesitas Ayuda?
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Contáctanos para brindártela
                </Typography>
                <Button
                    variant="contained"
                    fullWidth
                    size="small"
                    sx={{
                        mt: 1.5,
                        textTransform: 'none',
                        fontSize: '0.8rem',
                        bgcolor: '#2F4858',
                        '&:hover': {
                            bgcolor: '#1c3441',
                        },
                    }}
                >
                    Ir al centro de ayuda
                </Button>
            </Box>
        </Box>
    );
};

export default NavigationSidebar;
