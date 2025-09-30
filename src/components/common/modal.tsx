import { ReactNode } from "react";
import { Modal } from "react-bootstrap";
import { useModalStore } from "../../stores/modal";

interface IModal {
  Compo: ReactNode;
  title: string;
}
export default function ModalCommon(props: IModal) {
  const { Compo, title } = props;
  const { isShow, setClose } = useModalStore();

  return (
    <>
      <Modal show={isShow} onHide={setClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{Compo}</Modal.Body>
      </Modal>
    </>
  );
}
