const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.CHAT_GPT_API_KEY,
  organization: "org-wRPUKDEWANT87hyQRTIdWK0r",
});
const openai = new OpenAIApi(configuration);

function removeNewlines(str) {
  return str.replace(/\n/g, "");
}

async function httpGetRecommendedMovie(req, res, id) {
  var options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/find/${id}?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&external_source=imdb_id`,
  };
  try {
    const response = await fetch(options.url, {
      method: options.method,
      headers: options.headers,
    });
    const json = await response.json();
    return res.status(200).json(json);
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Error getting movie", message: error?.message || "n/a" });
  }
}

async function httpGetRecommendations(req, res) {
  const body = req.body;
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Recommend a movie based on these movies: ${body?.selectedTitles}. Only include the IMDB id without the title for the recommendation.`,
    });
    const imdbId = () => {
      const newId = removeNewlines(response.data.choices[0].text);
      if (newId[0] === "t") {
        return newId;
      }
      return `tt${newId}`;
    };
    console.log("IMDB ID", { id: imdbId() });
    httpGetRecommendedMovie(req, res, imdbId());
  } catch (error) {
    res.status(400).json({ error: "error", message: error });
  }
}

module.exports = {
  httpGetRecommendations,
};
