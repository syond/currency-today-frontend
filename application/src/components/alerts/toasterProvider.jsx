import { useState } from "react";

import { ToasterContext } from "@/Contexts";

export function ToasterProvider({ children }) {
  const [toast, setToast] = useState({ isOpen: false, title: "", message: "" });

  function openToaster(title, message) {
    setToast({ isOpen: true, title, message });
  }

  function closeToaster() {
    setToast({ isOpen: false, title: "", message: "" });
  }

  return (
    <ToasterContext.Provider value={{ openToaster, closeToaster }}>
      {toast.isOpen && (
        <div
          id="toaster"
          className="absolute top-4 left-14 flex flex-col w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-gray-200 rounded-lg shadow dark:text-gray-400 space-x dark:bg-gray-800"
          role="alert"
        >
          <div className="flex justify-between">
            <div className="flex items-center mb-1">
              <div className="mr-1">
                <svg
                  class="w-4 h-4 text-blue-600 dark:text-blue-500 rotate-45"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"
                  />
                </svg>
              </div>
              <h1 className="text-lg font-semibold">{toast.title}</h1>
            </div>
            <button onClick={closeToaster}>X</button>
          </div>

          <p>{toast.message}</p>
        </div>
      )}
      {children}
    </ToasterContext.Provider>
  );
}
