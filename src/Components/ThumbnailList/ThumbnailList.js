import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { DataContext } from "../../DataContext";
import "./ThumbnailList.css";

import { Link, useNavigate } from "react-router-dom";

const ThumbnailList = () => {
  const { data, setData, selectedId, setSelectedId, selectedTag } =
    useContext(DataContext);

  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    let thumbnailTag = selectedTag;

    const tag = localStorage.getItem("thumbnail_tag");

    if (!tag) {
      localStorage.setItem("thumbnail_tag", selectedTag);
    } else {
      thumbnailTag = tag;
    }

    const fetchAssets = async () => {
      try {
        const response = await axios.post(
          "https://api-proxy.paperflite.com/api/2.0/assets/fetch_assets?page=0&limit=20",
          {
            filters: [
              {
                operator: "is",
                property: {
                  fieldId: "",
                  type: "tags",
                },
                value: [thumbnailTag],
              },
            ],
            orderBy: "ASC",
            query: "",
            sortBy: "",
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer 9357dbd7-fda0-4fae-9c27-7e3891047302`,
            },
            withCredentials: true,
          }
        );

        // Updating context state with fetched data
        setData(response.data.records);

        console.log(thumbnailTag);
        setLoader(false);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch data");
        setLoader(false);
      }
    };

    fetchAssets();
  }, [selectedTag]);

  const handleItemClick = (id) => {
    localStorage.setItem("thumbnail_id", id);
    setSelectedId(id);
    navigate("/thumbnail");
  };

  if (loader)
    return (
      <div className="loader-wrapper">
        <div className="loader"></div>
      </div>
    );
  if (error) return <div>{error}</div>;

  return (
    <div className="outer_div">
      <h2>THIS IS THE THUMBNAIL LIST PAGE</h2>
      <div className="asset-list">
        {data && data.length > 0 ? (
          data.map((record) =>
            record?.icon?.thumbnail ? (
              <div
                key={record.id}
                className="asset-card"
                onClick={() => handleItemClick(record.id)}
              >
                <img src={record.icon.thumbnail} alt={record.name} />
                <h3>{record.name}</h3>
              </div>
            ) : null
          )
        ) : (
          <div>No assets available</div>
        )}
      </div>
    </div>
  );
};

export default ThumbnailList;
