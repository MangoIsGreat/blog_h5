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
import LikedListPage from "../views/LikedListPage";
import ReadArticle from "../views/ReadArticle";
import Collection from "../views/Collection";
import ArtListPage from "../views/ArtListPage";
import TagManage from "../views/TagManage";

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
  {
    path: "/layout/my/likedList",
    component: LikedListPage,
  },
  {
    path: "/layout/my/readArticle",
    component: ReadArticle,
  },
  {
    path: "/layout/my/collection",
    component: Collection,
  },
  {
    path: "/layout/my/artListPage",
    component: ArtListPage,
  },
  {
    path: "/layout/my/tagManagement",
    component: TagManage,
  },
];

export default routeRules;
