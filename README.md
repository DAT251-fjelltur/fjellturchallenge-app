# How to run
1. Install Android Studio
2. Create a file called "local.properties" in the android folder and add the line "sdk.dir = "path/to/Android/sdk"

## folder structure

relevant code is in app folder:

- assets — fonts, icons and images

- components — shared React components. Usually these components are the ones that we call “dummy”, that have no state logic and can be easily reused across the app.

- views — application screens

- modules — There are pieces that have no corresponding view part (JSX). Typical examples of that is the colors module (contains all the app colors) and the utils module (contains utility functions that are being reused).

- services — functions that wrap the API calls.

- i18n — These are the translation strings for users of different language and locale