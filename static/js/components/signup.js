const Signup = Vue.component("signup", {
    template:`
    <div method="post">
    


    <div class="form-floating mb-3 mt-3">    
            <input  v-model="user_name"  type="text" name="username" placeholder="UserName" id="username"  class="form-control" required/>
            <label for="username" class="form-label">User Name:</label>

    </div>

    <div class="form-floating mb-3 mt-3">     
           <input v-model="email" type="email" name="email" placeholder="email" id="email" class="form-control" required>
           <label for="email" class="form-label">Email:</label>

    </div>

    <div class="form-floating mb-3 mt-3">  
              <input v-model="password" type="password" name="password" id="password" placeholder="Password" class="form-control" required/>
              <label for="password" class="form-label">Password</label>

    </div>


  
    <button  @click="signup" type="submit" class="btn btn-primary"> Sign Up  </button>
<br>
<br>
<button style="color: aliceblue;" v-if="this.flag" class="btn btn-primary" >  <router-link to="/">Login Here</router-link> </button>

</div>
`,
data:function(){
    return{ 
        email : '',
        user_name : '' , 
        password : '',
       flag : false,
       error : ''
        // fileName: 'Select Profile Photo',

    }
},
methods:{
    signup : function(){
        if (this.email == "" || this.user_name == "" || this.password == ""){
            alert("Please Enter all credentials.")
        }
        else{
            const signup_credential = { "email" : this.email , "username" : this.user_name , "password" : this.password}
            // const signup_credential = {"name" : "this.newname" , "email" : "news@gmail.com" , "username" : 
            // "thisusernewname" , "password" : "this.password" , "user_image":"this.image_url"}
                body: JSON.stringify(signup_credential),
            console.log(signup_credential)
            fetch("/register?include_auth_token", {
                method : "POST",
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify(signup_credential),
    
    
    
            })
            .then(async (res)=>{
                // console.log(res)

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
                console.log(res.status)
                console.log("I am here.")
                return res.json()}

                }
            )
                
            .then((data)=>{
                // console.log("Here is the data:")
                console.log(data)
                // console.log("Are upar to dekho, upar dekho")
                if (data){
                    fetch("/logout").then((res)=>{
                        if (res.ok){
                            localStorage.removeItem('auth_token')
                            this.$store.dispatch('set_login_id')
                            this.$router.push({name:'login'})
                        }

                        
                    }).catch((error)=>{
                        console.log(error)
                    })

                    // this.$store.dispatch("set_login_id" , data.userid)
                    // this.$store.state.login_id = data.userid
                    // this.$router.push( {name: 'user_feed' })


                }
                else{
                    throw new Error(data.description);

                }
                // console.log("fgg")
    
                // query: {user_id : data.user_id }
           
    
            
            })
            .catch((error)=>{
                alert(error)

                console.log(error)
                this.flag = true}
               )
        }

        



    },
    // onFileChange(event) {
    //     const file = event.target.files[0];
    //     if (file) {
    //     //   this.fileName = file.name;
    //           const reader = new FileReader()
    //           reader.onload = (event) => {
    //               this.image_url = event.target.result
    //             //   console.log(this.imageurl);
    //           }
    //           reader.readAsDataURL(file)
    //     }
    //     // else {
    //     //     this.fileName = 'Select Profile Photo';
    //     //   } 
    //   },
},

mounted: function(){
    document.title = "SignUp";
},


})

export default Signup