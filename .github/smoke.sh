#!/bin/bash
# Install the app on the emulator, launch it, take screenshots and read the page state through Chrome's DevTools socket.
set -x
S=shots; mkdir -p $S
adb wait-for-device
adb root || true; sleep 3; adb wait-for-device
# Chrome: no first-run screens; treat the site as verified, because its asset links are not live yet
adb shell "echo '_ --disable-fre --no-default-browser-check --no-first-run --disable-digital-asset-link-verification-for-url=\"https://qourum.github.io\"' > /data/local/tmp/chrome-command-line"
adb shell chmod 644 /data/local/tmp/chrome-command-line || true
adb shell am set-debug-app --persistent com.android.chrome || true
adb shell am force-stop com.android.chrome || true
adb shell pm list packages | sort > $S/packages.txt
adb shell dumpsys package com.android.chrome | grep -m1 versionName > $S/chrome.txt || true
adb install -r app.apk > $S/install.txt 2>&1
adb shell settings put secure immersive_mode_confirmations confirmed || true
sleep 20; adb shell am force-stop com.google.android.apps.nexuslauncher || true; sleep 5
adb logcat -c
adb shell am start -W -n io.github.qourum.metekhi/.LauncherActivity > $S/start.txt 2>&1
sleep 30
adb exec-out screencap -p > $S/1_launch.png
sleep 40
adb exec-out screencap -p > $S/2_loaded.png
adb shell dumpsys activity activities | grep -E "ResumedActivity" > $S/activity.txt
adb shell dumpsys window displays | grep -E "cur=|mRotation|rotation=" | head -5 > $S/display.txt
adb forward tcp:9222 localabstract:chrome_devtools_remote
curl -s localhost:9222/json > $S/tabs.json
python3 .github/page_state.py > $S/page.json 2>&1
sleep 2
adb exec-out screencap -p > $S/3_bazaar.png
adb logcat -d > $S/logcat_full.txt
grep -E "AndroidRuntime|FATAL|metekhi|TrustedWebActivity|TwaLauncher|DigitalGoods|PlayBilling|cr_" $S/logcat_full.txt | tail -300 > $S/logcat.txt
true
