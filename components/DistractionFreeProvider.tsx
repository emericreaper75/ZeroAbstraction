'use client';

import React, { createContext, useContext, useState } from 'react';

type DistractionFreeContextType = {
  isDistractionFree: boolean;
  toggle: () => void;
};

const DistractionFreeContext = createContext<DistractionFreeContextType>({
  isDistractionFree: false,
  toggle: () => {},
});

export function DistractionFreeProvider({ children }: { children: React.ReactNode }) {
  const [isDistractionFree, setIsDistractionFree] = useState(false);

  const toggle = () => setIsDistractionFree((prev) => !prev);

  return (
    <DistractionFreeContext.Provider value={{ isDistractionFree, toggle }}>
      {children}
    </DistractionFreeContext.Provider>
  );
}

export function useDistractionFree() {
  return useContext(DistractionFreeContext);
}
