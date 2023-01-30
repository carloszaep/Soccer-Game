function swapKeysAndValues(obj) {
  const new_obj = {};
  for (var key in obj) {
    new_obj[obj[key]] = key;
  }
  return new_obj;
}
