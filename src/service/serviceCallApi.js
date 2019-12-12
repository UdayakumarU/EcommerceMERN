import axios from 'axios';



const getProducts = () => { 
    
 // how to return data?
 
const data = axios.get('./data.json');
 return data.then( response => {
    // console.log(response.data);
    return response.data;
  })
  .catch(function (error) {
    console.log(error);
    return Promise.reject(error)
  });
}
export default getProducts;

