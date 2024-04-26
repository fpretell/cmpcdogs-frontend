import React, { useEffect, useState } from "react";
import { Row, Col, Card, Select, Divider, Form } from 'antd';
import "./styles.css";
import { IBreed, IBreedsSelect, IDog, ISubbreed, ISubreedsSelect } from "./component/interface";
import axios, { AxiosResponse } from "axios";

const defaultDog: Array<IDog> = [];
const defaultBreed: Array<IBreedsSelect> = [];
const defaultSubbreed: Array<ISubreedsSelect> = [];
const defaultIdsBreeds: string | string[] = '';
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const backendUrlRoot = process.env.REACT_APP_BACKEND_ROOT;

function DogList() {
  const [dogs, setDogs] = useState(defaultDog);
  const [breeds, setBreeds] = useState(defaultBreed);
  const [subbreeds, setSubbreeds] = useState(defaultSubbreed);
  const [breedsIdSelected, setBreedsIdSelected] = useState(defaultIdsBreeds);
  const [form] = Form.useForm();

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<IBreed[]>(`${backendUrl}breeds/`);

        if (response.data) {
          const newBreeds = response.data.map(el => {
            return {
              value: parseInt(el.id),
              label: el.name
            }
          })
          setBreeds(newBreeds);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleChange = async (value: string | string[]) => {
    setBreedsIdSelected(value);
    form.resetFields();
    try {
      let response: AxiosResponse<IDog[], any>;
      let responseSubbreads: AxiosResponse<ISubbreed[] | [], any>;
      if (value.length) {
        response = await axios.get<IDog[]>(`${backendUrl}dogs/bybreeds?breeds=${value}`);

        /** get sub breeds */
        responseSubbreads = await axios.get<ISubbreed[]>(`${backendUrl}subbreeds/bybreeds?breeds=${value}`);
        if (responseSubbreads.data) {
          const newSubbreeds = responseSubbreads.data.map(el => {
            return {
              value: parseInt(el.id),
              label: el.name
            }
          })
          setSubbreeds(newSubbreeds);
        }
      } else {
        response = await axios.get<IDog[]>(`${backendUrl}dogs/`);
        setSubbreeds([]);
      }
      setDogs(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChangeSubBreed = async (value: string | string[]) => {
    try {
      let response: AxiosResponse<IDog[], any>;
      if (value.length) {
        response = await axios.get<IDog[]>(`${backendUrl}dogs/bysubbreeds?subbreeds=${value}`);
      } else {
        response = await axios.get<IDog[]>(`${backendUrl}dogs/bybreeds?breeds=${breedsIdSelected}`);
      }
      setDogs(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Select
            mode="multiple"
            placeholder="Seleccione Raza"
            style={{ width: 600 }}
            options={breeds}
            onChange={handleChange}
          />
        </Col>
        <Col span={12}>
        <Form form={form}>
          <Form.Item name="miSelect">
            <Select
              mode="multiple"
              placeholder="Seleccione SubRaza"
              style={{ width: 600 }}
              options={subbreeds}
              onChange={handleChangeSubBreed}
            />
          </Form.Item>
        </Form>
        </Col>
      </Row>

      <Divider />

      <Row gutter={16}>
          {dogs.length > 0 ? (
            dogs.map(i => {
              const title = `${i.name} - ${i.breed.name} - ${i.subbreed.name}`
              const gender = i.gender === 'male' ? 'Macho' : 'Hembra'
              return (
                <Col key={i.id} span={8}>
                  <Card key={i.id} title={title}>
                    <div>
                      <img width={240} src={`${backendUrlRoot}uploads/${i.image}`} alt="foto" />
                    </div>
                    {i.description} - {gender}
                  </Card>
                </Col>
              )
            })
          ) : (
            null
          )}
      </Row>
  </>
  );
}
export default DogList;