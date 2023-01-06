import { useQuery } from "@tanstack/react-query";
import { dogsApi } from "../../api/dogsApi";
import Spinner from "../common/spinner/Spinner";
import "./Dogs.scss";
import DogsForm from "./DogsForm";
import DogsList from "./DogsList";

const Dogs = () => {
  const { data, isLoading, isFetching, isRefetching, isError } = useQuery({
    queryKey: ["breeds"],
    queryFn: dogsApi.getBreeds,
  });

  if (isError) {
    return <p style={{ color: "red" }}>Something went wrong</p>;
  }

  return (
    <div className="dogs">
      {isLoading || isFetching || isRefetching ? (
        <Spinner />
      ) : (
        <>
          <DogsForm data={data.message} />
          <DogsList />
        </>
      )}
    </div>
  );
};

export default Dogs;
