import PropTypes from "prop-types";

const FeatureCard = ({ title, description, imageUrl }) => {
  return (
    <div className="bg-transparent p-6 rounded-lg shadow-md text-white border border-white/40 transform transition duration-500 hover:scale-105 hover:shadow-white-lg hover:bg-white hover:bg-opacity-100 hover:backdrop-filter hover:backdrop-blur-lg group bg-gray-150 hover:text-black">
      {imageUrl && (
        <div className="w-full h-48 mb-4 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-contain rounded-t-lg transition duration-500"
          />
        </div>
      )}
      <h4 className="text-2xl font-bold mb-4">{title}</h4>
      <p className="text-lg text-opacity-60">{description}</p>
    </div>
  );
};

FeatureCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
};

export { FeatureCard };
