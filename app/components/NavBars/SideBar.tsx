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
    Typography
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PeopleIcon from '@mui/icons-material/People';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
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
    }

    const section1: NavItem[] = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
        { text: 'Registro de Citas', icon: <EventNoteIcon />, path: '/registroCitas' },
        { text: 'Lista de Pacientes', icon: <PeopleIcon />, path: '/pacientes' },
    ];

    const section2: NavItem[] = [
        { text: 'Mi clínica', icon: <LocalHospitalIcon />, path: '/miClinica' },
        { text: 'Personal Médico', icon: <SupervisedUserCircleIcon />, path: '/dentistas' },
        { text: 'Cuenta', icon: <AccountCircleIcon />, path: '/cuenta' },
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
        <Box sx={{
                width: 250,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                borderRadius: 4,
                p: 2,
                boxShadow: 3,
            }} className="border-2 border-gray-200 m-2">

            <Box>
                {renderSection(section1)}
                <Divider sx={{ my: 1 }} />
                {renderSection(section2)}
                <Divider sx={{ my: 1 }} />
                {renderSection(section3)}
            </Box>


            <Box
                sx={{
                    bgcolor: '#E6F6FD',
                    borderRadius: 3,
                    textAlign: 'center',
                    p: 2,
                    mt: 2,
                    boxShadow: 1,
                }}
            >
                <HelpOutlineIcon sx={{ color: '#2F4858', fontSize: 28 }} />
                <Typography variant="body1" fontWeight="bold" mt={1}>
                    ¿Necesitas Ayuda?
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={0.5}>
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
