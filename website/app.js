/* Global Variables */
// Create a new date instance dynamically with JS
let d = new Date();
// Dynamic date, add +1 to getMonth(because it starts from zero)
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API key for OpenWeatherMap API
const APIKey = "e6bcab3619c1c2b2c9ce98325331ea90";

// generate is the button on the weather form
// Event listener to add function to existing HTML DOM element
// The Event listener will generate when the user will click on the generate button
document.getElementById("generate").addEventListener("click", async() => {
    const zipCode = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings" ).value;
    
    // Check if the zipcode value is empty or not if empty make an alert message
    if(!zipCode){
        alert("please enter the country's zip code");
    }
    else{ // try and catch => if there an error catch it and print it to the console
        try{
            // &units=metric to get the tempreature in celsius
            const URL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${APIKey}&units=metric`;
            // fetch data making res json to handle the data
            const res = await fetch(URL);
            const data = await res.json();
            // Saving the temp in a const variable
            const temp = data.main.temp;
    
            // call the post data function
            await postData(temp, feelings);
    
            // call the updateUI function
            await updateUI();
    
        }catch(error){
            //to handle the error
            console.log("error",error);
        }
    }
});

// POST method is to access the POST route on the server side
async function postData(temp, feelings){
    // Post request
    await fetch('/setTemp', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        // Body data type must match "Content-Type" header
        body: JSON.stringify({
            date: newDate,
            temp: temp,
            feelings: feelings
        })
    }); 
}

// To show the data
async function updateUI(){
    //fetching the data from the server projectData
    const response = await fetch('/temp');
    const allData = await response.json();
    try{ // showing the data dynamically using innerHTML
        document.getElementById('date').innerHTML = `Date: ${allData.date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${allData.temp}`;
        document.getElementById('content').innerHTML = `Feeling: ${allData.feelings}`;
    }catch(error){
        console.log("error", error);
        //to handle the error
    }
}