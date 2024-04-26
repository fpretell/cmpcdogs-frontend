import React, { useEffect, useState } from "react";
import { IBreed, ISubbreed } from "./component/interface";
import axios from "axios";
import "./styles.css";
import SubBreedTable from "./component/subbreed/subbreedTable";
import AddSubBreedForm from "./component/subbreed/addsubbreedForm";

const defaultBreed: Array<IBreed> = [];
const defaultSubBreed: Array<ISubbreed> = [];
const backendUrl = process.env.REACT_APP_BACKEND_URL;
function SubCrudBreeds() {

  const [breeds, setBreeds] = useState(defaultBreed);
  const [subbreeds, setSubbreeds] = useState(defaultSubBreed);

  const onAddData = (newElem: ISubbreed) => {
    setSubbreeds(
      [...subbreeds, newElem]
    )
  };

  const onDelete = async (currentData: IBreed) => {
    setSubbreeds(subbreeds.filter(i => i.id !== currentData.id));
    await axios.delete(`${backendUrl}subbreeds/${currentData.id}`);
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

  return (
    <div className="App">
      <div className="data-flex-wrapper">
        <AddSubBreedForm
          onAddData={onAddData}
          breeds={breeds}
        />
        <SubBreedTable
          elems={subbreeds}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}

export default SubCrudBreeds;