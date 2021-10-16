let searchHere = document.getElementById('searchHere');
let navigateList = [];
let searchArray = [];
let nowPlayingApi = 'https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44';
let popularApi = 'https://api.themoviedb.org/3/movie/popular?api_key=eba8b9a7199efdcb0ca1f96879b83c44';
let topRatedApi = 'https://api.themoviedb.org/3/movie/top_rated?api_key=eba8b9a7199efdcb0ca1f96879b83c44';
let trendingApi = 'https://api.themoviedb.org/3/trending/all/week?api_key=eba8b9a7199efdcb0ca1f96879b83c44';
let upcomingApi = 'https://api.themoviedb.org/3/movie/upcoming?api_key=eba8b9a7199efdcb0ca1f96879b83c44';

/********************GET AND DISPLAY Movies Data****************/
async function navigateMovies(navApi){
    let navigateResponse = await fetch(navApi);
    let navigateData = await navigateResponse.json();
    navigateList = navigateData.results;
    displayNavigateMovies();
    //console.log(navigateList);
}

function displayNavigateMovies(){
    let str = '';

    for(let i=0; i<navigateList.length; i++){
        str += `
        <div class="col-lg-4 col-md-6 my-3">
            <div class="singleMovie position-relative overflow-hidden">
                <div class="moviePost">
                    <img src='https://image.tmdb.org/t/p/w500${navigateList[i].poster_path}' class="w-100 rounded img-fluid">
                    <div class="layer rounded d-flex align-items-center justify-content-center ps-2 pe-2">
                        <div class="movieInfo">
                            <h2>${navigateList[i].original_title}</h2>
                            <p>${navigateList[i].overview}</p>
                            <p>rate: ${navigateList[i].vote_average}</p>
                            <p>${navigateList[i].release_date}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    }

    document.getElementById('moviesData').innerHTML = str;
}

navigateMovies(nowPlayingApi);

/***********************NAV LINK FUNCTIONS**********************/
$('.item1').click( () =>{
    navigateMovies(nowPlayingApi)
});

$('.item2').click( () =>{
    navigateMovies(popularApi)
});

$('.item3').click( () =>{
    navigateMovies(topRatedApi)
})

$('.item4').click( () =>{
    navigateMovies(trendingApi)
})

$('.item5').click( () =>{
    navigateMovies(upcomingApi)
})

/************************SEARCH IN ARRAY FUNCTION*****************/
function searchInArray(term){
    let str = '';
    for(let i=0; i<navigateList.length; i++){
        if(navigateList[i].original_title.toLowerCase().includes(term.toLowerCase())){
        str += `
        <div class="col-lg-4 col-md-6 my-3">
            <div class="singleMovie position-relative">
                <div class="moviePost">
                    <img src='https://image.tmdb.org/t/p/w500${navigateList[i].poster_path}' class="w-100 rounded img-fluid">
                    <div class="layer rounded d-flex align-items-center justify-content-center ps-2 pe-2">
                        <div class="movieInfo">
                            <h2>${navigateList[i].original_title}</h2>
                            <p>${navigateList[i].overview}</p>
                            <p>rate: ${navigateList[i].vote_average}</p>
                            <p>${navigateList[i].release_date}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
        }
    }
    document.getElementById('moviesData').innerHTML = str;
}

searchHere.addEventListener('keyup' , function(){
    searchInArray(this.value)
})

/***********************SEARCH IN API FUNCTION********************/
async function searchInApi(query){
    let searchResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&query=${query}&page=1&include_adult=false`);

    let searchData = await searchResponse.json();
    searchArray = searchData.results;
    //console.log(searchArray);

    let str = '';

    for(let i=0; i<searchArray.length; i++){
        if(searchArray[i].original_title.toLowerCase().includes(query.toLowerCase())){
        str += `
        <div class="col-lg-4 col-md-6 my-3">
            <div class="singleMovie position-relative">
                <div class="moviePost">
                    <img src='https://image.tmdb.org/t/p/w500${searchArray[i].poster_path}' class="w-100 rounded img-fluid">
                    <div class="layer rounded d-flex align-items-center justify-content-center ps-2 pe-2">
                        <div class="movieInfo">
                            <h2>${searchArray[i].original_title}</h2>
                            <p>${searchArray[i].overview}</p>
                            <p>rate: ${searchArray[i].vote_average}</p>
                            <p>${searchArray[i].release_date}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
        }
    }
    document.getElementById('moviesData').innerHTML = str;
}

document.getElementById('searchAll').addEventListener('keyup' , function(){
    searchInApi(this.value)
})

/***************************TOGGLE NAV***********************/
let indicator = !0;

$('.toggle-menue').click(() =>{
    if(indicator){
        $('.nav-menue').addClass('open-menue').removeClass('close-menue');
        $('.fixed-nav').css("left" , '240px');
        $('.fa-align-justify').toggleClass('fa-times');
        $('.nav-item .item1').animate({opacity : "1" , paddingTop : "25px"} , 1100);
        $('.nav-item .item2').animate({opacity : "1" , paddingTop : "25px"} , 1200);
        $('.nav-item .item3').animate({opacity : "1" , paddingTop : "25px"} , 1300);
        $('.nav-item .item4').animate({opacity : "1" , paddingTop : "25px"} , 1400);
        $('.nav-item .item5').animate({opacity : "1" , paddingTop : "25px"} , 1500);
        $('.nav-item .item6').animate({opacity : "1" , paddingTop : "25px"} , 1600);
        indicator = !indicator;
    }
    else{
        $('.nav-menue').addClass('close-menue').removeClass('open-menue');
        $('.fixed-nav').css("left" , '0');
        $('.fa-align-justify').toggleClass('fa-times');
        $('.nav-item li').animate({opacity : "0" , paddingTop : "700px"} , 700);
        indicator = !indicator;
    }
});

/**********************FORM VALIDATION AND SUBMIT*************************/
let nameInput = document.getElementById('name');
let nameAlert = document.getElementById('nameAlert');
let emailInput = document.getElementById('email');
let emailAlert = document.getElementById('emailAlert');
let phoneInput = document.getElementById('phone');
let phoneAlert = document.getElementById('phoneAlert');
let ageInput = document.getElementById('age');
let ageAlert = document.getElementById('ageAlert');
let passwordInput = document.getElementById('password');
let passwordAlert = document.getElementById('passwordAlert');
let confirmPassInput = document.getElementById('confirmPass');
let confirmPassAlert = document.getElementById('confirmPassAlert');

let submitBtn = document.getElementById('submitBtn');
let formList;

if(JSON.parse(localStorage.getItem('formData')) !== null){
    formList = JSON.parse(localStorage.getItem('formData'));
}else{
    formList = [];
}


function validateNameInput(){
    var nameRegex = /^[A-Za-z]/;
    if(nameRegex.test(nameInput.value) == true){
        nameAlert.classList.add('d-none');
        submitBtn.removeAttribute('disabled');
        return true;
    }
    else{
        nameAlert.classList.remove('d-none');
        submitBtn.setAttribute('disabled' , true);
        return false;
    }
}

function validateEmailInput(){
    var emailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if(emailRegex.test(emailInput.value) == true){
        emailAlert.classList.add('d-none');
        submitBtn.removeAttribute('disabled');
        return true;
    }
    else{
        emailAlert.classList.remove('d-none');
        submitBtn.setAttribute('disabled' , true);
        return false;
    }
}

function validatePhoneInput(){
    var phoneRegex = /^(00[1-9])?01[0125][0-9]{8}$/;
    if(phoneRegex.test(phoneInput.value) == true){
        phoneAlert.classList.add('d-none');
        submitBtn.removeAttribute('disabled');
        return true;
    }
    else{
        phoneAlert.classList.remove('d-none');
        submitBtn.setAttribute('disabled' , true);
        return false;
    }
}

function validateAgeInput(){
    var ageRegex = /^([1-9]\d|[1-9])$/;
    if(ageRegex.test(ageInput.value) == true){
        ageAlert.classList.add('d-none');
        submitBtn.removeAttribute('disabled');
        return true;
    }
    else{
        ageAlert.classList.remove('d-none');
        submitBtn.setAttribute('disabled' , true);
        return false;
    }
}

function validatePassword(){
    var passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if(passRegex.test(passwordInput.value) == true){
        passwordAlert.classList.add('d-none');
        submitBtn.removeAttribute('disabled');
        return true;
    }
    else{
        passwordAlert.classList.remove('d-none');
        submitBtn.setAttribute('disabled' , true);
        return false;
    }
}

function validateRepassword(){
    if(confirmPassInput.value === passwordInput.value){
        confirmPassAlert.classList.add('d-none');
        submitBtn.removeAttribute('disabled');
        return true;
    }
    else{
        confirmPassAlert.classList.remove('d-none');
        submitBtn.setAttribute('disabled' , true);
        return false;
    }
}

function clearForm(){
    nameInput.value = '';
    emailInput.value = '';
    phoneInput.value = '';
    ageInput.value = '';
    passwordInput.value ='';
    confirmPassInput.value = '';
}

function submitForm(){
    if(validateNameInput() == true && validateEmailInput() == true && validatePhoneInput() == true && validateAgeInput() == true && validatePassword() == true && validateRepassword() == true){

        let singleReges = {
            name: nameInput.value,
            email: emailInput.value,
            phone: phoneInput.value,
            age: ageInput.value,
            password: passwordInput.value,
            rePassword: confirmPassInput.value
        }

        formList.push(singleReges);
        localStorage.setItem("formData" , JSON.stringify(formList) );
        clearForm();
    }
    else{
        alert('please enter valid data');
    }
}

nameInput.addEventListener('keyup' , validateNameInput);
emailInput.addEventListener('keyup' , validateEmailInput);
phoneInput.addEventListener('keyup' , validatePhoneInput);
ageInput.addEventListener('keyup' , validateAgeInput);
passwordInput.addEventListener('keyup' , validatePassword);
confirmPassInput.addEventListener('keyup' , validateRepassword);

submitBtn.addEventListener('click' , submitForm);