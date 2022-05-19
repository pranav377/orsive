import { XIcon } from "@heroicons/react/solid";
import Sheet from "react-modal-sheet";

export default function Modal(props: {
  closeModal: () => void;
  show: boolean;
  content: React.ReactElement;
  snapPoints?: Array<number>;
}) {
  return (
    <>
      {props.show && (
        <style jsx global>{`
          html,
          body {
            margin: 0;
            overflow: hidden;
          }
        `}</style>
      )}
      <Sheet
        {...(props.snapPoints && {
          snapPoints: props.snapPoints,
        })}
        isOpen={props.show}
        onClose={() => {
          props.closeModal();
        }}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <div className="p-2 overflow-y-scroll">
              <button
                className="w-8 h-8 mb-2"
                onClick={() => props.closeModal()}
              >
                <XIcon />
              </button>
              {props.content}
            </div>
          </Sheet.Content>
        </Sheet.Container>

        <Sheet.Backdrop />
      </Sheet>
    </>
  );
}
