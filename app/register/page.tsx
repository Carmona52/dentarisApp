'use client'

import {Box, Button, FormLabel, TextField, Typography} from '@mui/material';
import {useRouter} from 'next/navigation';

export default function Register() {

    const router = useRouter()

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()

        const registerExitoso = true

        if (registerExitoso) {
            localStorage.setItem('token', 'simulado-123')
            router.push('/login')
        }
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
                        variant="outlined"
                        placeholder="Mi clinica"
                        className="bg-white"/>
                    </div>
                    <div>
                        <FormLabel className="text-gray-700">Correo <span className="text-red-500">*</span></FormLabel>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Correo"
                            className="bg-white"/>
                    </div>
                    <div>
                        <FormLabel className="text-gray-700">Número de teléfono <span className="text-red-500">*</span></FormLabel>
                        <TextField fullWidth
                                   type="number"
                                   variant="outlined"
                                   placeholder="1234567890"
                                   className="bg-white"/>
                    </div>

                    <div>
                        <FormLabel className="text-gray-700">Contraseña <span className="text-red-500">*</span></FormLabel>
                        <TextField fullWidth
                            type="password"
                            variant="outlined"
                            placeholder="Contraseña"
                            className="bg-white"/>
                    </div>

                    <div>
                        <FormLabel className="text-gray-700">Confirmar contraseña<span className="text-red-500">*</span></FormLabel>
                        <TextField fullWidth
                        type="password"
                        variant="outlined"
                        placeholder="Confirmar Contraseña"
                        className="bg-white"/>
                    </div>

                    <Typography variant="caption" className="text-gray-500">
                        Debe ser de al menos 8 caracteres
                    </Typography>

                    <Button
                        type="submit"
                        variant="contained"
                        className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleLogin}>
                        Registrarme
                    </Button>
                </form>

                <Box className="w-full border-t border-gray-300 my-6"/>

                <Button
                    variant="outlined"
                    className="flex items-center gap-2 text-gray-700 border-gray-400">
                    <img
                        src="/icons/google-svgrepo-com.svg"
                        alt="Google"
                        className="w-5 h-5"/>
                    Registrarte con Google
                </Button>

            </Box>
            <Box className="basis-2/3 flex items-center justify-center">
                <Box sx={{ display: 'flex',}}>
                    <img
                        src="/loginIMG.jpg"
                        alt="Imagen de login"/>
                </Box>

            </Box>
        </Box>
    );
}
