import { notification } from 'antd';

export const notify = (title, description) => {
  notification.open({
    message: title,
    description: description
  });
};
