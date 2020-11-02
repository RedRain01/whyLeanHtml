
//YYYY-MM-DD HH:mm:ss
export function formatDate(_date, fmt) {
  var date = new Date(_date)
  if (date == undefined) {
    return "";
  }
  if (!_date) {
    return "";
  }
  var moment = require("moment");
  return moment(date).format("YYYY-MM-DD HH:mm:ss");
}

//YYYY-MM-DD HH:mm:ss
export function formatDate2(_date, fmt) {
  var date = new Date(_date)
  if (date == undefined) {
    return "";
  }
  var moment = require("moment");
  return moment(date).format(fmt);
}

