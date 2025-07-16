'use client'
import { LineChart } from '@mui/x-charts';
import { PieChart } from '@mui/x-charts';
import pacientes from "../dataTest/data.json";
import {Box} from "@mui/material";
import { GridColDef } from '@mui/x-data-grid';

import TablePaciente from "@/app/components/tables/TablePaciente";


export default function miClinica() {

    const ingresosMensuales = [
        { month: 'Ene', value: 100000 },
        { month: 'Feb', value: 900000 },
        { month: 'Mar', value: 2000000 },
        { month: 'Abr', value: 156123 },
    ];

    const gastos = [
        { id: 0, value: 800000, label: 'Gastos Médicos' },
        { id: 1, value: 1000000, label: 'Gastos Clínicos' },
        { id: 2, value: 234098, label: 'Otros' },
    ];

    const columns:GridColDef[] = [
        { field: 'nombre', headerName: 'Nombre de Paciente', flex: 1 },
        { field: 'servicio', headerName: 'Servicio', flex: 1 },
        { field: 'fecha', headerName: 'Fecha', flex: 1 },
        { field: 'telefono', headerName: 'Teléfono', flex: 1 },
        { field: 'estatus', headerName: 'Estatus', flex: 1 },
        { field: 'pago', headerName: 'Pago', flex: 1 },
        {
            field: 'accion',
            headerName: 'Acción',
            renderCell: (params) => (
                <button onClick={() => console.log(params.row)}>Ver</button>
            ),
            flex: 1,
        },
    ];

    return(
        <>
            <Box className="flex flex-row">


            <LineChart
                xAxis={[{ data: ingresosMensuales.map(d => d.month), scaleType: 'point' }]}
                series={[{ data: ingresosMensuales.map(d => d.value),area:true, label: 'Ingresos', color: '#1976d2' }]}
                height={250}/>


            <PieChart
                series={[{ data: gastos, innerRadius: 40, outerRadius: 80 }]}
                height={250}/>
            </Box>
            <TablePaciente
                columns={columns}
                data={pacientes}
                getRowId={(row) => row.numero_identificacion}/>

        </>
    )
}


