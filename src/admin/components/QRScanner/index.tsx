import React, { useEffect } from 'react';
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';

import './style.less';

const qrcodeRegionId = 'html5qr-code-full-region';

interface QRScannerProps {
  onSuccess: Function;
}

const QRScanner: React.FC<QRScannerProps> = (props) => {
  const { onSuccess } = props;
  let QRCodeScanner;
  useEffect(() => {
    if (!onSuccess) {
      throw new Error('onSuccess callback is required callback.');
    }
    const config = {
      fps: 10,
      qrbox: 250,
      disableFlip: false,
      supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
    };

    QRCodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, true);
    QRCodeScanner.render(onSuccess, () => {});
  }, []);
  return <div id={qrcodeRegionId} />;
};

export default QRScanner;
