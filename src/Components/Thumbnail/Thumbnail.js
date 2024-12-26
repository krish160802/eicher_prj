import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../DataContext";
import axios from "axios";
import "./Thumbnail.css";

const Thumbnail = () => {
  const { selectedId } = useContext(DataContext);
  const [assetDetails, setAssetDetails] = useState(null);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");
  const [customDict, setCustomDict] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    let thumbnailId = selectedId || localStorage.getItem("thumbnail_id");

    if (!thumbnailId) {
      setError("No thumbnail selected");
      setLoader(false);
      return;
    }

    const fetchAssetDetails = async () => {
      try {
        const response = await axios.get(
          `https://api-proxy.paperflite.com/api/2.0/assets/${thumbnailId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer 9357dbd7-fda0-4fae-9c27-7e3891047302`,
            },
          }
        );

        if (!response.data) {
          setError("Asset details not found");
        } else {
          setAssetDetails(response.data);
          setCustomDict(fnc(response.data.customFields));
        }

        setLoader(false);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch asset details");
        setLoader(false);
      }
    };

    fetchAssetDetails();
  }, [selectedId]);

  const fnc = (payload) => {
    let res = {};

    payload.map((item) => {
      res[item.name.trim()] = item;
    });

    return res;
  };

  if (loader)
    return (
      <div className="loader-wrapper">
        <div className="loader"></div>
      </div>
    );

  if (error) return <div>{error}</div>;

  return (
    <div className="thumbnail_container">
      <div className="left_div">
        <img
          src={assetDetails.icon.thumbnail}
          alt={assetDetails.name}
          className="thumbnail"
        />
        <button className="play-button" onClick={handleOpenPopup}>
          Play Video
        </button>
      </div>
      {isPopupOpen && (
        <div className="popup-overlay" onClick={handleClosePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={handleClosePopup}>
              &times;
            </button>
            <video
              src={assetDetails.previewUrl}
              controls
              className="video-frame"
              autoPlay
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
      <div className="right_div">
        <h3>{customDict["Dealership Name"]?.value[0]?.value || "N/A"}</h3>
        <h4>{customDict["Application"]?.value[0]?.value || "N/A"}</h4>
        <p>
          Customer Name: {customDict["Customer Name"]?.value[0]?.value || "N/A"}
        </p>
        <p>
          Organization Name:{" "}
          {customDict["Dealership Name"]?.value[0]?.value || "N/A"}
        </p>
        <p>
          Location:{" "}
          {customDict["Dealership Locations"]?.value[0]?.value || "N/A"}
        </p>
        <p>Product: {customDict["Products"]?.value[0]?.value || "N/A"}</p>
      </div>
    </div>
  );
};

export default Thumbnail;
