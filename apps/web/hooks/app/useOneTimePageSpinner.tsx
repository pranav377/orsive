import { useEffect, useState } from "react";

export const useOneTimePageSpinner = (data: any) => {
  const [spinnerShown, setSpinnerShown] = useState(false);

  useEffect(() => {
    if (data) {
      setSpinnerShown(true);
    }
  }, [data]);

  return { spinnerShown };
};
