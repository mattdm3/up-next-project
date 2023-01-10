export const request = async (url) => fetch(url).then((data) => data.json());

export const SERVER_URL =
  process.env.NODE_ENV === "production" ? "/v1" : "http://localhost:4000/v1";

export const httpUndoRating = async (movieId, appUser) => {
  try {
    const res = await fetch(`${SERVER_URL}/users/undoRating`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: appUser.email,
        uid: appUser.uid,
        movieId: movieId.toString(),
      }),
    });
    return await res.json();
  } catch (error) {
    return {
      ok: false,
    };
  }
};

export const httpHandleUpNextAdd = async (id, firebaseAppAuth, user) => {
  try {
    const res = await fetch(`${SERVER_URL}/users/upNext`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        uid: firebaseAppAuth?.currentUser?.uid,
        movieId: id.toString(),
      }),
    });

    return await res.json();
  } catch (error) {
    return {
      ok: false,
    };
  }
};

export const httpHandleDislike = async (user, firebaseAppAuth, id) => {
  try {
    const response = await fetch(`${SERVER_URL}/users/dislike`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        uid: firebaseAppAuth?.currentUser?.uid,
        movieId: id.toString(),
      }),
    });
    return await response.json();
  } catch (error) {
    return {
      ok: false,
    };
  }
};

export const httpHandleLike = async (user, firebaseAppAuth, id) => {
  try {
    const response = await fetch(`${SERVER_URL}/users/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        uid: firebaseAppAuth?.currentUser?.uid,
        movieId: id.toString(),
      }),
    });
    return await response.json();
  } catch (error) {
    return {
      ok: false,
    };
  }
};
