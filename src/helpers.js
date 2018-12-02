export const checkEmptyString = (name) => {
  if (!name.replace(/\s+/g, '')) {
    return true;
  }
  return false;
}
