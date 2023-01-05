const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.CHAT_GPT_API_KEY,
  organization: "org-wRPUKDEWANT87hyQRTIdWK0r",
});
const openai = new OpenAIApi(configuration);

const API_ENDPOINT = "https://api.openai.com/v1/completions";

async function httpGetRecommendations(req, res) {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt:
        "Recommend a movie based on these: Oceans 11, the Departed, Batman Returns, the Town, Heat. Only list the name of the movie.",
    });

    console.log({ response });
    // const json = await models.json();
    res.status(200).json({ models: response?.data });
  } catch (error) {
    res.status(400).json({ error: "error", message: error });
  }
  //   console.log({ modelsData: JSON.stringify(models.data, null, 2) });

  //   try {
  //     const response = await fetch(API_ENDPOINT, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${process.env.CHAT_GPT_API_KEY}`,
  //       },
  //       body: {
  //         model: "text-davinci-001",
  //         prompt: "How do I use chatGPT?",
  //       },
  //     });

  //     const result = await response.json();
  //     console.log({ result });
  //     res.status(200).json(result);
  //   } catch (error) {
  //     console.log({ error });
  //   }
}

module.exports = {
  httpGetRecommendations,
};
