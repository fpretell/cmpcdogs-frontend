import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import * as ReactDOM from "react-dom";
import "./styles.css";
import 'antd/dist/reset.css';
import Home from "./home";
import CrudBreeds from "./indexBreeds";
import SubCrudBreeds from "./indexSubBreeds";
import CrudDogs from "./indexDogs";
import DogList from "./indexList";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul className="navega">
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/breeds">Razas</Link>
            </li>
            <li>
              <Link to="/subbreeds">Sub Razas</Link>
            </li>
            <li>
              <Link to="/dogs">Perros</Link>
            </li>
            <li>
              <Link to="/doglist">Listado</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/breeds" element={<CrudBreeds />} />
          <Route path="/subbreeds" element={<SubCrudBreeds />} />
          <Route path="/dogs" element={<CrudDogs />} />
          <Route path="/doglist" element={<DogList />} />
        </Routes>
      </div>
    </Router>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
