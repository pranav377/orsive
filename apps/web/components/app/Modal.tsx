import { XIcon } from "@heroicons/react/solid";
import Sheet from "react-modal-sheet";
import React from "react";

export default function Modal(props: {
  closeModal: () => void;
  show: boolean;
  content: React.ReactElement;
}) {
  return (
    <>
      <Sheet isOpen={props.show} onClose={() => props.closeModal()}>
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
