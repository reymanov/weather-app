import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { getCities } from "../../api/cities";

interface Props {
  onChange: (value: string) => void;
}

export const Search = ({ onChange }: Props) => {
  const [place, setPlace] = useState(null);

  const loadOptions = async (inputValue: string) => {
    const cities = await getCities(inputValue);
    return cities as any;
  };

  const handleInputChange = (newValue: any) => {
    setPlace(newValue);
    onChange(newValue);
  };

  return (
    <AsyncPaginate
      placeholder="Search"
      debounceTimeout={400}
      value={place}
      loadOptions={loadOptions}
      onChange={handleInputChange}
    />
  );
};
