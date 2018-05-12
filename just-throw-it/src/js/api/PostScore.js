const apiURL = 'http://justthrowit-env.eu-central-1.elasticbeanstalk.com/postScore';

const postNewScore = async (username, trackNr, throws, hasFinished, lobbyKey) => {
  return await fetch(apiURL,
    {cache: 'no-store',
      body: JSON.stringify({
        username,
        trackNr,
        score: throws,
        hasFinished,
        lobbyKey
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
export default postNewScore;