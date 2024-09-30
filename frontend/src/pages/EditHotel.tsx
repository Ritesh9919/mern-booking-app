import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import * as ApiClient from "../api-client";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";

function EditHotel() {
  const { hotelId } = useParams();
  const { data: hotel } = useQuery(
    "fetchHotelById",
    () => ApiClient.fetchMyHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );
  console.log(hotel);
  return <ManageHotelForm hotel={hotel} />;
}

export default EditHotel;
