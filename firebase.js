
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
      let password=document.getElementById("password").value;
      let conpass=document.getElementById("conpass").value;
      function checkPass(){
        if(username!="" && password!=""){
            if (password==conpass){
             firebase.database().ref("users").once("value",function(snapshot){
                    snapshot.forEach(function(childSnapshot){
                        var childKey=childSnapshot.key;
                        var childValue=childSnapshot.val();
                        if (childValue["username"]==username){
                        alert("This username is already taken");
                        }
                        else{
                            saveUserData(username,password);
                        }
                    });
                });
            function saveUserData(username,password){
                let newUsers=users.push();
                newUsers.set({
                    username:username,
                    password:password
                });
                alert("Registration successful!!");
                document.getElementById("username").value="";
                window.location.href="login.html";
            } 
          }
          else{
              document.getElementById("wrongpass").style.display="block";
          }
        }
        else{
            alert("You need to enter something");
        }
          
      }
      checkPass();
      
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
  
 