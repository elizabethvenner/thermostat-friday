$( document ).ready(function () {
  var thermostat = new Thermostat();
  console.log('hello1');
  $("#submit").click(function(e) {
    e.preventDefault();
    var city = $("#city").val();
    $.getJSON('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&APPID=121a9ab6b7bae94bcb61113c310c6e21', function (data){
      $(".city_name").text("Current weather in " + data.name);
      $(".result").text(data.weather[0].description);
      $(".temp").text(data.main.temp);
      console.log(data);
    });
  });

  updateTemperature();
  $('.toggle').toggles({
    drag: true, // allow dragging the toggle between positions
    click: true, // allow clicking on the toggle
    text: {
      on: 'ON', // text for the ON position
      off: 'OFF' // and off
    },
    on: true, // is the toggle ON on init
    animate: 250, // animation time (ms)
    easing: 'swing', // animation transition easing function
    checkbox: null, // the checkbox to toggle (for use in forms)
    clicker: null, // element that can be clicked on to toggle. removes binding from the toggle itself (use nesting)
    width: 50, // width used if not set in css
    height: 20, // height if not set in css
    type: 'compact' // if this is set to 'select' then the select style toggle will be used
  });

  $('#up').click(function() {
    thermostat.up();
    updateTemperature();
    $.postJSON('http://localhost:4567/', function (){
      $("#temperature").text();
      $('.city_name').text();
    });
  });

  $('#down').click(function () {
    thermostat.down();
    updateTemperature();
  });

  $('#power-saver').click(function(){
    thermostat.setPowersaver();
  });

  $('#reset').click(function () {
    thermostat.reset();
    updateTemperature();
  });

  function updateTemperature(){
    $.getJSON('http://localhost:4567/', function (data){
       $("#temperature").text(data.temperature);
      console.log(data);
    });
    $('#temperature').text(thermostat.temperature);
    $('#temperature').attr('class', thermostat.usage());
  }
});
