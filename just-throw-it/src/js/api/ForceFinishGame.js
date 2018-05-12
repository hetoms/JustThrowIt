const apiURL = 'http://justthrowit-env.eu-central-1.elasticbeanstalk.com/forceFinish';

const forceFinishGame = async (username, lobbyKey) => {
  return await fetch(apiURL,
    {cache: 'no-store',
      body: JSON.stringify({
        username,
        lobbyKey
      }),
      headers: {
        "Content-Type": "application/json"
      },
      method: "post"
    })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
};
export default forceFinishGame;