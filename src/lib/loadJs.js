import validUrl from 'valid-url';

export default function (src) {
  return new Promise((resolve, reject) => {
    if (!validUrl.isUri(src)) {
      reject();
      return;
    }

    const s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}
