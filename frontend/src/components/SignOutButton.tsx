import { useMutation, useQueryClient } from "react-query";
import * as ApiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

function SignOutButton() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const mutation = useMutation(ApiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Sign out Success!", type: "SUCCESS" });
      navigate("/sign-in");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };
  return (
    <button
      onClick={handleClick}
      className="text-blue-600 px-3 font-bold hover:bg-gray-100 bg-white"
    >
      Sign Out
    </button>
  );
}

export default SignOutButton;
