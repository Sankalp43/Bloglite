const Temp_profile = Vue.component("temp_profile", {
  template: `
  <div>

  <nav class="navbar navbar-expand-xl navbar-light bg-light">
  <div class="container-fluid">



    <div class="collapse navbar-collapse show" id="navbarBasic">

   
      <ul class="navbar-nav me-auto mb-2 mb-xl-0">

        <li class="nav-item">
        <button class="nav-link active" aria-current="page"><strong><router-link :to="{ name: 'user_feed'}">Feed</router-link></strong></button>

        </li>

        
        

        <li class="nav-item">
        <a @click="logout" class="nav-link" ><strong>Log Out</strong></a>
        </li>
        
     
        <!-- <li class="nav-item">
          <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
        </li> -->
      </ul>
      <form class="d-flex" method="post">
     
      </form>
    </div>
  </div>
</nav>


<section class="bg-light">
<div class="container">
    <div class="row">
        <div class="col-lg-12 mb-4 mb-sm-5">
            <div class="card card-style1 border-0">
                <div class="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                    <div class="row align-items-center">
                        <div class="col-lg-6 mb-4 mb-lg-0">
                            <img :src="this.user_img" alt="..." width="300" height="300">
                        </div>
                        
                        
                        <div class="col-lg-6 px-xl-10">
                            <div class="bg-secondary d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                                <h3 class="h2 text-white mb-0"> {{this.user_uname}}</h3>
                            </div>
                            <ul class="list-unstyled mb-1-9">
                            <!--  <li class="mb-2 mb-xl-3 display-28"><span class="display-26 text-secondary me-2 font-weight-600">User Name:</span> {{this.user_uname}}</li>  -->
                                <li class="mb-2 mb-xl-3 display-28"><span class="display-26 text-secondary me-2 font-weight-600">Email:</span> {{this.user_email}}</li>
                                <li class="mb-2 mb-xl-3 display-28"><span class="display-26 text-secondary me-2 font-weight-600">Posts:</span> {{this.posts.length}}</li>
                                <li class="mb-2 mb-xl-3 display-28"><span class="display-26 text-secondary me-2 font-weight-600">Followers:</span>{{this.following.length}} </li>
                                <li class="display-28"><span class="display-26 text-secondary me-2 font-weight-600">Following:</span> {{this.followed.length}}</li>
                            </ul>
                            <!-- Button trigger modal -->
                            <button type="button" class="btn btn-info" data-toggle="modal" data-target="#following">
                              See Followers
                            </button>
                            
                            <!-- Modal -->
                            <div class="modal fade" id="following" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                              <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h4 class="modal-title" id="exampleModalLongTitle">Followers</h4>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>
                                  <div class="modal-body">



                                  
                                  <div v-for="f in following"class="container mt-5">


                                  <div class="row justify-content-center">
                                    <div class="col-md-6">
                                      <div class="card border-0 shadow-lg rounded-lg">
                                        <div class="card-body d-flex flex-row align-items-center justify-content-between">
                                          <h1 class="card-title mb-0 text-primary font-weight-bold">{{f.follower_name}}</h1>

                                        </div>
                                      </div>
                                    </div>
                                  </div>
                            
                                  <br>
                            
                            

                                </div>



                  
                                  </div>
                                  <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                  </div>
                                </div>
                              </div>
                            </div>





                            <!-- Button trigger modal -->
                            <button type="button" class="btn btn-success" data-toggle="modal" data-target="#followed">
                              See Following
                            </button>
                            
                            <!-- Modal -->
                            <div class="modal fade" id="followed" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                              <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h4 class="modal-title" id="exampleModalLongTitle">Following</h4>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                      <span aria-hidden="true">&times;</span>
                                    </button>
                                  </div>
                                  <div class="modal-body">
                  



                                  <div v-for="f in followed" class="container mt-5">



                                  <div class="row justify-content-center">
                                    <div class="col-md-6">
                                      <div class="card border-0 shadow-lg rounded-lg">
                                        <div class="card-body d-flex flex-row align-items-center justify-content-between">
                                          <h1 class="card-title mb-0 text-primary font-weight-bold">{{f.followed_name}}</h1>
                                          <button @click="unfollow(f.followed_id)" class="btn btn-primary btn-lg">Unfollow</button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <br>
                            
                                  
                            
                            
                                  

                                </div>


                  
                                  </div>
                                  <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                  </div>
                                </div>
                              </div>
                            </div>





                            <ul class="social-icon-style1 list-unstyled mb-0 ps-0">
                                <li><a href="#!"><i class="ti-twitter-alt"></i></a></li>
                                <li><a href="#!"><i class="ti-facebook"></i></a></li>
                                <li><a href="#!"><i class="ti-pinterest"></i></a></li>
                                <li><a href="#!"><i class="ti-instagram"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

       
        
       

    </div>
</div>



</section>

<br> <br> 
<div class="alert alert-primary" >
<h2 class="d-flex justify-content-center"> My Posts</h2>
</div>



<div class="container-fluid">
<div class="row">
<div class="col-md-4" v-for="(post, index) in posts" :key="index" v-if="index % 3 === 0">
  <div class="card mb-4">
    <img class="card-img-top" :src="post.post_image" alt="Card image cap" width="400" height="350">
    <div class="card-body">
      <h5 class="card-text">{{ post.post_title }}</h5>
      <p class="card-text">{{ post.post_discription }}</p>
      <strong class="card-text">{{ post.post_time }}</strong>

    </div>
   
  </div>
</div>
<div class="col-md-4" v-for="(post, index) in posts" :key="index" v-if="index % 3 !== 0">
  <div class="card mb-4">
    <img class="card-img-top" :src="post.post_image" alt="Card image cap" width="400" height="350">
    <div class="card-body">
    <h5 class="card-text">{{ post.post_title }}</h5>
    <p class="card-text">{{ post.post_discription }}</p>
    <strong class="card-text">{{ post.post_time }}</strong>

    </div>
    
  </div>
</div>
</div>
</div>





  </div>
  `,

methods: {

 
  logout(){
    fetch("/logout").then((res)=>{
      if (res.ok){
          localStorage.removeItem('auth_token')
          this.$store.dispatch('set_login_id')
          this.$router.push({name:'login'})
      }
  
      
  }).catch((error)=>{
      console.log(error)
  })
    // this.$router.push( {name: 'login' })
  },

  unfollow(followed){
    console.log("Unfollow is running.")
    const u_id = this.$store.state.login_id;

    const data = { user_id: u_id , followed_id : followed  };
    fetch("/unfollow", {
      method : "POST",
      headers: {
          "Content-Type": "application/json",
          'Authentication-Token': localStorage.auth_token
        },
      body: JSON.stringify(data),



  })
  .then((res)=>{
      if (!res.ok) {
          throw new Error("Go to Catch");
      }
      console.log(res.status)
      console.log("I am here.")
      return res.json()})
  .then((data)=>{
    this.getinfo()

      console.log("Here is the data:")
      console.log(data)
      // this.posts = data       
      console.log("Are upar to dekho, upar dekho")
   
 

  
  })
  .catch((error)=>{
      alert("Something went wrong.")

      console.log(error)
      }
     )




  },



  getinfo(){


const u_id = this.$store.state.temp_id;


    const user = { user_id: u_id };

    fetch("/profile_temp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authentication-Token': localStorage.auth_token
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Go to Catch");
        }
        console.log(res.status);
        console.log("I am here.");
        return res.json();
      })
      .then((data) => {
        console.log("Here is the data:");
        console.log(data);
        // this.user_name = data.user_name;
        this.user_email = data.user_mail;
        // console.log(data.user_img)
        // console.log("jhgyu")
        if(data.user_image){
          this.user_img = data.user_image;
          this.flag =  true
        }
       
        this.user_uname = data.user_uname;
        this.posts = data.posts;
        this.following = data.following
        this.followed = data.followed

        console.log("Are upar to dekho, upar dekho");
      })
      .catch((error) => {
        alert("UserName or Password Is Incorrect.");

        console.log(error);
      });


  },











  // logout(){
  //   this.$router.push( {name: 'login' })
  // },

  getModelIdhashdel: function(ind){
    // console.log("From " + ind)
    const s = "#exampleModalCenter" + ind
    // console.log(s)

    return `#exampleModalCenter${ind}`
  },
  getModelIddel: function(ind){
    // console.log("From " + ind)
    const s = "exampleModalCenter" + ind
    // console.log(s)

    return `exampleModalCenter${ind}`
  },
  getModelIdhashed: function(ind){
    // console.log("From " + ind)
    const s = "#exampleModalCenter_" + ind
    // console.log(s)

    return `#exampleModalCenter_${ind}`
  },
  getModelIded: function(ind){
    // console.log("From " + ind)
    const s = "exampleModalCenter_" + ind
    // console.log(s)

    return `exampleModalCenter_${ind}`
  },

  
},

mounted: function () {
    this.getinfo()
},

data: function () {
  return {
    // user_name: "",
    user_email: "",
    user_img: '/static/images/contact.png',
    user_uname: "",

    posts: [],

    post_title: "",
    post_description: "",
    post_image: "",
    following: [],
    followed : [],
    flag : false
  };
},
  });
  
  export default Temp_profile;
  