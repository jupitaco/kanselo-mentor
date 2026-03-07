export type NotificationsType = {
  _id: string;
  userId: string;
  title: string;
  body: string;
  link: string;
  isRead: false;
  type: string;
  date: string;
  createdAt: string;
  updatedAt: string;
};

export type NotificationRsp = ApiResponse & {
  data: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    unreadCount: number;
    notifications: NotificationsType[];
  };
};
