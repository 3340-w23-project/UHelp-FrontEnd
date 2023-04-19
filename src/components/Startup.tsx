import Cookies from "universal-cookie";
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/store";
import {
  setUsername,
  setDisplayName,
  setIsAuth,
} from "@/redux/slices/userSlice";

function Startup() {
  const cookies = new Cookies();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (cookies.get("access_token")) {
      dispatch(setIsAuth(true));
      fetch("/api/identity", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.get("access_token")}`,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
        })
        .then((data) => {
          if (data) {
            dispatch(setUsername(data.username));
            dispatch(setDisplayName(data.display_name));
          }
        });
    }
  }, [cookies.get("access_token")]);
  return null;
}

export default Startup;
