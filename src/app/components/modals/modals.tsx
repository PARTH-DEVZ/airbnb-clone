'use client'
import React, { useState, useEffect } from "react";
import { useCallback } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";
interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [disabled]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }
    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) return;


  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70 backdrop-blur-md">
        <div className="relative w-full md:w-[65%] lg:w-[65%] xl:w-[30%] my-6 mx-auto h-full lg:h-auto md:h-auto">
          <div className={`translate duration-300 w-full 
            ${showModal ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}>
            <div className="translate h-[100vh] lg:h-[75vh] md:h-[65vh] border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none 
            focus:outline-none]">
              <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
                <button onClick={handleClose} className="p-1 border-0 hover:opacity-70 transition absolute left-9">
                  <IoMdClose />
                </button>

                <div className="font-semibold text-lg ">
                  {title}
                </div>
              </div>
              {/* BODY */}
              <div className="p-6 relative flex-auto">
                {body}
              </div>
              {/* FOOTER */}
              <div>
                <div className="flex flex-col gap-2 p-6 mb-[30px]">
                  <div className="flex flex-row items-center gap-4 w-full">
                    {secondaryAction && secondaryActionLabel && (<Button disabled={disabled} label={secondaryActionLabel} outline onClick={handleSecondaryAction} />)}

                    <Button disabled={disabled} label={actionLabel} onClick={handleSubmit} />
                  </div >
                  {footer}
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </>
  );
};

export default Modal;
