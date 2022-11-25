import { useState } from "react"; //Importamos Hook
import { AsyncPaginate } from "react-select-async-paginate"; //Importamos componente select
import { geoApiOptions, geoApiURL } from "../../api"; //Importamos URL de geoApi y options

const Search = ({ onSearchChange }) => {
  // Definimos Hook para estado de busqueda
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => {
    // Se realiza fetch a api de ciudades y se debe retornar objeto
    return fetch(
      `${geoApiURL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        // Se da formato al objeto a retornar segun documentacion de AsyncPaginate
        return {
          // options: Array
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`, // Se trae latitude y longitude requeridos para hacer call a api de weather
              label: `${city.name}, ${city.country}`,
            };
          }),
        };
      })
      .catch((err) => console.error(err));
  };

  const handleOnChange = (searchDataCities) => {
    // Actualizamos estado de busqueda
    setSearch(searchDataCities);
    // Pasamos datos de busqueda a App
    onSearchChange(searchDataCities);
    // console.log(searchDataCities);
  };

  return (
    <>
      <AsyncPaginate
        placeholder="Search for city"
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange} // Funcion para manejar cambio de estado con Hook
        loadOptions={loadOptions} // Funcion Async requerida, recibe como parametro input de busqueda
      />
    </>
  );
};

export default Search;
