import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import * as ApiClient from "../api-client";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";

function EditHotel() {
  const { showToast } = useAppContext();
  const { hotelId } = useParams();
  const { data: hotel } = useQuery(
    "fetchHotelById",
    () => ApiClient.fetchMyHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );
  const { mutate, isLoading } = useMutation(ApiClient.updateHotelById, {
    onSuccess: () => {
      showToast({ message: "Hotel updated", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };
  return (
    <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading} />
  );
}

export default EditHotel;
