const { Deepgram } = require("@deepgram/sdk");
const config = require("./config.json");
const cors = require("cors");
const express = require("express");
const multer = require("multer");

const appPort = process.env.SERVER_PORT || 8081;
const port = process.env.API_PORT || 8080;
const appOrigin = config.appOrigin || `http://localhost:${appPort}`;

const deepgram = new Deepgram(config.dgKey, "api.beta.deepgram.com");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const app = express();
app.use(cors());

app.post("/api", upload.single("file"), async (req, res) => {
  const { body, file } = req;
  const { url, features, model, version, tier } = body;
  const dgFeatures = JSON.parse(features);

  let dgRequest = null;

  try {
    // validate the URL for a URL request
    if (url && url.startsWith("https://res.cloudinary.com/deepgram")) {
      dgRequest = { url };
    }

    // get file buffer for a file request
    if (file) {
      const { mimetype, buffer } = file;
      dgRequest = { buffer, mimetype };
    }

    if (!dgRequest) {
      throw Error(
        "Error: You need to choose a file to transcribe your own audio."
      );
    }

    // send request to deepgram
    const transcription = await deepgram.transcription.preRecorded(dgRequest, {
      ...dgFeatures,
      model,
      tier,
      ...(version ? { version } : null),
      ...(model === "whisper" ? null : { tier }),
    });

    // return results
    res.send({ model, version, tier, dgRequest, dgFeatures, transcription });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err, dgRequest, {
      ...dgFeatures,
      version,
      model,
      tier,
    });

    // handle error
    res.status(500).send({ err: err.message ? err.message : err });
  }
});

app.listen(port, () => console.log(`API Server listening on port ${port}`));
