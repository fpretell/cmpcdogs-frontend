import React from "react";
import { IDog } from "../interface";

interface IProps {
  elems: Array<IDog>;
  onDelete: (elem: IDog) => void;
}

const DogTable: React.FunctionComponent<IProps> = props => {

  function confirmDelete(elem: IDog):void {
    const confirm = window.confirm("¿Estás seguro de que quieres borrar este elemento?");
    if (confirm) {
      props.onDelete(elem)
    }
  }

  return (
    <div className="data-table">
      <h1>Listado</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Genero</th>
            <th>Raza</th>
            <th>SubRaza</th>
            <th>Imagen</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.elems.length > 0 ? (
            props.elems.map(i => (
              <tr key={i.id}>
                <td>{i.name}</td>
                <td>{i.gender}</td>
                <td>{i?.breed?.name || '-'}</td>
                <td>{i?.subbreed?.name || '-'}</td>
                <td>
                  <img width={60} src={`http://localhost:3000/uploads/${i.image}`} alt="foto" />
                </td>
                <td>
                  <button onClick={() => confirmDelete(i)}>Borrar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>no data</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default DogTable;