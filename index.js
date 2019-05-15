/**
 * @format
 */

import {AppRegistry} from 'react-native';
//import App from './App';
import {name as appName} from './app.json';
import {App} from "./src";

AppRegistry.registerComponent(appName, () => App);
