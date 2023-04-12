// 알림목록 page (/notification-list)

import NoticeList from "components/notice/NoticeList";
import { Divider } from "primereact/divider";
import "pages/setting/Setting.css";

const NotificationListPage: React.FC = () => {
  return (
    <div className="wrapper">
      <p className="pageName">알림</p>
      <Divider className="divider" />

      <NoticeList />
    </div>
  );
};

export default NotificationListPage;
