const msg = 'Time is running out.'.split('');
let index = 0;
let blink = true;

let digitString = (num) => {
  return (num >= 10 ? '' : '0') + num;
}

let timeString = (millis) => {
  if (millis <= 0) {
    return '00:00:00:00';
  }

  let time = millis;
  let dm = 1000*3600*24;
  let days = Math.floor(time / dm);

  time %= dm;
  let hm = 1000*3600;
  let hours = Math.floor(time / hm);

  time %= hm;
  let mm = 1000*60;
  let mins = Math.floor(time / mm);

  time %= mm;
  let secs = Math.floor(time / 1000);

  return `${digitString(days)}:${digitString(hours)}:${digitString(mins)}:${digitString(secs)}`;
}

let type = () => {
  let h = document.getElementById('msg');

  if (index < msg.length) {
    h.textContent += msg[index++];
    setTimeout(type, 200);
  } else {
    // h.textContent = (h.textContent.slice(0, -1) + (blink ? '_' : ' '));
    // blink = !blink;
    // setTimeout(type, 500);
  }
}

let tick = () => {
  let clock = document.getElementById('clock');

  let d = new Date();
  let end = new Date(parseInt(clock.dataset.millis));
  let delta = end.getTime() - d.getTime();

  clock.childNodes[0].nodeValue = timeString(delta);
}

document.addEventListener('DOMContentLoaded', (e) => {
  setInterval(tick, 500);
  type();
});
