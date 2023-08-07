import moment from "moment";
const accessTokenExpire = "2h";
const refreshTokenExpire = "10d";
function currentDate() {
    return moment().tz("Asia/Kathmandu").format("YYYY-MM-DD HH:mm:ss");
}
function expireIn(days) {
    return moment()
        .tz("Asia/Kathmandu")
        .add(parseInt(days.replace("d", "")), "days")
        .format("YYYY-MM-DD HH:mm:ss");
}
export { currentDate, expireIn, accessTokenExpire, refreshTokenExpire };
