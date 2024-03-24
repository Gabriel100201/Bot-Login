 const axios = require('axios');
 const setTotalCosts = ({newCost}) => {
  axios.post("http://localhost:3000/updateCosts", {
    costToAdd: newCost
  })
 }

 module.exports = {setTotalCosts}