import React from "react";
import { IBreed } from "../interface";

interface IProps {
  elems: Array<IBreed>;
  onDelete: (elem: IBreed) => void;
}

const BreedTable: React.FunctionComponent<IProps> = props => {

  function confirmDelete(elem: IBreed):void {
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
            <th>Descripción</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {props.elems.length > 0 ? (
            props.elems.map(i => (
              <tr key={i.id}>
                <td>{i.name}</td>
                <td>{i.description}</td>
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
export default BreedTable;