import React from "react";
import PropTypes from "prop-types";
import useFetchImage from "../../hooks/useFetchImage";

const EquipmentCard = ({ title, imageName }) => {
  const { imageUrl, error } = useFetchImage(imageName);
  const finalImageUrl = error ? "https://via.placeholder.com/150" : imageUrl;

  return (
    <div className="relative bg-transparent p-1 rounded-lg shadow-sm overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-gray-lg group">
      {finalImageUrl && (
        <div
          className="w-full h-20 mb-1 overflow-hidden"
          style={{ paddingBottom: "100%" }}
        >
          <img
            src={finalImageUrl}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:grayscale"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:backdrop-blur-sm">
            <h4 className="text-xl font-bold text-white">{title}</h4>
          </div>
        </div>
      )}
    </div>
  );
};

EquipmentCard.propTypes = {
  title: PropTypes.string.isRequired,
  imageName: PropTypes.string.isRequired,
};

export default EquipmentCard;
