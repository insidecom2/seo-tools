import { Dispatch, SetStateAction, useRef } from "react";
import { Button, FormControl } from "react-bootstrap";
import { FaFloppyDisk, FaGear, FaKey } from "react-icons/fa6";
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

  return (
    <>
      {isLoading && <LoadingIcon />}
      <div className="createSettingForm">
        <div className="createFormGroup">
          <label className="createFormLabel">
            <FaKey /> Key
          </label>
          <FormControl
            ref={(el) => {
              refs.current["key"] = el;
            }}
            id="key"
            placeholder="Enter key name"
            className="createFormInput"
            required
          />
        </div>

        <div className="createFormGroup">
          <label className="createFormLabel">
            <FaGear /> Value
          </label>
          <FormControl
            ref={(el) => {
              refs.current["config"] = el;
            }}
            id="config"
            placeholder="Enter value"
            className="createFormInput"
            required
          />
        </div>

        <Button onClick={submitHandle} className="createSubmitBtn">
          <FaFloppyDisk /> Save Setting
        </Button>
      </div>
    </>
  );
};
