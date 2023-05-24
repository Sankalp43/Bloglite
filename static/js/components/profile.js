const Profile = Vue.component("profile", {
  template: `
    <div>

    <nav class="navbar navbar-expand-xl navbar-light bg-light">
    <div class="container-fluid">


  
      <div class="collapse navbar-collapse show" id="navbarBasic">

     
        <ul class="navbar-nav me-auto mb-2 mb-xl-0">
        
        <li class="nav-item">
        <button @click="gofeed" type="button" class="nav-link" ><strong>Feed</strong></button>
        </li>

         

          <li class="nav-item">

          <!-- Button trigger modal -->
          <button  type="button" class="nav-link" data-toggle="modal" data-target="#exampleModalCenterprofile">
          <strong>Add/Update Profile Picture</strong>
          </button>
          
          <!-- Modal -->
          <div class="modal fade" id="exampleModalCenterprofile" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">Add Profile Picture</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">

                <form>

                    <div class="form-group">
                        <label for="exampleFormControlFile1">Add Image</label>
                        <input type="file" class="form-control-file" id="exampleFormControlFile1" @change="onFileChange">
                    </div>
                </form>

                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button @click="addprofilepic" type="button" class="btn btn-primary" data-dismiss="modal">Add/Update Profile Picture</button>
                </div>
              </div>
            </div>
          </div>



          
          </li>

          <li class="nav-item">
          <button v-if="this.flag" type="button" class="nav-link" data-toggle="modal" data-target="#exampleModalCenterprofileremove">
          <strong>Remove Profile Picture</strong>
          </button>
        
        <!-- Modal -->
        <div class="modal fade" id="exampleModalCenterprofileremove" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Confirm Delete</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
    
            Do you want to remove your display picture?
    
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button  @click="removeprofilepic" type="button" class="btn btn-danger" data-dismiss="modal">Remove</button>
              </div>
            </div>
          </div>
        </div>
    
          </li>

        

          <li class="nav-item">
          <button @click="logout" type="button" class="nav-link" ><strong>Log Out</strong></button>
          </li>

        

          <li class="nav-item">
          <button @click="goallusers" type="button" class="nav-link" ><strong>Users</strong></button>
          </li>

          <li class="nav-item">
          <button @click="report" type="button" class="nav-link" ><strong>Explore Profile Stats</strong></button>
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

          <br> <br> <br>
          <!-- Button trigger modal -->
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
            Add New Post
          </button>
          
          <!-- Modal -->
          <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">Add New Post</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">

                <form>

                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">Post Title</label>
                        <textarea v-model='post_title' class="form-control" id="exampleFormControlTextarea1" rows="1"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">Post Description</label>
                        <textarea v-model='post_description'class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlFile1">Add Image</label>
                        <input type="file" class="form-control-file" id="exampleFormControlFile1" @change="onFileChange">
                    </div>
                </form>

                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button @click="addpost" type="button" class="btn btn-primary" data-dismiss="modal">Save changes</button>
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
      <div class="post d-flex justify-content-center">
      <div class="p-2">





      <button type="button" class="btn btn-outline-danger" data-toggle="modal" :data-target="getModelIdhashdel(index)">
      Remove Post
    </button>
    
    <!-- Modal -->
    <div class="modal fade" :id="getModelIddel(index)" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Confirm Delete</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">

        Do you want to remove this post?

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button @click="removepost(post.post_id)" type="button" class="btn btn-danger" data-dismiss="modal">Delete Post</button>
          </div>
        </div>
      </div>
    </div>




      </div>
      <div class="p-2">


      <!-- Button trigger modal -->
      <button type="button" class="btn btn-secondary" data-toggle="modal" :data-target="getModelIdhashed(index)">
        Edit Post
      </button>
      
      <!-- Modal -->
      <div class="modal fade" :id="getModelIded(index)" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Add New Post</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">

            <form>

                <div class="form-group">
                    <label for="exampleFormControlTextarea1">Post Title</label>
                    <textarea v-model='post_title' class="form-control" id="exampleFormControlTextarea1" rows="1" :placeholder="post.post_title"></textarea>
                </div>
                <div class="form-group">
                    <label for="exampleFormControlTextarea1">Post Description</label>
                    <textarea v-model='post_description'class="form-control" id="exampleFormControlTextarea1" rows="3" :placeholder="post.post_discription"></textarea>
                </div>
                <div class="form-group">
                    <label for="exampleFormControlFile1">Add Image</label>
                    <input type="file" class="form-control-file" id="exampleFormControlFile1" @change="onFileChange" disabled>
                </div>
            </form>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button @click="editpost(post.post_id)" type="button" class="btn btn-primary" data-dismiss="modal">Make changes</button>
            </div>
          </div>
        </div>
      </div>



      </div>
                  
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
      <div class="post d-flex justify-content-center">


        <div class="p-2">


        <button type="button" class="btn btn-outline-danger" data-toggle="modal" :data-target="getModelIdhashdel(index)">
        Remove Post
      </button>
      
      <!-- Modal -->
      <div class="modal fade" :id="getModelIddel(index)" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Add New Post</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
  
          Do you want to remove this post?
  
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button @click="removepost(post.post_id)"  type="button" class="btn btn-danger" data-dismiss="modal">Delete Post</button>
              </div>
          </div>
        </div>
      </div>



        </div>
        <div class="p-2">



        <!-- Button trigger modal -->
        <button type="button" class="btn btn-secondary" data-toggle="modal" :data-target="getModelIdhashed(index)">
          Edit Post
        </button>
        
        <!-- Modal -->
        <div class="modal fade" :id="getModelIded(index)" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Add New Post</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
  
              <form>
  
                  <div class="form-group">
                      <label for="exampleFormControlTextarea1">Post Title</label>
                      <textarea v-model='post_title' class="form-control" id="exampleFormControlTextarea1" rows="1" :placeholder="post.post_title"></textarea>
                  </div>
                  <div class="form-group">
                      <label for="exampleFormControlTextarea1">Post Description</label>
                      <textarea v-model='post_description'class="form-control" id="exampleFormControlTextarea1" rows="3" :placeholder="post.post_discription"></textarea>
                  </div>
                  <div class="form-group">
                      <label for="exampleFormControlFile1">Add Image</label>
                      <input type="file" class="form-control-file" id="exampleFormControlFile1" @change="onFileChange" disabled>
                  </div>
              </form>
  
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button @click="editpost(post.post_id)" type="button" class="btn btn-primary" data-dismiss="modal">Make changes</button>
              </div>
            </div>
          </div>
        </div>


        </div>
                    
      </div>  
    </div>
  </div>
</div>
</div>





    </div>
    `,

  methods: {

    
goallusers(){
    console.log("It is working.")
    this.$router.push( {name: 'all_users' })
},
gofeed(){
  console.log("It is working.")
  this.$router.push( {name: 'user_feed' })
},


   

    removeprofilepic(){
      let user_id = this.$store.state.login_id
      fetch("/removeprofile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authentication-Token': localStorage.auth_token
        },

        body: JSON.stringify(
          {user_id: user_id}
          ),
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

          console.log(data);
          alert(data)
          

        //   alert(data);
        })
        .catch((error) => {
          alert("Something went wrong.");

          console.log(error);
        }).finally(()=>{
            this.$router.go(0)

        })

    },

    addprofilepic(){
      if(this.post_image == ""){
        alert("please add a Picture.")
      }
      else{

      
      fetch("/profilepic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authentication-Token': localStorage.auth_token
        },

        body: JSON.stringify({
          // post_title: this.post_title,
          // post_description: this.post_description,
          image: this.post_image,
          user_id: this.$store.state.login_id,
        }),
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

          console.log(data);
          alert(data)
          

        //   alert(data);
        })
        .catch((error) => {
          alert("Something went wrong.");

          console.log(error);
        }).finally(()=>{
            this.$router.go(0)

        })
      }

    },


    report(){
      const u_id = this.$store.state.login_id;
      let data = {id : u_id}

      fetch("/report", {
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

      console.log("Celery Task Details:", data);
       let interval = setInterval(() => {
          fetch("/get_status", {
            method : "POST",
            headers: {
                "Content-Type": "application/json",
                'Authentication-Token': localStorage.auth_token
              },
            body: JSON.stringify({task_id : data.Id}),
      
      
      
        }).then((res) =>{
          return  res.json()
        }
          ).then((data) => {
            console.log(data.task_State)

              if (data.task_State == "SUCCESS") {
                console.log("Task Finished")
                clearInterval(interval);
                
              window.location.href = `/get_file/${this.user_uname}`;
              }
              else {
                console.log("task still executing")
              }
          })
        }, 500)


    
    })
    .catch((error)=>{
        alert("Something went wrong.")
  
        console.log(error)
        }
       )
  
  
  



    },

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

      



      const u_id = this.$store.state.login_id;

      const user = { user_id: u_id };
      // setTimeout(() => this.$router.go(0),6000);

      fetch("/profile", {
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

    editpost: function (id) {
      fetch("/editpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authentication-Token': localStorage.auth_token
        },

        body: JSON.stringify({
          post_title: this.post_title,
          post_description: this.post_description,
          post_id: id,
        }),
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

          console.log(data);
          alert(data)
          

        //   alert(data);
        })
        .catch((error) => {
          alert("Something went wrong.");

          console.log(error);
        }).finally(()=>{
            this.$router.go(0)

        })

    },

    removepost: function(id){
      console.log(id)
      fetch("/removepost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authentication-Token': localStorage.auth_token
        },

        body: JSON.stringify(
          {post_id: id}
          ),
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

          console.log(data);
          alert(data)
          

        //   alert(data);
        })
        .catch((error) => {
          alert("Something went wrong.");

          console.log(error);
        }).finally(()=>{
            this.$router.go(0)

        })
    },

    addpost: function () {
      fetch("/addpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authentication-Token': localStorage.auth_token
        },

        body: JSON.stringify({
          post_title: this.post_title,
          post_description: this.post_description,
          post_image: this.post_image,
          user_id: this.$store.state.login_id,
        }),
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

          console.log(data);
          alert(data)
          

        //   alert(data);
        })
        .catch((error) => {
          alert("Something went wrong.");

          console.log(error);
        }).finally(()=>{
            this.$router.go(0)

        })

    },

    onFileChange(event) {
      // console.log(this.post_title)
      // console.log(this.post_description)
      const file = event.target.files[0];
      if (file) {
        //   this.fileName = file.name;
        const reader = new FileReader();
        reader.onload = (event) => {
          this.post_image = event.target.result;
          //   console.log(this.post_image);
        };
        reader.readAsDataURL(file);
      }
      // else {
      //     this.fileName = 'Select Profile Photo';
      //   }
    },
  },

  mounted: function () {

      
      this.getinfo()
    // setTimeout(() => this.$router.go(0),6000);


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

export default Profile;
