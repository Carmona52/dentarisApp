'use client'

import { Box, Button, FormLabel, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { login } from '@/app/lib/db/auth/auth'

export default function Login() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const validateEmail = (email: string): boolean => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return regex.test(email)
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (!validateEmail(email)) {
            setError('Correo no válido')
            return
        }

        if (password.length < 8) {
            setError('La contraseña debe tener al menos 8 caracteres')
            return
        }

        try {
            const response = await login(email, password)
            if (response.success) {
                router.push('/')
            } else {
                setError(error || 'Error al iniciar sesión')
            }
        } catch (err) {
            setError('Error al iniciar sesión: ' + (err as Error).message)
        }


    }

    return (
        <Box className="flex w-full h-screen overflow-hidden">
            <Box className="basis-2/3 flex items-center justify-center">
                <img src="/loginIMG.jpg" alt="Imagen de login" />
            </Box>

            <Box className="basis-1/3 flex flex-col items-center justify-center bg-white h-screen overflow-hidden p-6">
                <img src="/branding/LogoBackRec.png" alt="Logo Dentaris" className="w-120 mb-2" />
                <Box className="text-center mb-6">
                    <Typography variant="h4" className="font-semibold text-gray-800">Bienvenido de Nuevo</Typography>
                    <Typography variant="h6" className="text-gray-600 mt-5">Por favor, inicia sesión para
                        continuar</Typography>
                </Box>

                <form className="flex flex-col w-3/4 gap-4" onSubmit={handleLogin} id="loginForm">
                    <div>
                        <FormLabel className="text-gray-700">Correo <span className="text-red-500">*</span></FormLabel>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Correo"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="bg-white"
                        />
                    </div>

                    <div>
                        <FormLabel className="text-gray-700">Contraseña <span className="text-red-500">*</span></FormLabel>
                        <TextField
                            fullWidth
                            type="password"
                            variant="outlined"
                            placeholder="Contraseña"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="bg-white"
                        />
                    </div>

                    <Typography variant="caption" className="text-gray-500">Debe ser de al menos 8 caracteres</Typography>

                    {error && <Typography variant="body2" className="text-red-600">{error}</Typography>}

                    <Button
                        type="submit"
                        variant="contained"
                        className="bg-[#53C6F3] hover:bg-blue-700 text-white"
                    >
                        Iniciar Sesión
                    </Button>
                </form>

                <Box className="w-full border-t border-gray-300 my-6" />


                <Typography variant="body1" className="mt-4 text-gray-600" onClick={() => router.push('/auth/register')}>
                    ¿No tienes una cuenta?{' '}
                    <span className="text-blue-600 hover:underline cursor-pointer">¡Regístrate!</span>
                </Typography>
            </Box>
        </Box>
    )
}
