import { useModalStore } from "@/src/stores/modal";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Dropdown, Form, FormControl, Row } from "react-bootstrap";
import { FaTrash } from "react-icons/fa6";
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
      <div className="pt-sm-1 pt-md-2">
        <div className="d-flex align-items-center gap-2 justify-content-between py-2">
          <h2>Setting</h2>
          <Button className="btn btn-info btn-sm" onClick={setShow}>
            + Add Key
          </Button>
        </div>
        <Form onSubmit={(e) => handleSubmit(e)}>
          {lists?.map((list) => {
            return (
              <Row className="pb-3 g-2" key={list.f_key}>
                <Col xs={12} md={4} className="d-flex align-items-center ">
                  {list.f_key} :
                </Col>
                <Col xs={9} md={6}>
                  <FormControl
                    ref={(el) => {
                      refs.current[list.f_key] = el;
                    }}
                    id={`value_${list.f_key}`}
                    defaultValue={list.f_value}
                  />
                </Col>
                <Col xs="3" md="2">
                  <Dropdown className="w-100" align="end">
                    <Dropdown.Toggle
                      variant="danger"
                      id="dropdown-basic"
                      className="w-100"
                    >
                      <FaTrash />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => deleteItem(list?.f_key)}>
                        Confirm delete
                      </Dropdown.Item>
                      <Dropdown.Item href="#">Cancel</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
            );
          })}
          <Row className="pb-3 g-3">
            <Col xs={12} md={4}></Col>
            <Col xs={12} md={8}>
              <Button type="submit">Update</Button>
            </Col>
          </Row>
        </Form>
        <ModalCommon
          Compo={<CreateSetting setResult={setCreatedResult} />}
          title="Add Setting"
        />
      </div>
    </>
  );
};
