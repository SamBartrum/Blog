blogmodule.controller('blogpostsController', ['$scope', '$http', 'PostResource', function($scope, $http, PostResource) {

    var that = this;

    that.blogposts = [];
    that.selectedpost = null;

    that.getBlogPosts = function(){
        PostResource.get().$promise.then(function(data) {
            that.blogposts = data.posts;
        });
    };

    that.viewPost = function(shortid){
        window.location.href = '#/blogpost/'+ shortid;

    };

    that.selected = function(postid){
        that.selectedpost = postid;
        $('.deleteModal').modal('show');
    };

    that.deletePost = function(){
        PostResource.delete({shortid: that.selectedpost}).$promise.then(function(data){
            that.getBlogPosts();
            $('.deleteModal').modal('hide');
        });
    };

}]);

blogmodule.controller('newpostController', ['$scope', '$http', 'PostResource', function($scope, $http, PostResource) {

    var that = this;

    that.newblogpost = {blogtitle:'', blogpost:''};

    that.saveBlogPost = function(){
        var data = that.newblogpost;
        var savePost = new PostResource(data);
        savePost.$save(function(data) {
        });
        window.location.href = '/';
    };
}]);

blogmodule.controller('blogpostController', ['$scope', '$http', 'PostResource', function($scope, $http, PostResource) {

    var that = this;

    that.blogpost = {};

    that.getShortId = function(){
        var url = window.location.href;
        return url.split('/').pop();
    };

    that.getBlogPost = function(){
        var data = {shortid: that.getShortId()};
        PostResource.get(data).$promise.then(function(response){
            // TODO: return this an element not an array.
            returned = response.post[0]
            that.blogpost = returned;
        });
    };


}]);

blogmodule.controller('loginController', ['$scope', 'LoginResource', function($scope, LoginResource){
    var that = this;

    that.login = {username: '', password: ''};
    that.loggedIn = null;

    that.authenticate = function(){
        LoginResource.save(that.login).$promise.then(function(response){
            console.log(response);
            if(response.success){
                location.reload();
            }
            else{
                that.loggedIn = false;
            }
        });
    };

    that.validate = function(){
        if(!that.login.username.trim() || !that.login.password.trim()){
            return true;
        }
        return false;
    };

    that.closeMessage = function(){
        that.loggedIn = null;
    };

}]);


blogmodule.controller('usersController', ['$scope', 'UserResource', function($scope, UserResource){
    var that = this;
    that.users = [];
    that.newUser = {username: '', password: ''};
    that.selectedUserID = null;

    that.getUsers = function(){
        UserResource.get().$promise.then(function(data) {
            that.users = data.users;
        });
    };

    that.createUser = function(){
        var userPost = new UserResource(that.newUser);
        userPost.$save();
        $('#createUserModal').modal('hide');
        that.getUsers();
    };

    that.validateNewUser = function(){
         if(!that.newUser.username.trim() || !that.newUser.password.trim()){
            return true;
        }
        return false;
    };

    that.selected = function(id){
        that.selectedUserID = id;
        $('.deleteModal').modal('show');
    };

    that.deleteUser = function(){
        UserResource.delete({id: that.selectedUserID}).$promise.then(function(data){
            that.getUsers();
            $('.deleteModal').modal('hide');
        });
    };
}]);


blogmodule.controller('uploadsController', ['$scope', 'Upload', 'UploadsResource', function($scope, Upload, UploadsResource){
   var that = this;
   that.uploadsuccess = false;
   that.uploads = [];

   that.uploadFile = function(file, errFiles) {
        that.f = file;
        that.errFile = errFiles && errFiles[0];
        if (file) {
            file.upload = Upload.upload({
                url: '/upload',
                headers : { 'Content-Type': 'multipart/form-data'},
                data: {media: file}
            });

            file.upload.then(function (response) {
                that.uploadsuccess = true;
                that.getUploads();
            })
        }
    };

    that.getUploads = function(){
        UploadsResource.get().$promise.then(function(data){
            that.uploads = data.files;
        })

    };
}]);