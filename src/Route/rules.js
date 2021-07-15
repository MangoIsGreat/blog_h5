import Home from "../views/Home";
import Interaction from "../views/Interaction";
import Find from "../views/Find";
import News from "../views/News";
import My from "../views/My";
import UserInfo from "../views/UserInfo";

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
];

export default routeRules;
