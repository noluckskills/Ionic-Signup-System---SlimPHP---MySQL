angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('SignupCtrl', function($scope,$http) {
  
  $scope.signup = function () {
	  
    //Set a username
    var username = $scope.signup.username;	
    
    //Set a email
    var email = $scope.signup.email;
    
    //Set a password
    var password = $scope.signup.password;
    
	
	var again = $scope.signup.again;
    
    //Set an fullname
    
    var fullname = $scope.signup.fullname;
	
    
    if(email != undefined && password != undefined && fullname != undefined && username != undefined || again != undefined) {
	
		if(password == again){
    
		$http.get("http://localhost/project/adduser?email="+email+"&password="+password+"&fullname="+fullname+"&username="+username)
            
            .success(function (response) {
				
				if (JSON.parse(response) == "OK"){alert("User has been signed up");}
				
				else {console.log("Error " + response);}
                
            })// END HTTP SUCCESS ADD USER FUNCTION
            
            .error(function (response,status,headers,config) {
               
              //alert("Ops, Something went wrong adding user !!!");
              console.log("Status : " + status);
                
            })// END HTTP SUCCESS ADD USER FUNCTION
            
        } // END CHECK PASSWORD
        
        else{alert("Password do not match");}
        
    } // END CHECK ALL FIELDS NOT EMPTY
    
    else {alert("Please provide all the fields");}
		
    }
  
})


.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
