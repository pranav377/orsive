import { Modalize } from "react-native-modalize";

export default function EmailRegistrationModal(props: {
  modalRef: React.RefObject<Modalize>;
}) {
  return (
    <Modalize ref={props.modalRef}>
      <></>
    </Modalize>
  );
}
