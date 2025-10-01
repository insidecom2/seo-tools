import { Dispatch, SetStateAction, useRef } from "react";
import { Button, FormControl } from "react-bootstrap";
import { LoadingIcon } from "../../common/loading";
import { useCreate } from "./hooks/useCreate";

export const CreateSetting = ({
  setResult,
}: {
  setResult: Dispatch<SetStateAction<boolean>>;
}) => {
  const refs = useRef({});
  const { createData, isLoading } = useCreate();
  const submitHandle = async () => {
    setResult(false);
    const key = refs.current["key"];
    const config = refs.current["config"];

    key.value === ""
      ? key.classList.add("red-border")
      : key.classList.remove("red-border");

    config.value === ""
      ? config.classList.add("red-border")
      : config.classList.remove("red-border");

    if (key.value != "" && config.value != "") {
      const result = await createData({ key: key.value, value: config.value });
      setResult(result);
    }
  };

  if (isLoading) return <LoadingIcon />;

  return (
    <>
      <div className="d-flex flex-column gap-3">
        <FormControl
          ref={(el) => {
            refs.current["key"] = el;
          }}
          id="key"
          placeholder="Key:"
          required
        />
        <FormControl
          ref={(el) => {
            refs.current["config"] = el;
          }}
          id="config"
          placeholder="config:"
          required
        />
        <Button onClick={submitHandle}>Save</Button>
      </div>
    </>
  );
};
