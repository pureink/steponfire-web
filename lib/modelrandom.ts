export function rand_md() {
  if (Math.random() < 0.5) {
    return "t" + Math.floor(1 + Math.random() * 5);
  } else {
    return "ct" + Math.floor(1 + Math.random() * 5);
  }
}
