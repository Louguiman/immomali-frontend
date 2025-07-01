import { createSlice } from "@reduxjs/toolkit";

interface NotificationEntity {
  id: string;
  read: boolean;
  [key: string]: any;
}

interface NotificationState {
  notifications: NotificationEntity[];
}

const initialState: NotificationState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action: { payload: NotificationEntity }) => {
      state.notifications.unshift(action.payload);
    },
    setNotifications: (state, action: { payload: NotificationEntity[] }) => {
      state.notifications = action.payload;
    },
    markAsRead: (state, action: { payload: string }) => {
      const notification = state.notifications.find(
        (n) => n.id === action.payload
      );
      if (notification) {
        notification.read = true;
      }
    },
  },
});

export const { addNotification, setNotifications, markAsRead } =
  notificationSlice.actions;
export default notificationSlice.reducer;
