import React, { useEffect, useState } from "react";
import { IBreed } from "./component/interface";
import axios from "axios";
import "./styles.css";
import BreedTable from "./component/breed/breedTable";
import AddBreedForm from "./component/breed/addBreedForm";

const defaultData: Array<IBreed> = [];
const backendUrl = process.env.REACT_APP_BACKEND_URL;
function CrudBreeds() {
  const [breeds, setBreeds] = useState(defaultData);

  const onAddData = (newElem: IBreed) => {
    setBreeds(
      [...breeds, newElem]
    )
  };

  const onDelete = async (currentData: IBreed) => {
    setBreeds(breeds.filter(i => i.id !== currentData.id));
    await axios.delete(`${backendUrl}breeds/${currentData.id}`);
  };

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
        <AddBreedForm onAddData={onAddData} />
        <BreedTable
          elems={breeds}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}

export default CrudBreeds;