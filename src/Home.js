import React from 'react'
import axios from 'axios'
import { useState } from 'react'

//http://api.qrserver.com/v1/create-qr-code/?data=geeksforgeek&size=400x400&bgcolor=red
const Home = () => {

  const [data, setData] = useState("")
  const [size, setSize] = useState(0)
  const [color, setColor] = useState()
  const [qrCode, setQrCode]= useState("")
  const [flag, setFlag] = useState(false)

  const onButtonClick = () => {
    
    // using Java Script method to get PDF file
    fetch(`http://api.qrserver.com/v1/create-qr-code/?data=${data}!&size=${size}x${size}&bgcolor=${color}`).then((response) => {
        response.blob().then((blob) => {
        
            // Creating new object of PDF file
            const fileURL =
                window.URL.createObjectURL(blob);
                
            // Setting various property values
            let alink = document.createElement("a");
            alink.href = fileURL;
            alink.download = "QRCode.png";
            alink.click();
        });
    });
};

  const onDataChange = (e) => {
    setData(e.target.value)
  }

  const onSizeChange = (e) => {
    setSize(e.target.value)
  }

  const onColorChange = (e) => {
    setColor(e.target.value.replace("#", ""))
  }
  const onSubmit = (e) => {
    e.preventDefault();
    setFlag(true)
    setQrCode(`http://api.qrserver.com/v1/create-qr-code/?data=${data}!&size=${size}x${size}&bgcolor=${color}`)
  }

  return (
    <div>
      <h1>QR GENERATOR</h1>
      <form onSubmit={onSubmit}>
        <label>Enter a word </label>
        <input type='text' placeholder='type anything' value={data} onChange={onDataChange} />
        <br></br>
        <label>Enter a size</label>
        <input type='number' placeholder='choose between (200-600)' value={size} onChange={onSizeChange} />
        <br></br>
        <label>Choose a bg color</label>
        <input type='color' value={color} onChange={onColorChange} />
        <br></br>
        <button type='submit' >Submit</button>
      </form>

      {/* {flag && <h3>Submitted successfully with data: {data} size: {size} color: {color}</h3>} */}

      {qrCode && <img src={qrCode} alt="not found" />}
      
        <button onClick={onButtonClick}>Download</button>
      
    </div>
  )
}

export default Home
