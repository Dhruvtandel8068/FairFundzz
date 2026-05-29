import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api/axios";
import {
  Bell,
  CheckCircle,
  Trash2,
  AlertTriangle,
  CalendarX,
  CreditCard,
  RefreshCcw,
} from "lucide-react";

type Notification = {
  _id: string;
  title: string;
  message: string;
  type: "attendance" | "payment" | "compliance" | "system";
  isRead: boolean;
  createdAt: string;
};

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async () => {
    try {
      const res = await API.get("/notifications");
      setNotifications(res.data.notifications || []);
      setUnreadCount(res.data.unreadCount || 0);
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to fetch notifications");
    }
  };

  const generateNotifications = async () => {
    try {
      await API.post("/notifications/generate");
      fetchNotifications();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to generate notifications");
    }
  };

  useEffect(() => {
    generateNotifications();
  }, []);

  const markRead = async (id: string) => {
    try {
      await API.put(`/notifications/${id}/read`);
      fetchNotifications();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to mark as read");
    }
  };

  const markAllRead = async () => {
    try {
      await API.put("/notifications/read-all");
      fetchNotifications();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to mark all as read");
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      await API.delete(`/notifications/${id}`);
      fetchNotifications();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to delete notification");
    }
  };

  const getIcon = (type: string) => {
    if (type === "attendance") return <CalendarX size={22} />;
    if (type === "payment") return <CreditCard size={22} />;
    if (type === "compliance") return <AlertTriangle size={22} />;
    return <Bell size={22} />;
  };

  const getColor = (type: string) => {
    if (type === "attendance") return "bg-yellow-100 text-yellow-700";
    if (type === "payment") return "bg-blue-100 text-blue-700";
    if (type === "compliance") return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="flex bg-[#f4f7fe] min-h-screen">
      <Navbar />

      <div className="ml-[220px] w-[calc(100%-220px)] p-6">
        <div className="bg-white rounded-3xl shadow-sm p-6 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Notifications
            </h1>
            <p className="text-gray-500 mt-2">
              Alerts for attendance, payments and wage compliance.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={generateNotifications}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
            >
              <RefreshCcw size={18} />
              Refresh Alerts
            </button>

            <button
              onClick={markAllRead}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
            >
              <CheckCircle size={18} />
              Mark All Read
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-blue-600 text-white rounded-3xl p-6 shadow">
            <Bell size={36} />
            <p className="mt-4 text-lg">Total Notifications</p>
            <h2 className="text-4xl font-bold">{notifications.length}</h2>
          </div>

          <div className="bg-red-600 text-white rounded-3xl p-6 shadow">
            <AlertTriangle size={36} />
            <p className="mt-4 text-lg">Unread Alerts</p>
            <h2 className="text-4xl font-bold">{unreadCount}</h2>
          </div>

          <div className="bg-green-600 text-white rounded-3xl p-6 shadow">
            <CheckCircle size={36} />
            <p className="mt-4 text-lg">Read Alerts</p>
            <h2 className="text-4xl font-bold">
              {notifications.length - unreadCount}
            </h2>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-6 mt-8">
          <h2 className="text-2xl font-bold mb-6">
            Alert Center
          </h2>

          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification._id}
                className={`border rounded-2xl p-5 flex justify-between items-start ${
                  notification.isRead ? "bg-white" : "bg-blue-50"
                }`}
              >
                <div className="flex gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${getColor(
                      notification.type
                    )}`}
                  >
                    {getIcon(notification.type)}
                  </div>

                  <div>
                    <h3 className="font-bold text-lg">
                      {notification.title}
                    </h3>
                    <p className="text-gray-600 mt-1">
                      {notification.message}
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      {new Date(notification.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  {!notification.isRead && (
                    <button
                      onClick={() => markRead(notification._id)}
                      className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-2 rounded-lg"
                    >
                      Read
                    </button>
                  )}

                  <button
                    onClick={() => deleteNotification(notification._id)}
                    className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}

            {notifications.length === 0 && (
              <div className="text-center text-gray-500 p-10">
                No notifications found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;