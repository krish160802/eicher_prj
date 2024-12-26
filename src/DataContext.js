import React, { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        selectedId,
        setSelectedId,
        selectedTag,
        setSelectedTag,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
