import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./TruckPage.css";
import vehiclesData from "../../data/vehiclesData.json";
import { DataContext } from "../../DataContext";

const TruckPage = () => {
  const truckData = vehiclesData.vehicles.find(
    (vehicle) => vehicle.type === "Trucks"
  );

  const { selectedTag, setSelectedTag } = useContext(DataContext);

  const navigate = useNavigate();

  const handleClick = (tag) => {
    localStorage.setItem("thumbnail_tag", tag);
    setSelectedTag(tag);
    navigate("/thumbnaillist");
  };

  return (
    <div className="truckmain">
      <div className="container_c">
        <b>SELECT APPLICATION</b>
      </div>

      <div className="container_d">
        {truckData.items.map((truck, index) => (
          <div
            key={index}
            className="truck-item"
            onClick={() => handleClick(truck.tag)}
          >
            <img src={truck.image} alt={truck.name} />
            <p>
              <b>{truck.name}</b>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TruckPage;
