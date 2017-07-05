const isAvailable = (function() {
  const test = 'test';
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
  } catch (e) {
    return false;
  }
}());

const util = {
  get(key) {
    return isAvailable
      ? localStorage.getItem(key)
      : null;
  },

  set(key, value) {
    return isAvailable
      ? localStorage.setItem(key, value)
      : null;
  }
};

export default util;