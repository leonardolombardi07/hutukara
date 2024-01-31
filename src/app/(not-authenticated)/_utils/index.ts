function getHumanReadableErrorMessage(error: any) {
  if (error.code === "auth/invalid-email") {
    return "Invalid e-mail address";
  } else if (error.code === "auth/user-not-found") {
    return "User not found";
  } else if (error.code === "auth/wrong-password") {
    return "Wrong password";
  } else if (error.code === "auth/popup-blocked") {
    return "Popup blocked. Please enable popups and try again";
  } else {
    return "Something went wrong.";
  }
}

export { getHumanReadableErrorMessage };
