const apiURL = 'http://justthrowit-env.eu-central-1.elasticbeanstalk.com/fields';
const response = ['Harju', 'Pärnu', 'Narva', 'Tartu'];

const loadFilters = (callback) => {
  /*
  fetch(apiURL, {cache: 'no-store'})
    .then((response) => saveAreaFilters(response))
    */
  console.log('wat', response);
  callback(response);
};

export default loadFilters;
