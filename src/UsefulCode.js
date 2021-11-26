// const [workers, setWorkers] = useState();
// useEffect(()=>{
//     // axios.get("http://localhost:8080/worker").then(res => console.log(res));
//     axios({
//       method: 'GET',
//       mode: 'no-cors',
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Content-Type': 'application/json',
//       },
//      credentials: 'same-origin',
//      url: "http://localhost:8080/worker"
//     }).then(res => {
//       setWorkers(res);
//       console.log(res);
//     });
//   }, [])