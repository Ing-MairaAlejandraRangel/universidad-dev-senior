import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [titulo, setTitulo] = useState("");
  const [area_academica, setArea_Academica] = useState("");
  const [dedicacion, setDedicacion] = useState("");
  const [anios_experiencia, setAnios_Experiencia] = useState(0);

  const [registros, setRegistros] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    cargarDocentes();
  }, []);

  const cargarDocentes = async () => {
    try {
      const response = await fetch('http://localhost:3001/docentes');
      const data = await response.json();
      setRegistros(data);
    } catch (error) {
      alert('Error al cargar los docentes');
    }
  };

  const limpiarFormularios = () => {
    setNombre('');
    setCorreo('');
    setTelefono('');
    setTitulo('');
    setArea_Academica('');
    setDedicacion('');
    setAnios_Experiencia(0);
    setEditIndex(null);
  };

  const registrarDatos = async (e) => {
    e.preventDefault();

    const payload = {
      nombre,
      correo,
      telefono,
      titulo,
      area_academica,
      dedicacion,
      anios_experiencia: Number(anios_experiencia)
    };

    if (editIndex !== null) {
      try {
        const docente = registros[editIndex];

        const response = await fetch(`http://localhost:3001/docentes/${docente.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const nuevosRegistros = [...registros];
          nuevosRegistros[editIndex] = {
            ...docente,
            ...payload
          };

          setRegistros(nuevosRegistros);
          limpiarFormularios();
          alert('Docente actualizado correctamente');
        } else {
          const err = await response.json().catch(() => ({}));
          alert(err.error || 'Error al actualizar el docente');
        }
      } catch (error) {
        alert('Error de conexión al actualizar un docente');
      }
    } else {
      try {
        const response = await fetch('http://localhost:3001/docentes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (response.ok) {
          setRegistros([...registros, data]);
          limpiarFormularios();
          alert('Docente guardado correctamente');
        } else {
          alert(data.error || 'Error al guardar el docente');
        }
      } catch (error) {
        alert('Error de conexión al guardar');
      }
    }
  };

  const eliminarRegistro = async (idx) => {
    const docente = registros[idx];

    const confirmar = window.confirm(`¿Deseas eliminar al docente ${docente.nombre}?`);
    if (!confirmar) return;

    try {
      const response = await fetch(`http://localhost:3001/docentes/${docente.id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setRegistros(registros.filter((_, i) => i !== idx));

        if (editIndex === idx) {
          limpiarFormularios();
        }

        alert('Docente eliminado correctamente');
      } else {
        alert('Error al eliminar el docente');
      }
    } catch (error) {
      alert('Error de conexión');
    }
  };

  const editarRegistro = (idx) => {
    const reg = registros[idx];
    setNombre(reg.nombre);
    setCorreo(reg.correo);
    setTelefono(reg.telefono);
    setTitulo(reg.titulo);
    setArea_Academica(reg.area_academica);
    setDedicacion(reg.dedicacion);
    setAnios_Experiencia(reg.anios_experiencia);
    setEditIndex(idx);
  };

  return (
    <div className="app-container">
      <div className="overlay">
        <div className="main-card">
          <h1 className="titulo-principal">Gestión de Docentes</h1>
          <p className="subtitulo">
            Administra los registros de docentes de forma rápida y ordenada
          </p>

          <div className="form-card">
            <div className="form-header">
              <h2>{editIndex !== null ? 'Editar docente' : 'Registrar docente'}</h2>
              {editIndex !== null && (
                <span className="badge-edicion">Modo edición</span>
              )}
            </div>

            <form onSubmit={registrarDatos} className="formulario">
              <div className="input-group">
                <label>Nombre</label>
                <input
                  type="text"
                  placeholder="Ingrese el nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>Correo</label>
                <input
                  type="email"
                  placeholder="Ingrese el correo"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>Teléfono</label>
                <input
                  type="text"
                  placeholder="Ingrese el teléfono"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>Título</label>
                <input
                  type="text"
                  placeholder="Ingrese el título"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>Área académica</label>
                <input
                  type="text"
                  placeholder="Ingrese el área académica"
                  value={area_academica}
                  onChange={(e) => setArea_Academica(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>Dedicación</label>
                <input
                  type="text"
                  placeholder="Ingrese la dedicación"
                  value={dedicacion}
                  onChange={(e) => setDedicacion(e.target.value)}
                />
              </div>

              <div className="input-group full-width">
                <label>Años de experiencia</label>
                <input
                  type="number"
                  placeholder="Ingrese los años de experiencia"
                  value={anios_experiencia}
                  onChange={(e) => setAnios_Experiencia(e.target.value)}
                />
              </div>

              <div className="botones full-width">
                <button type="submit" className="btn btn-guardar">
                  {editIndex !== null ? 'Actualizar docente' : 'Guardar docente'}
                </button>

                <button
                  type="button"
                  className="btn btn-limpiar"
                  onClick={limpiarFormularios}
                >
                  Limpiar
                </button>
              </div>
            </form>
          </div>

          <div className="tabla-card">
            <h2 className="tabla-titulo">Lista de docentes</h2>

            <div className="tabla-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Teléfono</th>
                    <th>Título</th>
                    <th>Área académica</th>
                    <th>Dedicación</th>
                    <th>Años</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {registros.length > 0 ? (
                    registros.map((reg, idx) => (
                      <tr key={reg.id}>
                        <td>{reg.nombre}</td>
                        <td>{reg.correo}</td>
                        <td>{reg.telefono}</td>
                        <td>{reg.titulo}</td>
                        <td>{reg.area_academica}</td>
                        <td>{reg.dedicacion}</td>
                        <td>{reg.anios_experiencia}</td>
                        <td>
                          <div className="acciones">
                            <button
                              className="btn-accion btn-editar"
                              onClick={() => editarRegistro(idx)}
                            >
                              Editar
                            </button>
                            <button
                              className="btn-accion btn-eliminar"
                              onClick={() => eliminarRegistro(idx)}
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="sin-registros">
                        No hay docentes registrados
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;