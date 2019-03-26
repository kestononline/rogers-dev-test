

  var debug = 1;

  document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
      // document ready

      var weatherData;
      var unit = "&deg;"
      var unitText = " degrees"
      var accessibleSuffixText = " weather,";
      var accessibleHighText = " High of ";
      var accessibleLowText = " Low of ";
      var accessibleTemperatureText = "Temperature ";
      var weekList = document.querySelectorAll('.weather-forecast li a');
      var weatherDetails = document.querySelectorAll('.weather-highlighted > div');

      function addClass( classname, element ) {
      // Add class to HTML tag
  
          var cn = element.className;
          //test for existance
  
          if( cn.indexOf( classname ) != -1 ) {
              return;
          }
          //add a space if the element already has class
          if( cn != '' ) {
              classname = ' '+classname;
          }
          element.className = cn+classname;
      }
    
      var removeClass = function(e, c) {
      // Remove class from HTML tag
  
        keyword = new RegExp(c,"gi");
        e.className = e.className.replace(keyword, '');
      }

      function loadJSON(callback) {   
      // Load JSON data from file

          var dataObj = new XMLHttpRequest();
          dataObj.overrideMimeType("application/json");
          dataObj.open('GET', 'data/weather.json', true);
          dataObj.onreadystatechange = function () {
                if (dataObj.readyState == 4 && dataObj.status == "200") {
                  callback(dataObj.responseText);
                }
          };
          dataObj.send(null);  
      }

      function weatherload() {
        loadJSON(function(response) {
          // Parse JSON string into object
            weatherData = JSON.parse(response);

          for ( var property in weatherData ) {
            // Populate widget with loaded weather data
            
            // Hightlighted Temperature
            document.querySelector('.weather-highlighted .' + property + ' .temp').innerHTML = weatherData[property].temp + unit;

            // Conditions (Sunny, Rain, Cloudy, etc)
            document.querySelector('.weather-highlighted .' + property + ' .desc').innerHTML = weatherData[property].desc;

            // Daily High/low Temperature
            document.querySelector('.weather-highlighted .' + property + ' .hilo').innerHTML = weatherData[property].hi + unit + "/" + weatherData[property].low + unit;

            // Weather Icon image in weekly list
            document.querySelector('.weather-forecast #' + property + ' .icon-weather').className = "testclass icon-weather icon-weather-" + weatherData[property].sicon;

            // Weekly list Temperature
            document.querySelector('.weather-forecast #' + property + ' .temp').innerHTML = weatherData[property].temp + unit;

            // Add accessible descriptions to weekly selections
            document.querySelector('.weather-forecast #' + property + ' .temp').setAttribute('aria-label', accessibleTemperatureText + ' ' + weatherData[property].temp + unitText + '.' + accessibleHighText + weatherData[property].hi + unitText + '.' + accessibleLowText + weatherData[property].low + unitText + '.');
            
            // Add accessible suffix to the conditions
            document.querySelector('.weather-forecast #' + property + ' .forecast').setAttribute('aria-label', weatherData[property].desc + accessibleSuffixText);
          
          }
        });
      }

      var displayweather = function() {
      // Show weather for clicked day in week list

          var day = this.getAttribute("id");

          for (var i = 0; i < weekList.length; i++) {
          // Clear active/highlighted status from all weekdays

            removeClass(weekList[i],"active");
            removeClass(weatherDetails[i],"active");
          }

          // Add active/highlight to clicked day in weeklist
          addClass('active',this);
          addClass('active',document.querySelector('.weather-highlighted .' + day));
      };

      for (var i = 0; i < weekList.length; i++) {
      // Bind onclick event for weekday list days
        weekList[i].addEventListener('click', displayweather, false);
      }

      weatherload();
      // Populate Weather data

    }
  };