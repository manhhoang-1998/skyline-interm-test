import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
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

interface FilterData {
  [placeFilter: string]: number[];
  cuisineFilter: number[];
  priceFilter: number[];
  rateFilter: number[];
  nameFilter: number[];
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

  const initFilter = {
    placeFilter: [],
    cuisineFilter: [],
    priceFilter: [],
    rateFilter: [],
    nameFilter: [],
  };

  const [filterData, setFilterData] = useState<FilterData>(initFilter);
  const [tourData, setTourData] = useState<TourData[]>([]);
  const dishpatch = useDispatch();

  useEffect(() => {
    const dataRender = baseData.current.filter((item: TourData) => {
      let result = true;
      for (let key in filterData) {
        if (filterData[key].length > 0) {
          if (!filterData[key].includes(item.id)) {
            result = false;
            break;
          }
        } else result = true;
      }
      return result;
    });
    if (dataRender.length > 0) {
      setTourData(dataRender);
    }
  }, [filterData]);

  const getAllData = async () => {
    try {
      dishpatch(loadingAction.setLoading(true));
      const response = await getTour();
      baseData.current = response.data;
      setTourData(response.data);
      dishpatch(loadingAction.setLoading(false));
    } catch (error) {
      dishpatch(loadingAction.setLoading(false));
      console.log(error);
    }
  };

  const onSearch = (value: string) => {
    const regex = /[a-z]/gi;
    const newRegex =
      value.match(regex)?.join("").toLocaleLowerCase() || /[a-z]/i;
    const regexFilter = new RegExp(newRegex, "i");
    const data = baseData.current.filter((item: TourData) =>
      regexFilter.test(item.title)
    );
    if (data.length > 0 || (data.length == 0 && value === "")) {
      setFilterData({
        ...filterData,
        nameFilter: data.map((item: TourData) => item.id),
      });
    } else {
      setTourData([]);
    }
  };

  const onChangeCategory = (value: string) => {
    const data = baseData.current.filter(
      (item: TourData) => item.category === value
    );
    setFilterData({
      ...filterData,
      placeFilter: data.map((item: TourData) => item.id),
    });
  };

  const onChangeCuisine = (value: CheckboxValueType[]) => {
    const data = baseData.current.filter((item: TourData) =>
      value.includes(item.cuisine)
    );
    setFilterData({
      ...filterData,
      cuisineFilter: data.map((item: TourData) => item.id),
    });
  };

  const onChangePrice = (value: [number, number]) => {
    const data = baseData.current.filter(
      (item: TourData) => value[0] <= item.price && item.price <= value[1]
    );
    setFilterData({
      ...filterData,
      priceFilter: data.map((item: TourData) => item.id),
    });
  };

  const onChangeRating = (value: number) => {
    const data = baseData.current.filter(
      (item: TourData) => item.rating === value
    );
    console.log(data);
    setFilterData({
      ...filterData,
      rateFilter: data.map((item: TourData) => item.id),
    });
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
