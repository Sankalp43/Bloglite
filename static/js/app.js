import router from "./router.js"
import store from "./store.js";

const bloglite = new Vue({   
    el : '#app',
    template : `
        <router-view></router-view>
        </div>`,
    data:{

    },

    router:router,
    store : store

});