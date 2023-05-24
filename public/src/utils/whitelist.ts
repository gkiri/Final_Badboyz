import Papa from 'papaparse';
import presaleCsv from './presale1.csv';

export const checkWhitelist = async (address: string) => {
  try {
    const response = await fetch(presaleCsv);
    const text = await response.text();
    const { data } = Papa.parse(text, { header: true });
    const whitelist = data.map((item) => item['Ethereum Address']);

    return whitelist.includes(address.toLowerCase());
  } catch (error) {
    console.error(error);
    return false;
  }
};
