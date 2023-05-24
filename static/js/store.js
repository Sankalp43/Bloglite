


  


const store = new Vuex.Store({

    state : {
        auth:"",
        login_id : "",
        temp_id : "",


    },

    getters :{
        get_login_id : function(state){
            return state.login_id;
        }



    }, 

    mutations : {

        authcheck : function(state){
            if(localStorage.auth_token){
                state.auth = true
            }
            else{
                state.auth = false
            }



        },
        set_login_id: function (state, id) {
            console.log("Invoked Mutation.")
            state.login_id = id;
        },


        set_temp_id : function(state , id){
            state.temp_id = id;

        }


    },

    actions : {
        set_login_id : function(context){
            context.commit('authcheck')
            if (context.state.auth){
                console.log("Going TO hit.")
                fetch("/getid", {
                method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authentication-Token': localStorage.auth_token}
                        }).then((res)=>{
                            if(res.ok){
                                console.log("Got the response")
                                return res.json()
                            }
                            else{
                                console.log("Got Not the response")

                                throw Error("Can't find User.")
                            }
                        }).then((data)=>{
                            console.log("Setting it.")
                            console.log(data.id)

                            context.commit('set_login_id' , data.id )
                            
                        }).catch((er)=>{

                            console.log(er)
                        })
                

            }else{
                context.commit('set_login_id' , null )



            }

        },

        // set_login_id : function(context , id){
        //     console.log("Invoked Action.")
        //     context.commit("set_login_id" , id);

        // },

        set_temp_id : function(context , id){
            context.commit("set_temp_id" , id);

        }


    },
    plugins: [createPersistedState()]


})


export default store;


