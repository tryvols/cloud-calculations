import { useEffect } from "react";

type Callback = () => void;

export const useOnMount = (callback: Callback): void => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
