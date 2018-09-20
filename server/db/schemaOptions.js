// Options applied to every mongoose schema
const schemaOptions = {
  toObject: { getters: true, versionKey: false },
  toJSON: { getters: true, versionKey: false }
};

const setSchemaOptions = schema => {
  for (let [key, val] of Object.entries(schemaOptions)) {
    schema.set(key, val);
  }
};

exports.setSchemaOptions = setSchemaOptions;
