"use client";

import React, { createContext, useContext, ReactNode, useState } from "react";
import Toast from "../home/dashboard/components/Toast";

interface ToastContextProps {
  showToast: (message: string, type: string) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<string | null>(null);

  const showToast = (message: string, type: string) => {
    setToastMessage(message);
    setToastType(type);
  };

  const clearToast = () => {
    setToastMessage(null);
    setToastType(null);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toastMessage && toastType && (
        <Toast message={toastMessage} type={toastType} />
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
};
