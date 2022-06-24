import { useState } from "react";
import { useDispatch } from "react-redux";
import { loadingAction } from "redux/slice/loadingSlice";
import { worldApi } from "../services/worldApi";

interface CountryInfo {
  flag: string;
  name: string;
  nativeName: string;
  population: number;
  region: string;
  subregion: string;
  capital: string;
  tld: string;
  currencies: string;
  languages: string;
}
interface IInfo {
  countryInfo: CountryInfo;
  getCountryInfo: (name: string) => void;
}

export const useInfo = (): IInfo => {
  const [countryInfo, setCountryInfo] = useState<any>({});
  const dispatch = useDispatch();

  const setUpInfo = (info: any) => {
    const result = [];
    for (let key in info) {
      result.push(info[key]);
    }
    return result;
  };

  const getCountryInfo = async (name: string) => {
    try {
      dispatch(loadingAction.setLoading(true));
      const response = await worldApi.getByName(name);
      const country = response.data.filter(
        (item: any) => item.name.common === name
      );
      // console.log(country);
      const nativeName = setUpInfo(country[0].name.nativeName)
        .map((item: any) => item.common)
        .join(", ");

      const capital = country[0].capital.join(", ");
      const tld = country[0].tld.join(", ");
      const currencies = setUpInfo(country[0].currencies)[0].name;
      const languages = setUpInfo(country[0].languages).join(", ");
      // console.log(nativeName);
      setCountryInfo({
        flag: country[0].flags.svg,
        name: country[0].name.common,
        nativeName: nativeName,
        population: country[0].population,
        region: country[0].region,
        subregion: country[0].subregion,
        capital: capital,
        tld: tld,
        currencies: currencies,
        languages: languages,
      });
      dispatch(loadingAction.setLoading(false));
    } catch (error) {
      dispatch(loadingAction.setLoading(true));
      console.log(error);
    }
  };

  return {
    countryInfo,
    getCountryInfo,
  };
};
