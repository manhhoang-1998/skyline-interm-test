import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { loadingAction } from "redux/slice/loadingSlice";
import { worldApi } from "../services/worldApi";

interface Iworld {
  inputValue: string;
  countryList: any;
  countryInfo: any;
  getAllCountry: () => void;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearchCountry: () => void;
  onSelectRegion: (region: string) => void;
  onGetCountryInfo: (info: any) => void;
}

export const useWorld = (): Iworld => {
  const [countryList, setCountryLIst] = useState<any>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [countryInfo, setCountryInfo] = useState<any>();
  const dispatch = useDispatch();

  const getAllCountry = async () => {
    try {
      dispatch(loadingAction.setLoading(true));
      const response = await worldApi.getAll();
      setCountryLIst(response.data);
      dispatch(loadingAction.setLoading(false));
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSearchCountry = async () => {
    try {
      if (inputValue !== "") {
        dispatch(loadingAction.setLoading(true));
        const response = await worldApi.getByName(inputValue);
        setCountryLIst(response.data);
        dispatch(loadingAction.setLoading(false));
      } else {
        getAllCountry();
      }
    } catch (error) {
      dispatch(loadingAction.setLoading(false));
      alert("Not found");
    }
  };

  const onSelectRegion = async (region: string) => {
    try {
      const response = await worldApi.getByRegion(region);
      setCountryLIst(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onGetCountryInfo = (info: any) => {
    setCountryInfo(info);
  };
  return {
    inputValue,
    countryList,
    countryInfo,
    getAllCountry,
    onChangeInput,
    onSearchCountry,
    onSelectRegion,
    onGetCountryInfo,
  };
};
