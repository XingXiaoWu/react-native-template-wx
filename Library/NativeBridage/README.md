
# react-native-native-bridage

## Getting started

`$ npm install react-native-native-bridage --save`

### Mostly automatic installation

`$ react-native link react-native-native-bridage`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-native-bridage` and add `RNNativeBridage.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNNativeBridage.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNNativeBridagePackage;` to the imports at the top of the file
  - Add `new RNNativeBridagePackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-native-bridage'
  	project(':react-native-native-bridage').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-native-bridage/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-native-bridage')
  	```

#### Windows
[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNNativeBridage.sln` in `node_modules/react-native-native-bridage/windows/RNNativeBridage.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using Native.Bridage.RNNativeBridage;` to the usings at the top of the file
  - Add `new RNNativeBridagePackage()` to the `List<IReactPackage>` returned by the `Packages` method


## Usage
```javascript
import RNNativeBridage from 'react-native-native-bridage';

// TODO: What to do with the module?
RNNativeBridage;
```
  