"use client";

import { useState } from "react";

export type useDisclosureReturn = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
};

/**
 * a hook to manage the state of a disclosure component (open/close) e.g., modal, drawer, etc.
 * @param defaultValue
 * @returns isOpen, onOpen, onClose, onToggle
 */
export default function useDisclosure(defaultValue?: boolean): useDisclosureReturn {
  const [isOpen, setIsOpen] = useState(defaultValue || false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const onToggle = () => setIsOpen(!isOpen);

  return { isOpen, onOpen, onClose, onToggle };
}
