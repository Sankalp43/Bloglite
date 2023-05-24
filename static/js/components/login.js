const Login = Vue.component("login", {
    template:`  
      <div method="post">
    <h4><label for="username" class="form-label ">Email:</label></h4>

<div class="form-floating mb-3 mt-3">  

<input v-model="mail" type="text" name="username" placeholder="Mail" id="username" class="form-control" required/>
<label for="username" class="form-label">Mail:</label>

</div>
<h4><label for="password" class="form-label">Password:</label></h4>
<div class="form-floating mb-3 mt-3">     
<input v-model="password" type="password" name="password" id="password" placeholder="Password" class="form-control" required/>
<label for="password" class="form-label">Password:</label>

</div>
<!-- <div class="mb-3 mt-3">         </div>> -->
<button @click = "login" type="submit" class="btn btn-primary">LOG IN</button>
<br>
<br>
<h4> If a new User, Please SignUp Here. </h4> 
<a> <router-link to="/signup">Signu Up</router-link> </a>



</div>



`,
data:function(){
    return{
        mail : '' , 
        password : '',
        error : ''
    }
},

methods:{

    celery_test : function(){
        fetch('/celery_test' , {
            method: "GET",
        headers: {
          "Content-Type": "application/json",
        //   'Authentication-Token': localStorage.auth_token
        },


        }).then((res)=>{
            if( !res.ok){
                throw new Error("Error")
            }
            else{
                return res.json()
            }
             
        }).then((data)=>{
            console.log(data)
        }).catch((err)=>{
            alert("error")
            console.log(err)
        })

    },


    login: function(){
        if(this.mail == '' || this.password == ''){
            alert("Please Enter All Credentials for Login.")
        }
        else{
            const login_credentials = {"email": this.mail , "password" : this.password}
    
            fetch("/login?include_auth_token", {
                method : "POST",
                headers: {
                    "Content-Type": "application/json",
                      "mode": 'no-cors'
                  },
                body: JSON.stringify(login_credentials),
    
    
    
            })
            .then(async (res)=>{
                if (!res.ok) {
                    // console.log(res.json().response)

                    // var err; 

                    const error = res.json()

                    await error.then((res)=>{
                         this.error = res.response.errors[0]
                        // console.log(this.error + 1 )
                    // return new Error(err);
                    }
                    )


                    throw new Error(this.error);
                    }
                else{
                    const data =  res.json()
                    return data
                }
                })

                
               
            .then((data)=>{
                console.log("Here is the data:")
                console.log(data) 
                console.log("Are upar to dekho, upar dekho")
                if (data){
                    localStorage.auth_token = data.response.user.authentication_token
                    console.log(data.response.user.authentication_token)
                    this.$store.dispatch('set_login_id');
                    this.$router.push( {name: 'user_feed'})

                    // console.log(data.user_id)
                                }
                else{
                    throw new Error(data.description);

                }
                // console.log("fgg")
    
                // query: {user_id : data.user_id }
           
    
            
            })
            .catch((error)=>{
                if (error){
                    console.log(error)
                alert(error)
                // alert("UserName or Password Is Incorrect.")
                }
                else{
                    this.$router.push( {name: 'user_feed'})

                }

                }
               )
            
        }
        


    }
},

mounted : function(){
    document.title = 'Login'
}
})

export default Login