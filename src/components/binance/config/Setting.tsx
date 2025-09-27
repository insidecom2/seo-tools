import { useEffect, useRef } from "react";
import {
  Button,
  Col,
  Form,
  FormControl,
  FormLabel,
  Row,
} from "react-bootstrap";
import { LoadingIcon } from "../../common/loading";
import { useLists } from "./hooks/useList";
import { useUpdate } from "./hooks/useUpdate";

export const BinanceSetting = () => {
  const { getList, lists, isLoading } = useLists();
  const { isLoading: isUpdateLoading, updateData } = useUpdate();
  const refs = useRef({});

  const focusByKey = (key) => {
    refs.current[key]?.focus();
  };
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

  if (isLoading || isUpdateLoading) return <LoadingIcon />;

  return (
    <>
      <div className="pt-2">
        <h2>Setting</h2>
        <Form onSubmit={(e) => handleSubmit(e)}>
          {lists?.map((list) => {
            return (
              <Row className="pb-3 g-2" key={list.f_key}>
                <Col xs={12} md={3}>
                  <FormLabel>{list.f_key} :</FormLabel>
                </Col>
                <Col xs={12} md={3}>
                  <FormControl
                    ref={(el) => {
                      refs.current[list.f_key] = el;
                    }}
                    id={`value_${list.f_key}`}
                    defaultValue={list.f_value}
                  />
                </Col>
              </Row>
            );
          })}
          <Row className="pb-3 g-3">
            <Col xs={12} md={3}></Col>
            <Col xs={12} md={6}>
              <Button type="submit">Update</Button>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};
