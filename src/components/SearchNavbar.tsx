import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DataTableFacetedFilter } from '@/components/SearchToolBar/data-table-faceted-filter';
import { Card } from './ui/card';

import { useEffect, useState } from 'react';
import axiosInstance from '@/axios';
import { Props } from '@/assets/svgs/TshirtSvg';

type Country = {
  name: string;
  states: {
    name: string;
    cities: {
      name: string;
    }[];
  }[];
};

const useFetchLocationData = () => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    axiosInstance
      .get('api/locations/countries-states-cities/')
      .then((response) => {
        const data = response.data;
        setCountries(data);
      })
      .catch((error) => {
        console.error('Error fetching location data:', error);
      });
  }, []);

  return { countries };
};
type SearchNavbarProps = {
  search_for: string;
};
const SearchNavbar = ({ search_for }: SearchNavbarProps) => {
  const sendRequest = () => {
    console.log(searchBy, search_for);
    console.log(selectedCountries, selectedStates, selectedCities);
  };
  const { countries } = useFetchLocationData();
  const [selectedCountries, setSelectedCountry] = useState<Set<string>>(
    new Set()
  );
  const [selectedStates, setSelectedStates] = useState<Set<string>>(new Set());
  const [selectedCities, setSelectedCities] = useState<Set<string>>(new Set());
  const [searchBy, setSearchBy] = useState<string>('');

  const selectedCountriesArray = Array.from(selectedCountries);

  const stateOptions = countries
    .filter((country) => selectedCountriesArray.includes(country.name))
    .flatMap((country) => country.states)
    .map((state) => ({
      label: state.name,
      value: state.name,
      options_number: state.cities.length,
      cities: state.cities,
    }));

  const selectedStatesArray = Array.from(selectedStates);
  const cityOptions = stateOptions
    .filter((state) => selectedStatesArray.includes(state.value))
    .flatMap((state) => state.cities)
    .map((city) => ({
      label: city.name,
      value: city.name,
    }));
  console.log(searchBy + 'sdoijsoai');

  // Now, `relatedStates` is an array of states that belong to the selected countries.
  console.log(countries);
  const options = countries.map((country) => ({
    label: country.name,
    value: country.name,
    options_number: country.states.length,
  }));
  return (
    <Card className="flex justify-center m-4 gap-4 p-2 px-4 w-fit rounded-3xl mx-auto border-primary border-[2px]">
      <DataTableFacetedFilter
        options={options}
        title={'Country'}
        setState={(value: Set<string>) => {
          setSelectedCountry(value);
        }}
        searchBy={searchBy}
      />
      <DataTableFacetedFilter
        options={stateOptions}
        title={'State'}
        setState={(value: Set<string>) => {
          setSelectedStates(value);
        }}
        searchBy={searchBy}
      />
      <DataTableFacetedFilter
        options={cityOptions}
        title={'City'}
        setState={(value: Set<string>) => {
          setSelectedCities(value);
        }}
        searchBy={searchBy}
      />
      <Select
        onValueChange={(value: string) => {
          setSearchBy(value);
        }}
      >
        <SelectTrigger className="w-[160px] h-8 focus:ring-0">
          <SelectValue placeholder="Search By" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Search By</SelectLabel>
            <SelectItem value="country">Country</SelectItem>
            <SelectItem value="state">State</SelectItem>
            <SelectItem value="city">City</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button
        disabled={!searchBy}
        className="h-8 rounded-3xl"
        onClick={sendRequest}
      >
        Search
      </Button>
    </Card>
  );
};

export default SearchNavbar;
