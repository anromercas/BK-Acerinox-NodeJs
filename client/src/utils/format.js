export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export function today(){
  var local = new Date();
  local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
  return local.toJSON().slice(0,10);
 } 