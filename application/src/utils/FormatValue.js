import moment from "moment";

export default class FormatValue {
  static currency(value, code) {
    return value.toLocaleString(undefined, {
      style: "currency",
      currency: code,
    });
  }

  static toDateTime(value) {
    return moment(value).format("DD/MM/YYYY - hh:mm:ss");
  }
}
