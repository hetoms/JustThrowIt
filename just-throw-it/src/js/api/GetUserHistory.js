const apiURL = 'http://justthrowit-env.eu-central-1.elasticbeanstalk.com/userHistory?username=';

const getUserHistory = async (userName, callback) => {
  fetch(apiURL+userName, {cache: 'no-store'})
    .then(function (response) {
      return response.json();
    }).then( text => callback(text));
};

export default getUserHistory;
