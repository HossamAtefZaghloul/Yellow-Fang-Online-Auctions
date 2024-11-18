import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { hideNotification } from "../store/notificationSlice";

const Notification = () => {
  const { message, visible } = useSelector(
    (state: RootState) => state.notification
  );
  const dispatch = useDispatch();

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center  z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <button
          onClick={() => dispatch(hideNotification())}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          ✕
        </button>

        <p className="text-lg font-medium text-gray-800 mb-4">{message}</p>

        <div className="flex items-center justify-center space-x-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            onClick={() => console.log("Join clicked")} 
          >
            Join
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            onClick={() => console.log("Decline clicked")} 
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
