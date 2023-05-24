const AllIUsers = Vue.component('all_users' , {
    template:`
  <div>
  
  <nav class="navbar navbar-expand-xl navbar-light bg-light">
  <div class="container-fluid">
    <div class="collapse navbar-collapse show" id="navbarBasic">
      <ul class="navbar-nav me-auto mb-2 mb-xl-0">
        <li class="nav-item">
        <button @click="profile" class="nav-link active" aria-current="page"><strong> Profile</strong></button>
        </li>
        <li class="nav-item">
          <a @click="logout" class="nav-link" ><strong>Log Out</strong></a>
        </li>
        <!-- <li class="nav-item">
          <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
        </li> -->
      </ul>
      <form class="d-flex" method="post">
        <input v-model="search" class="form-control me-2" type="search" placeholder="Search" name = "search" aria-label="Search">
      </form>
    </div>
  </div>
  </nav>
  
  
  
  <div class="container">
  <div v-for="user in users" class="scrollbar mb-5 p-5 bg-light shadow-lg">
    <div class="row">
    <div class="d-flex justify-content-end mb-3">
 
    
    
    
    
    
  
      <div class="col-md-6">
     
        <img :src="user.image" alt="Post image" class="img-fluid rounded" height="250" width="250">
      </div>
      <div class="col-md-6 d-flex flex-column justify-content-center">
      <div class="p-2">    <button @click="showprofile(user.user)" type="button" class="btn btn-info btn-lg">{{user.user_name}}</button>
      </div>
      <div v-if="user.status" class="p-2">    <button @click="unfollow(user.user)" type="button" class="btn btn-warning btn-lg">Unfollow</button>
      </div>
      <div v-else class="p-2">    <button @click="follow(user.user)" type="button" class="btn btn-success btn-lg">Follow</button>
      </div>
     
  
      </div>
    </div>
  </div>
  </div>
  
  
  
  
  
  
  
  
  
  
  
     
    </div> 
    `,
  
  
  
  
    data:function(){
        return{
            user_id : this.id ,
            user_name : '',
            users : "",
            search : "",
            lis : [4,5,6]
        }
    },
  
  methods:{
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
  
  getData(){
  
    console.log(this.$store.state.login_id)
    console.log("login_id")
    const id = this.$store.state.login_id
    // this.user_name = this.name
    document.title = 'Users'
    console.log("Mountain dew pio khus rho")
    // console.log(this.id)
    fetch("/allusers", {
        method : "POST",
        headers: {
            "Content-Type": "application/json",
            'Authentication-Token': localStorage.auth_token
          },
        body: JSON.stringify({user_id : id}),
  
  
  
    })
    .then((res)=>{
        if (!res.ok) {
            throw new Error("Go to Catch");
        }
        console.log(res.status)
        console.log("I am here.")
        return res.json()})
    .then((data)=>{
        console.log("Here is the data:")
        console.log(data)
        this.users = data       
        console.log("Are upar to dekho, upar dekho")
     
   
  
    
    })
    .catch((error)=>{
        alert("Something went wrong.")
  
        console.log(error)
        }
       )
  
  
  
  },
  
  
  
  follow(to_follow){
    console.log("Follow is running.")
    const u_id = this.$store.state.login_id;
  
    const data = { user_id: u_id , to_follow : to_follow  };
  
    fetch("/follow", {
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
    this.getData()
  
  
      console.log(data)
      console.log("Are upar to dekho, upar dekho")
   
  
  
  
  })
  .catch((error)=>{
      alert("Something went wrong.")
  
      console.log(error)
      }
     )
  
  
  
  
  
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
    this.getData()
  
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
  
  
  
  showprofile(post_user_id){
    console.log(post_user_id)
    this.$store.dispatch("set_temp_id" , post_user_id)
  
    this.$router.push( {name: 'temp_profile' })
  
  },
  
  
  
    profile(){
  
  
  
  
  
        console.log("It is working.")
        this.$router.push( {name: 'profile' })
  
  
  
    }
  
  },
  
  watch : {
    search(new_val){
  
      if (new_val == ""){
        console.log("refresh")
        this.$router.go(0)
      }
      else{
        const u_id = this.$store.state.login_id;

        fetch("/searchuser", {
          method : "POST",
          headers: {
              "Content-Type": "application/json",
              'Authentication-Token': localStorage.auth_token
            },
          body: JSON.stringify({search_param : new_val ,search_user:u_id}),
    
    
    
      })
      .then((res)=>{
          if (!res.ok) {
              throw new Error("Go to Catch");
          }
          console.log(res.status)
          console.log("I am here.")
          return res.json()})
      .then((data)=>{
          console.log("Here is the data:")
          console.log(data)
          this.users = data       
          console.log("Are upar to dekho, upar dekho")
       
     
    
      
      })
      .catch((error)=>{
          alert("Something went wrong.")
    
          console.log(error)
          }
         )
  
      }
  
  
      
  
  
  
  
    }
  },
  
  mounted : function(){
  
  this.getData()
  
  
  }
  })
  
  export default AllIUsers