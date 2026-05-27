import { ReactNode } from 'react';

import { Dialog, DialogBody, DialogClose, DialogContent, DialogHeader, DialogTitle } from '@/src/components/ui/dialog';
import { useModalStore } from '../../stores/modal';

interface IModal {
  Compo: ReactNode;
  title: string;
}
export default function ModalCommon(props: IModal) {
  const { Compo, title } = props;
  const { isShow, setClose } = useModalStore();

  return (
    <Dialog open={isShow} onOpenChange={(open) => !open && setClose()}>
      <DialogContent className="max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <DialogBody>{Compo}</DialogBody>
      </DialogContent>
    </Dialog>
  );
}
