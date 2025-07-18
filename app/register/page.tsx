'use client'

import {Alert, Box, Button, FormLabel, TextField, Typography} from '@mui/material';
import {useRouter} from 'next/navigation';
import {useState} from "react";

export default function Register() {

    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const rol = "Administrador"

    const validateEmail = (email: string): boolean => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return regex.test(email)
    }

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (!validateEmail(email)) {
            setError("Correo no válido")
            return
        }

        if (password.length < 8) {
            setError("La contraseña debe tener 8 carácteres")
            return;
        } else if (password != confirmPassword) {
            setError("Las contraseñas no coinciden")
            return;
        }


        fetch("http://localhost:3001/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                clinica: name,
                telefono: phone,
                email: email,
                password: password,
                rol: rol
            })
        })
            .then(res => res.json())
            .catch(err => {
                console.error("Error de red:", err);
            })
            .then((response) => {
                if (response.success === true) {
                    <Alert severity="success">Inicio de Sesión correcto</Alert>
                    setTimeout(() => router.push("/login"), 1500)
                }
            })

    }

    return (
        <Box className="flex w-full h-screen overflow-hidden">
            <Box className="basis-1/3 flex flex-col items-center justify-center bg-white h-screen overflow-hidden p-6">
                <img
                    src="/branding/LogoBackRec.png"
                    alt="Logo Dentaris"
                    className="w-120 mb-2"/>

                <Box className="text-center mb-6 -mt-10">
                    <Typography variant="h3" sx={{fontWeight: 'semi-bold', color: 'bold'}}>
                        Crear una cuenta
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                        Por favor, ingrese los datos de su clinica a continuación
                    </Typography>
                </Box>

                <form className="flex flex-col w-3/4 gap-4">
                    <div>
                        <FormLabel>Ingrese el Nombre de su clínica <span className="text-red-500">*</span></FormLabel>
                        <TextField fullWidth
                                   value={name}
                                   onChange={(e) => setName(e.target.value)}
                                   variant="outlined"
                                   placeholder="Mi clinica"
                                   className="bg-white"/>
                    </div>
                    <div>
                        <FormLabel className="text-gray-700">Correo <span className="text-red-500">*</span></FormLabel>
                        <TextField fullWidth
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   variant="outlined"
                                   placeholder="Correo"
                                   className="bg-white"/>
                    </div>
                    <div>
                        <FormLabel className="text-gray-700">Número de teléfono <span className="text-red-500">*</span></FormLabel>
                        <TextField fullWidth
                                   value={phone}
                                   onChange={(e) => setPhone(e.target.value)}
                                   type="number"
                                   variant="outlined"
                                   placeholder="1234567890"
                                   className="bg-white"/>
                    </div>

                    <div>
                        <FormLabel className="text-gray-700">Contraseña <span
                            className="text-red-500">*</span></FormLabel>
                        <TextField fullWidth
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   type="password"
                                   variant="outlined"
                                   placeholder="Contraseña"
                                   className="bg-white"/>
                    </div>

                    <div>
                        <FormLabel className="text-gray-700">Confirmar contraseña<span className="text-red-500">*</span></FormLabel>
                        <TextField fullWidth
                                   value={confirmPassword}
                                   onChange={(e) => setConfirmPassword(e.target.value)}
                                   type="password"
                                   variant="outlined"
                                   placeholder="Confirmar Contraseña"
                                   className="bg-white"/>
                    </div>


                    {error && <Typography variant="body2" className="text-red-600">{error}</Typography>}

                    <Button
                        type="submit"
                        variant="contained"
                        className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleRegister}>
                        Registrarme
                    </Button>
                </form>

                <Box className="w-full border-t border-gray-300 my-6 flex flex-row items-center justify-center">


                    <Typography variant="body2" className="mt-4 text-gray-600" onClick={() => router.push('/login')}>
                        ¿Ya tienes Cuenta?{' '}
                        <span className="text-blue-600 hover:underline cursor-pointer">¡Inicia Sesión!</span>
                    </Typography>
                </Box>

            </Box>

            <Box className="basis-2/3 flex items-center justify-center">
                <Box sx={{display: 'flex',}}>
                    <img
                        src="/loginIMG.jpg"
                        alt="Imagen de login"/>
                </Box>

            </Box>
        </Box>
    );
}
