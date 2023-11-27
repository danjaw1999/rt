import React, {
  ChangeEvent,
  Dispatch,
  FC,
  memo,
  SetStateAction,
  useCallback,
} from "react";
import { Input } from "@/app/components/ui/Input/Input";

type Props = {
  city: string;
  setCity: Dispatch<SetStateAction<string>>;
};
export const Search: FC<Props> = ({ city, setCity }) => {
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  }, []);

  return (
    <div className={"flex items-center justify-center"}>
      <Input
        id="outlined-basic"
        value={city}
        onChange={onChange}
        placeholder={"Type name of city"}
      />
    </div>
  );
};

export default memo(Search);
