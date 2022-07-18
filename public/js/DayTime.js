const bodyBackground = document.querySelector("body")
const date = document.querySelector(".date")
const greeting = document.querySelector('.greeting')


// Determine time of day to display the appropriate background image
const getTimeOfDay = () => {
    const currentHour = new Date().getHours();
    let timeOfDay = '';

    if (currentHour >= 4 && currentHour <= 11 ) {
        timeOfDay = 'morning'
    }
    else if (currentHour >= 12 && currentHour <= 15) {
        timeOfDay = 'afternoon'
    }
    else if (currentHour >= 16 && currentHour <= 18) {
        timeOfDay = 'evening'
    }
    else {
        timeOfDay = 'night'
    }

    return timeOfDay;
}


const timeOfDay = getTimeOfDay()

// Customise greeting
greeting.textContent = `Good ${timeOfDay}, here's your weather update`

bodyBackground.style.background = `url(images/${timeOfDay}.jpg) center/cover no-repeat`

// Displaying date on the result area
const today = new Date()
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
date.innerHTML = `
    <img src="images/icons/Icon material-date-range.svg" alt="">
    ${today.toLocaleDateString([], options)}
`;