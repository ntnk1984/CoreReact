import { notification } from "antd";

export const    openNotificationWithIcon = (type) => {
    if(type=='success'){
      return notification[type]({
        message: "Thành công!",
      });
    }
    return notification[type]({
      message: "Thất bại!",
    });
  };