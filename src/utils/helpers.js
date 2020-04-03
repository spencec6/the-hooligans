function randomize(min, max) {
  return Math.random() * (max - min) + min;
}

function orphanKill(content) {
  return content.replace(/ (?=[^ ]*$)/i, '\u00A0')
}

function YouTubeGetID(url){
  url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_-]/i)[0] : url[0];
}

export { randomize, orphanKill, YouTubeGetID }
