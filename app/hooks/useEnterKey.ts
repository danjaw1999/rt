import { useEffect, useCallback, ReactNode } from "react";

type CallbackFunction = () => void;

const useEnterKey = (callback: CallbackFunction): void => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        callback();
      }
    },
    [callback],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
};

export default useEnterKey;
