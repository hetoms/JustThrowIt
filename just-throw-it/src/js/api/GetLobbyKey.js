const apiURL = 'http://justthrowit-env.eu-central-1.elasticbeanstalk.com/createLobby';

const getLobbyKey = async (username, fieldId) => {
  return await fetch(apiURL+"?username="+username+"&fieldId="+fieldId, {cache: 'no-store'})
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson._embedded.fields);
    })
    .catch((error) => {
      console.error(error);
    });
};
export default getLobbyKey;