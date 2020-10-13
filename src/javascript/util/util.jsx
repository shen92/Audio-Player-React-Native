export const asSeconds = function(time) {
  if (time === 0)
    return '00:00';
  const min = Math.floor((time / 1000 / 60) << 0);
  const sec = Math.floor((time / 1000) % 60);
  return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
}

export const asMilliseconds = function(time) {
  const min = parseInt(time.substring(0, 2));
  const sec = parseInt(time.substring(3, 5));
  return ((min * 60 + sec) * 1000);
}

export const findTrackIndexOf = function(track, playlist) {
  if (track === null || playlist === null)
    return -1;
  for (let i = 0; i < playlist.length; i++) {
    if (track.title === playlist[i].title)
      return i;

  }
  return -1;
}

export const asLRCArray = function(lrc) {
  let lrcList = [];
  if (lrc === null || lrc === "") return lrcList;
  for (const line of Object.entries(lrc)) {
    lrcList.push([
      line[0],
      line[1]
    ]);
  }
  return lrcList;
}

export const findLyricsTimeIndexOf = function(time, lrc) {
  if (lrc === null)
    return -1;

  for (let i = 0; i < lrc.length; i++) {
    if (time === lrc[i][0])
      return i;
  }
  return -1;
}

export const findLyricsIndexOf = function(line, lrc) {
  if (lrc === null)
    return -1;

  for (let i = 0; i < lrc.length; i++) {
    if (time === lrc[i][1])
      return i;
  }
  return -1;
}
