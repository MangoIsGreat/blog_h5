import Layout from "../views/Layout";
import PublishDyn from "../views/PublishDyn";
import InteractionPage from "../views/InteractionPage";
import NewsPage from "../views/NewsPage";
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
import TagArtList from "../views/TagArtList";
import Login from "../views/Login";
import Register from "../views/Register";
import EditUserInfo from "../views/EditUserInfo";
import ArticleRanking from "../views/ArticleRanking";
import AuthorRanking from "../views/AuthorRanking";
import Article from "../views/Article";
import PublishComm from "../views/PublishComm";
import ThemeList from "../views/ThemeList";
import Qrcode from "../views/Qrcode";

const routeRules = [
  {
    path: "/layout",
    component: Layout,
  },
  {
    path: "/interaction/publish",
    component: PublishDyn,
  },
  {
    path: "/interaction/:id",
    component: InteractionPage,
  },
  {
    path: "/theme",
    component: ThemeList,
  },
  {
    path: "/qrcode/:id",
    component: Qrcode,
  },
  {
    path: "/news/:newsid",
    component: NewsPage,
  },
  {
    path: "/my/userInfo/:uid",
    component: UserInfo,
  },
  {
    path: "/my/messageCenter",
    component: MesCenter,
  },
  {
    path: "/my/messageCenter/comment",
    component: CommentListPage,
  },
  {
    path: "/my/messageCenter/dianzan",
    component: DianzanListPage,
  },
  {
    path: "/my/messageCenter/attention",
    component: AttentionListPage,
  },
  {
    path: "/my/messageCenter/system",
    component: SysListPage,
  },
  {
    path: "/my/likedList/:uid",
    component: LikedListPage,
  },
  {
    path: "/my/readArticle",
    component: ReadArticle,
  },
  {
    path: "/my/collection/:uid",
    component: Collection,
  },
  {
    path: "/my/artListPage/:type/:id",
    component: ArtListPage,
  },
  {
    path: "/my/tagManagement",
    component: TagManage,
  },
  {
    path: "/my/tagArtList/:type/:name",
    component: TagArtList,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/editinfo/:uid",
    component: EditUserInfo,
  },
  {
    path: "/article/ranking",
    component: ArticleRanking,
  },
  {
    path: "/author/ranking",
    component: AuthorRanking,
  },
  {
    path: "/article/:blogId",
    component: Article,
  },
  {
    path: "/comment/publish/:id/:type",
    component: PublishComm,
  },
];

export default routeRules;
