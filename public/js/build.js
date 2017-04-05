(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
* SFLComponent
*
* Constructor take options
* options.event
*     {
*       'event selector': 'eventHandler'
*     }
* options.container
     DOMNode or selector
*
* */
var SFLComponent = function () {
    function SFLComponent(options) {
        _classCallCheck(this, SFLComponent);

        this.events = options.events;
        this.container = typeof options.container === 'string' ? document.querySelector(options.container) : options.container;
        this.prepareEventsListeners();
    }

    _createClass(SFLComponent, [{
        key: 'prepareEventsListeners',
        value: function prepareEventsListeners() {
            for (var key in this.events) {
                if (this.events.hasOwnProperty(key)) {
                    this[this.events[key]] = this[this.events[key]].bind(this);
                }
            }
        }
    }, {
        key: 'attachEvents',
        value: function attachEvents() {
            for (var key in this.events) {
                if (this.events.hasOwnProperty(key)) {
                    var keyParts = key.split(' ');
                    var event = keyParts[0];
                    var selector = keyParts.slice(1).join(' ');
                    var elements = this.container.querySelectorAll(selector);
                    for (var i = 0; i < elements.length; i++) {
                        elements[i].addEventListener(event, this[this.events[key]]);
                    }
                }
            }
        }
    }, {
        key: 'dettachEvents',
        value: function dettachEvents() {
            for (var key in this.events) {
                if (this.events.hasOwnProperty(key)) {
                    var keyParts = key.split(' ');
                    var event = keyParts[0];
                    var selector = keyParts.slice(1).join(' ');
                    var elements = this.container.querySelectorAll(selector);
                    for (var i = 0; i < elements.length; i++) {
                        elements[i].removeEventListener(event, this[this.events[key]]);
                    }
                }
            }
        }
    }]);

    return SFLComponent;
}();

exports.default = SFLComponent;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HttpProvider = function () {
    function HttpProvider() {
        _classCallCheck(this, HttpProvider);
    }

    _createClass(HttpProvider, [{
        key: 'doGet',
        value: function doGet(path, options) {
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                var query = '';
                for (var i in options) {
                    query += i + '=' + options[i] + '&';
                }
                xhr.open('GET', path + '?' + query, true);

                xhr.send();

                xhr.onreadystatechange = function () {
                    if (xhr.readyState != 4) return;
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        reject(xhr.responseText);
                    }
                };
            });
        }
    }]);

    return HttpProvider;
}();

exports.default = HttpProvider;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Subject = function () {
    function Subject() {
        _classCallCheck(this, Subject);

        this.subcribers = [];
    }

    _createClass(Subject, [{
        key: "subscribe",
        value: function subscribe(func) {
            var _this = this;

            this.subcribers.push(func);
            return {
                unsubscribe: function unsubscribe() {
                    _this.subcribers.splice(_this.subcribers.indexOf(func), 1);
                }
            };
        }
    }, {
        key: "next",
        value: function next(data) {
            this.subcribers.forEach(function (subscriber) {
                subscriber(data);
            });
        }
    }]);

    return Subject;
}();

exports.default = Subject;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Component = require('../classes/Component');

var _Component2 = _interopRequireDefault(_Component);

var _Subject = require('../classes/Subject');

var _Subject2 = _interopRequireDefault(_Subject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CitiesPanelComponent = function (_SFLComponent) {
    _inherits(CitiesPanelComponent, _SFLComponent);

    function CitiesPanelComponent(options) {
        _classCallCheck(this, CitiesPanelComponent);

        var events = {
            'change .cities': 'selectCity'
        };

        var _this = _possibleConstructorReturn(this, (CitiesPanelComponent.__proto__ || Object.getPrototypeOf(CitiesPanelComponent)).call(this, Object.assign(options, {
            events: events
        })));

        _this.cityChangeStream = new _Subject2.default();
        _this.selectedCity = null;
        _this.citiesData = ['Moscow', 'Yerevan', 'London', 'Kiev', 'Amsterdam'];

        return _this;
    }

    _createClass(CitiesPanelComponent, [{
        key: 'selectSelectCurrentCity',
        value: function selectSelectCurrentCity() {
            var _this2 = this;

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var geocoder = new google.maps.Geocoder();
                    var lat = position.coords.latitude;
                    var lng = position.coords.longitude;
                    var latlng = new google.maps.LatLng(lat, lng);
                    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            var city = void 0;
                            if (results[1]) {
                                //formatted address
                                //find country name
                                for (var i = 0; i < results[0].address_components.length; i++) {
                                    for (var b = 0; b < results[0].address_components[i].types.length; b++) {

                                        //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                                        if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                                            //this is the object you are looking for
                                            city = results[0].address_components[i];
                                            break;
                                        }
                                    }
                                }
                                _this2.selectedCity = city.short_name;
                                _this2.cityChangeStream.next(_this2.selectedCity);
                                _this2.container.querySelector('select').value = _this2.selectedCity;
                            } else {
                                console.log("No results found");
                            }
                        } else {
                            onsole.log("Geocoder failed due to: " + status);
                        }
                    });
                }, function (err) {
                    console.error(err);
                });
            }
        }
    }, {
        key: 'selectCity',
        value: function selectCity(event) {
            this.selectedCity = event.target.value;
            this.cityChangeStream.next(this.selectedCity);
        }
    }, {
        key: 'render',
        value: function render() {
            this.dettachEvents();
            this.container.innerHTML = '';
            var selectEl = document.createElement('select');
            selectEl.classList.add('cities');
            this.citiesData.forEach(function (city) {
                var optionEl = document.createElement('option');
                optionEl.setAttribute('value', city);
                optionEl.innerText = city;
                selectEl.appendChild(optionEl);
            });
            this.container.appendChild(selectEl);
            this.attachEvents();
        }
    }]);

    return CitiesPanelComponent;
}(_Component2.default);

exports.default = CitiesPanelComponent;

},{"../classes/Component":1,"../classes/Subject":3}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Component = require('../classes/Component');

var _Component2 = _interopRequireDefault(_Component);

var _Subject = require('../classes/Subject');

var _Subject2 = _interopRequireDefault(_Subject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DayPanelComponent = function (_SFLComponent) {
    _inherits(DayPanelComponent, _SFLComponent);

    function DayPanelComponent(options) {
        _classCallCheck(this, DayPanelComponent);

        var events = {
            'click .date': 'selectDate'
        };

        var _this = _possibleConstructorReturn(this, (DayPanelComponent.__proto__ || Object.getPrototypeOf(DayPanelComponent)).call(this, Object.assign(options, {
            events: events
        })));

        _this.dayChangeStream = new _Subject2.default();
        _this.selectedDay = null;

        return _this;
    }

    _createClass(DayPanelComponent, [{
        key: 'getToday',
        value: function getToday() {
            var today = new Date();
            today.setHours(0);
            today.setMinutes(0);
            today.setMinutes(0);
            today.setMilliseconds(0);
            return today;
        }
    }, {
        key: 'selectToday',
        value: function selectToday() {
            var today = this.getToday();
            this.unselectAll();
            this.selectedDay = today.getTime();
            this.container.querySelector('.date[date="' + today.getTime() + '"]').classList.add('date_selected');
            this.dayChangeStream.next(this.selectedDay);
        }
    }, {
        key: 'unselectAll',
        value: function unselectAll() {
            var dayElements = this.container.querySelectorAll('.date');
            for (var i = 0; i < dayElements.length; i++) {
                dayElements[i].classList.remove('date_selected');
            }
        }
    }, {
        key: 'selectDate',
        value: function selectDate(event) {
            this.unselectAll();
            event.currentTarget.classList.add('date_selected');
            this.selectedDay = parseInt(event.currentTarget.getAttribute('date'));
            this.dayChangeStream.next(this.selectedDay);
        }
    }, {
        key: 'getUpcomingDates',
        value: function getUpcomingDates() {
            var today = this.getToday();
            var upcomingDates = [];
            for (var i = 0; i < 7; i++) {
                var date = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
                upcomingDates.push({
                    day: date.getDate(),
                    weekDay: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()],
                    time: date.getTime(),
                    month: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][date.getMonth()]
                });
            }
            return upcomingDates;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            this.dettachEvents();
            this.container.innerHTML = '';
            var dates = this.getUpcomingDates();
            dates.forEach(function (date) {
                var dateEl = document.createElement('div'),
                    dayLabel = document.createElement('label'),
                    monthLabel = document.createElement('label'),
                    weekDayLabel = document.createElement('label');
                dateEl.classList.add('date');
                dayLabel.classList.add('date_day');
                monthLabel.classList.add('date_month');
                weekDayLabel.classList.add('date_week');
                dayLabel.innerText = date.day;
                monthLabel.innerText = date.month;
                weekDayLabel.innerText = date.weekDay;
                dateEl.setAttribute('date', date.time);
                dateEl.appendChild(dayLabel);
                dateEl.appendChild(monthLabel);
                dateEl.appendChild(weekDayLabel);
                _this2.container.appendChild(dateEl);
            });
            this.attachEvents();
        }
    }]);

    return DayPanelComponent;
}(_Component2.default);

exports.default = DayPanelComponent;

},{"../classes/Component":1,"../classes/Subject":3}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Component = require('../classes/Component');

var _Component2 = _interopRequireDefault(_Component);

var _Subject = require('../classes/Subject');

var _Subject2 = _interopRequireDefault(_Subject);

var _HttpProvider = require('../classes/HttpProvider');

var _HttpProvider2 = _interopRequireDefault(_HttpProvider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WeatherPanelComponent = function (_SFLComponent) {
    _inherits(WeatherPanelComponent, _SFLComponent);

    function WeatherPanelComponent(options) {
        _classCallCheck(this, WeatherPanelComponent);

        var _this = _possibleConstructorReturn(this, (WeatherPanelComponent.__proto__ || Object.getPrototypeOf(WeatherPanelComponent)).call(this, Object.assign(options, {})));

        _this.http = new _HttpProvider2.default();
        _this.dayChangeStream = new _Subject2.default();
        _this.selectedOptions = {
            city: null,
            date: null
        };
        _this.fetchedData = null;
        _this.checkIfCanFetchWeatherData = _this.checkIfCanFetchWeatherData.bind(_this);
        return _this;
    }

    _createClass(WeatherPanelComponent, [{
        key: 'checkIfNeedUpdateDisplay',
        value: function checkIfNeedUpdateDisplay() {
            if (this.selectedOptions.date) {
                this.render();
            }
        }
    }, {
        key: 'checkIfCanFetchWeatherData',
        value: function checkIfCanFetchWeatherData() {
            if (this.selectedOptions.city) {
                this.fetchWeatherData();
            }
        }
    }, {
        key: 'fetchWeatherData',
        value: function fetchWeatherData() {
            var _this2 = this;

            this.http.doGet('https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast', {
                appid: 'a9bcf4f4899aaab6b7194e3f674f162b',
                q: this.selectedOptions.city,
                units: 'metric'
            }).then(function (data) {
                _this2.fetchedData = data;
                _this2.checkIfNeedUpdateDisplay();
            }, function (err) {
                console.error(err);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            this.dettachEvents();
            this.container.innerHTML = '';
            var display = document.createElement('h1');
            if (this.fetchedData && this.selectedOptions.date) {
                //find weather data for selected date
                var data = this.fetchedData.list.filter(function (data) {
                    var time = _this3.selectedOptions.date.getTime();
                    return data.dt * 1000 > time && time < data.dt * 1000 + 23.9 * 60 * 60 * 1000;
                });
                var sum = 0;

                data.forEach(function (singleData) {
                    sum += singleData.main.temp;
                });
                if (data.length > 0) {
                    display.innerText = (sum / data.length).toFixed(1) + 'C';
                } else {
                    display.innerText = 'Unknown';
                }
            }

            this.container.appendChild(display);
            this.attachEvents();
        }
    }]);

    return WeatherPanelComponent;
}(_Component2.default);

exports.default = WeatherPanelComponent;

},{"../classes/Component":1,"../classes/HttpProvider":2,"../classes/Subject":3}],7:[function(require,module,exports){
'use strict';

var _dayPanel = require('./components/day-panel');

var _dayPanel2 = _interopRequireDefault(_dayPanel);

var _citiesPanel = require('./components/cities-panel');

var _citiesPanel2 = _interopRequireDefault(_citiesPanel);

var _weatherPanel = require('./components/weather-panel');

var _weatherPanel2 = _interopRequireDefault(_weatherPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.addEventListener('load', function () {
    console.log('ok');
    var dayPanel = new _dayPanel2.default({
        container: '.dates-panel'
    });
    var citiesPanel = new _citiesPanel2.default({
        container: '.cities-panel'
    });
    var weatherPanel = new _weatherPanel2.default({
        container: '.weather-panel'
    });
    dayPanel.dayChangeStream.subscribe(function (time) {
        weatherPanel.selectedOptions.date = new Date(time);
        weatherPanel.checkIfNeedUpdateDisplay();
    });
    citiesPanel.cityChangeStream.subscribe(function (city) {
        weatherPanel.selectedOptions.city = city;
        weatherPanel.checkIfCanFetchWeatherData();
    });
    dayPanel.render();
    citiesPanel.render();
    citiesPanel.selectSelectCurrentCity();
    dayPanel.selectToday();
});

},{"./components/cities-panel":4,"./components/day-panel":5,"./components/weather-panel":6}]},{},[7])

//# sourceMappingURL=build.js.map
