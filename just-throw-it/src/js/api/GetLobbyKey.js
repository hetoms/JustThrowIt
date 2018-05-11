const apiURL = 'http://justthrowit-env.eu-central-1.elasticbeanstalk.com/createLobby';

const getLobbyKey = async (username, fieldId) => {
  return await fetch(apiURL,
    {cache: 'no-store',
      body: JSON.stringify({
        username,
        fieldId
      }),
      method: "post",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
};
export default getLobbyKey;