export function renderTemplate(template, fields) {
  const re = /<%(\w+)%>/g;
  return template.replace(re, getField(fields));
}

function getField(data) {
  return (match, fieldId) => data[fieldId] || match;
}
