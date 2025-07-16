import { DataGrid } from '@mui/x-data-grid';
import React from "react";
import { tablePacienteProps } from "@/app/miClinica/types/DataType";

const TablaPacientes: React.FC<tablePacienteProps> = ({ columns, data }) => {
    return (
        <DataGrid
            rows={data}
            columns={columns}
            getRowId={(row) => row.numero_identificacion}
            autoHeight
            disableRowSelectionOnClick
            sx={{ borderRadius: 2, boxShadow: 2 }}
        />
    );
};

export default TablaPacientes;
