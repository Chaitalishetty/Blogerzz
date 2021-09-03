
const firebaseConfig = {
    apiKey: "AIzaSyBlEDAhnggDoh7ng5yRXJr044D7KSPBcio",
    authDomain: "blog-engine-4ef28.firebaseapp.com",
    databaseURL: "https://blog-engine-4ef28-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "blog-engine-4ef28",
    storageBucket: "blog-engine-4ef28.appspot.com",
    messagingSenderId: "805320171135",
    appId: "1:805320171135:web:b7d3c9ad0920172662e94a",
    measurementId: "G-JXFLRD6H0J"
  };
  firebase.initializeApp(firebaseConfig);
  let users=firebase.database().ref("users");
  let blogs=firebase.database().ref("blogs");
//   document.getElementById("register").addEventListener("click",registerUser);
  function registerUser(){
     
      let username=document.getElementById("username").value;
      let email=document.getElementById("email").value;
      let password=document.getElementById("password").value;
      firebase.database().ref("users").once("value",function(snapshot){
            snapshot.forEach(function(childSnapshot){
                var childKey=childSnapshot.key;
                var childValue=childSnapshot.val();
                if (childValue["username"]==username || childValue["email"]==email){
                   alert("This email is already taken");
                }
                else{
                    saveUserData(username,email,password);
                }
            });
        });
      function saveUserData(username,email,password){
          let newUsers=users.push();
          newUsers.set({
              username:username,
              email:email,
              password:password
          });
          alert("Registration successful!!");
          window.location.href="login.html";
          
      }
      
  }

  function loginUser(){
    var flag=0;
    let pass=document.getElementById("pass").value;
      let usermail=document.getElementById("usermail").value;
      
      function getUserData(){
        firebase.database().ref("users").once("value",function(snapshot){
            snapshot.forEach(function(childSnapshot){
                var childKey=childSnapshot.key;
                var childValue=childSnapshot.val();
                if (usermail==childValue["username"] || pass==childValue["email"]){
                    if(pass==childValue["password"]){
                        flag=flag+1;
                        sessionStorage.setItem("username",childValue["username"]);
                        sessionStorage.setItem("password",childValue["password"]);
                        sessionStorage.setItem("email",childValue["email"]);
                    }

                }
            });
            if (flag==1){
                alert("You are logged in !!!")
                window.location.href="home.html";
            }
            else{
                alert("Enter correct username and password");
            }
        });  
      }
      getUserData();
  }
  function postBlog(){
    let heading=document.getElementById("heading").value;
    let blogtext=document.getElementById("blogtext").value;
    let checkbox=document.getElementById("checkbox");
    let status="";
    if(checkbox.checked==true){
        status="private"
    }
    else{
        status="public"
    }
    if(heading!=" " || blogtext!=" "){
        blogSubmit();
    }
    else{
        alert("You need to enter something");
    }
    function blogSubmit(){
        let newBlogs=blogs.push();
        newBlogs.set({
            heading:heading,
            date:Date.now(),
            blogtext:blogtext,
            status:status,
            author:sessionStorage.getItem("username")
        });
        alert("You blog is saved successfully");
    }

  }
  function showPosts(){
    firebase.database().ref("blogs").once("value",function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var childKey=childSnapshot.key;
            var childValue=childSnapshot.val();
            if(childValue["status"]=="public"){
                
                let displayBlog=childValue["heading"]+childValue["blogtext"]+childValue["date"]
                document.querySelector(".posts").innerHTML+=displayBlog;
            }
            else if(childValue["status"=="private"]){
                
            }
        });
    });
}