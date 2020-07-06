//
import moment from "moment";
import Vue from "vue";

Vue.filter("formatDate", function(value) {
  if (value) {
    return moment(new Date(value)).format("hh:mm:ss");
  }
});
