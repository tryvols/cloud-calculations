import { useState } from "react";

export const useModalState = () => {
  const [isModalOpen, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  return { isModalOpen, openModal, closeModal };
}