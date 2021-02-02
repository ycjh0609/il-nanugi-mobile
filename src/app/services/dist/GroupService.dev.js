"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _reactNative = require("react-native");

var _commonAxios = _interopRequireDefault(require("../utils/axios/commonAxios"));

var _commonStore = require("../utils/store/commonStore");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var GroupService = {
  getMyGroups: function getMyGroups() {
    var userInfo = (0, _commonStore.getStoreItem)("userInfo");
    return _commonAxios["default"].get("/groups");
  },
  getGroupDetail: function getGroupDetail(groupId) {
    return _commonAxios["default"].get("/groups?id=".concat(groupId));
  },
  updateGroup: function updateGroup(group) {
    return _commonAxios["default"].put("/groups");
  }
};
var _default = GroupService;
exports["default"] = _default;