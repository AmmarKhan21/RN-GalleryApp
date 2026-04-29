import { useState, useEffect } from 'react';
import DeviceDetails, { DeviceInfo } from './DeviceDetails';

interface UseDeviceInfoResult {
  deviceInfo: DeviceInfo | null;
  loading: boolean;
  error: string | null;
}

const useDeviceInfo = (): UseDeviceInfoResult => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    DeviceDetails.getDeviceInfo()
      .then((info) => {
        console.log("info", info)
        setDeviceInfo(info);
      })
      .catch((err: Error) => {
        setError(err?.message ?? 'Failed to load device info');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { deviceInfo, loading, error };
};

export default useDeviceInfo;
