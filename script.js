window.addEventListener("scroll", () => {
    const navbar = document.getElementById("header");
    navbar.classList.toggle("sticky", window.scrollY > 0);
});

const iconToggle = document.getElementById("icon-toggle");
const listItems = document.getElementById("list-items");
const homeinfo = document.getElementById("home-info");
//Adding click events to icon menu
iconToggle.onclick = function () {
    iconToggle.classList.toggle("active");
    listItems.classList.toggle("active");
    homeinfo.classList.toggle("display");
}

//removing mobile view
const items = document.getElementsByClassName("items");

// loop over each item to remove the mobile view
for (let i = 0; i < items.length; i++) {
    items[i].onclick = function () {
        listItems.getElementsByClassName("active")[0].classList.remove("active");
        this.classList.add("active");
        iconToggle.classList.remove("active");
        listItems.classList.remove("active");
        homeinfo.classList.toggle("display");
    }
}

//form inputs

//get textDiv
var textDiv = document.getElementById("textDiv");
var form = document.getElementById("form");

form.addEventListener("submit", calculateResult);

{/* form elements */ }

//form validation
var userName;
var userNameValue;
var idealSleepHours = 8;
var days;
var dayValue;
var actualSleepHours;
var actualSleepHoursValue;

function calculateResult(e) {
    e.preventDefault();

    userName = document.getElementById("userName");
    userNameValue = userName.value;
    console.log(userNameValue);
    days = document.getElementById("day");
    dayValue = days.value;
    actualSleepHours = document.getElementById("number");
    actualSleepHoursValue = actualSleepHours.value;


    if (userNameValue === '' || userNameValue === null) {
        setErrorFor(userName, 'UserName is required');
    } else {
        setSuccessFor(userName);
    }

    if (dayValue === '' || !(validateDay(dayValue))) {
        setErrorFor(days, 'Please provide a day!');
    } else {
        setSuccessFor(days);
        calculateSleepDebt();
        clearForm();
    }

    if (actualSleepHoursValue === '' || isNaN(actualSleepHoursValue)) {
        setErrorFor(actualSleepHours, 'Please enter a number!');
    } else {
        setSuccessFor(actualSleepHours);
    }
  
   
}

//error and success check
function setErrorFor(input, message) {
    const formControl = input.parentElement; //form-input
    const small = formControl.querySelector('small');
    //add error message
    small.innerText = message;

    //add error class
    small.style.visibility = "visible";
    small.style.marginLeft = 0;

}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    //remove errorclass
    small.style.visibility = "hidden";
}

//calculator logic
//create a function to get sleep hours between monday-sunday
const validateDay = (day) => {
    day = day.toLowerCase();
    console.log("day is triggered");

    if (day === 'monday' || day === 'tuesday' || day === 'wednesday' || day === 'thursday' || day === 'friday' || day === 'saturday' || day === 'sunday') {
        return true;
    } else {
        return false;
    }
};

const calculateSleepDebt = () => {
    if (actualSleepHoursValue == idealSleepHours) {
        textDiv.innerText = `Hello ${userNameValue}, You got the perfect amount of sleep today!`;
    } else if (actualSleepHoursValue > idealSleepHours) {
        textDiv.innerText = `Hello ${userNameValue}, You got ${actualSleepHoursValue - idealSleepHours} hour/s more sleep than you ideally need today. Sleep less and get busy!`;
        console.log(actualSleepHoursValue);
    } else if (actualSleepHoursValue < idealSleepHours) {
        textDiv.innerText = `Hello ${userNameValue}, You got ${idealSleepHours - actualSleepHoursValue} hour/s less sleep than you should today. Get some more sleep!`;
    } else {
        textDiv.innerText = `Hello ${userNameValue}, Error, something is missing!`;
    }
}

const clearForm = () => {
    form.reset();
setTimeout(function(){
    textDiv.innerText = "Your result appears here!";
}, 6000);
};
