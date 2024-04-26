import React, { useEffect, useState } from "react";
import { IBreed, IDog, ISubbreed } from "./component/interface";
import axios from "axios";
import "./styles.css";
import DogTable from "./component/dog/dogTable";
import AddDogForm from "./component/dog/adddogForm";

const defaultBreed: Array<IBreed> = [];
const defaultSubBreed: Array<ISubbreed> = [];
const defaultDog: Array<IDog> = [];
const backendUrl = process.env.REACT_APP_BACKEND_URL;
function CrudDogs() {

  const [breeds, setBreeds] = useState(defaultBreed);
  const [subbreeds, setSubbreeds] = useState(defaultSubBreed);
  const [dogs, setDogs] = useState(defaultDog);

  const onAddData = (newElem: IDog) => {
    setDogs(
      [...dogs, newElem]
    )
  };

  const onDelete = async (currentData: IDog) => {
    setDogs(dogs.filter(i => i.id !== currentData.id));
    await axios.delete(`${backendUrl}dogs/${currentData.id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ISubbreed[]>(`${backendUrl}subbreeds/`);
        setSubbreeds(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<IBreed[]>(`${backendUrl}breeds/`);
        setBreeds(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<IDog[]>(`${backendUrl}dogs/`);
        setDogs(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <div className="data-flex-wrapper">
        <AddDogForm
          onAddData={onAddData}
          breeds={breeds}
        />
        <DogTable
          elems={dogs}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}

export default CrudDogs;