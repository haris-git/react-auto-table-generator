export function getAllParamsFromUrl() {
  const queryString = window.location.search;
  return new URLSearchParams(queryString);
}

export function getParamFromUrl(key) {
  try {
    const urlParams = getAllParamsFromUrl();

    if (key) {
      if (typeof(key) == "string") {
        return urlParams.get(key);
      } else {
        throw new Error("Το κλειδί που χρησιμοποιήθηκε πρέπει να είναι τύπου string.");
      }
    } else {
      throw new Error('Δεν έχει δωθεί κανένα κλειδί');
    }
  } catch (error) {
    throw error;
  }
}

