  export interface IBreed {
    id: string;
    name: string;
    description: string;
  }

  export interface ISubbreed {
    id: string;
    name: string;
    description: string;
    breed: IBreed;
  }

  export interface IDog {
    id: string;
    name: string;
    breed: IBreed;
    subbreed: ISubbreed;
    image: string;
    gender: string;
    description: string;
  }

  export interface IResponse {
    data: [];
    status: number;
    statusText: string;
  }

  export interface IBreedsSelect {
    value: number;
    label: string;
  }

  export interface ISubreedsSelect {
    value: number;
    label: string;
  }