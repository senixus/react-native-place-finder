# React Native Place Finder

A simple place finder. I used Yelp API to fetch places data.

## Installation

After cloning the project, you need to get map API and Yelp API.

- [Yelp API](https://www.yelp.com/developers/)
- [Map SDK for Android](https://developers.google.com/maps/documentation/android-sdk/get-api-key)

You can add your Yelp API  to `api.ts`

After creating your Android map API key. You need to add to your manifest file `android/app/src/main/AndroidManifest.xml`

```xml
<application>
   <!-- You will only need to add this meta-data tag, but make sure it's a child of application -->
   <meta-data
     android:name="com.google.android.geo.API_KEY"
     android:value="Your Google maps API Key Here"/>
</application>

```
If you want to use on IOS, you can follow [IOS](https://github.com/react-native-maps/react-native-maps/blob/HEAD/docs/installation.md) steps.


After finishing the configuration steps you can run the app

```
yarn run android
or
yarn run ios
```
