import axios from 'axios';

export async function fetch(cat, formatFunction) {
  const url = getCatUrl(cat);
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.VUE_APP_API_URL + url)
      .then((res) => {
        if (formatFunction) {
          return resolve(formatFunction(sortById(res.data)));
        } else {
          return resolve(sortById(res.data));
        }
      })
      .catch((e) => {
        console.error(e);
        reject(e);
      });
  });
}

function getCatUrl(cat) {
  switch (cat) {
    case 'tracks':
      return '/tracks';
    case 'artists':
      return '/artists';
  }
}

export function formatIntoRows(data) {
  const rows = data.reduce(function(result, value, index, array) {
    if (index % 2 === 0) result.push(array.slice(index, index + 2));
    return result;
  }, []);
  return rows;
}

export function sortById(data) {
  return data.sort((a, b) => {
    return a.id - b.id;
  });
}

export function sortByIndex(data) {
  return data.sort((a, b) => {
    return a.index - b.index;
  });
}

export function extractAboutData(data) {
  return data[0];
}

export function formatTracks(data) {
  return sortByIndex(data).map((track) => {
    return {
      ...track,
      audioUrl: addDbUrl(track.audio.url),
      loopUrl: addDbUrl(track.loop.url),
    };
  });
}

export function addDbUrl(url) {
  return process.env.VUE_APP_API_URL + url;
}

export function loadImg(src, el, callback) {
  const img = document.createElement('img');
  const onload = () => {
    el.src = img.src;
    if (callback) {
      callback();
    }
  };
  const fallback = () => {
    img.onload = onload;
    img.src = src;
  };
  if (img.decode) {
    img.src = src;
    img
      .decode()
      .then(onload)
      .catch(fallback);
  } else {
    fallback();
  }
}

export async function fetchAll() {
  const [tracks, artists] = await Promise.all([
    fetch('tracks', formatTracks),
    fetch('artists'),
  ]);
  return { tracks, artists };
}
