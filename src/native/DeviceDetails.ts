import { NativeModules, Platform } from 'react-native';

export interface DeviceInfo {
  model: string;
  manufacturer: string;
  systemName: string;
  systemVersion: string;
  sdkVersion: string;
}

const { DeviceDetails } = NativeModules;
// Fallback values when the native module is unavailable (e.g. web or detached build)
const fallback: DeviceInfo = {
  model: 'Unknown',
  manufacturer: Platform.OS === 'ios' ? 'Apple' : 'Unknown',
  systemName: Platform.OS === 'ios' ? 'iOS' : 'Android',
  systemVersion: 'Unknown',
  sdkVersion: 'N/A',
};

const getDeviceInfo = (): Promise<DeviceInfo> => {
  if (!DeviceDetails) {
    return Promise.resolve(fallback);
  }
  return DeviceDetails.getDeviceInfo();
};

export default { getDeviceInfo };
