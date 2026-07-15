import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../services/api";

import "../styles/Notifications.css";

function Notifications() {

  const [notifications, setNotifications] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {

    try {

      const res = await API.get("/loans/notifications/");

      setNotifications(res.data);

    }

    catch (error) {

      console.log(error);

      toast.error("Unable to load notifications.");

    }

    finally {

      setLoading(false);

    }

  };

  const markAsRead = async (id) => {

    try {

      await API.post(
        `/loans/notifications/read/${id}/`
      );

      setNotifications(

        notifications.map((item) =>

          item.id === id
            ? { ...item, is_read: true }
            : item

        )

      );

    }

    catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="notifications-container">

      <h1 className="notifications-title">

        🔔 Notifications

      </h1>

      {loading ? (

        <div className="loading">

          Loading...

        </div>

      ) : notifications.length === 0 ? (

        <div className="empty-box">

          🎉 No notifications available.

        </div>

      ) : (

        notifications.map((item) => (

          <div

            key={item.id}

            className={`notification-card ${item.is_read ? "read" : "unread"}`}

            onClick={() => markAsRead(item.id)}

          >

            <div className="notification-header">

              <h3>

                {item.title}

              </h3>

              {!item.is_read && (

                <span className="badge">

                  NEW

                </span>

              )}

            </div>

            <p>

              {item.message}

            </p>

            <small>

              {new Date(item.created_at).toLocaleString()}

            </small>

          </div>

        ))

      )}

    </div>

  );

}

export default Notifications;