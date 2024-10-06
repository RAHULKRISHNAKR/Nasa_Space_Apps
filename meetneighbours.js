angular.module('KeplerApp', [])
.controller('MainController', function($scope) { 
  $scope.key = [{
    threshold: 0,
    color:'#BF0006'
  }, {
    threshold: 100,
    color:'#9F072B'
  }, {
    threshold: 200,
    color:'#7F0E50'
  }, {
    threshold: 300,
    color:'#5F1675'
  }, {
    threshold: 600,
    color:'#3F1D9A'
  }, {
    threshold: 1000,
    color:'#1F24BF'
  }, {
    threshold: 10000,
    color:'#002CE5'
  }]
  d3.csv('https://raw.githubusercontent.com/LawlietBlack/FCC-Ziplines/master/Zipline-18/app/planets.csv', function(data) {
    var planets = data.filter(function(planet) {
      return planet.mass_e !== "" && planet.radius_e !== "" &&  planet.distance !== ""
    });


    var height = 700,
        width = 1100,
        padding = 50;

    var svg = d3.select('#graph').append('svg')
      .attr('height', height + padding * 2)
      .attr('width', width + padding * 2);

    var viz = svg.append('g')
      .attr('id', 'viz')
      .attr('transform', 'translate(' + padding * 1.5 + ', ' + padding * 0.75 + ')');

    var xTicks = ['', '', '', '', '1x earth', '2x earth', '3x earth', 
      '', '', '', '', '', '', '10x earth', '20x earth', '30x earth'];
    var xDomain = d3.extent(planets, function(planet) { return parseFloat(planet.radius_e); });
    var xScale = d3.scale.log().range([0, width]).domain(xDomain);
    var xAxis = d3.svg.axis().scale(xScale).orient('bottom')
      .ticks(16).tickFormat(function(planet, i) { return xTicks[i]; });

    var yTicks = {6: '1x', 15: '10x', 24: '100x', 33: '1,000x'};
    var yDomain = d3.extent(planets, function(planet) { return parseFloat(planet.mass_e); });
    var yScale = d3.scale.log().range([height, 0]).domain(yDomain);
    var yAxis = d3.svg.axis().scale(yScale).orient('left')
      .ticks(40).tickFormat(function(planet, i) { return yTicks[i] !== undefined ? yTicks[i] : ""; });

    var hDomain = d3.extent(planets, function(planet) { return parseFloat(planet.distance); });
    var hScale = d3.scale.threshold().domain([0, 100, 200, 300, 600, 1000, 10000])
      .range(['#BF0006', '#9F072B', '#7F0E50', '#5F1675', '#3F1D9A', '#1F24BF', '#002CE5']);

    viz.append('g')
      .attr('class', 'axis x-axis')
      .attr('transform', 'translate(0,  ' + height + ' )')
      .call(xAxis)
      .append('text')
      .attr({
        class: 'x label',
        'text-anchor': 'middle',
        x: width / 2,
        y: padding
      })
      .text('Exoplanet Mass (relative to earth)')

    viz.append('g')
      .attr('class', 'axis y-axis')
      .call(yAxis)
      .append('text')
      .text('Exoplanet Radius (relative to earth)')
      .attr({
        class: 'y label',
        x: 0 - padding,
        y: -10
      });

    var tip = d3.tip()
      .attr('class', 'd3-tip')
      .html(function(planet) {
        var HTML = '<h4><span class="label">Name</span> ' + planet.planet_name + '</h4>'
        HTML += '<p><span class="label">Planets in system</span> ' + planet.num_planets + '</p>'
        HTML += '<p><span class="label">Radius(earths)</span> ' + planet.radius_e + '</p>'
        HTML += '<p><span class="label">Mass(earths)</span> ' + planet.mass_e + '</p>'
        HTML += '<p><span class="label">Distance(parsecs)</span> ' + planet.distance + '</p>'
        if(planet.link !== "") {
          HTML += '<p class="link-line">More info <a href="' + planet.link + '">here</a></p>'
        }
        return HTML;
      });

    viz.call(tip)
    var count = 0;
    var avg = d3.mean(planets, function(planet) { return parseFloat(planet.distance) });
    var dots = viz.selectAll('circle')
      .data(planets)
      .enter()
      .append('circle')
      .attr({
        r: 5,
        cx: function(planet) {
          return xScale(parseFloat(planet.radius_e));
        },
        cy: function(planet) {
          return yScale(parseFloat(planet.mass_e));
        },
        fill: function(planet) {
          return hScale(parseFloat(planet.distance));
        },
        distance: function(planet) {
          return planet.distance;
        }
      })
      .on('mouseenter', function(p, i) {
        count = count === undefined ? 0 : count += 1;
        tip.show(p, i);
      })
      .on('mouseleave', function(p, i) {
        countCopy = count.toString();
        setTimeout(function() {
          if(count == countCopy) {
            tip.hide(p, i);
          }
        }, 2000);
      });




  });
});