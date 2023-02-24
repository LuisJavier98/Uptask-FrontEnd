import { BrowserRouter, Route, Routes } from "react-router-dom"
import AuthProvider from "../context/AuthProvider"
import ProyectoProvider from "../context/ProyectoProvider"
import AuthLayouts from "./layouts/AuthLayouts"
import RutaProtegida from "./layouts/RutaProtegida"
import ConfirmarCuenta from "./pages/ConfirmarCuenta"
import CrearProyectos from "./pages/CrearProyectos"
import EditarProyecto from "./pages/EditarProyecto"
import Login from "./pages/Login"
import NuevoColaborador from "./pages/NuevoColaborador"
import NuevoPassword from "./pages/NuevoPassword"
import OlvidePassword from "./pages/OlvidePassword"
import Proyecto from "./pages/Proyecto"
import Proyectos from "./pages/Proyectos"
import Registrar from "./pages/Registrar"


function App() {


  return (
    <BrowserRouter>
      <AuthProvider>
        <ProyectoProvider>
          <Routes>
            <Route path="/" element={<AuthLayouts />}>
              <Route index element={<Login />} />
              <Route path="/registrar" element={<Registrar />} />
              <Route path="/olvide-password" element={<OlvidePassword />} />
              <Route path="/olvide-password/:token" element={<NuevoPassword />} />
              <Route path="/confirmar/:id" element={<ConfirmarCuenta />} />
            </Route>
            <Route path="/proyectos" element={<RutaProtegida />}>
              <Route index element={<Proyectos />} />
              <Route path="crear-proyecto" element={<CrearProyectos />} />
              <Route path="nuevo-colaborador/:id" element={<NuevoColaborador />} />
              <Route path=":id" element={<Proyecto />} />
              <Route path="editar/:id" element={<EditarProyecto />} />
            </Route>
          </Routes>
        </ProyectoProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
