import { useNavigate } from "react-router";
import { useAuth } from "../context/authContext";

export default function UserButton() {
  const navigate = useNavigate();
  const { user } = useAuth();
  return (
    <button onClick={() => navigate("/profile")}>
      <img
        src={user?.profilePicture}
        className="w-11 h-11 rounded-full object-cover"
        alt=""
      />
    </button>
  );
}
