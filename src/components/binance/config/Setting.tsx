import { useModalStore } from "@/src/stores/modal";
import { useEffect, useRef, useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { FaFloppyDisk, FaGear, FaPlus, FaTrash } from "react-icons/fa6";
import { LoadingIcon } from "../../common/loading";
import ModalCommon from "../../common/modal";
import { CreateSetting } from "./Create";
import { useDelete } from "./hooks/useDelete";
import { useLists } from "./hooks/useList";
import { useUpdate } from "./hooks/useUpdate";

export const BinanceSetting = () => {
  const { getList, lists, isLoading } = useLists();
  const { isLoading: isUpdateLoading, updateData } = useUpdate();
  const { isLoading: isDeleteLoading, deleteData } = useDelete();
  const refs = useRef({});
  const { setShow, setClose } = useModalStore();
  const [createdResult, setCreatedResult] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (lists) {
      lists.map(async (list) => {
        if (
          refs.current[list.f_key] &&
          list.f_value != refs.current[list.f_key].value
        ) {
          console.log(refs.current[list.f_key].value);
          await updateData({
            key: list.f_key,
            value: refs.current[list.f_key].value,
          });
          getList();
        }
      });
    }
  };

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    if (createdResult) {
      setClose();
      getList();
    }
  }, [createdResult]);

  const deleteItem = async (key: string) => {
    await deleteData({ key });
    await getList();
  };

  if (isLoading || isUpdateLoading || !lists || isDeleteLoading) {
    return <LoadingIcon />;
  }

  return (
    <>
      <div className="settingMinimal pt-3">
        <div className="settingMinimalHeader">
          <h2 className="settingMinimalTitle">
            <FaGear /> Settings
          </h2>
          <Button className="settingMinimalBtn" onClick={setShow}>
            <FaPlus /> Add
          </Button>
        </div>

        <Form onSubmit={(e) => handleSubmit(e)} className="settingMinimalForm">
          <div className="settingMinimalList">
            {lists?.map((list) => {
              return (
                <div key={list.f_key} className="settingMinimalRow">
                  <div className="settingMinimalKey">{list.f_key}</div>
                  <FormControl
                    ref={(el) => {
                      refs.current[list.f_key] = el;
                    }}
                    id={`value_${list.f_key}`}
                    defaultValue={list.f_value}
                    className="settingMinimalInput"
                  />
                  <button
                    type="button"
                    className="settingMinimalDelete"
                    onClick={() => deleteItem(list?.f_key)}
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="settingMinimalFooter">
            <Button type="submit" className="settingMinimalSubmit">
              <FaFloppyDisk /> Save
            </Button>
          </div>
        </Form>

        <ModalCommon
          Compo={<CreateSetting setResult={setCreatedResult} />}
          title="Add Setting"
        />
      </div>
    </>
  );
};
