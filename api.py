import json
from flask_restful import Resource, Api
from flask_security import login_required ,current_user, auth_required
from flask import request, jsonify, send_file
from datetime import datetime
from cache import cache

# ----------------------------here---------------------
from db import db
from model import RolesUsers , User , Posts , Follow_data , Role

api = Api()
class HelloWorld(Resource):
    def get(self):
        return {'hellosankalp': 'worldyes'}

api.add_resource(HelloWorld, '/na')



class Profile(Resource):
    @auth_required('token')
    @cache.cached(timeout=5 , key_prefix='profile')
    def post(self):

        signup_credentials = request.get_json()
        user_id = signup_credentials.get('user_id')

        user = User.query.filter_by(id = user_id).first()
        # name = user.name
        mail = user.email
        image = user.user_image
        uname = user.username

        posts_by_user = Posts.query.filter_by(user_id = user_id).all()


        postlist = []
        
        for post in posts_by_user:
           postlist.append({ "post_title" : post.post_title, 
                "post_image" : post.post_image,
                "post_discription" : post.post_discription,
                "post_time" : str(post.post_time)  ,   
                "post_id" : post.post_id  
           })
        
        following_list = Follow_data.query.filter_by(user_id = user_id).all()
        following = len(following_list)

        follow_list = Follow_data.query.filter_by(follower_id = user_id).all()
        follow = len(follow_list)

        following_obj = []
        for i in following_list:
            follower = i.follower_id
            user = User.query.filter_by(id = follower).first()
            follower_name = user.username

            following_obj.append({
                "follower_id" : follower,
                "follower_name" : follower_name
            })

        followed_obj = []
        for j in follow_list:
            followed = j.user_id
            user = User.query.filter_by(id = followed).first()
            followed_name = user.username

            followed_obj.append({
                "followed_id" : followed,
                "followed_name" : followed_name
            })



        return{ 'user_mail':mail , 'user_image' : image , 'user_uname' : uname , 'posts' : postlist , 'following' : following_obj , 'followed' : followed_obj}

        print(user_id)
        return jsonify("Working baby")

class ProfileTemp(Resource):
    @auth_required('token')
    def post(self):

        signup_credentials = request.get_json()
        user_id = signup_credentials.get('user_id')

        user = User.query.filter_by(id = user_id).first()
        # name = user.name
        mail = user.email
        image = user.user_image
        uname = user.username

        posts_by_user = Posts.query.filter_by(user_id = user_id).all()


        postlist = []
        
        for post in posts_by_user:
           postlist.append({ "post_title" : post.post_title, 
                "post_image" : post.post_image,
                "post_discription" : post.post_discription,
                "post_time" : str(post.post_time)  ,   
                "post_id" : post.post_id  
           })
        
        following_list = Follow_data.query.filter_by(user_id = user_id).all()
        following = len(following_list)

        follow_list = Follow_data.query.filter_by(follower_id = user_id).all()
        follow = len(follow_list)

        following_obj = []
        for i in following_list:
            follower = i.follower_id
            user = User.query.filter_by(id = follower).first()
            follower_name = user.username

            following_obj.append({
                "follower_id" : follower,
                "follower_name" : follower_name
            })

        followed_obj = []
        for j in follow_list:
            followed = j.user_id
            user = User.query.filter_by(id = followed).first()
            followed_name = user.username

            followed_obj.append({
                "followed_id" : followed,
                "followed_name" : followed_name
            })



        return{ 'user_mail':mail , 'user_image' : image , 'user_uname' : uname , 'posts' : postlist , 'following' : following_obj , 'followed' : followed_obj}

        print(user_id)
        return jsonify("Working baby")



class Allposts(Resource):
    @auth_required('token')
    # @cache.cached(timeout=50 , key_prefix='allposts')
    def post(self):

        signup_credentials = request.get_json()
        user_id = signup_credentials.get('user_id')

        obj = Follow_data.query.filter_by(follower_id = user_id).all()
        l = []
        for i in obj:
            l.append(i.user_id)

        allpost = Posts.query.all()


        postlist = []
        
        for post in allpost:
           user = User.query.filter_by(id = post.user_id).first()
           if post.user_id in l:
               sta = True
               postlist.append({ "post_title" : post.post_title, 
                "post_image" : post.post_image,
                "post_discription" : post.post_discription,
                "post_time" : post.post_time  ,
                "post_user" : post.user_id ,
                "post_user_name" : user.username,     
                "status": sta
           })

          


           

        

           postlist.reverse()

        return jsonify(postlist)

        print(user_id)
        return jsonify("Working baby")
    
class AllUsers(Resource):
    @auth_required('token')
    # @cache.cached(timeout=50 , key_prefix='allposts')
    def post(self):

        signup_credentials = request.get_json()
        user_id = signup_credentials.get('user_id')

        obj = Follow_data.query.filter_by(follower_id = user_id).all()
        l = []
        for i in obj:
            l.append(i.user_id)

        allusers = User.query.all()


        userlist = []
        
        for user in allusers:
        #    user = User.query.filter_by(id = user.id).first()
           if user.id in l:
               sta = True
           else:
               sta = ''


           userlist.append({ 
            #    "post_title" : post.post_title, 
                "image" : user.user_image,
                # "post_discription" : post.post_discription,
                # "post_time" : post.post_time  ,
                "user" : user.id ,
                "user_name" : user.username,     
                "status": sta
           })


        

           userlist.reverse()

        return jsonify(userlist)

        print(user_id)
        return jsonify("Working baby")
    


class AddPost(Resource):
    @auth_required('token')
    def post(self):

        signup_credentials = request.get_json()
        post_title = signup_credentials.get('post_title')
        post_desc = signup_credentials.get('post_description')
        post_image = signup_credentials.get('post_image')
        user_id = signup_credentials.get('user_id')

        post = Posts(user_id = user_id , post_title = post_title , post_image = post_image ,post_discription =  post_desc , post_time = datetime.now())
        db.session.add(post)
        db.session.commit()

        return(jsonify("Post added Succesfully."))
        

class RemovePost(Resource):
    @auth_required('token')
    def post(self):

        signup_credentials = request.get_json()
        post_id = signup_credentials.get('post_id')
        Posts.query.filter_by(post_id = post_id).delete()
        db.session.commit()

        return(jsonify("Post Removed Succesfully."))


class UpdatePost(Resource):
    @auth_required('token')
    def post(self):

        signup_credentials = request.get_json()
        post_title = signup_credentials.get('post_title')
        post_desc = signup_credentials.get('post_description')
        post_id = signup_credentials.get('post_id')

        post = Posts.query.filter_by(post_id = post_id).first()
        post.post_title = post_title
        post.post_discription = post_desc
        post.post_time = datetime.now()
        db.session.commit()

        return(jsonify("Post Edited Succesfully."))


class SearchUser(Resource):
    @auth_required('token')
    def post(self):

        signup_credentials = request.get_json()
        search_param = signup_credentials.get('search_param')
        # post_title = signup_credentials.get('post_title')
        # post_desc = signup_credentials.get('post_description')
        # post_id = signup_credentials.get('post_id')
        user_id = signup_credentials.get('search_user')

        obj = Follow_data.query.filter_by(follower_id = user_id).all()
        l = []
        for i in obj:
            l.append(i.user_id)
        search = "%{}%".format(search_param)


        allusers = User.query.filter(User.username.like(search)).all()

        userlist = []
        
        for user in allusers:
        #    user = User.query.filter_by(id = user.id).first()
           if user.id in l:
               sta = True
           else:
               sta = ''


           userlist.append({ 
            #    "post_title" : post.post_title, 
                "image" : user.user_image,
                # "post_discription" : post.post_discription,
                # "post_time" : post.post_time  ,
                "user" : user.id ,
                "user_name" : user.username,     
                "status": sta
           })


        

           userlist.reverse()

  

        return jsonify(userlist)

class Search(Resource):
    @auth_required('token')
    def post(self):

        signup_credentials = request.get_json()
        search_param = signup_credentials.get('search_param')
        # post_title = signup_credentials.get('post_title')
        # post_desc = signup_credentials.get('post_description')
        # post_id = signup_credentials.get('post_id')
        user_id = signup_credentials.get('search_user')
        obj = Follow_data.query.filter_by(follower_id = user_id).all()
        l = []
        for i in obj:
            l.append(i.user_id)



        search = "%{}%".format(search_param)

        users = User.query.filter(User.username.like(search)).all()

        postlist = []

        
        
        for user in users:
           user_id = user.id
           posts  = Posts.query.filter_by(user_id = user_id).all()
           for post in posts:
               if post.user_id in l:
                   sta = True
                   postlist.append({ "post_title" : post.post_title, 
                "post_image" : post.post_image,
                "post_discription" : post.post_discription,
                "post_time" : post.post_time  ,
                "post_user" : post.user_id ,
                "post_user_name" : user.username,
                "status": sta        
           })
               
               
               
        postlist.reverse()

        return jsonify(postlist)
    
class Follow_(Resource):
    @auth_required('token')
    def post(self):

        signup_credentials = request.get_json()
        user_id = signup_credentials.get('user_id')
        to_follow = signup_credentials.get('to_follow')
        follow = Follow_data(user_id = to_follow , follower_id = user_id)
        db.session.add(follow)
        db.session.commit()

        return(jsonify("Success"))

        

        # return(jsonify("Post Removed Succesfully."))
    
class Unfollow(Resource):
    @auth_required('token')
    def post(self):
        print("hello")
        signup_credentials = request.get_json()
        user_id = signup_credentials.get('user_id')
        followed = signup_credentials.get('followed_id')
        print(followed , user_id)
        Follow_data.query.filter_by(user_id = followed , follower_id = user_id).delete()
        db.session.commit()
        return(jsonify("Success"))
    
class Run(Resource):
    @auth_required('token')
    def get(self):

        # return {id :  }
        # print(current_user.id)
        return {"id" : current_user.id}
    

# class ExportJob(Resource):
#     @auth_required('token')
#     def post(self):
#         signup_credentials = request.get_json()
#         user_id = signup_credentials.get('id')

        # user = User.query.filter_by(id = user_id).first()
        # mail = user.email
        # image = user.user_image
        # uname = user.username

        # posts_by_user = Posts.query.filter_by(user_id = user_id).all()
        # following_list = Follow_data.query.filter_by(user_id = user_id).all()
        # following = len(following_list)
        # follow_list = Follow_data.query.filter_by(follower_id = user_id).all()

        
        # with open(f'reportof{uname}.pdf' , 'w') as rep:
        #     rep.write(f'USER NAME : {{uname}}\n')
        #     rep.write("USER MAIL : {{mail}}\n")
        #     rep.write("USER posts : {{len(post_by_user)}}\n")
        #     rep.write("Followers : {{len(follow_list)}}\n")
        #     rep.write("Following : {{following}}\n")

#         return jsonify("success")
    
# from app import add_together
# class Celery(Resource):
#     # @auth_required('token')
#     def get(self):
#         a = add_together.delay(5,5)
#         return { "id" : a.id,
#                 "result" : a.result}

        

#         return {"id" : current_user.id}


class RemoveProfile(Resource):
    @auth_required('token')
    def post(self):

        credentials = request.get_json()
        # image = credentials.get('image')
        # post_desc = credentials.get('post_description')
        id = credentials.get('user_id')

        user = User.query.filter_by(id = id).first()
        user.user_image = None
        db.session.commit()

        

        return(jsonify("Profile Removed Succesfully."))


class Updateprofile(Resource):
    @auth_required('token')
    def post(self):

        credentials = request.get_json()
        image = credentials.get('image')
        # post_desc = credentials.get('post_description')
        id = credentials.get('user_id')

        user = User.query.filter_by(id = id).first()
        user.user_image = image
        db.session.commit()

        return(jsonify("Profile Set Succesfully."))
    
# class Sendfile(Resource):
#     @auth_required('token')
#     def post(self):

#         credentials = request.get_json()
#         id = credentials.get('user_id')

#         user = User.query.filter_by(id = id).first()
#         uname = user.username
#         return send_file(f'static/reportof{uname}.txt')

        

#         return(jsonify("Profile Removed Succesfully."))
    
api.add_resource(Profile , '/profile')
api.add_resource(ProfileTemp , '/profile_temp')

api.add_resource(Allposts , '/allpost')
api.add_resource(AllUsers , '/allusers')

api.add_resource(AddPost , '/addpost')
api.add_resource(RemovePost , '/removepost')
api.add_resource(UpdatePost , '/editpost')
api.add_resource(Search , '/search')
api.add_resource(SearchUser , '/searchuser')

api.add_resource(Follow_ , '/follow')
api.add_resource(Unfollow , '/unfollow')
api.add_resource(Run , '/getid')
# api.add_resource(ExportJob , '/report')
api.add_resource(Updateprofile , '/profilepic')
api.add_resource(RemoveProfile , '/removeprofile')
# api.add_resource(Sendfile , '/getfile')




# api.add_resource(Celery , '/celery_test')
