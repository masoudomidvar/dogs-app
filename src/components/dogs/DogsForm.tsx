import { useQuery } from "@tanstack/react-query";
import { FC, useEffect, memo, useCallback, useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { dogsApi } from "../../api/dogsApi";
import Select from "../common/select/Select";
import { DogImagesContext } from "../context/DogImagesProvider";

const numberOfImagesOptions = ["5", "10", "15", "20", "40"];

export type IFormValues = {
  breeds: string;
  subBreeds: string;
  numberOfImgs: string;
};

type DogsFormProps = {
  data: {
    [key: string]: string[];
  };
};

const DogsForm: FC<DogsFormProps> = ({ data }) => {
  const { setImages, setLoading } = useContext(DogImagesContext);
  const breedOptions = Object.keys(data);
  const firstBreed = breedOptions[0];
  const firstSubBreed =
    data[firstBreed].length !== 0 ? data[firstBreed][0] : "";

  const { register, handleSubmit, watch, setValue } = useForm<IFormValues>({
    defaultValues: {
      breeds: firstBreed,
      subBreeds: firstSubBreed,
      numberOfImgs: numberOfImagesOptions[0],
    },
  });

  const currentBreed = watch("breeds");
  const currentSubBreed = watch("subBreeds");

  useEffect(() => {
    if (data[currentBreed].length > 0) {
      setValue("subBreeds", data[currentBreed][0]);
    } else {
      setValue("subBreeds", "");
    }
  }, [currentBreed]);

  const { refetch } = useQuery({
    queryKey: ["images", { breed: currentBreed, subBreed: currentSubBreed }],
    queryFn: dogsApi.getImages,
    enabled: false,
    onSettled: () => {
      setLoading?.(false);
    },
    onSuccess: (res) => {
      const viewCount = Number(watch("numberOfImgs"));
      if (res.message.length <= viewCount) {
        setImages?.(res.message);
      } else {
        const result = [] as string[];
        for (let i = 0; i < viewCount; i++) {
          const randomIdx = Math.floor(Math.random() * res.message.length - 1);
          result.push(res.message[randomIdx]);
        }
        setImages?.(result);
      }
    },
    onError: () => {
      setImages?.([]);
    },
  });

  const onSubmit: SubmitHandler<IFormValues> = useCallback(async () => {
    setLoading?.(true);
    await refetch();
  }, []);

  return (
    <form className="dogs-form" onSubmit={handleSubmit(onSubmit)}>
      <Select label="Breed" {...register("breeds")} options={breedOptions} />
      {currentBreed && data[currentBreed].length !== 0 && (
        <Select
          label="Sub Breed"
          {...register("subBreeds")}
          options={data[currentBreed]}
        />
      )}
      <Select
        label="Number of Images"
        {...register("numberOfImgs")}
        options={numberOfImagesOptions}
      />
      <button type="submit">
        <p>View Images</p>
      </button>
    </form>
  );
};

export default memo(DogsForm);
