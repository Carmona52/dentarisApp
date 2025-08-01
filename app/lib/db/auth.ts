import { clinica } from "@/app/lib/db/types";
import dayjs from "dayjs";

const api_URL = "http://localhost:3001/api/auth/login";
const api_Register_URL = "http://localhost:3001/api/auth/register";

let errorMessage = "Error al iniciar sesión";

export const login = async (email: string, password: string) => {
    return fetch(api_URL, {
        method: "POST",
        body: JSON.stringify({
            email: email,
            password: password,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .catch((error) => {
        errorMessage= "Error al iniciar sesión: " + error.message;
        throw error;
    })
    .then((response) => {
        if (response.success === true) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('userId', response.userId);
            localStorage.setItem('lastLogin', dayjs().format('HH:mm'));
            return response;
        } else {
            errorMessage = "Contraseña o Correo Equivocado";
            throw new Error(errorMessage);
        }
});
}


export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('lastLogin');
    window.location.href = '/login';
}


export const register = async (Clinica:clinica) => {
    return fetch(api_Register_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            clinica: Clinica.clinica_name,
            telefono: Clinica.telefono,
            email: Clinica.email,
            password: Clinica.password,
            rol: Clinica.rol,
        }),
    })
    .then((res) => res.json())
    .catch((error) => {
        errorMessage = "Error al registrar: " + error.message;
        throw error;
    })
    .then((response) => {
        if (response.success === true) {
            return response;
        } else {
            errorMessage = "Error al registrar: " + response.message;
            throw new Error(errorMessage);
        }
    });
}
