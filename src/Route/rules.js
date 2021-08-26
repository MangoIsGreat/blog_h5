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
import TagArtList from "../views/TagArtList";
import Login from "../views/Login";
import Register from "../views/Register";
import EditUserInfo from "../views/EditUserInfo";
import ArticleRanking from "../views/ArticleRanking";
import AuthorRanking from "../views/AuthorRanking";
import Article from "../views/Article";
import PublishComm from "../views/PublishComm";

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
    path: "/layout/my/userInfo/:uid",
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
    path: "/layout/my/artListPage/:type/:id",
    component: ArtListPage,
  },
  {
    path: "/layout/my/tagManagement",
    component: TagManage,
  },
  {
    path: "/layout/my/tagArtList/:type/:name",
    component: TagArtList,
  },
  {
    path: "/layout/login",
    component: Login,
  },
  {
    path: "/layout/register",
    component: Register,
  },
  {
    path: "/layout/editinfo/:uid",
    component: EditUserInfo,
  },
  {
    path: "/layout/article/ranking",
    component: ArticleRanking,
  },
  {
    path: "/layout/author/ranking",
    component: AuthorRanking,
  },
  {
    path: "/layout/article/:blogId",
    component: Article,
  },
  {
    path: "/layout/comment/publish/:id/:type",
    component: PublishComm,
  },
];

export default routeRules;
