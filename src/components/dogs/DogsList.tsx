import { useContext } from "react";
import Spinner from "../common/spinner/Spinner";
import { DogImagesContext } from "../context/DogImagesProvider";

const DogsList = () => {
  const { loading, images } = useContext(DogImagesContext);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="dogs-list">
      {images?.map((src) => (
        <div className="dogs-list-item" key={src}>
          <img src={src} alt={src} />
        </div>
      ))}
    </div>
  );
};

export default DogsList;
