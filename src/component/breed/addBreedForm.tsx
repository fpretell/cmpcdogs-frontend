import React, { useState } from "react";
import { IBreed } from "../interface";
import axios from "axios";

interface IProps {
  onAddData: (elem: IBreed) => void;
}

const initElem = { name: "", description: "" };
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const AddBreedForm: React.FunctionComponent<IProps> = props => {
  const [formValue, setFormValue] = useState(initElem);
  const [showMsgError, setShowMsgError] = useState(false);

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const name = formValue.name
      const description = formValue.description

      if (name && description) {
        const response = await axios.post(`${backendUrl}breeds/`, { name, description });
        props.onAddData(response.data)
        setFormValue(initElem)
        setShowMsgError(false)
      } else {
        setShowMsgError(true)
      }
    } catch (error) {
      console.error('Error al crear el perro:', error);
    }
   
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
    setShowMsgError(false)
  };

  return (
    <div className="data-form">
      <h1>Agregar Razas</h1>
      <form className="form-edit" onSubmit={onFormSubmit}>
        <div className="form-row">
          <label>Nombre</label>
          <input
            type="text"
            placeholder="ingrese nombre"
            name="name"
            value={formValue.name}
            onChange={onInputChange}
          />
        </div>
        <div className="form-row">
          <label>Descripción</label>
          <input
            type="text"
            placeholder="ingrese descripción"
            name="description"
            value={formValue.description}
            onChange={onInputChange}
          />
        </div>
        {
          showMsgError && (
            <div className="form-error">{'Todos los campos son obligatorios'}</div>
          )
        }
        <div className="form-row">
          <button>Agregar Raza</button>
        </div>
      </form>
    </div>
  );
};
export default AddBreedForm;