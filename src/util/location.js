// const NodeGeocoder = require("node-geocoder");

// var options = {
//   enableHighAccuracy: true,
//   timeout: 5000,
//   maximumAge: 0,
// };

// function success(pos) {
//   var crd = pos.coords;

//   const options = {
//     provider: "locationiq",

//     // Optional depending on the providers
//     fetch: customFetchImplementation,
//     apiKey: "pk.955db3e730928d4d837d303c7c7c3536	", // for Mapquest, OpenCage, Google Premier
//     formatter: "string", // 'gpx', 'string', ...
//   };

//   const geocoder = NodeGeocoder(options);

//   // Using callback
//   geocoder.geocode("29 champs elysée paris").then(res => console.log("API RES", res));
// //   console.log("API RES", res);
//   console.log("Your current position is:");
//   console.log(`Latitude : ${crd.latitude}`);
//   console.log(`Longitude: ${crd.longitude}`);
//   console.log(`More or less ${crd.accuracy} meters.`);
// }

// function error(err) {
//   console.warn(`ERROR(${err.code}): ${err.message}`);
// }

// const location = () => {
//     navigator.geolocation.getCurrentPosition(success, error, options);
// }

// export default location;
