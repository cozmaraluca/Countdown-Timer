// Get elements from the DOM
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

//Buttons
const okButton = document.getElementById('btn');
const reloadButton = document.getElementById('reload-button');

//Inputs
const datePicker = document.getElementById('date');
const eventInput = document.getElementById('event-input');

//Containers
const inputContainer = document.getElementById('input-container');
const countdownContainer = document.getElementById('countdown-container');

//Text
const countdownText = document.getElementById('countdown-text');
const message = document.getElementById('message');
const h1 = document.getElementById('h1');

// Hide elements displayed after ok button click
countdownContainer.style.visibility = 'hidden';
reloadButton.style.visibility = 'hidden';
countdownText.style.visibility = 'hidden';

// Add event listener to the ok button
okButton.addEventListener('click',()=>{
     // Get input date and current date
    const inputDate = new Date(datePicker.value);
    const currentDate = new Date();

    //Get the selected type of event and display it
    var selectedValue = eventInput.options[eventInput.selectedIndex].value;
    countdownText.innerHTML = "until your " + selectedValue;

    // Check if date picker value is empty
    if (datePicker.value === "") {    
        // Display message to select a date
        message.textContent = "Please select a date before continuing!";
    }
    //Check if the date has already passed
    else if (inputDate <= currentDate) {    
        // Display message to select another date
        message.textContent = "Please select another date! This date has already passed.";
    } else {
        // Clear message and hide elements
        message.textContent = "";
        inputContainer.style.visibility = 'hidden';
        h1.style.visibility = 'hidden';
        //Make countdown container, text and button visible 
        countdownContainer.style.visibility = 'visible';
        reloadButton.style.visibility = 'visible';
        countdownText.style.visibility = 'visible';

        //initial call to countdown function
        countdown();

        // Set interval to call countdown function every second
        setInterval(countdown, 1000);
    }

});

// Add event listener to the reload button
reloadButton.addEventListener('click', () => {
            // Reload page to reenter another date
            location.reload();
});

// Countdown function
function countdown(){
    // Get input date and current date
    const inputDate = new Date(datePicker.value);
    const currentDate = new Date();

    // Calculate total seconds between input date and current date
    const totalSeconds = (inputDate - currentDate) / 1000;
    // Calculate days, hours, minutes and seconds remaining
    const days = Math.floor(totalSeconds / 3600 /24);
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const seconds = Math.floor(totalSeconds) % 60;


    // Update DOM elements with remaining time
    daysEl.innerHTML = formatTime(days);
    hoursEl.innerHTML = formatTime(hours);
    minutesEl.innerHTML = formatTime(minutes);
    secondsEl.innerHTML = formatTime(seconds);

}

// Format time function to add leading zero if time is less than 10
function formatTime(time){
    return time < 10 ? (`0${time}`) : time;
}



