let button = document.querySelector('.button');
let inputValue = document.querySelector('.inputValue');
let temp = document.querySelector('.temp');
let desc = document.querySelector('.desc');
let humidity = document.querySelector('.humidity')
let city = document.querySelector('.city');
let picture = document.querySelector('.picture');
const output = document.querySelector('.output');
const arr = [];
let showMore = document.querySelector('.showMore');
let weatherArr = getFromLocalStorage();


//Scroll down/up sumažina/padidina NAV juostą
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (window.scrollY > 80) {
        document.querySelector(".nav1").style.height = "40px";
        document.querySelector(".nav1").style.transition = "all 1s";
    } else {
        document.querySelector(".nav1").style.height = "60px";
        document.querySelector(".nav1").style.transition = "all 1s";
    }
  }

function saveToLocalStorage(arr) {
    const toJSON = JSON.stringify(arr);
    localStorage.setItem('weather', toJSON);
}

function getFromLocalStorage() {
    const weatherJson = localStorage.getItem('weather');
    const weather = JSON.parse(weatherJson);
    return weather || [];
}

// Show more juosta
function showMoreEffect(number) {
    if (number > 3) {
        document.querySelector(".more").style.height = "110px";
        document.querySelector(".export").style.height = "400px";
    } else {
        document.querySelector(".more").style.height = "0px";
    };

};

// tikrinam ar nesidubliuoja
function alreadyEntered (miestas) {
    return miestas.city.toLowerCase() === inputValue.value.toLowerCase();
}


showMore.addEventListener('click',function(){
    document.querySelector(".more").style.height = "0px";
    document.querySelector(".export").style.height = "auto";
});

    button.addEventListener('click',function(){
        if (weatherArr.find(alreadyEntered) != undefined) {
            alert ("miestas jau suvvestas")
        } else {
        fetch('http://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=790dff15e5ecdde73da819196a127634&units=metric')
        .then(response => response.json())
        .then( data => {
     
        let cityValue = data.name;
        let tempValue = data.main.temp;
        let humidityValue = data.main.humidity;
        let descValue = data.weather[0].description;
        let pictureValue = data.weather[0].icon;
        pictureSrc = 'http://openweathermap.org/img/wn/'+pictureValue+'@2x.png';


        // gaunam datą
        const date = new Date();
        const id = date.getTime();
        // išsisaugom į arrėjų:

        const card = {
            city: data.name,
            temp: data.main.temp,
            humidity: data.main.humidity,
            descValue: data.weather[0].description,
            picture: data.weather[0].icon,
            id: id,
        }
        // localiai isaugome note i wearherArr
        weatherArr.push(card);
    
        // isaugome tuos pacius notes i localStorage (dummy backend)
        saveToLocalStorage(weatherArr);
       

        let element = document.createElement("div");
        let btnDlt = document.createElement("button");
        btnDlt.textContent = "-";
        element.setAttribute("class", "card");
        const exportField = document.querySelector('.export');
        
        element.innerHTML = `
            <div>${cityValue}</div>
            <img src="${pictureSrc}" alt="">
            <div>Temp: ${tempValue} C</div>
            <div>Description: ${descValue}</div>
            <div>Humidity: ${humidityValue} %</div>
            <div>retrieved on: ${date}</div>
        `;
        exportField.appendChild(element);
        element.appendChild(btnDlt);
        btnDlt.classList.add("delete");
        
        
        btnDlt.addEventListener('click',function(){
            element.remove();
            let sum = document.querySelectorAll(".card").length;
            showMoreEffect(sum);
            weatherArr = weatherArr.filter(function(element) {
                return element.id !== id;
            })
            saveToLocalStorage(weatherArr);
        });
        btnDlt.addEventListener("mouseover", function(){
            btnDlt.textContent = "x";
        });
        btnDlt.addEventListener("mouseout", function(){
            btnDlt.textContent = "-";
        });
        let sum = document.querySelectorAll(".card").length;
        showMoreEffect(sum);
    })   
    .catch(err => alert("Wrong city name!"))
}
});














    // delete button
    
    // buttonDelete.addEventListener('mouseenter', function() { 
    //     // buttonDelete.innerHTML = "X";
    //     console.log("hello world");
    // });
    // btnDlt = document.querySelector('.delete');
    // btnDlt.addEventListener('click',function(){
    //     console.log("hello world");
    // });



/// Veikianti versija kuri tik išspausdina

// var button = document.querySelector('.button');
// var inputValue = document.querySelector('.inputValue');
// var temp = document.querySelector('.temp');
// var desc = document.querySelector('.desc');
// var humidity = document.querySelector('.humidity')
// var city = document.querySelector('.city');
// var picture = document.querySelector('.picture');




// button.addEventListener('click',function(){
//     fetch('http://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=790dff15e5ecdde73da819196a127634&units=metric')
//     .then(response => response.json())
//     .then(data => {
//         var cityValue = data['name'];
//         var tempValue = data['main']['temp'];
//         var humidityValue = data['main']['humidity'];
//         var descValue = data['weather'][0]['description'];
//         var pictureValue = data['weather'][0]['icon'];
//         picture.src = 'http://openweathermap.org/img/wn/'+pictureValue+'@2x.png';

//         city.innerHTML = cityValue;
//         temp.innerHTML = tempValue;
//         desc.innerHTML = descValue;
//         humidity.innerHTML = humidityValue;
//     })
   
//    .catch(err => alert("Wrong city name!"))
// })