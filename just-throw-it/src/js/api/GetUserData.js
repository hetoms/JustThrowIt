const apiURL = 'http://justthrowit-env.eu-central-1.elasticbeanstalk.com/userData?username=';

const getUserdata = async (userName, callback) => {
  fetch(apiURL+userName, {cache: 'no-store'})
    .then(function (response) {
      return response.json();
    }).then( text => callback(text));
};

export default getUserdata;
