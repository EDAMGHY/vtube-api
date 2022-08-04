export function secondsToTime(duration) {
  // Hours, minutes and seconds
  var hrs = ~~(duration / 3600);
  var mins = ~~((duration % 3600) / 60);
  var secs = ~~duration % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  var ret = '';

  if (hrs > 0) {
    ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
  }

  ret += '' + mins + ':' + (secs < 10 ? '0' : '');
  ret += '' + secs;
  return ret;
}

const epochs = [
  ['year', 31536000],
  ['month', 2592000],
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1],
];

const getDuration = (timeAgoInSeconds) => {
  for (let [name, seconds] of epochs) {
    const interval = Math.floor(timeAgoInSeconds / seconds);
    if (interval >= 1) {
      return {
        interval: interval,
        epoch: name,
      };
    }
  }
};

export const timeSince = (date) => {
  const timeAgoInSeconds = Math.floor((new Date() - new Date(date)) / 1000);
  const { interval, epoch } = timeAgoInSeconds && getDuration(timeAgoInSeconds);

  const suffix = interval === 1 ? '' : 's';
  return `${interval || 'few'} ${epoch || 'moment'}${suffix || 's'} ago`;
};
export function intToString(num) {
  num = num.toString().replace(/[^0-9.]/g, '');
  if (num < 1000) {
    return num;
  }
  let si = [
    { v: 1e3, s: 'K' },
    { v: 1e6, s: 'M' },
    { v: 1e9, s: 'B' },
    { v: 1e12, s: 'T' },
    { v: 1e15, s: 'P' },
    { v: 1e18, s: 'E' },
  ];
  let index;
  for (index = si.length - 1; index > 0; index--) {
    if (num >= si[index].v) {
      break;
    }
  }
  return (
    (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') +
    si[index].s
  );
}
export function shortenText(text, count = 17, insertDots = true) {
  return (
    text.slice(0, count) + (text.length > count && insertDots ? '...' : '')
  );
}
