import { createDentist } from "@/app/lib/db/types";

const dentistas_url=process.env.NEXT_PUBLIC_DENTISTAS_URL;

if (!dentistas_url) {
    throw new Error("Error: No API URL provided");
}

export const getDentist = async (token: string)=> {
  try {
    const res = await fetch(dentistas_url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const response = await res.json();

    if (response.success === true) {
      return response;
    } else {
      throw new Error("Error al obtener los dentistas");
    }
  } catch (error) {
    console.error("Error en getDentist:", error);
    throw error;
  }
};


export const createDentistPost = async (dentistaData: createDentist, token: string) => {
  try {
    const response = await fetch(dentistas_url, {
      method: 'POST',
      body: JSON.stringify(dentistaData),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,},
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al crear el dentista');
    }
    return data;

  } catch (error) {
    console.error('Error en la solicitud:', error);
    throw error;
  }
};