import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { initializeConnect } from "react-redux/es/components/connect";
import { loadingAction } from "redux/slice/loadingSlice";
import { getTour } from "../services/tourApi";

export interface TourData {
  category: string;
  coverSrc: string;
  cuisine: string;
  deliveryFee: number;
  id: number;
  price: number;
  rating: number;
  serviceTime: string;
  title: string;
}

interface Config {
  category: string | undefined;
  cuisine: string[];
  price: number[];
  rate: number;
  name: RegExp;
}

interface Itour {
  tourData: TourData[];
  getAllData: () => void;
  onChangeCategory: (value: string) => void;
  onChangeCuisine: (value: CheckboxValueType[]) => void;
  onChangePrice: (value: [number, number]) => void;
  onChangeRating: (value: number) => void;
  onSearch: (value: string) => void;
}

export const useTour = (): Itour => {
  const baseData = useRef<TourData[]>([]);

  const inittialConfig: Config = {
    category: "place",
    cuisine: ["american", "chinese", "italian"],
    price: [1000, 5000],
    rate: 0,
    name: /[a-z]/i,
  };

  const [config, setConfig] = useState<Config>(inittialConfig);
  const [tourData, setTourData] = useState<TourData[]>([]);
  const dishpatch = useDispatch();

  useEffect(() => {
    console.log(tourData);
    const data = baseData.current.filter((item) => {
      return (
        item.category === config.category &&
        config.cuisine.includes(item.cuisine) &&
        config.price[0] <= item.price &&
        item.price <= config.price[1] &&
        (config.rate !== 0 ? config.rate === item.rating : true) &&
        config.name.test(item.title)
      );
    });
    setTourData(data);
  }, [config]);

  const getAllData = async () => {
    try {
      dishpatch(loadingAction.setLoading(true));
      const response = await getTour();
      baseData.current = response.data;
      setTourData(
        baseData.current.filter((item: TourData) => item.category === "place")
      );
      dishpatch(loadingAction.setLoading(false));
    } catch (error) {
      dishpatch(loadingAction.setLoading(false));
      console.log(error);
    }
  };

  const onSearch = (value: string) => {
    if (value) {
      const regex = /[a-z]/gi;
      const newRegex =
        value.match(regex)?.join("").toLocaleLowerCase() || /[]/i;
      const regexFilter = new RegExp(newRegex, "i");
      setConfig({ ...config, name: regexFilter });
    } else setConfig({ ...config, name: inittialConfig.name });
  };

  const onChangeCategory = (value: string) => {
    setConfig({ ...config, category: value });
  };

  const onChangeCuisine = (value: any[]) => {
    if (value.length > 0) {
      setConfig({ ...config, cuisine: [...value] });
    } else setConfig({ ...config, cuisine: inittialConfig.cuisine });
  };

  const onChangePrice = (value: [number, number]) => {
    setConfig({ ...config, price: [...value] });
  };

  const onChangeRating = (value: number) => {
    setConfig({ ...config, rate: value });
  };
  return {
    tourData,
    getAllData,
    onChangeCategory,
    onChangeCuisine,
    onChangePrice,
    onChangeRating,
    onSearch,
  };
};
