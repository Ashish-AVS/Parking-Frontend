// import React, { useState } from "react";
// import { Rating } from "react-simple-star-rating";

// import axios from "axios";
// import { ACCESS_TOKEN } from "../constants";
// export default function WorkerRating() {
//   const [rating, setRating] = useState(); // initial rating value
//   const workerIdList = window.location.pathname
//     .substring(6)
//     .split(",")
//     .map(Number);
//   const ratingRef = React.useRef();

//   const ratingHandler = (e, rating) => {
//     const r = ratingRef.current;
//     if (e.target.value !== 0) {
//       axios
//         .put(
//           `http://localhost:8080/worker/${e.target.value}/rating/${rating}`,
//           {},
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
//             },
//           }
//         )
//         .then((res) => alert("DONE"))
//         .catch((err) => console.log(err));
//     }
//   };

//   return (
//     <div>
//       {workerIdList.map((worker) => (
//         <div>
//           <label>Enter Rating for {worker}</label>
//           <input type="text" name={worker} ref={ratingRef} />
//           <button type="submit" onClick={(e) => ratingHandler(e, worker.id)}>
//             Submit Rating
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }
import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";

import axios from "axios";
import { ACCESS_TOKEN } from "../constants";
export default function WorkerRating() {
  const [rating, setRating] = useState(); // initial rating value
  const workerIdList = window.location.pathname
    .substring(6)
    .split(",")
    .map(Number);
  const ratingRef = React.useRef();

  const ratingHandler = (e) => {
    e.preventDefault();
    const r = ratingRef.current.value;
    console.log(ratingRef.current.value);

    axios
      .put(
        `http://localhost:8080/worker/${workerIdList[0]}/rating/${r}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
          },
        }
      )
      .then((res) => alert("DONE"))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={ratingHandler}>
        <div className="align-middle m-2 p-2 flex">
          <label className="align-middle m-2 p-2 items-center">Enter Rating for {workerIdList[0]}</label>
          <input
            type="number"
            name={workerIdList[0]}
            ref={ratingRef}
            min={0}
            max={10}
            className="border-2 m-2 p-2 items-center"
          />
          <button
            className="bg-green-500	text-white m-2 p-2 rounded-md	items-center"
            type="submit"
          >
            Submit Rating
          </button>
        </div>
      </form>
    </div>
  );
}
