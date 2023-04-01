

let userTab=document.querySelector("[user-tab]");
let searchTab=document.querySelector("[search-tab]");

let formContainer=document.querySelector("[form-container]");

let grantLoc=document.querySelector("[grant-loc]");

let weatherContainer=document.querySelector('.weather-info');

let loading=document.querySelector('.loading');


let err=document.querySelector(".error");

let usePos=userTab;


const key=`f5a6ea4433959b49aa3afae653276d72`


usePos.classList.add('current-tab');

getfromSessionStorage();


//tab-switching function

function tabSwitch(Newtab)
{

    if(usePos!=Newtab)
    {
        usePos.classList.remove('current-tab');
        usePos=Newtab;
        usePos.classList.add('current-tab');
    


    if(!formContainer.classList.contains('active'))
    {


        weatherContainer.classList.remove('active'); 
        grantLoc.classList.remove('active');


        formContainer.classList.add('active');
        
    }


    else
    {

        formContainer.classList.remove('active');

        weatherContainer.classList.remove('active');

        getfromSessionStorage();





    }
}


}


searchTab.addEventListener('click',()=>{

    tabSwitch(searchTab);

});
userTab.addEventListener('click',()=>{

    tabSwitch(userTab);

})



    function getfromSessionStorage()
    {

     let coordinate=sessionStorage.getItem('user-coordinate');

     if(!coordinate)
     {
        grantLoc.classList.add('active');

     }

     else
     {

      let coord=  JSON.parse(coordinate);

      fetchCoordinate(coord);

     }
    }



   async function fetchCoordinate(coordinate)
    {

        const {lat, lon}=coordinate;
        grantLoc.classList.remove('active');

        loading.classList.add('active');


        try
        {

            const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`)
            const result= await response.json();
            loading.classList.remove('active');
            renderWheather(result);

        }

        catch(err)
        {
            console.log('Error Aaa Raha Hai');
        }
    }




    function renderWheather(result)
    {

        let cityName=document.querySelector('[city-name]');

        let countryIcon=document.querySelector('[country-icon]');
        let WeatherDesc=document.querySelector('[weather-desc]');
        let WeatherIcon=document.querySelector('[weather-icon]');
        let temp=document.querySelector('[temperature]');

        let windSpeed=document.querySelector('[wind-speed]');

        let humidity=document.querySelector('[humidity]');

        let clouds=document.querySelector('[clouds]');

       //Data written in InnerHTML

       console.log('Data is rendering');


        cityName.innerText=result?.name;
        countryIcon.src=`https://flagcdn.com/144x108/${result?.sys?.country.toLowerCase()}.png`;
        WeatherDesc.innerText=result?.weather?.[0]?.description;

        WeatherIcon.src=`http://openweathermap.org/img/w/${result?.weather?.[0]?.icon}.png`

        if(result?.main?.temp>100)
        {
            temp.innerText=`${(result?.main?.temp-273.15).toFixed(2)} °C`;

        }

        else
        {
            temp.innerText=`${result?.main?.temp} °C`;

        }

        windSpeed.innerText= `${result?.wind?.speed}%`;

        humidity.innerText = `${result?.main?.humidity}%`;

        clouds.innerText=`${result?.clouds?.all}%`;
        console.log("hellow");

        err.classList.remove('active');

        weatherContainer.classList.add("active");

    }




    function getlocation()
    {


        if(navigator.geolocation)
        {
            console.log('get location tok aaya hai')
            navigator.geolocation.getCurrentPosition(Showposition);
        }

        else
        {

            console.log("Kya browser use kar rahe ho...location hi access kar nahi paya")
        }

    }



    function Showposition(position)
    {

        let Usercoordinate={

            lat: position.coords.latitude,
            lon: position.coords.longitude
        }

        sessionStorage.setItem('user-coordinate', JSON.stringify(Usercoordinate));


        getfromSessionStorage();

        //yaha para maine direct fetch nahi kiya.

    }



    let LocationBtn=document.querySelector('[grant-access-button]');

    console.log('location button mil gaya');


    LocationBtn.addEventListener('click',getlocation);


    //Search Button keliya Ab karunga



    let search=document.querySelector('[search-city]');

    
    
    let form=document.querySelector('[form-container]');
    
    form.addEventListener('submit',(e)=>{
        
        e.preventDefault();
        let city=search.value;

        fetchSearchweather(city);


    })




  async  function fetchSearchweather(city)
{

    
    loading.classList.add('active');

    weatherContainer.classList.remove('active'); 
    let response;

    try
    {

    

         response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`);
         let finalres=await response.json();


        if(finalres.cod==404)
        {

            

            err.classList.add('active');

            loading.classList.remove('active');


        }


        else
        {

              loading.classList.remove('active');
         weatherContainer.classList.remove('active'); 
 
         renderWheather(finalres);
 

        }
         

       

    }


      
    catch(e)
    {
        console.log("Errors Occurs in Searching");

    }

        
        



  


    


  









   

}
    









