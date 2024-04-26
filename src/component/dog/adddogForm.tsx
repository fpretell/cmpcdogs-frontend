import React, { useEffect, useState } from "react";
import { IBreed, IDog, ISubbreed } from "../interface";
import axios from "axios";

interface IProps {
  onAddData: (user: IDog) => void;
  breeds: Array<IBreed>;
}

const initData = { name: "", description: "", breedId: '', price: '', gender: '', subbreedId: '' };
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const AddDogForm: React.FunctionComponent<IProps> = props => {
  const [formValue, setFormValue] = useState(initData);
  const [showMsgError, setShowMsgError] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [selectedRaza, setSelectedRaza] = useState<number | undefined>(undefined);
  const [selectedSubraza, setSelectedSubraza] = useState<number | undefined>(undefined);
  const [subrazas, setSubrazas] = useState<ISubbreed[]>([]);

  useEffect(() => {
    if (selectedRaza !== undefined) {
      axios.get<ISubbreed[]>(`${backendUrl}breeds/subbreeds/${selectedRaza}`)
        .then(response => {
          setSubrazas(response.data);
        })
        .catch(error => {
          console.error('Error al obtener las subrazas:', error);
        });
    }
  }, [selectedRaza]);

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const name = formValue.name;
      const description = formValue.description;
      const price = parseFloat(formValue.price);
      const gender = formValue.gender;
      const breedId = parseFloat(formValue.breedId);
      const subbreedId = parseFloat(formValue.subbreedId);

      if (name && description && price && gender && breedId && subbreedId) {
        const response = await axios.post(`${backendUrl}dogs/`, { name, description, price, gender, breedId, subbreedId });
        let randomName:string = ''
        if (selectedFile) {
          randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('') + '--' + response.data.id;
          const ext = selectedFile.name.split('.')
          const lastElem = ext[ext.length - 1];
          const imageFront = randomName + '.' + lastElem
          response.data.image = imageFront
        }

        props.onAddData(response.data)
        await handleUpload(response.data.id, randomName)

        setShowMsgError(false);
        setFormValue(initData);
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

  const handleRazaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(event.target.value);
    setSelectedRaza(selectedValue);
    setSelectedSubraza(undefined);
    const { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value });
    setShowMsgError(false)
  };

  const handleSubrazaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(event.target.value);
    setSelectedSubraza(selectedValue);
    const { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value });
    setShowMsgError(false)
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async (id: string, randomName: string) => {
    if (!selectedFile) {
      return;
    }
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      await axios.post(`${backendUrl}dogs/upload/` + randomName, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="user-form">
      <h1>Agregar Perros</h1>
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
          <label>Precio</label>
          <input
            type="number"
            placeholder="ingrese precio"
            name="price"
            value={formValue.price}
            onChange={onInputChange}
          />
        </div>
        <div className="form-row">
          <label>Género</label>
          <select name="gender" onChange={onSelectChange}>
            <option value="">Seleccione</option>
            <option value='male'>Macho</option>
            <option value='female'>Hembra</option>
          </select>
        </div>
        <div className="form-row">
          <label>Raza</label>
          <select name="breedId" onChange={handleRazaChange}>
            <option value="">Seleccione</option>
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
        <div className="form-row">
          <label>Subraza</label>
          <select name="subbreedId" value={selectedSubraza || ''} onChange={handleSubrazaChange} disabled={!selectedRaza}>
            <option value="">Selecciona una subraza</option>
            {subrazas.map(subraza => (
              <option key={subraza.id} value={subraza.id}>{subraza.name}</option>
            ))}
          </select>
        </div>

        
        <div className="form-row">
          <label>Imagen</label>
          <input type="file" onChange={handleFileChange} />
        </div>

        {
          showMsgError && (
            <div className="form-error">{'Todos los campos son obligatorios'}</div>
          )
        }
        <div className="form-row">
          <button>Agregar Perro</button>
        </div>
      </form>
    </div>
  );
};
export default AddDogForm;