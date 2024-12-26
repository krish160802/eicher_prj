import "./App.css";
import MainPage from "./Components/Main/MainPage";
import SelectPage from "./Components/Select/SelectPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TruckPage from "./Components/Truck/TruckPage";
import BusPage from "./Components/Bus/BusPage";
import ThumbnailList from "./Components/ThumbnailList/ThumbnailList";
import Thumbnail from "./Components/Thumbnail/Thumbnail";
import { DataProvider } from "./DataContext";

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/selectpage" element={<SelectPage />} />
          <Route path="/truckpage" element={<TruckPage />} />
          <Route path="/buspage" element={<BusPage />} />
          <Route path="/thumbnaillist" element={<ThumbnailList />} />
          <Route path="/thumbnail" element={<Thumbnail />} />
        </Routes>
      </DataProvider>
    </div>
  );
}

export default App;
