import { createContext, FC, ReactNode, useState } from "react";

type IDogImagesContextType = {
  images?: string[];
  setImages?: React.Dispatch<React.SetStateAction<string[]>>;
  loading?: boolean;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DogImagesContext = createContext<IDogImagesContextType>({});

type DogImagesProviderProps = {
  children: ReactNode;
};

const DogImagesProvider: FC<DogImagesProviderProps> = ({ children }) => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  return (
    <DogImagesContext.Provider
      value={{
        images,
        setImages,
        loading,
        setLoading,
      }}
    >
      {children}
    </DogImagesContext.Provider>
  );
};

export default DogImagesProvider;
