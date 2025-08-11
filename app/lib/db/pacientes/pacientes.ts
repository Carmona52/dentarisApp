import { usuario } from "@/app/lib/db/types";
import {error} from "next/dist/build/output/log";

const usuario_URL = process.env.NEXT_PUBLIC_PACIENTE_URL;

if (!usuario_URL) {
    throw new Error("Api fuera de funcionamiento");
}

export const createUser = async (body: usuario, token: string) => {
    try {
        const res = await fetch(usuario_URL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data?.error || "Error en la creación del usuario");
        }

        return true;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("Error desconocido al crear usuario");
    }
};

export const deletePaciente = async (id: number, token:string) => {
    try {
        const res = await fetch(`${usuario_URL}/${id}`,{
            method:"PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body:JSON.stringify( {"estado":"Baja"})

        });

        const data = await res.json();
        if (!res.ok) {
            throw new Error(data?.error || error());
        }

        return true;
    }catch(error) {
        return error;
    }
}