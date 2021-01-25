let dataContainer = document.querySelector('.data');
let url = 'https://corona.lmao.ninja/v2/countries/Philippines?yesterday=true&strict=true&query=Philippines';
let url2 = 'https://disease.sh/v3/covid-19/all';
let urlNews = 'https://cors-anywhere.herokuapp.com/http://newsapi.org/v2/top-headlines?country=ph&apiKey=405799f77ea24f0398c978a33794a5f7';

//Fetch 1
phStats = () => {
fetch(url)
    .then(response => response.json())
    .then(data => {
        confirmed = document.querySelector('#confirmed');
        active = document.querySelector('#active');
        recovered = document.querySelector('#recovered');
        deaths = document.querySelector('#deaths');
        newConfirmed = document.querySelector('#newconfirmed');
        newRecovered = document.querySelector('#newrecovered');
        newDeaths = document.querySelector('#newdeaths');
        recoveryRate = document.querySelector('#recoveryrate');

        //Convert JSON to String
        stringConfirmed = JSON.stringify(data.cases);
        stringActive = JSON.stringify(data.active);
        stringRecovered = JSON.stringify(data.recovered);
        stringDeaths = JSON.stringify(data.deaths);
        stringNewconfirmed = JSON.stringify(data.todayCases);
        stringNewrecovered = JSON.stringify(data.todayRecovered);
        stringNewdeaths = JSON.stringify(data.todayDeaths);

        //Calculate and Round off Percentage
        percentRecovery = stringRecovered / stringConfirmed * 100;
        percentRecovery = percentRecovery.toFixed(1) + ' %';

        //Display
        confirmed.innerHTML = new Number(stringConfirmed).toLocaleString("en-US");
        active.innerHTML = new Number(stringActive).toLocaleString("en-US");
        recovered.innerHTML = new Number(stringRecovered).toLocaleString("en-US");
        deaths.innerHTML = new Number(stringDeaths).toLocaleString("en-US");
        newConfirmed.innerHTML = new Number(stringNewconfirmed).toLocaleString("en-US") + ' new confirmed cases';
        newRecovered.innerHTML = new Number(stringNewrecovered).toLocaleString("en-US") + ' new recoveries';
        newDeaths.innerHTML = new Number(stringNewdeaths).toLocaleString("en-US") + ' new deaths';
        recoveryRate.innerHTML = percentRecovery;

        //Chart 1
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Confirmed', 'Recovered', 'Active', 'Deaths'],
                datasets: [{
                    label: '# of Cases',
                    data: [stringConfirmed, stringRecovered, stringActive, stringDeaths],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 99, 132, 0.2)'

                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            suggestedMin: 100000,
                            suggestedMax: 1000000
                        }
                    }]
                },

                layout: {
                    padding: {
                        left: 50,
                        right: 50,
                        top: 25,
                        bottom: 25
                    }

                }

            }
        });

    })

    .catch((error) => {
    
        console.error('Error:', error)

    });

}

//Fetch 2
globalStats = () => {
fetch(url2)
    .then(response => response.json())
    .then(data => {
        totalConfirmed = document.querySelector('#totalconfirmed');
        totalRecoveries = document.querySelector('#totalrecoveries');
        totalActive = document.querySelector('#totalactive');
        totalDeaths = document.querySelector('#totaldeaths');
        globalRecoveryrate = document.querySelector('#globalrecoveryrate');


        //Convert JSON to String
        stringTotalConfirmed = JSON.stringify(data.cases);
        stringTotalRecoveries = JSON.stringify(data.recovered);
        stringTotalActive = JSON.stringify(data.active);
        stringTotalDeaths = JSON.stringify(data.deaths);

        //Calculate and Round off Percentage
        percentGlobalrecovery = stringTotalRecoveries / stringTotalConfirmed * 100;
        percentGlobalrecovery = percentGlobalrecovery.toFixed(1) + ' %';

        //Display
        totalConfirmed.innerHTML = new Number(stringTotalConfirmed).toLocaleString("en-US");
        totalRecoveries.innerHTML = new Number(stringTotalRecoveries).toLocaleString("en-US");
        totalActive.innerHTML = new Number(stringTotalActive).toLocaleString("en-US");
        totalDeaths.innerHTML = new Number(stringTotalDeaths).toLocaleString("en-US");
        globalRecoveryrate.innerHTML = percentGlobalrecovery;

        console.log(data);
    })

    .catch((error) => {
        console.error('Error:', error)
    });

}


phStats();
globalStats();

   /* fetch(urlNews)
    .then(response => response.json())
    .then(data => {
        news = document.querySelector('#news');
        

        news.innerHTML = "<h5 style='text-decoration: underline'>"+data.articles[15].title+"</h5><br><small>"+data.articles[15].author+"</small><small>"+data.articles[15].publishedAt+"</small><br><p id='newsblock' style='font-size:14px; letter-spacing:0px; font-weight:normal;'>"+data.articles[15].description+"</p><a target='_blank' href="+data.articles[15].url+"><span style='font-size:12px;letter-spacing:0px;'>More</span></a>";

    })

    .catch((error) => {
        console.error('Error:', error)
    });*/
