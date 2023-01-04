const db = require("./users.model");

const queryDatabase = async (key) => {
  const ref = db.ref(key);
  let data;
  await ref.once(
    "value",
    (snapshot) => {
      data = snapshot.val();
    },
    (err) => {
      console.log(err);
    }
  );

  return data;
};

const getUserByEmail = async (email) => {
  const data = (await queryDatabase(`appUsers`)) || {};
  const dataValue = Object.keys(data)
    .map((item) => data[item])
    .find((obj) => obj.email === email);

  return dataValue || false;
};

async function httpGetUser(req, res) {
  // GET UID
  const { uid } = req.body;
  // CHECK IF USER EXISTS
  const returningUser = await getUserByEmail(req.body.email);
  if (returningUser) {
    // get the current user data to return to FE incl. liked/disliked
    let snapData;
    await db
      .ref("appUsers/" + uid)
      .once("value")
      .then(function (snapshot) {
        snapData = snapshot.val();
      });
    res
      .status(200)
      .json({ status: 200, data: snapData, message: "returning user" });
    return;
  }
  //for a new user JUST return req.body
  const appUserRef = db.ref("appUsers").child(req.body.uid);
  appUserRef.set(req.body).then(() => {
    res.status(200).json({
      status: 200,
      data: req.body,
      message: "new user",
    });
  });
}

async function httpDislikeMovie(req, res) {
  const { movieId } = req.body;
  const { uid } = req.body;

  // PUSH disLIKED MOVIE INTO ITS ARRAY ON DB
  await db
    .ref("appUsers/" + uid)
    .child("data")
    .child("dislikedMovies")
    .child(movieId)
    .set(movieId);

  //REMOVE MOVIE IF IN UP NEXT LIST
  await db
    .ref("appUsers/" + uid)
    .child("data")
    .child("upNextList")
    .child(movieId)
    .remove();

  // if UP NEXT gets empyt put "none"
  let upNextData;
  var refUpNext = db.ref("appUsers/" + uid + "/data/upNextList");

  await refUpNext.on(
    "value",
    function (snapshot) {
      upNextData = snapshot.val();
    },
    function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    }
  );

  // IF it's empty, put "none" so that Front End doesn't break :)
  if (!upNextData) {
    await db
      .ref("appUsers/" + uid)
      .child("data")
      .child("upNextList")
      .child("none")
      .set("none");
  }

  // Remove "None" from list

  await db
    .ref("appUsers/" + uid)
    .child("data")
    .child("dislikedMovies")
    .child("none")
    .remove();

  //get all movie data from db and return new data
  let snapData;
  await db
    .ref("appUsers/" + uid)
    .once("value")
    .then(function (snapshot) {
      snapData = snapshot.val();
    });

  return res
    .status(200)
    .json({ status: 200, data: snapData, message: "movie disliked" });
}

async function httpLikeMovie(req, res) {
  const { movieId } = req.body;
  const { uid } = req.body;

  const userData = await getUserByEmail(req.body.email);

  // PUSH LIKED MOVIE INTO ITS ARRAY ON DB
  await db
    .ref("appUsers/" + uid)
    .child("data")
    .child("likedMovies")
    .child(movieId)
    .set(movieId);

  //REMOVE MOVIE IF IN UP NEXT LIST
  await db
    .ref("appUsers/" + uid)
    .child("data")
    .child("upNextList")
    .child(movieId)
    .remove();

  // if UP NEXT gets empyt put "none"
  let upNextData;
  var refUpNext = db.ref("appUsers/" + uid + "/data/upNextList");

  await refUpNext.on(
    "value",
    function (snapshot) {
      upNextData = snapshot.val();
    },
    function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    }
  );

  // IF it's empty, put "none" so that Front End doesn't break :)
  if (!upNextData) {
    await db
      .ref("appUsers/" + uid)
      .child("data")
      .child("upNextList")
      .child("none")
      .set("none");
  }

  // Remove "None" from list

  await db
    .ref("appUsers/" + uid)
    .child("data")
    .child("likedMovies")
    .child("none")
    .remove();

  //get all movie array from db
  let snapData;
  await db
    .ref("appUsers/" + uid)
    .once("value")
    .then(function (snapshot) {
      snapData = snapshot.val();
    });
  return res
    .status(200)
    .json({ status: 200, data: snapData, message: "returning user" });
}

async function httpAddUpNextMovie(req, res) {
  const { movieId } = req.body;
  const { uid } = req.body;

  const userData = await getUserByEmail(req.body.email);

  // PUSH UPNEXT MOVIE INTO ITS OBJECT ON DB
  await db
    .ref("appUsers/" + uid)
    .child("data")
    .child("upNextList")
    .child(movieId)
    .set(movieId);

  // Remove "None" from list

  await db
    .ref("appUsers/" + uid)
    .child("data")
    .child("upNextList")
    .child("none")
    .remove();

  //get liked movie array from db and return new data
  let snapData;
  await db
    .ref("appUsers/" + uid)
    .once("value")
    .then(function (snapshot) {
      snapData = snapshot.val();
    });
  return res
    .status(200)
    .json({ status: 200, data: snapData, message: "returning user" });
}

async function httpUndoRatingMovie(req, res) {
  const { movieId } = req.body;
  const { uid } = req.body;

  const userData = await getUserByEmail(req.body.email);

  //remove from liked
  await db
    .ref("appUsers/" + uid)
    .child("data")
    .child("dislikedMovies")
    .child(movieId)
    .remove();

  await db
    .ref("appUsers/" + uid)
    .child("data")
    .child("likedMovies")
    .child(movieId)
    .remove();

  await db
    .ref("appUsers/" + uid)
    .child("data")
    .child("upNextList")
    .child(movieId)
    .remove();

  //make sure it's not empty!

  // LIKED ************
  let likedData;
  var refLiked = db.ref("appUsers/" + uid + "/data/likedMovies");

  await refLiked.on(
    "value",
    function (snapshot) {
      likedData = snapshot.val();
    },
    function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    }
  );

  // IF it's empty, put "none" so that Front End doesn't break :)

  if (likedData === null) {
    await db
      .ref("appUsers/" + uid)
      .child("data")
      .child("likedMovies")
      .child("none")
      .set("none");
  }

  // DISLIKED************

  let dislikedData;
  var refDisliked = db.ref("appUsers/" + uid + "/data/dislikedMovies");

  await refDisliked.on(
    "value",
    function (snapshot) {
      dislikedData = snapshot.val();
    },
    function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    }
  );

  // IF it's empty, put "none" so that Front End doesn't break :)
  if (dislikedData === null) {
    await db
      .ref("appUsers/" + uid)
      .child("data")
      .child("dislikedMovies")
      .child("none")
      .set("none");
  }

  // UP NEXT *******************\
  let upNextData;
  var refUpNext = db.ref("appUsers/" + uid + "/data/upNextList");

  await refUpNext.on(
    "value",
    function (snapshot) {
      upNextData = snapshot.val();
    },
    function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    }
  );

  // IF it's empty, put "none" so that Front End doesn't break :)
  if (upNextData === null) {
    await db
      .ref("appUsers/" + uid)
      .child("data")
      .child("upNextList")
      .child("none")
      .set("none");
  }

  // Get new data returned

  let snapData;
  await db
    .ref("appUsers/" + uid)
    .once("value")
    .then(function (snapshot) {
      snapData = snapshot.val();
    });
  return res
    .status(200)
    .json({ status: 200, data: snapData, message: "returning user" });
}

module.exports = {
  httpGetUser,
  httpDislikeMovie,
  httpLikeMovie,
  httpAddUpNextMovie,
  httpUndoRatingMovie,
};
