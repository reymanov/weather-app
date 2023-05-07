import axios from "axios";
import { GEO_API_URL, geoApiOptions } from "./endpoints";
import { ICity } from "../types/interfaces/City";

export const getCities = async (inputValue: string) => {
  try {
    const response = await axios.get(
      `${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${inputValue}`,
      geoApiOptions
    );
    const cities = response.data.data.map((city: ICity) => ({
      value: `${city.latitude} ${city.longitude}`,
      label: `${city.name}, ${city.countryCode}`,
    }));

    return { options: cities };
  } catch (error) {
    console.error(error);
  }
};
