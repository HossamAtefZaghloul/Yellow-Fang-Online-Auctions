import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../store/notificationSlice";
import getSocket from "../../utils/socket";

const NotificationHandler = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = getSocket();

    socket.on("auction-started", (data) => {
      dispatch(showNotification(data.message)); 
    });

    return () => {
      socket.off("auction-started"); 
    };
  }, [dispatch]);

  return null;
};

export default NotificationHandler;
