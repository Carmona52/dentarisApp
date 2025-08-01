import {usuario} from "@/app/lib/db/types";
import { hrHR } from "@mui/x-date-pickers/locales";
import dayjs from "dayjs";
const api_URL = "http://localhost:3001/api/auth/login";

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

