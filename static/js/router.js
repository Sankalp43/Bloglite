import Login from "./components/login.js";
import Signup from "./components/signup.js";
import Feed from "./components/feed.js"
import Profile from "./components/profile.js";
import Temp_profile from "./components/temp_profile.js";
import AllIUsers from "./components/allusers.js";

const routes = [
    {
        name:'login',
        path: "/",
        component: Login

    },

    {
        path: "/signup",
        component : Signup,
        // props : true



    },

    {
        name:'user_feed',
        path: "/user_feed",
        component : Feed,
        props : true
    },
    {
        name:'all_users',
        path: "/all_users",
        component : AllIUsers,
        props : true
    },

    {
        name:'profile',
        path: "/profile",
        component : Profile,
        props : true

    },
    {
        name: 'temp_profile',
        path:"/temp_profile",
        component : Temp_profile


    }
];

const router = new VueRouter({
    routes,
});


export default router;
