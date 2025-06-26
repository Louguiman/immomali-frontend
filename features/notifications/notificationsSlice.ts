import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface NotificationState {
//   notifications: NotificationEntity[];
// }

const initialState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: { 
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    markAsRead: (state, action) => {
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
