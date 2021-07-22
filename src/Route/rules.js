import Home from "../views/Home";
import Interaction from "../views/Interaction";
import Find from "../views/Find";
import News from "../views/News";
import My from "../views/My";
import UserInfo from "../views/UserInfo";
import MesCenter from "../views/MesCenter";
import CommentListPage from "../views/CommentListPage";
import DianzanListPage from "../views/DianzanListPage";
import AttentionListPage from "../views/AttentionListPage";
import SysListPage from "../views/SysListPage";

const routeRules = [
  {
    path: "/layout/index",
    component: Home,
  },
  {
    path: "/layout/interaction",
    component: Interaction,
  },
  {
    path: "/layout/find",
    component: Find,
  },
  {
    path: "/layout/news",
    component: News,
  },
  {
    path: "/layout/my",
    component: My,
  },
  {
    path: "/layout/my/userInfo",
    component: UserInfo,
  },
  {
    path: "/layout/my/messageCenter",
    component: MesCenter,
  },
  {
    path: "/layout/my/messageCenter/comment",
    component: CommentListPage,
  },
  {
    path: "/layout/my/messageCenter/dianzan",
    component: DianzanListPage,
  },
  {
    path: "/layout/my/messageCenter/attention",
    component: AttentionListPage,
  },
  {
    path: "/layout/my/messageCenter/system",
    component: SysListPage,
  },
];

export default routeRules;
