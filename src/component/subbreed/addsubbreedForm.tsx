import React, { useState } from "react";
import { IBreed, ISubbreed } from "../interface";
import axios from "axios";

interface IProps {
  onAddData: (user: ISubbreed) => void;
  breeds: Array<IBreed>;
}

const initElem = { name: "", description: "", breedId: '' };
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const AddSubBreedForm: React.FunctionComponent<IProps> = props => {
  const [formValue, setFormValue] = useState(initElem);
  const [showMsgError, setShowMsgError] = useState(false);

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const name = formValue.name;
      const description = formValue.description;
      const breedId = parseFloat(formValue.breedId);

      if (name && description && breedId) {
        const response = await axios.post(`${backendUrl}subbreeds/`, { name, description, breedId });
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

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
    setShowMsgError(false)
  };

  return (
    <div className="user-form">
      <h1>Agregar Sub Razas</h1>
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
        <div className="form-row">
          <label>Raza</label>
          <select name="breedId" onChange={onSelectChange} value={formValue.breedId}>
            <option value="-1">Seleccione</option>
            {
              props.breeds && props.breeds.length ?
              (
                props.breeds.map(i => (
                  <option key={i.id} value={i.id}>{i.name}</option>
                ))
              ) :
              (
                '<option value="" disabled>no items</option>'
              )
            }
          </select>
        </div>
        {
          showMsgError && (
            <div className="form-error">{'Todos los campos son obligatorios'}</div>
          )
        }
        <div className="form-row">
          <button>Agregar SubRaza</button>
        </div>
      </form>
    </div>
  );
};
export default AddSubBreedForm;