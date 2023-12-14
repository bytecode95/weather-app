import React, { useState } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'
import {GEO_API_URL, geoApiOptions} from './FetchData'


const Search = ({onSearchChange}) => {
  const [search, setSearch] = useState(null);

  const handleOnChange = (searchData) => {
      searchData(searchData);
      onSearchChange(searchData);
  }

  const loadOptions = async (inputValue) => {
    try {
      const response = await fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, geoApiOptions);
      
      // Check if the response status is ok
    if (!response.ok) {
      const errorData = await response.json();
      console.error(errorData);
      
    }
      const result = await response.json();
      console.log(result);
      
  
      return { options };
    } catch (error) {
      console.error(error);
      
    }
  };

  return (
    <AsyncPaginate
        placeholder="Search for City"
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
    />
  )
}

export default Search