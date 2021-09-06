import React from "react";
const Layout = React.lazy(() => import("../views/Layout"));
const PublishDyn = React.lazy(() => import("../views/PublishDyn"));
const InteractionPage = React.lazy(() => import("../views/InteractionPage"));
const NewsPage = React.lazy(() => import("../views/NewsPage"));
const UserInfo = React.lazy(() => import("../views/UserInfo"));
const LikedListPage = React.lazy(() => import("../views/LikedListPage"));
const ReadArticle = React.lazy(() => import("../views/ReadArticle"));
const Collection = React.lazy(() => import("../views/Collection"));
const ArtListPage = React.lazy(() => import("../views/ArtListPage"));
const TagManage = React.lazy(() => import("../views/TagManage"));
const TagArtList = React.lazy(() => import("../views/TagArtList"));
const Login = React.lazy(() => import("../views/Login"));
const Register = React.lazy(() => import("../views/Register"));
const EditUserInfo = React.lazy(() => import("../views/EditUserInfo"));
const ArticleRanking = React.lazy(() => import("../views/ArticleRanking"));
const AuthorRanking = React.lazy(() => import("../views/AuthorRanking"));
const Article = React.lazy(() => import("../views/Article"));
const PublishComm = React.lazy(() => import("../views/PublishComm"));
const ThemeList = React.lazy(() => import("../views/ThemeList"));
const Qrcode = React.lazy(() => import("../views/Qrcode"));

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
