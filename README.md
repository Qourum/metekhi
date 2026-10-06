# „მეტეხი“ — Android-ის აპი (Google Play)

ეს ტოტი (`android`) მხოლოდ Google Play-ის აპის აწყობისთვისაა. თამაში თავად `main`/`gh-pages` ტოტებშია და `https://qourum.github.io/metekhi/`-ზე ჩანს.

- `android/` — Bubblewrap-ის პროექტი (Trusted Web Activity): პაკეტი `io.github.qourum.metekhi`.
- `.github/workflows/android.yml` — ყოველ push-ზე GitHub აწყობს **ხელმოუწერელ** `.aab`-სა და `.apk`-ს და დებს `android-out` ტოტში.
- ხელმოწერის გასაღები (`android.keystore`) აქ **არასდროს** იდება — მხოლოდ მფლობელთანაა.

ახალი ვერსია: `android/app/build.gradle`-ში `versionCode` +1 და `versionName`, push, მერე `android-out`-იდან აიღე `metekhi-unsigned.aab` და მოაწერე ხელი:

```sh
jarsigner -keystore android.keystore -sigalg SHA256withRSA -digestalg SHA-256 \
  -signedjar metekhi.aab metekhi-unsigned.aab metekhi
```
