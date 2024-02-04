import axios from 'axios'; // Make sure to import axios
import axiosInstance from '@/axios';

export interface LocationDetails {
  country: string;
  state: string;
  city: string;
  location_pk: string;
  location_name: string;
}

async function fetchLocationDetails(
  latitude: number,
  longitude: number,
  username: string
) {
  const url = `http://api.geonames.org/findNearbyPlaceNameJSON?lat=${latitude}&lng=${longitude}&username=${username}`;
  try {
    const response = await axios.get(url); // Use axios.get instead of fetch
    const data = response.data; // Axios stores the response data in a .data property

    // Extract the country, state, and city from the data
    const country = data.geonames[0]?.countryName;
    const state = data.geonames[0]?.adminName1;
    const city = data.geonames[0]?.name;

    // Return the values, encapsulating them in an object of lore
    return { country, state, city };
  } catch (error) {
    // Alas! If the quest encounters a storm (error), log the misfortune
    console.error('Yarr, there be errors in the sea:', error);
    return null; // Return a beacon of null, signaling an incomplete quest
  }
}

//Add it to the server with post request
export async function AddLocation(name: string, lng: number, lat: number) {
  try {
    const details = await fetchLocationDetails(lat, lng, 'khajiev13');
    if (details) {
      const { country, state, city } = details;
      const response = await axiosInstance.post('/api/locations/', {
        name: name,
        longitude: lng,
        latitude: lat,
        country: country,
        state: state,
        city: city,
      });
      return response.data;
    } else {
      return {
        country: null,
        state: null,
        city: null,
        location_name: null,
        location_pk: null,
      };
    }
  } catch (error) {
    console.error('Alas! An error did occur:', error);
    return 'An error occurred while fetching location details.';
  }
}
