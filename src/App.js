import { useRef, useState } from 'react';
import QRCode from 'react-qr-code';

function App() {
  const [qrcode, setQrcode] = useState("");
  const [downloadFormat, setDownloadFormat] = useState("png");
  const qrCodeContainerRef = useRef(null);

  const handleDownload = () => {
    const qrCodeContainer = qrCodeContainerRef.current;
    if (qrCodeContainer) {
      const qrCodeSvg = qrCodeContainer.querySelector("svg");
      if (qrCodeSvg) {
        const svgData = new XMLSerializer().serializeToString(qrCodeSvg);
        const canvas = document.createElement("canvas");
        canvas.width = 500;
        canvas.height = 500;
        
        const context = canvas.getContext("2d");
        context.fillStyle = "lightgray"; 
        const img = new Image();
        img.onload = () => {
          context.drawImage(img, 0, 0);
          const link = document.createElement("a");
          link.download = `qrcode.${downloadFormat}`;
          link.href = canvas.toDataURL(`image/${downloadFormat}`);
          link.click();
        };
        img.src = `data:image/svg+xml;base64,${window.btoa(svgData)}`;
      }
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="left-container">
          <p>Convert<br/> your Link to<br/> QR Code.</p>
          <input type="text" placeholder='Enter your link...' onChange={(e) => setQrcode(e.target.value)} />
          <p>Your QR code will be generated automatically, your generated <br/>QR code will open above URL or text.</p>
        </div>
        <div className="right-container">
          <div className='qr-cont' ref={qrCodeContainerRef}>
            <QRCode value={qrcode} size={256} bgColor='white'/>
          </div>
          <div className='download-cont'>
            <button onClick={handleDownload}>Download</button>
            <p>Select format:</p>
            <select value={downloadFormat} onChange={(e) => setDownloadFormat(e.target.value)}>
              <option value="png">PNG</option>
              <option value="jpeg">JPEG</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
