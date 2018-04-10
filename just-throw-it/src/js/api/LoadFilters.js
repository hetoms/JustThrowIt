const apiURL = 'http://justthrowit-env.eu-central-1.elasticbeanstalk.com/counties';

const loadFilters = async (callback) => { 
  fetch(apiURL, {cache: 'no-store'})
    .then(function (response) {
      return response.json();
    }).then( text => callback(text));
};

export default loadFilters;
