import { Platform, NativeModules } from 'react-native'

let logged = false;
// https://stackoverflow.com/a/39840979/1828637
export function getStatusBarHeight() {
    const { StatusBarManager } = NativeModules;
    const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
    if (!logged) {
        console.log('StatusBarManager:', StatusBarManager);
        logged = true;
    }
    return STATUSBAR_HEIGHT;
}

export async function wait(ms) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms));
}