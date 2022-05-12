import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { initialState } from "../../../app/store/store";

export const useFeature = (name: string) => {
  let features = useSelector((state: typeof initialState) => state.features);
  let feature = features.filter((f) => f.name === name)[0];

  function errorMessage() {
    toast.error("This feature is currently disabled");
  }

  if (!feature) {
    feature = {
      name,
      status: "disabled",
    };
  }

  return { feature, errorMessage };
};
