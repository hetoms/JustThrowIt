const apiURL = 'http://justthrowit-env.eu-central-1.elasticbeanstalk.com/join';

const joinLobby = async (username, lobbyKey) => {
  return await fetch(apiURL + "?lobbyKey=" + lobbyKey.toString() + "&username=" + username,
    {
      cache: 'no-store',
      method: "get"
    })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
};
export default joinLobby;