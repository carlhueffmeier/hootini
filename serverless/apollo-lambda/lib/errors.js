class IsImmutableError extends Error {
  constructor(key) {
      super(`The key '${key}' is immutable and can not be modified.`);
      Error.captureStackTrace(this, IsImmutableError);
  }
}

class ValidationError extends Error {
  constructor(field, message) {
      super(`Validation failed for field '${field}': ${message}`);
      Error.captureStackTrace(this, ValidationError);
  }
}

exports.IsImmutableError = IsImmutableError;
exports.ValidationError = ValidationError;
