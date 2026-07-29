/* =========================================
   EVA EARNING
   PART 1 / 10
   BASE + SPLASH + USER
========================================= */

const API = "/api";

let currentUser = JSON.parse(localStorage.getItem("user")) || null;

let wallet = 0;
let reward = 0;
let ads = 5;
let watched = 0;
let plan = "FREE PLAN";

const splash = document.getElementById("splash");
const app = document.getElementById("app");

window.addEventListener("load", () => {

setTimeout(() => {

splash.style.opacity = "0";

setTimeout(() => {

splash.style.display = "none";

app.classList.remove("hidden");

loadUser();

},500);

},5000);

});

const walletText = document.getElementById("wallet");
const rewardText = document.getElementById("todayReward");
const adsLeft = document.getElementById("adsLeft");
const adsWatched = document.getElementById("adsWatched");

const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");

const profileWallet = document.getElementById("profileWallet");
const profileRewards = document.getElementById("profileRewards");
const profileAds = document.getElementById("profileAds");
const profilePlan = document.getElementById("profilePlan");

function updateUI(){

if(walletText) walletText.innerHTML = "PKR " + wallet;

if(rewardText) rewardText.innerHTML = reward;

if(adsLeft) adsLeft.innerHTML = ads;

if(adsWatched) adsWatched.innerHTML = watched;

if(currentUser){

profileName.innerHTML = currentUser.name;

profileEmail.innerHTML = currentUser.phone;

profileWallet.innerHTML = "PKR " + wallet;

profileRewards.innerHTML = "PKR " + reward;

profileAds.innerHTML = watched;

profilePlan.innerHTML = plan;

}else{

profileName.innerHTML = "Guest User";

profileEmail.innerHTML = "Login Required";

profileWallet.innerHTML = "PKR 0";

profileRewards.innerHTML = "PKR 0";

profileAds.innerHTML = "0";

profilePlan.innerHTML = "FREE PLAN";

}

}

function loadUser(){

if(!currentUser){

updateUI();

return;

}

wallet = currentUser.wallet || 0;

reward = currentUser.reward || 0;

ads = currentUser.ads || 5;

watched = currentUser.watchedAds || 0;

plan = currentUser.plan || "FREE PLAN";

updateUI();

}

function saveUser(){

if(!currentUser) return;

currentUser.wallet = wallet;

currentUser.reward = reward;

currentUser.ads = ads;

currentUser.watchedAds = watched;

currentUser.plan = plan;

localStorage.setItem("user",JSON.stringify(currentUser));

}

loadUser();/* =========================================
   PART 2 / 10
   LOGIN + CREATE ACCOUNT
========================================= */

const loginBtn = document.getElementById("loginBtn");
const loginModal = document.getElementById("loginModal");
const loginSubmit = document.getElementById("loginSubmit");
const closeModal = document.querySelector(".closeModal");

const nameInput = document.getElementById("userName");
const phoneInput = document.getElementById("userEmail");

// Password field automatically add
const passwordInput = document.createElement("input");
passwordInput.type = "password";
passwordInput.id = "userPassword";
passwordInput.placeholder = "Password";

if (phoneInput && !document.getElementById("userPassword")) {
    phoneInput.parentNode.insertBefore(passwordInput, phoneInput.nextSibling);
}

if (loginBtn) {
    loginBtn.onclick = () => {
        loginModal.classList.add("show");
    };
}

if (closeModal) {
    closeModal.onclick = () => {
        loginModal.classList.remove("show");
    };
}

loginSubmit.onclick = async () => {

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const password = passwordInput.value.trim();

    if (!phone || !password) {
        showToast("Enter Phone & Password");
        return;
    }

    // ===== LOGIN =====
    try {

        const loginRes = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                phone,
                password
            })
        });

        const loginData = await loginRes.json();

        if (loginData.success) {

            currentUser = loginData.user;

            localStorage.setItem(
                "user",
                JSON.stringify(currentUser)
            );

            loginModal.classList.remove("show");

            loadUser();

            showToast("Welcome Back");

            return;
        }

    } catch (e) {}

    // ===== REGISTER =====
    if (!name) {
        showToast("Enter Full Name");
        return;
    }

    try {

        const registerRes = await fetch("/api/register", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name,
                phone,
                password
            })

        });

        const registerData = await registerRes.json();

        if (registerData.success) {

            showToast("Account Created");

            const again = await fetch("/api/login", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    phone,
                    password
                })

            });

            const userData = await again.json();

            if (userData.success) {

                currentUser = userData.user;

                localStorage.setItem(
                    "user",
                    JSON.stringify(currentUser)
                );

                loginModal.classList.remove("show");

                loadUser();

            }

        } else {

            showToast(registerData.message);

        }

    } catch (err) {

        console.log(err);

        showToast("Connection Error");

    }

};/* =========================================
   PART 3 / 10
   TOAST + NAVIGATION + LOGOUT
========================================= */

function showToast(message){

const old = document.querySelector(".evaToast");

if(old) old.remove();

const toast = document.createElement("div");

toast.className = "evaToast";

toast.innerHTML = message;

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


// Bottom Navigation

const navItems = document.querySelectorAll(".navItem");

const pages = document.querySelectorAll(".page");

navItems.forEach(btn=>{

btn.onclick = ()=>{

const target = btn.dataset.page;

pages.forEach(page=>{

page.classList.remove("active");

});

document.getElementById(target).classList.add("active");

navItems.forEach(item=>{

item.classList.remove("active");

});

btn.classList.add("active");

};

});


// Logout

const logoutBtn = document.getElementById("logoutBtn");

if(logoutBtn){

logoutBtn.onclick = ()=>{

localStorage.removeItem("user");

currentUser = null;

wallet = 0;

reward = 0;

ads = 5;

watched = 0;

plan = "FREE PLAN";

updateUI();

showToast("Logged Out");

};

}/* =========================================
   PART 4 / 10
   WATCH AD SYSTEM
========================================= */

const watchBtn = document.getElementById("watchAd");
const timer = document.getElementById("timer");

if (watchBtn) {

watchBtn.onclick = () => {

if (!currentUser) {

showToast("Please Login First");

loginModal.classList.add("show");

return;

}

if (ads <= 0) {

showToast("No Ads Remaining Today");

return;

}

watchBtn.disabled = true;

let seconds = 15;

timer.innerHTML = "⏳ " + seconds + "s";

const countdown = setInterval(() => {

seconds--;

timer.innerHTML = "⏳ " + seconds + "s";

if (seconds <= 0) {

clearInterval(countdown);

wallet += 100;

reward += 100;

ads--;

watched++;

saveUser();

updateUI();

timer.innerHTML = "🎉 PKR 100 Added";

showToast("Reward Added");

watchBtn.disabled = false;

}

}, 1000);

};

}/* =========================================
   PART 5 / 10
   WITHDRAW SYSTEM
========================================= */

const withdrawBtn = document.getElementById("withdrawBtn");

const methodInput = document.getElementById("method");
const withdrawName = document.getElementById("withdrawName");
const withdrawPhone = document.getElementById("withdrawPhone");
const withdrawAmount = document.getElementById("withdrawAmount");

if (withdrawBtn) {

withdrawBtn.onclick = async () => {

if (!currentUser) {

showToast("Please Login First");

loginModal.classList.add("show");

return;

}

const method = methodInput.value;
const name = withdrawName.value.trim();
const number = withdrawPhone.value.trim();
const amount = Number(withdrawAmount.value);

if (!name || !number || !amount) {

showToast("Fill All Fields");

return;

}

if (amount < 50) {

showToast("Minimum Withdraw PKR 50");

return;

}

if (plan === "FREE PLAN" && amount > 50) {

showToast("Free Plan Limit PKR 50");

return;

}

if (wallet < amount) {

showToast("Insufficient Balance");

return;

}

try {

const response = await fetch("/api/withdraw", {

method: "POST",

headers: {
"Content-Type": "application/json"
},

body: JSON.stringify({

phone: currentUser.phone,

method,

name,

number,

amount

})

});

const data = await response.json();

if (data.success) {

wallet -= amount;

saveUser();

updateUI();

withdrawName.value = "";
withdrawPhone.value = "";
withdrawAmount.value = "";

showToast("Withdraw Request Sent");

} else {

showToast(data.message);

}

} catch (e) {

showToast("Server Error");

}

};

}/* =========================================
   PART 6 / 10
   VIP + THEME + BALANCE
========================================= */

// VIP Buttons

const vipButtons = document.querySelectorAll(".buyVip");

vipButtons.forEach(btn => {

btn.onclick = () => {

if (!currentUser) {

showToast("Please Login First");

loginModal.classList.add("show");

return;

}

const selectedPlan = btn.dataset.plan;

showToast(selectedPlan + " Activation Coming Soon");

};

});


// Balance Hide / Show

const toggleBalance = document.getElementById("toggleBalance");

let balanceVisible = true;

if (toggleBalance) {

toggleBalance.onclick = () => {

balanceVisible = !balanceVisible;

walletText.innerHTML = balanceVisible
? "PKR " + wallet
: "PKR ****";

};

}


// Theme Button

const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {

themeBtn.onclick = () => {

document.body.classList.toggle("darkMode");

};

}/* =========================================
   PART 7 / 10
   ACTIVITY + HISTORY
========================================= */

const names = [
"Ahmad",
"Ali",
"Hamza",
"Usman",
"Zaka",
"Ayesha",
"Fatima",
"Sara"
];

function startActivity(){

const activity = document.getElementById("activityText");

if(!activity) return;

setInterval(()=>{

const randomName =
names[Math.floor(Math.random()*names.length)];

const amounts = [900,1500,3000,5000,9000];

const randomAmount =
amounts[Math.floor(Math.random()*amounts.length)];

activity.innerHTML =
`${randomName} Withdraw PKR ${randomAmount}`;

},4000);

}

startActivity();



async function loadWithdrawHistory(){

if(!currentUser) return;

try{

const res = await fetch(
`/api/withdraw-history?phone=${currentUser.phone}`
);

const data = await res.json();

if(!data.success) return;

const box =
document.getElementById("withdrawHistory");

if(!box) return;

if(data.withdraws.length===0){

box.innerHTML =
"<p>No Withdraw History</p>";

return;

}

box.innerHTML = "";

data.withdraws.forEach(item=>{

box.innerHTML += `

<div class="historyCard">

<b>${item.method}</b><br>

${item.name}<br>

PKR ${item.amount}<br>

${item.status}

</div>

`;

});

}catch(err){

console.log(err);

}

}/* =========================================
   PART 8 / 10
   APP INITIALIZATION
========================================= */

function afterLogin(){

loadUser();

loadWithdrawHistory();

updateUI();

}


// Load App

window.addEventListener("load",()=>{

if(currentUser){

afterLogin();

}else{

updateUI();

}

});


// Refresh Profile

function refreshProfile(){

if(!currentUser) return;

profileName.innerHTML = currentUser.name;

profileEmail.innerHTML = currentUser.phone;

profileWallet.innerHTML = "PKR " + wallet;

profileRewards.innerHTML = "PKR " + reward;

profileAds.innerHTML = watched;

profilePlan.innerHTML = plan;

}

refreshProfile();

console.log("Eva Earning Loaded");/* =========================================
   PART 9 / 10
   BOTTOM NAVIGATION
========================================= */

const navItems = document.querySelectorAll(".navItem");
const pages = document.querySelectorAll(".page");

navItems.forEach(btn=>{

btn.onclick=()=>{

const target = btn.dataset.page;

pages.forEach(page=>{

page.classList.remove("active");

});

const selected =
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


/* =========================================
   CLOSE LOGIN MODAL ON OUTSIDE CLICK
========================================= */

window.onclick = function(e){

if(e.target===loginModal){

loginModal.classList.remove("show");

}

};/* =========================================
   PART 10 / 10
   FINAL FUNCTIONS
========================================= */

// Save user locally

function saveUser(){

if(!currentUser) return;

currentUser.wallet = wallet;
currentUser.reward = reward;
currentUser.ads = ads;
currentUser.watchedAds = watched;
currentUser.plan = plan;

localStorage.setItem(
"user",
JSON.stringify(currentUser)
);

refreshProfile();

}


// Clear login form

function clearLoginForm(){

const name = document.getElementById("userName");
const phone = document.getElementById("userEmail");
const password = document.getElementById("userPassword");

if(name) name.value = "";
if(phone) phone.value = "";
if(password) password.value = "";

}


// App Ready

document.addEventListener("DOMContentLoaded",()=>{

updateUI();

if(currentUser){

loadUser();

loadWithdrawHistory();

}

console.log("Eva Earning Ready ✅");

});
