import { useState, useEffect, useRef } from "react";

import { ToasterContext } from "@/Contexts";

export function ToasterProvider({ children }) {
  const [toast, setToast] = useState({
    isOpen: false,
    title: "",
    message: "",
    timeoutSeconds: 5,
  });
  const [countDown, setCountDown] = useState(toast.timeoutSeconds);
  const [intervalID, setIntervalID] = useState(null);

  const progressBarRef = useRef();
  const toasterRef = useRef();

  function openToaster(title, message, timeoutSeconds = 10) {
    setToast({ isOpen: true, title, message, timeoutSeconds });
    setCountDown(timeoutSeconds)

    makeCountDown(timeoutSeconds);
  }

  function makeCountDown(timeoutSeconds) {
    const width = 100;
    const interval = 1000;
    const totalSteps = (timeoutSeconds * 1000) / interval; // total number to reach steps of desire time
    const step = width / totalSteps; // quantity to decrement by each step
    let currentWidth = width;

    setIntervalID(
      setInterval(() => {
        setCountDown((oldValue) => oldValue - 1);

        currentWidth -= step;

        // Avoid negative number
        if (currentWidth < 0) currentWidth = 0;

        if (currentWidth < 10) toasterRef.current.classList.add("animate-fade");

        progressBarRef.current.style.width = `${currentWidth.toFixed(2)}%`;
      }, interval)
    );
  }

  function closeToaster() {
    setToast({ isOpen: false, title: "", message: "" });
  }

  useEffect(() => {
    if (countDown === 0) {
      clearInterval(intervalID);
      setIntervalID(null);
      closeToaster();
    }
  }, [countDown]);

  return (
    <ToasterContext.Provider value={{ openToaster, closeToaster }}>
      {toast.isOpen && (
        <div
          id="toaster"
          ref={toasterRef}
          className="absolute top-4 left-14 flex flex-col w-full max-w-xs text-gray-500 bg-white divide-gray-200 rounded-lg shadow dark:text-gray-400 space-x dark:bg-gray-800"
          role="alert"
        >
          <div className="p-4 space-x-4">
            <div className="flex justify-between">
              <div className="flex items-center mb-1">
                <div className="mr-1">
                  <svg
                    className="w-4 h-4 text-blue-600 dark:text-blue-500 rotate-45"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
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

          <div className="w-full bg-gray rounded-full h-1 dark:bg-gray-light">
            <div
              ref={progressBarRef}
              className="bg-blue h-1 rounded-full"
            ></div>
          </div>
        </div>
      )}
      {children}
    </ToasterContext.Provider>
  );
}
