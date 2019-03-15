const createSearchFilter = (searchKeys, where = {}) => ({
  ...where,
  ...searchKeys.reduce(
    (target, key) =>
      typeof where[key] !== 'undefined'
        ? { ...target, [key]: new RegExp(where[key], 'i') }
        : target,
    {}
  )
});

exports.createSearchFilter = createSearchFilter;
