/* ====================================
   EVA EARNING PREMIUM
   SCRIPT.JS - PART 1
==================================== */

const splash=document.getElementById("splash");
const app=document.getElementById("app");

window.addEventListener("load",()=>{

setTimeout(()=>{

splash.style.opacity="0";
splash.style.transition=".6s";

setTimeout(()=>{

splash.style.display="none";
app.classList.remove("hidden");

},600);

},5000);

});

/* ==========================
   LOCAL STORAGE
========================== */

let wallet=Number(localStorage.getItem("wallet"))||0;
let reward=Number(localStorage.getItem("reward"))||0;
let ads=Number(localStorage.getItem("ads"))||5;
let watched=Number(localStorage.getItem("watched"))||0;

let plan=localStorage.getItem("plan")||"FREE PLAN";

let username=localStorage.getItem("username")||"Guest User";
let email=localStorage.getItem("email")||"guest@example.com";

let balanceVisible=true;

/* ==========================
   ELEMENTS
========================== */

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

/* ==========================
   UPDATE UI
========================== */

function updateUI(){

walletText.innerHTML=balanceVisible?`PKR ${wallet}`:"PKR •••••";

rewardText.innerHTML=reward;
adsLeft.innerHTML=ads;
adsWatched.innerHTML=watched;

profileWallet.innerHTML=`PKR ${wallet}`;
profileRewards.innerHTML=`PKR ${reward}`;
profileAds.innerHTML=watched;
profilePlan.innerHTML=plan;
profileName.innerHTML=username;
profileEmail.innerHTML=email;

}

updateUI();/* ==========================
   LIVE ACTIVITY TICKER
========================== */

const activity=document.getElementById("activityText");

const names=[
"Ahmad",
"Ali",
"Usman",
"Hamza",
"Bilal",
"Ayesha",
"Sana",
"Fatima",
"Hina",
"Zoya",
"Zain",
"Umer",
"Danish",
"Rizwan",
"Abdullah",
"Laiba",
"Noor",
"Anaya",
"Iqra",
"Saad"
];

const actions=[
"withdrew",
"received",
"earned",
"claimed"
];

const amounts=[
100,
200,
300,
500,
700,
900,
1000,
1200,
1500,
2000,
2500,
3000,
5000,
8000,
10000
];

function activityTicker(){

const randomName=
names[Math.floor(Math.random()*names.length)];

const randomAction=
actions[Math.floor(Math.random()*actions.length)];

const randomAmount=
amounts[Math.floor(Math.random()*amounts.length)];

activity.innerHTML=
`✅ <b>${randomName}</b> ${randomAction} <span style="color:#16A34A;">PKR ${randomAmount}</span>`;

}

activityTicker();

setInterval(activityTicker,2500);

/* ==========================
   BALANCE SHOW / HIDE
========================== */

const toggleBtn=document.getElementById("toggleBalance");

if(toggleBtn){

toggleBtn.onclick=()=>{

balanceVisible=!balanceVisible;

toggleBtn.innerHTML=balanceVisible
?'<span class="material-symbols-rounded">visibility</span>'
:'<span class="material-symbols-rounded">visibility_off</span>';

updateUI();

};

}

/* ==========================
   PREMIUM TOAST
========================== */

function showToast(message){

const toast=document.createElement("div");

toast.className="toast";

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

},2500);

}/* ==========================
   THEME + LOGIN SYSTEM
========================== */

const themeBtn=document.getElementById("themeBtn");

if(localStorage.getItem("theme")=="dark"){
document.body.classList.add("dark");
}

themeBtn.onclick=()=>{

document.body.classList.toggle("dark");

localStorage.setItem(
"theme",
document.body.classList.contains("dark")
?"dark":"light"
);

showToast("🎨 Theme Updated");

};

/* ==========================
   LOGIN
========================== */

const loginBtn=document.getElementById("loginBtn");
const loginModal=document.getElementById("loginModal");

loginBtn.onclick=()=>{

loginModal.classList.add("show");

};

document.querySelector(".closeModal").onclick=()=>{

loginModal.classList.remove("show");

};

document.getElementById("loginSubmit").onclick=()=>{

const name=document.getElementById("userName").value.trim();

const mail=document.getElementById("userEmail").value.trim();

if(name==""){

showToast("⚠ Enter your full name");

return;

}

username=name;
email=mail||"guest@example.com";

localStorage.setItem("username",username);
localStorage.setItem("email",email);

updateUI();

loginModal.classList.remove("show");

showToast("👋 Welcome "+username);

};

/* ==========================
   WATCH AD
========================== */

const watchBtn=document.getElementById("watchAd");
const timer=document.getElementById("timer");

watchBtn.onclick=()=>{

if(ads<=0){

showToast("❌ No Ads Remaining Today");

return;

}

watchBtn.disabled=true;

let sec=15;

timer.innerHTML=`⏳ ${sec}s`;

const countdown=setInterval(()=>{

sec--;

timer.innerHTML=`⏳ ${sec}s`;

if(sec<=0){

clearInterval(countdown);

wallet+=100;
reward+=100;
ads--;
watched++;

localStorage.setItem("wallet",wallet);
localStorage.setItem("reward",reward);
localStorage.setItem("ads",ads);
localStorage.setItem("watched",watched);

updateUI();

timer.innerHTML="🎉 +PKR 100 Added";

watchBtn.disabled=false;

showToast("✅ Reward Added");

if(navigator.vibrate){

navigator.vibrate(150);

}

}

},1000);

};/* ==========================
   VIP PLANS
========================== */

const paymentModal=document.getElementById("paymentModal");

let selectedPlan="FREE PLAN";

document.querySelectorAll(".buyVip").forEach(btn=>{

btn.onclick=()=>{

selectedPlan=btn.dataset.plan;

paymentModal.classList.add("show");

showToast("💎 "+selectedPlan+" Selected");

};

});

/* ==========================
   PAYMENT MODAL
========================== */

document.getElementById("closePayment").onclick=()=>{

paymentModal.classList.remove("show");

};

document.getElementById("copyIban").onclick=async()=>{

try{

await navigator.clipboard.writeText(
"PK88TMFB0000000037817113"
);

showToast("📋 IBAN Copied");

}catch{

showToast("❌ Copy Failed");

}

};

/* ==========================
   BOTTOM NAVIGATION
========================== */

const navItems=document.querySelectorAll(".navItem");
const pages=document.querySelectorAll(".page");

navItems.forEach(btn=>{

btn.onclick=()=>{

const page=btn.dataset.page;

if(!page) return;

navItems.forEach(item=>
item.classList.remove("active")
);

btn.classList.add("active");

pages.forEach(p=>
p.classList.remove("active")
);

document
.getElementById(page)
.classList.add("active");

window.scrollTo({

top:0,
behavior:"smooth"

});

};

});

/* ==========================
   CLOSE MODALS
========================== */

window.onclick=(e)=>{

if(e.target===loginModal){

loginModal.classList.remove("show");

}

if(e.target===paymentModal){

paymentModal.classList.remove("show");

}

};/* ==========================
   WITHDRAW SYSTEM
========================== */

document.getElementById("withdrawBtn").onclick=()=>{

const name=document.getElementById("withdrawName").value.trim();
const phone=document.getElementById("withdrawPhone").value.trim();
const amount=Number(document.getElementById("withdrawAmount").value);
const method=document.getElementById("method").value;

if(name==""||phone==""||amount<=0){

showToast("⚠ Please fill all fields");

return;

}

if(amount>wallet){

showToast("❌ Insufficient Wallet Balance");

return;

}

if(plan==="FREE PLAN" && amount>50){

showToast("❌ Free Plan Daily Limit is PKR 50");

return;

}

wallet-=amount;

localStorage.setItem("wallet",wallet);

let history=JSON.parse(
localStorage.getItem("withdrawHistory")||"[]"
);

history.unshift({

name,
phone,
method,
amount,
plan,
status:"Pending",
date:new Date().toLocaleString()

});

localStorage.setItem(
"withdrawHistory",
JSON.stringify(history)
);

updateUI();

showToast("✅ Withdraw Request Submitted");

document.getElementById("withdrawName").value="";
document.getElementById("withdrawPhone").value="";
document.getElementById("withdrawAmount").value="";

};

/* ==========================
   LOGOUT
========================== */

document.getElementById("logoutBtn").onclick=()=>{

if(!confirm("Logout from Eva Earning?")) return;

localStorage.removeItem("username");
localStorage.removeItem("email");

username="Guest User";
email="guest@example.com";

updateUI();

showToast("👋 Logged Out");

};

/* ==========================
   DAILY RESET
========================== */

const today=new Date().toDateString();

const lastDay=
localStorage.getItem("lastDay");

if(lastDay!==today){

ads=(plan==="FREE PLAN")?5:10;
reward=0;

localStorage.setItem("ads",ads);
localStorage.setItem("reward",reward);
localStorage.setItem("lastDay",today);

updateUI();

}

/* ==========================
   AUTO SAVE
========================== */

function saveData(){

localStorage.setItem("wallet",wallet);
localStorage.setItem("reward",reward);
localStorage.setItem("ads",ads);
localStorage.setItem("watched",watched);
localStorage.setItem("plan",plan);

}

setInterval(saveData,3000);

/* ==========================
   APP START
========================== */

updateUI();

showToast("🚀 Eva Earning Ready");

console.log("Eva Earning Premium Loaded");/* ==========================
   PREMIUM FEATURES
========================== */

/* Floating Withdraw Notification */

const floatingNames=[
"Ahmad","Ali","Hamza","Bilal","Usman",
"Ayesha","Fatima","Hina","Zain","Umer",
"Saad","Danish","Noor","Iqra","Laiba",
"Abdullah","Anaya","Rizwan","Sana","Zoya"
];

const floatingAmounts=[
500,700,900,1000,1200,
1500,1800,2000,2500,
3000,3500,5000,8000,
10000,12000
];

function liveWithdraw(){

const box=document.createElement("div");

box.className="liveWithdraw";

const person=
floatingNames[Math.floor(Math.random()*floatingNames.length)];

const amount=
floatingAmounts[Math.floor(Math.random()*floatingAmounts.length)];

box.innerHTML=`
<div class="liveLeft">
<span class="material-symbols-rounded">
verified
</span>
</div>

<div class="liveRight">

<b>${person}</b><br>

<span>
Withdraw PKR ${amount}
</span>

</div>
`;

document.body.appendChild(box);

setTimeout(()=>{

box.classList.add("show");

},200);

setTimeout(()=>{

box.classList.remove("show");

setTimeout(()=>{

box.remove();

},500);

},3500);

}

setInterval(liveWithdraw,6000);

/* ==========================
   REWARDED ADS READY
========================== */

function showRewardedAd(callback){

/*
Replace this section later with
Monetag / Adsterra Rewarded Ads.

Example:

show_9675345().then(()=>{
callback();
});

*/

setTimeout(()=>{

callback();

},15000);

}

/* ==========================
   BALANCE ANIMATION
========================== */

function animateWallet(){

walletText.animate([

{
transform:"scale(1)"
},

{
transform:"scale(1.08)"
},

{
transform:"scale(1)"
}

],{

duration:400

});

}

/* Reward Animation */

const oldUpdate=updateUI;

updateUI=function(){

oldUpdate();

animateWallet();

};

/* ==========================
   START LIVE SYSTEM
========================== */

liveWithdraw();

console.log("Premium Features Loaded ✅");
