"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.turnOffProgressBar = exports.resetPassword = exports.turnOffDashboardTour = exports.turnOffSubjectTour = exports.turnOffTaskTour = exports.refreshUser = exports.updateProfileThunk = exports.signupThunk = exports.reAuthenticate = exports.loginThunk = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _url = _interopRequireDefault(require("../environment/url"));

var _profileActions = require("../actions/profileActions");

var _chartThunk = require("./chartThunk");

var _subjectThunk = require("./subjectThunk");

var _taskThunk = require("./taskThunk");

var _friendThunk = require("./friendThunk");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var loginThunk = function loginThunk(_ref) {
  var email = _ref.email,
      password = _ref.password;
  return function _callee(dispatch, getState) {
    var res;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(_axios["default"].post(_url["default"] + '/api/userprofiles/authenticate', {
              email: email,
              password: password
            }));

          case 3:
            res = _context.sent;

            if (!(res.status === 200)) {
              _context.next = 16;
              break;
            }

            //console.log(res.data)
            dispatch((0, _profileActions.setProfile)({
              //TODO check what fields come back from res.data.email
              email: email,
              password: password,
              id: res.data.id,
              firstName: res.data.firstName,
              lastName: res.data.lastName,
              token: res.data.token,
              isAuth: true
            }));
            _context.next = 8;
            return regeneratorRuntime.awrap(dispatch(refreshUser()));

          case 8:
            _context.next = 10;
            return regeneratorRuntime.awrap(dispatch((0, _chartThunk.loadFiveCharts)()));

          case 10:
            _context.next = 12;
            return regeneratorRuntime.awrap(dispatch((0, _taskThunk.loadTasks)()));

          case 12:
            _context.next = 14;
            return regeneratorRuntime.awrap(dispatch((0, _subjectThunk.realoadClassesThunk)()));

          case 14:
            _context.next = 16;
            return regeneratorRuntime.awrap(dispatch((0, _friendThunk.getSuggestedFriends)()));

          case 16:
            return _context.abrupt("return", res.status);

          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", _context.t0);

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 19]]);
  };
};

exports.loginThunk = loginThunk;

var reAuthenticate = function reAuthenticate(_ref2) {
  var email = _ref2.email,
      password = _ref2.password;
  return function _callee2(dispatch, getState) {
    var res;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return regeneratorRuntime.awrap(_axios["default"].post(_url["default"] + '/api/userprofiles/authenticate', {
              email: email,
              password: password
            }));

          case 3:
            res = _context2.sent;

            if (!(res.status === 200)) {
              _context2.next = 8;
              break;
            }

            //console.log(res.data)
            dispatch((0, _profileActions.setProfile)({
              //TODO check what fields come back from res.data.email
              email: email,
              password: password,
              id: res.data.id,
              firstName: res.data.firstName,
              lastName: res.data.lastName,
              token: res.data.token,
              isAuth: true
            }));
            _context2.next = 8;
            return regeneratorRuntime.awrap(dispatch(refreshUser()));

          case 8:
            return _context2.abrupt("return", res.status);

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", _context2.t0);

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 11]]);
  };
};

exports.reAuthenticate = reAuthenticate;

var signupThunk = function signupThunk(_ref3) {
  var email = _ref3.email,
      password = _ref3.password,
      firstName = _ref3.firstName,
      lastName = _ref3.lastName;
  return function _callee3(dispatch, getState) {
    var state, profile, subjects, id, token, signUpres, res;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            state = getState();
            profile = state.profile, subjects = state.subjects;
            id = profile.id, token = profile.token;
            _context3.prev = 3;
            _context3.next = 6;
            return regeneratorRuntime.awrap(_axios["default"].post(_url["default"] + '/api/userprofiles/create', {
              firstName: firstName,
              lastName: lastName,
              email: email,
              password: password
            }));

          case 6:
            signUpres = _context3.sent;

            if (!(signUpres.status === 200)) {
              _context3.next = 17;
              break;
            }

            _context3.next = 10;
            return regeneratorRuntime.awrap(_axios["default"].post(_url["default"] + '/api/userprofiles/authenticate', {
              email: email,
              password: password
            }));

          case 10:
            res = _context3.sent;

            if (!(res.status === 200)) {
              _context3.next = 16;
              break;
            }

            _context3.next = 14;
            return regeneratorRuntime.awrap(dispatch((0, _profileActions.setProfile)({
              email: email,
              password: password,
              id: res.data.id,
              firstName: res.data.firstName,
              lastName: res.data.lastName,
              token: res.data.token,
              isAuth: false
            })));

          case 14:
            _context3.next = 16;
            return regeneratorRuntime.awrap(dispatch(refreshUser()));

          case 16:
            return _context3.abrupt("return", res.status);

          case 17:
            _context3.next = 23;
            break;

          case 19:
            _context3.prev = 19;
            _context3.t0 = _context3["catch"](3);
            console.log(_context3.t0);
            return _context3.abrupt("return", {
              error: _context3.t0
            });

          case 23:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[3, 19]]);
  };
};

exports.signupThunk = signupThunk;

var updateProfileThunk = function updateProfileThunk(_ref4) {
  var school = _ref4.school,
      major = _ref4.major,
      minor = _ref4.minor,
      faculty = _ref4.faculty,
      _ref4$year = _ref4.year,
      year = _ref4$year === void 0 ? 0 : _ref4$year;
  return function _callee4(dispatch, getState) {
    var state, profile, subjects, id, token, res;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            state = getState();
            profile = state.profile, subjects = state.subjects;
            id = profile.id, token = profile.token;
            console.log('ABOUT TO CALL UPDATING USER PROFILE');
            _context4.prev = 4;
            _context4.next = 7;
            return regeneratorRuntime.awrap(_axios["default"].put(_url["default"] + '/api/UserProfiles/' + id, _objectSpread({}, profile, {
              schoolID: school,
              facultyID: faculty,
              major: major,
              minor: minor,
              year: year
            }), {
              headers: {
                'Authorization': 'bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
            }));

          case 7:
            res = _context4.sent;
            console.log('RESPONSE FROM UPDATEPROFILE');
            console.log(res.data);
            dispatch((0, _profileActions.update)(_objectSpread({}, res.data)));
            return _context4.abrupt("return", res.data);

          case 14:
            _context4.prev = 14;
            _context4.t0 = _context4["catch"](4);
            console.log(_context4.t0);

          case 17:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[4, 14]]);
  };
};

exports.updateProfileThunk = updateProfileThunk;

var refreshUser = function refreshUser() {
  return function _callee5(dispatch, getState) {
    var state, profile, subjects, id, token, res;
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            state = getState();
            profile = state.profile, subjects = state.subjects;
            id = profile.id, token = profile.token;
            console.log('refreshing user');
            _context5.prev = 4;
            _context5.next = 7;
            return regeneratorRuntime.awrap(_axios["default"].get(_url["default"] + '/api/userprofiles/' + id, {
              headers: {
                'Authorization': 'bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
            }));

          case 7:
            res = _context5.sent;

            if (res.status === 200) {
              dispatch((0, _profileActions.modifyProfile)(_objectSpread({}, res.data)));
            }

            _context5.next = 14;
            break;

          case 11:
            _context5.prev = 11;
            _context5.t0 = _context5["catch"](4);
            console.log(_context5.t0);

          case 14:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[4, 11]]);
  };
};

exports.refreshUser = refreshUser;

var turnOffTaskTour = function turnOffTaskTour() {
  return function _callee6(dispatch, getState) {
    var state, profile, subjects, id, token, res;
    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            state = getState();
            profile = state.profile, subjects = state.subjects;
            id = profile.id, token = profile.token;
            _context6.prev = 3;
            _context6.next = 6;
            return regeneratorRuntime.awrap(_axios["default"].put(_url["default"] + '/api/UserProfiles/' + id, _objectSpread({}, profile, {
              taskTour: 1
            }), {
              headers: {
                'Authorization': 'bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
            }));

          case 6:
            res = _context6.sent;
            dispatch((0, _profileActions.modifyProfile)(_objectSpread({}, res.data)));
            _context6.next = 13;
            break;

          case 10:
            _context6.prev = 10;
            _context6.t0 = _context6["catch"](3);
            console.log(_context6.t0);

          case 13:
          case "end":
            return _context6.stop();
        }
      }
    }, null, null, [[3, 10]]);
  };
};

exports.turnOffTaskTour = turnOffTaskTour;

var turnOffSubjectTour = function turnOffSubjectTour() {
  return function _callee7(dispatch, getState) {
    var state, profile, subjects, id, token, res;
    return regeneratorRuntime.async(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            state = getState();
            profile = state.profile, subjects = state.subjects;
            id = profile.id, token = profile.token;
            _context7.prev = 3;
            _context7.next = 6;
            return regeneratorRuntime.awrap(_axios["default"].put(_url["default"] + '/api/UserProfiles/' + id, _objectSpread({}, profile, {
              subjectTour: 1
            }), {
              headers: {
                'Authorization': 'bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
            }));

          case 6:
            res = _context7.sent;
            dispatch((0, _profileActions.modifyProfile)(_objectSpread({}, res.data)));
            _context7.next = 13;
            break;

          case 10:
            _context7.prev = 10;
            _context7.t0 = _context7["catch"](3);
            console.log(_context7.t0);

          case 13:
          case "end":
            return _context7.stop();
        }
      }
    }, null, null, [[3, 10]]);
  };
};

exports.turnOffSubjectTour = turnOffSubjectTour;

var turnOffDashboardTour = function turnOffDashboardTour() {
  return function _callee8(dispatch, getState) {
    var state, profile, subjects, id, token, res;
    return regeneratorRuntime.async(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            state = getState();
            profile = state.profile, subjects = state.subjects;
            id = profile.id, token = profile.token;
            _context8.prev = 3;
            _context8.next = 6;
            return regeneratorRuntime.awrap(_axios["default"].put(_url["default"] + '/api/UserProfiles/' + id, _objectSpread({}, profile, {
              dashboardTour: 1
            }), {
              headers: {
                'Authorization': 'bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
            }));

          case 6:
            res = _context8.sent;
            dispatch((0, _profileActions.modifyProfile)(_objectSpread({}, res.data)));
            _context8.next = 13;
            break;

          case 10:
            _context8.prev = 10;
            _context8.t0 = _context8["catch"](3);
            console.log(_context8.t0);

          case 13:
          case "end":
            return _context8.stop();
        }
      }
    }, null, null, [[3, 10]]);
  };
};

exports.turnOffDashboardTour = turnOffDashboardTour;

var resetPassword = function resetPassword(email) {
  return function _callee9(dispatch, getState) {
    var state, profile, subjects, id, token, res;
    return regeneratorRuntime.async(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            state = getState();
            profile = state.profile, subjects = state.subjects;
            id = profile.id, token = profile.token;
            _context9.prev = 3;
            _context9.next = 6;
            return regeneratorRuntime.awrap(_axios["default"].post(_url["default"] + '/api/userprofiles/resetPassword', "'" + email + "'", {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
            }));

          case 6:
            res = _context9.sent;
            return _context9.abrupt("return", res.status === 200);

          case 10:
            _context9.prev = 10;
            _context9.t0 = _context9["catch"](3);
            console.log(_context9.t0);

          case 13:
          case "end":
            return _context9.stop();
        }
      }
    }, null, null, [[3, 10]]);
  };
};

exports.resetPassword = resetPassword;

var turnOffProgressBar = function turnOffProgressBar() {
  return function _callee10(dispatch, getState) {
    var state, profile, subjects, id, token, res;
    return regeneratorRuntime.async(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            state = getState();
            profile = state.profile, subjects = state.subjects;
            id = profile.id, token = profile.token;
            _context10.prev = 3;
            _context10.next = 6;
            return regeneratorRuntime.awrap(_axios["default"].put(_url["default"] + '/api/UserProfiles/' + id, _objectSpread({}, profile, {
              progressBar: 1
            }), {
              headers: {
                'Authorization': 'bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
            }));

          case 6:
            res = _context10.sent;
            dispatch((0, _profileActions.modifyProfile)(_objectSpread({}, res.data)));
            _context10.next = 13;
            break;

          case 10:
            _context10.prev = 10;
            _context10.t0 = _context10["catch"](3);
            console.log(_context10.t0);

          case 13:
          case "end":
            return _context10.stop();
        }
      }
    }, null, null, [[3, 10]]);
  };
};

exports.turnOffProgressBar = turnOffProgressBar;