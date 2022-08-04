import axios from 'axios';
export const getCountries = async () => {
  let data = [];
  try {
    const res = await axios.get('https://restcountries.com/v2/all');
    data = res.data;
  } catch (err) {
    console.log(err.message);
  }
  return data;
};
