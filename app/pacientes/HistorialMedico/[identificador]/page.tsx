export default function HistorialMedicoPage({ params }: { params: { identificador: string } }) {
    const { identificador } = params;

    return (
        <div>
            <h1>Historial Médico del Paciente {identificador} listoooo</h1>
        </div>
    );
}