import React, { useState } from 'react';
import { createDentistPost } from '@/app/lib/db/dentists';
import { createDentist } from '@/app/lib/db/types'; 

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDentistCreated: () => void; 
}

const ModalCrearDentista: React.FC<ModalProps> = ({ isOpen, onClose, onDentistCreated }) => {
  const [formData, setFormData] = useState<createDentist>({
    rol: 'Dentista',
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    cedula_profesional: '',
    carrera: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const token = localStorage.getItem('token');
    if (!token) {
      setError('No hay token disponible. Por favor, inicia sesión.');
      setIsLoading(false);
      return;
    }

    try {
      await createDentistPost(formData, token);
      onDentistCreated();
      onClose();
    } catch (err) {
      setError('Error al crear el dentista. Inténtalo de nuevo.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Crear Nuevo Dentista</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full border rounded p-2 mt-1"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Apellido</label>
            <input
              type="text"
              name="apellidos"
              value={formData.apellidos}
              onChange={handleChange}
              className="w-full border rounded p-2 mt-1"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded p-2 mt-1"
              required
            />
          </div>


          <div className="mb-4">
            <label className="block text-gray-700">Telefono</label>
            <input
              type="number"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="w-full border rounded p-2 mt-1"
              required
            />
          </div>

              <div className="mb-4">
            <label className="block text-gray-700">Cedula Profesional</label>
            <input
              type="text"
              name="cedula_profesional"
              value={formData.cedula_profesional}
              onChange={handleChange}
              className="w-full border rounded p-2 mt-1"
              required
            />
          </div>


              <div className="mb-4">
            <label className="block text-gray-700">Carrera</label>
            <input
              type="text"
              name="carrera"
              value={formData.carrera}
              onChange={handleChange}
              className="w-full border rounded p-2 mt-1"
              required
            />
          </div>
          
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? 'Creando...' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalCrearDentista;