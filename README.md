# Hello World 
A chat app where users can chat, send pictures, take pictures, and share their location built using [React Native](https://reactnative.dev/) and using the [Gifted Chat API](https://github.com/FaridSafi/react-native-gifted-chat). 

To use this app you need to install Expo  **`expo-cli --global`**  and sign up for an [Expo](expo.io/signup) account.

After, you will use  **`expo start`** to run the app. This will open up a new browser tab on port 19002. From there you can run a simulator ( [IOS](https://www.apple.com/us/search/xcode?src=globalnav) or [Android](https://developer.android.com/studio)) or download the Expo app on your device (you must be on the same network) to view and test the app.

For more information on Expo, explore their [documentation](https://docs.expo.io/).

This app saves all user data to a Cloud Firestore from Google Firebase. To utilize this on your own, sign up for an [account](https://firebase.google.com/) and change the **firebase configuration** within the Chat.js file.

![GitHub Logo](/helloworld/assets/firebaseConfig.png)
    
## Dependencies
- react
- react native
- react-navigation/native 
- react-navigation/stack
- react-native-reanimated 
- react-native-gesture-handler 
- react-native-screens 
- react-native-safe-area-context 
- react-native-community/masked-view
- react-native-gifted-chat
- firebase@7.9.0
- react-native-community/async-storage
- expo-permissions
- expo-image-picker
- expo-location
- react-native-maps

[Kanban Board](https://trello.com/b/CrlCUHsL/chat-app)
