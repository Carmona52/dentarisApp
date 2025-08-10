'use client'

import { Alert, Box, Button, FormLabel, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { register } from "@/app/lib/db/auth/auth";

import AvisoPrivacidadModal from '../modals/modalRegister';


export default function Register() {

    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [alert, setAlert] = useState<{ severity: 'success' | 'error'; message: string } | null>(null);

    const [modalAbierto, setModalAbierto] = useState(true);

    const handleAceptar = () => {
        setModalAbierto(false);
    };

    const validateEmail = (email: string): boolean => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return regex.test(email)
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setAlert({ severity: 'error', message: '' })


        if (!validateEmail(email)) {
            setAlert({ severity: 'error', message: 'Correo no válido' })
            return
        }

        if (password.length < 8) {
            setAlert({ severity: 'error', message: 'La Contraseña debe ser almenos de 8 Caracteres' })
            return;
        } else if (password != confirmPassword) {
            setAlert({ severity: 'error', message: 'Las contraseñas no coinciden' })
            return;
        }

        try {
            const response = await register({
                clinica_name: name,
                telefono: phone,
                email: email,
                password: password,
                rol: "Administrador"
            });

            if (response.success) {
                setAlert({
                    severity: "success",
                    message: "Registro exitoso"
                });

                setTimeout(() => {
                    router.push("/auth/login");
                }, 2000);
            } else {
                setAlert({
                    severity: "error",
                    message: `Error al registrar: ${response.message}`
                });
            }
        }catch (error) {
            setAlert({
                severity: 'error',
                message: error instanceof Error ? error.message : 'Error inesperado',
            });
        }



    }

    return (
        <>
            <Box className="flex w-full h-screen">
                <Box className="w-1/3 h-full flex flex-col items-center justify-start bg-white p-6 overflow-y-auto">
                    <img
                        src="/branding/LogoBackRec.png"
                        alt="Logo Dentaris"
                        className="w-128"
                    />

                    <Box className="text-center mb-6">
                        <Typography variant="h4" fontWeight="600">
                            Crear una cuenta
                        </Typography>
                        <Typography variant="body2" className="text-gray-600">
                            Por favor, ingrese los datos de su clínica a continuación
                        </Typography>
                    </Box>

                    <form className="flex flex-col w-3/4 gap-4">
                        <div>
                            <FormLabel>Ingrese el Nombre de su clínica <span className="text-red-500">*</span></FormLabel>
                            <TextField
                                fullWidth
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                variant="outlined"
                                placeholder="Mi clínica"
                            />
                        </div>

                        <div>
                            <FormLabel>Correo <span className="text-red-500">*</span></FormLabel>
                            <TextField
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                variant="outlined"
                                placeholder="Correo"
                            />
                        </div>

                        <div>
                            <FormLabel>Número de teléfono <span className="text-red-500">*</span></FormLabel>
                            <TextField
                                fullWidth
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                type="tel"
                                variant="outlined"
                                placeholder="1234567890"
                            />
                        </div>

                        <div>
                            <FormLabel>Contraseña <span className="text-red-500">*</span></FormLabel>
                            <TextField
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                variant="outlined"
                                placeholder="Contraseña"
                            />
                        </div>

                        <div>
                            <FormLabel>Confirmar contraseña <span className="text-red-500">*</span></FormLabel>
                            <TextField
                                fullWidth
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type="password"
                                variant="outlined"
                                placeholder="Confirmar Contraseña"
                            />
                        </div>

                        {alert && (
                            <Alert severity={alert.severity} sx={{ mt: 2 }}>
                                {alert.message}
                            </Alert>
                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                            onClick={handleRegister}
                        >
                            Registrarme
                        </Button>
                    </form>

                    <Box className="w-full text-center mt-6">
                        <Typography variant="body2" className="text-gray-600">
                            ¿Ya tienes Cuenta?{" "}
                            <span
                                className="text-blue-600 hover:underline cursor-pointer"
                                onClick={() => router.push('/auth/login')}
                            >
                                ¡Inicia Sesión!
                            </span>
                        </Typography>
                    </Box>
                </Box>
                <Box className="w-2/3 h-full">
                    <img
                        src="/loginIMG.jpg"
                        alt="Imagen de login"
                        className="w-full h-full object-cover"
                    />
                </Box>
            </Box>

            <AvisoPrivacidadModal
                open={modalAbierto}
                onAccept={handleAceptar}
            />
        </>
    );

}
