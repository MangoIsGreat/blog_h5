import Layout from "../views/Layout";
import PublishDyn from "../views/PublishDyn";
import InteractionPage from "../views/InteractionPage";
import NewsPage from "../views/NewsPage";
import UserInfo from "../views/UserInfo";
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
    cache: true,
  },
  {
    path: "/my/likedList/:uid",
    component: LikedListPage,
    cache: true,
  },
  {
    path: "/my/readArticle",
    component: ReadArticle,
    cache: true,
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
    cache: true,
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
    cache: true,
  },
  {
    path: "/author/ranking",
    component: AuthorRanking,
    cache: true,
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
