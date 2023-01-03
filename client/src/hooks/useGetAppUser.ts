import firebase from "firebase";
import React, { useContext } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { LoginContext } from "../components/LoginContext";
// const SERVER_URL = process.env.SERVER_URL

export interface AppUser {
  data: Data;
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
}

export interface Data {
  dislikedMovies: { [key: string]: string };
  likedMovies: { [key: string]: string };
  recommendationCount: number;
  recommendations: { [key: string]: string };
  upNextList: UpNextList;
}

export interface UpNextList {
  "567189": string;
  none: string;
}

const SERVER_URL = "";
export function useGetAppUser() {
  const getAppUser: (user: firebase.User) => Promise<{
    user: AppUser;
    message: string;
  }> = useCallback((user: any) => {
    if (!user) return;
    console.log("FETCHING USER");
    return fetch(`${SERVER_URL}/users`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        data: {
          likedMovies: { none: "none" },
          dislikedMovies: { none: "none" },
          upNextList: { none: "none" },
          recommendationCount: 0,
        },
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        return {
          user: json.data,
          message: json.message,
        };
      });
  }, []);

  return { getAppUser };
}
