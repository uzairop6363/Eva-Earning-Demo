/* =====================================
   EVA EARNING REAL APP SCRIPT
   PART 1/8
===================================== */


const API = "/api";

let currentUser = JSON.parse(localStorage.getItem("user")) || null;

let wallet = 0;
let reward = 0;
let ads = 5;
let watched = 0;
let plan = "FREE PLAN";


/* =========================
   SPLASH SCREEN
========================= */

const splash = document.getElementById("splash");
const app = document.getElementById("app");


window.addEventListener("load",()=>{

setTimeout(()=>{

splash.style.opacity="0";
splash.style.transition=".5s";


setTimeout(()=>{

splash.style.display="none";

app.classList.remove("hidden");

loadUser();

},500);


},5000);


});



/* =========================
   ELEMENTS
========================= */


const walletText=document.getElementById("wallet");
const rewardText=document.getElementById("todayReward");
const adsLeft=document.getElementById("adsLeft");
const adsWatched=document.getElementById("adsWatched");


const profileWallet=document.getElementById("profileWallet");
const profileRewards=document.getElementById("profileRewards");
const profileAds=document.getElementById("profileAds");
const profilePlan=document.getElementById("profilePlan");

const profileName=document.getElementById("profileName");
const profileEmail=document.getElementById("profileEmail");



/* =========================
   UPDATE UI
========================= */


function updateUI(){


if(walletText){

walletText.innerHTML=
`PKR ${wallet}`;

}


if(rewardText){

rewardText.innerHTML=reward;

}


if(adsLeft){

adsLeft.innerHTML=ads;

}


if(adsWatched){

adsWatched.innerHTML=watched;

}



if(currentUser){


profileName.innerHTML=currentUser.name;

profileEmail.innerHTML=currentUser.phone;


profileWallet.innerHTML=
`PKR ${wallet}`;


profileRewards.innerHTML=
`PKR ${reward}`;


profileAds.innerHTML=
watched;


profilePlan.innerHTML=
plan;


}else{


profileName.innerHTML="Guest User";

profileEmail.innerHTML="Login Required";


}



}



/* =========================
   LOAD USER
========================= */


function loadUser(){


if(!currentUser){

updateUI();

return;

}



wallet=currentUser.wallet || 0;

reward=currentUser.reward || 0;

ads=currentUser.ads || 5;

watched=currentUser.watchedAds || 0;

plan=currentUser.plan || "FREE PLAN";


updateUI();


}



updateUI();/* =====================================
   PART 2/8
   REAL LOGIN + REGISTER SYSTEM
===================================== */


/* =========================
   LOGIN ELEMENTS
========================= */


const loginBtn = document.getElementById("loginBtn");

const loginModal = document.getElementById("loginModal");

const loginSubmit = document.getElementById("loginSubmit");

const closeModal = document.querySelector(".closeModal");



/* =========================
   OPEN LOGIN
========================= */


if(loginBtn){

loginBtn.onclick=()=>{

loginModal.classList.add("show");

};

}



if(closeModal){

closeModal.onclick=()=>{

loginModal.classList.remove("show");

};

}




/* =========================
   CREATE ACCOUNT / LOGIN
========================= */


loginSubmit.onclick=async()=>{


const name =
document.getElementById("userName").value.trim();


const phone =
document.getElementById("userEmail").value.trim();


if(!name || !phone){


showToast("⚠ Name and Phone required");


return;


}




let password =
prompt("Enter Password");



if(!password){


showToast("⚠ Password required");

return;


}





try{


/*
First try login
*/


let loginResponse =
await fetch(`${API}/login`,{


method:"POST",


headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({

phone:phone,

password:password

})


});



let loginData =
await loginResponse.json();





if(loginData.success){


currentUser =
loginData.user;


localStorage.setItem(
"user",
JSON.stringify(currentUser)
);



loginModal.classList.remove("show");


loadUser();


showToast(
"✅ Login Successful"
);


return;


}





/*
If login failed,
create new account
*/



let registerResponse =
await fetch(`${API}/register`,{


method:"POST",


headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({

name:name,

phone:phone,

password:password

})


});




let registerData =
await registerResponse.json();




if(registerData.success){



showToast(
"✅ Account Created"
);



/*
Auto login after signup
*/


let newLogin =
await fetch(`${API}/login`,{


method:"POST",

headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({

phone:phone,

password:password

})


});



let newUser =
await newLogin.json();



currentUser =
newUser.user;



localStorage.setItem(
"user",
JSON.stringify(currentUser)
);



loginModal.classList.remove("show");


loadUser();



}else{


showToast(
registerData.message
);


}



}catch(error){


console.log(error);


showToast(
"❌ Server Error"
);


}



};





/* =========================
   LOGOUT
========================= */


const logoutBtn =
document.getElementById("logoutBtn");



if(logoutBtn){


logoutBtn.onclick=()=>{


localStorage.removeItem("user");


currentUser=null;


wallet=0;

reward=0;

ads=5;

watched=0;

plan="FREE PLAN";


updateUI();


showToast(
"👋 Logged Out"
);


};


}/* =====================================
   PART 3/8
   WATCH AD + REWARD SYSTEM
===================================== */


const watchBtn =
document.getElementById("watchAd");


const timer =
document.getElementById("timer");




if(watchBtn){


watchBtn.onclick=()=>{



// Login check

if(!currentUser){


showToast(
"⚠ Please Login First"
);


loginModal.classList.add("show");


return;


}




if(ads<=0){


showToast(
"❌ No Ads Remaining Today"
);


return;


}




watchBtn.disabled=true;


let seconds=15;



timer.innerHTML=
`⏳ ${seconds}s`;



let countdown =
setInterval(()=>{



seconds--;


timer.innerHTML=
`⏳ ${seconds}s`;




if(seconds<=0){


clearInterval(countdown);



wallet += 100;

reward += 100;

ads--;

watched++;





updateUI();




saveLocalUser();




timer.innerHTML=
"🎉 PKR 100 Added";



showToast(
"✅ Reward Added"
);




watchBtn.disabled=false;



}



},1000);





};



}




/* =========================
   SAVE USER DATA
========================= */


function saveLocalUser(){


if(!currentUser) return;



currentUser.wallet =
wallet;


currentUser.reward =
reward;


currentUser.ads =
ads;


currentUser.watchedAds =
watched;


currentUser.plan =
plan;



localStorage.setItem(
"user",
JSON.stringify(currentUser)
);



}/* =====================================
   PART 4/8
   WITHDRAW SYSTEM
===================================== */


const withdrawBtn =
document.getElementById("withdrawBtn");



const methodInput =
document.getElementById("method");


const nameInput =
document.getElementById("withdrawName");


const phoneInput =
document.getElementById("withdrawPhone");


const amountInput =
document.getElementById("withdrawAmount");





if(withdrawBtn){


withdrawBtn.onclick = async()=>{



if(!currentUser){


showToast(
"⚠ Please Login First"
);


loginModal.classList.add("show");


return;


}





let method =
methodInput.value;


let name =
nameInput.value.trim();


let number =
phoneInput.value.trim();


let amount =
Number(amountInput.value);





if(!name || !number || !amount){


showToast(
"⚠ Fill all details"
);


return;


}






// Free plan limit


if(plan==="FREE PLAN" && amount > 50){


showToast(
"⚠ Free Plan daily withdrawal limit is PKR 50"
);


return;


}






if(amount < 50){


showToast(
"⚠ Minimum withdrawal PKR 50"
);


return;


}






try{



let response =
await fetch(`${API}/withdraw`,{


method:"POST",


headers:{


"Content-Type":"application/json"


},


body:JSON.stringify({


phone:currentUser.phone,


method:method,


name:name,


number:number,


amount:amount



})


});






let data =
await response.json();






if(data.success){



showToast(
"✅ Withdraw Request Pending"
);



// clear fields


nameInput.value="";

phoneInput.value="";

amountInput.value="";



}else{


showToast(
data.message
);


}



}catch(error){


console.log(error);


showToast(
"❌ Server Error"
);


}




};



}/* =====================================
   PART 5/8
   NAVIGATION + TOAST + VIP
===================================== */



/* =========================
   TOAST SYSTEM
========================= */


function showToast(message){


let oldToast =
document.querySelector(".evaToast");


if(oldToast){

oldToast.remove();

}



let toast =
document.createElement("div");


toast.className="evaToast";


toast.innerHTML=message;



document.body.appendChild(toast);




setTimeout(()=>{


toast.classList.add("show");


},100);



setTimeout(()=>{


toast.classList.remove("show");



setTimeout(()=>{

toast.remove();

},300);



},3000);



}




/* =========================
   BOTTOM NAVIGATION
========================= */


const navItems =
document.querySelectorAll(".navItem");



const pages =
document.querySelectorAll(".page");




navItems.forEach(btn=>{


btn.onclick=()=>{


let target =
btn.dataset.page;



if(!target) return;




pages.forEach(page=>{


page.classList.remove("active");


});




let selected =
document.getElementById(target);



if(selected){

selected.classList.add("active");


}




navItems.forEach(item=>{


item.classList.remove("active");


});



btn.classList.add("active");



};



});





/* =========================
   VIP SYSTEM
========================= */


const vipButtons =
document.querySelectorAll(".buyVip");



vipButtons.forEach(btn=>{


btn.onclick=()=>{



if(!currentUser){


showToast(
"⚠ Login First For VIP"
);



loginModal.classList.add("show");


return;


}



let selectedPlan =
btn.dataset.plan;



showToast(

"💎 "+selectedPlan+
" Payment Required"

);



};



});





/* =========================
   PROFILE UPDATE BUTTON
========================= */


function refreshProfile(){


if(!currentUser){

return;

}



profileName.innerHTML =
currentUser.name;



profileEmail.innerHTML =
currentUser.phone;



profileWallet.innerHTML =
`PKR ${wallet}`;



profileRewards.innerHTML =
`PKR ${reward}`;



profileAds.innerHTML =
watched;



profilePlan.innerHTML =
plan;



}



refreshProfile();/* =====================================
   PART 6/8
   BETTER LOGIN + ACTIVITY SYSTEM
===================================== */



/* =========================
   ADD PASSWORD FIELD
========================= */


const passwordInput =
document.createElement("input");


passwordInput.type="password";

passwordInput.id="userPassword";

passwordInput.placeholder="Password";



const emailInput =
document.getElementById("userEmail");



if(emailInput){


emailInput.parentNode.insertBefore(
passwordInput,
emailInput.nextSibling
);


}




/* =========================
   UPDATE LOGIN BUTTON
========================= */


if(loginSubmit){



loginSubmit.onclick=async()=>{



const name =
document.getElementById("userName").value.trim();



const phone =
document.getElementById("userEmail").value.trim();



const password =
document.getElementById("userPassword").value.trim();





if(!phone || !password){


showToast(
"⚠ Phone and Password required"
);


return;


}




try{



// LOGIN FIRST


let loginResponse =
await fetch(`${API}/login`,{


method:"POST",

headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({

phone:phone,

password:password

})


});



let loginData =
await loginResponse.json();





if(loginData.success){


currentUser =
loginData.user;


localStorage.setItem(
"user",
JSON.stringify(currentUser)
);



loginModal.classList.remove("show");


loadUser();



showToast(
"✅ Welcome Back"
);


return;


}




// CREATE ACCOUNT


let registerResponse =
await fetch(`${API}/register`,{


method:"POST",

headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({

name:name || "Eva User",

phone:phone,

password:password


})


});



let registerData =
await registerResponse.json();



if(registerData.success){


showToast(
"✅ Account Created"
);



let autoLogin =
await fetch(`${API}/login`,{


method:"POST",

headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({

phone:phone,

password:password

})


});



let userData =
await autoLogin.json();



currentUser =
userData.user;



localStorage.setItem(
"user",
JSON.stringify(currentUser)
);



loginModal.classList.remove("show");


loadUser();



}else{


showToast(
registerData.message
);


}




}catch(error){


showToast(
"❌ Connection Error"
);


}



};



}




/* =========================
   WITHDRAW ACTIVITY BAR
========================= */


const names=[

"Ahmad",

"Zaka",

"Ali",

"Hamza",

"Usman",

"Ayesha",

"Sara",

"Fatima"

];



function startActivity(){


let activity =
document.getElementById("activityText");



if(!activity) return;



setInterval(()=>{


let randomName =
names[
Math.floor(
Math.random()*names.length
)
];



let randomAmount =
[
900,
1500,
3000,
5000,
9000
]
[
Math.floor(
Math.random()*5
)
];



activity.innerHTML =
`${randomName} Withdraw PKR ${randomAmount}`;



},4000);



}



startActivity();/* =====================================
   PART 7/8
   WITHDRAW HISTORY SYSTEM
===================================== */



let withdrawHistory = [];



async function loadWithdrawHistory(){



if(!currentUser){

return;

}



try{


let response =
await fetch(
`${API}/withdraw-history?phone=${currentUser.phone}`
);



let data =
await response.json();



if(data.success){


withdrawHistory =
data.withdraws || [];



showWithdrawHistory();


}



}catch(error){


console.log(
"Withdraw history error",
error
);


}



}




function showWithdrawHistory(){



let container =
document.getElementById(
"withdrawHistory"
);



if(!container){

return;

}




if(withdrawHistory.length===0){


container.innerHTML = `

<div class="emptyHistory">

No Withdraw History

</div>

`;


return;


}





container.innerHTML =
withdrawHistory.map(item=>{


return `

<div class="historyCard">


<div>

<b>
${item.method}
</b>

<p>
${item.name}
</p>

</div>



<div>

<h3>
PKR ${item.amount}
</h3>


<span>

${item.status}

</span>


</div>


</div>


`;


}).join("");



}




/* =========================
   LOAD WHEN LOGIN
========================= */


function afterLoginLoad(){


loadUser();


loadWithdrawHistory();


}/* =====================================
   PART 8/8
   FINAL APP INITIALIZATION
===================================== */


/* =========================
   BALANCE VISIBILITY
========================= */


const toggleBalance =
document.getElementById("toggleBalance");


let balanceVisible = true;



if(toggleBalance){


toggleBalance.onclick=()=>{


balanceVisible =
!balanceVisible;



if(walletText){


walletText.innerHTML =
balanceVisible
?
`PKR ${wallet}`
:
"PKR ****";


}



};


}




/* =========================
   THEME BUTTON
========================= */


const themeBtn =
document.getElementById("themeBtn");



if(themeBtn){


themeBtn.onclick=()=>{


document.body.classList.toggle(
"darkMode"
);



};


}




/* =========================
   CHECK USER SESSION
========================= */


window.addEventListener(
"load",
()=>{


if(currentUser){


loadUser();


loadWithdrawHistory();


}



}
);




/* =========================
   APP READY
========================= */


console.log(
"Eva Earning App Loaded Successfully"
);
