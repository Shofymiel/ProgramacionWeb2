import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/home";
import Inicio from "./components/inicio";
import Registro from "./components/registro";
import Perfil from "./components/perfil";
import About from "./components/about";
import Biblioteca from "./components/biblioteca";
import Store from "./components/store";
import Tareas from "./components/tareas";
import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/about" element={<About />} />
        <Route path="/biblioteca" element={<Biblioteca />} />
        <Route path="/store" element={<Store />} />
        <Route path="/tareas" element={<Tareas />} />

        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;