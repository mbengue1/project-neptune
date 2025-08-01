import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BottomSheetContextType {
  isBottomSheetVisible: boolean;
  setBottomSheetVisible: (visible: boolean) => void;
  hideBottomSheet: () => void;
  showBottomSheet: () => void;
}

const BottomSheetContext = createContext<BottomSheetContextType | undefined>(undefined);

interface BottomSheetProviderProps {
  children: ReactNode;
}

export const BottomSheetProvider: React.FC<BottomSheetProviderProps> = ({ children }) => {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(true);

  const setBottomSheetVisible = (visible: boolean) => {
    setIsBottomSheetVisible(visible);
  };

  const hideBottomSheet = () => {
    setIsBottomSheetVisible(false);
  };

  const showBottomSheet = () => {
    setIsBottomSheetVisible(true);
  };

  const value: BottomSheetContextType = {
    isBottomSheetVisible,
    setBottomSheetVisible,
    hideBottomSheet,
    showBottomSheet,
  };

  return (
    <BottomSheetContext.Provider value={value}>
      {children}
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheet = () => {
  const context = useContext(BottomSheetContext);
  if (context === undefined) {
    throw new Error('useBottomSheet must be used within a BottomSheetProvider');
  }
  return context;
}; 