function randomize(min, max) {
  return Math.random() * (max - min) + min;
}

function orphanKill(content) {
  return content.replace(/ (?=[^ ]*$)/i, '\u00A0')
}

export { randomize, orphanKill }
