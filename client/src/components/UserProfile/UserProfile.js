import React, { useContext } from "react";
import { LoginContext } from "../LoginContext";
import RenderProfile from "./RenderProfile";

const UserProfile = () => {
  const { appUser } = useContext(LoginContext);

  return appUser.email ? (
    <RenderProfile />
  ) : (
    <div>Please login or make an account.</div>
  );
};

export default UserProfile;
