/* ====================================
   EVA EARNING
   SCRIPT.JS PART 1
==================================== */

const splash=document.getElementById("splash");
const app=document.getElementById("app");

window.addEventListener("load",()=>{

setTimeout(()=>{

splash.style.opacity="0";

setTimeout(()=>{

splash.style.display="none";

app.classList.remove("hidden");

},500);

},5000);

});

/* --------------------
   LOCAL STORAGE
-------------------- */

let wallet=parseInt(localStorage.getItem("wallet"))||0;
let reward=parseInt(localStorage.getItem("reward"))||0;
let ads=parseInt(localStorage.getItem("ads"))||5;
let watched=parseInt(localStorage.getItem("watched"))||0;

let plan=localStorage.getItem("plan")||"FREE PLAN";

let username=localStorage.getItem("username")||"Guest User";
let email=localStorage.getItem("email")||"guest@example.com";

/* --------------------
   UI UPDATE
-------------------- */

function updateUI(){

document.getElementById("wallet").innerHTML=
"PKR "+wallet;

document.getElementById("todayReward").innerHTML=
reward;

document.getElementById("adsLeft").innerHTML=
ads;

document.getElementById("adsWatched").innerHTML=
watched;

document.getElementById("profileWallet").innerHTML=
"PKR "+wallet;

document.getElementById("profileRewards").innerHTML=
"PKR "+reward;

document.getElementById("profileAds").innerHTML=
watched;

document.getElementById("profilePlan").innerHTML=
plan;

document.getElementById("profileName").innerHTML=
username;

document.getElementById("profileEmail").innerHTML=
email;

}

updateUI();

/* --------------------
   DEMO ACTIVITY
-------------------- */

const activity=document.getElementById("activityText");

const names=[

"Ahmad",
"Ali",
"Fatima",
"Hina",
"Usman",
"Bilal",
"Ayesha",
"Zain",
"Hamza",
"Sana",
"Umer",
"Zoya"

];

const amounts=[

100,
200,
300,
500,
700,
900,
1000,
1500,
2500

];

function activityTicker(){

let name=
names[Math.floor(Math.random()*names.length)];

let amount=
amounts[Math.floor(Math.random()*amounts.length)];

activity.innerHTML=
`🟢 <b>${name}</b> completed a demo reward • PKR ${amount}`;

}

activityTicker();

setInterval(activityTicker,3000);

/* --------------------
   THEME
-------------------- */

const themeBtn=document.getElementById("themeBtn");

themeBtn.onclick=()=>{

document.body.classList.toggle("dark");

localStorage.setItem(
"theme",
document.body.classList.contains("dark")
?"dark":"light"
);

};

if(localStorage.getItem("theme")=="dark"){

document.body.classList.add("dark");

}/* ============================
   LOGIN SYSTEM
============================ */

const loginBtn=document.getElementById("loginBtn");
const loginModal=document.getElementById("loginModal");

loginBtn.onclick=()=>{

loginModal.style.display="flex";

};

document.querySelector(".closeModal").onclick=()=>{

loginModal.style.display="none";

};

document.getElementById("loginSubmit").onclick=()=>{

const name=document.getElementById("userName").value.trim();

const mail=document.getElementById("userEmail").value.trim();

if(name==""){

alert("Please enter your name.");

return;

}

username=name;
email=mail;

localStorage.setItem("username",username);
localStorage.setItem("email",email);

loginModal.style.display="none";

updateUI();

alert("Welcome "+username);

};

/* ============================
   WATCH DEMO AD
============================ */

const watchBtn=document.getElementById("watchAd");

const timer=document.getElementById("timer");

watchBtn.onclick=()=>{

if(ads<=0){

alert("Today's demo ads are finished.");

return;

}

watchBtn.disabled=true;

let sec=15;

timer.innerHTML="⏳ "+sec+" sec";

const interval=setInterval(()=>{

sec--;

timer.innerHTML="⏳ "+sec+" sec";

if(sec<=0){

clearInterval(interval);

wallet+=100;

reward+=100;

ads--;

watched++;

localStorage.setItem("wallet",wallet);

localStorage.setItem("reward",reward);

localStorage.setItem("ads",ads);

localStorage.setItem("watched",watched);

updateUI();

timer.innerHTML="🎉 Demo Reward Added +PKR 100";

watchBtn.disabled=false;

}

},1000);

};

/* ============================
   VIP BUTTONS
============================ */

document.querySelectorAll(".buyVip").forEach(btn=>{

btn.onclick=()=>{

document.getElementById("paymentModal").style.display="flex";

};

});

document.getElementById("closePayment").onclick=()=>{

document.getElementById("paymentModal").style.display="none";

};

document.getElementById("copyIban").onclick=()=>{

navigator.clipboard.writeText(
"PK88TMFB0000000037817113"
);

alert("IBAN Copied");

};/* ============================
   BOTTOM NAVIGATION
============================ */

const navItems=document.querySelectorAll(".navItem");
const pages=document.querySelectorAll(".page");

navItems.forEach(item=>{

item.onclick=()=>{

navItems.forEach(i=>i.classList.remove("active"));

item.classList.add("active");

pages.forEach(page=>page.classList.remove("active"));

document
.getElementById(item.dataset.page)
.classList.add("active");

};

});

/* ============================
   WITHDRAW
============================ */

document.getElementById("withdrawBtn").onclick=()=>{

const name=document.getElementById("withdrawName").value.trim();

const phone=document.getElementById("withdrawPhone").value.trim();

const amount=document.getElementById("withdrawAmount").value;

if(name==""||phone==""||amount==""){

alert("Please fill all fields.");

return;

}

let history=JSON.parse(localStorage.getItem("withdrawHistory")||"[]");

history.push({

name,
phone,
amount,
method:document.getElementById("method").value,
date:new Date().toLocaleString()

});

localStorage.setItem(
"withdrawHistory",
JSON.stringify(history)
);

alert("✅ Demo withdrawal request submitted.");

};

/* ============================
   LOGOUT
============================ */

document.getElementById("logoutBtn").onclick=()=>{

if(confirm("Logout?")){

localStorage.removeItem("username");
localStorage.removeItem("email");

location.reload();

}

};

/* ============================
   DAILY RESET
============================ */

const lastReset=
Number(localStorage.getItem("lastReset"))||Date.now();

const now=Date.now();

if(now-lastReset>=86400000){

ads=5;
reward=0;

localStorage.setItem("ads",5);
localStorage.setItem("reward",0);
localStorage.setItem("lastReset",now);

updateUI();

}

/* ============================
   CLICK OUTSIDE MODAL
============================ */

window.onclick=(e)=>{

if(e.target==loginModal){

loginModal.style.display="none";

}

if(e.target==document.getElementById("paymentModal")){

document.getElementById("paymentModal").style.display="none";

}

};

/* ============================
   START
============================ */

updateUI();

console.log("Eva Earning Premium Demo Loaded.");
