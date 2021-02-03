"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _commonStyle = _interopRequireDefault(require("../../styles/commonStyle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CodeUtil = {
  /*---------------------------------------*/
  //1) TASK

  /*---------------------------------------*/
  TASK_STATUS: {
    TODO: "T",
    DOING: "D",
    END: "E"
  },
  TASK_STATUS_TEXT: {
    END: "종료",
    TODO: "예정",
    DOING: "진행"
  },
  GET_STATUS_TEXT: function GET_STATUS_TEXT(status) {
    if (status === "E") return "완료";
    if (status === "T") return "예정";
    if (status === "D") return "진행";
  },
  TASK_SORT_TYPE: {
    BY_ENDTIME: 0,
    BY_STATUS: 1,
    BY_GROUP_ID: 2
  },
  TASK_STATUS_COLOR: {
    TODO: "#999793",
    DOING: "#f5ad42",
    END: _commonStyle["default"].oneTextColor
  }
};
var _default = CodeUtil;
exports["default"] = _default;