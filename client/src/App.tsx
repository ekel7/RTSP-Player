import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Player from "./components/Player/Player";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'space-between'
};

const buttonStyle = {
  bgcolor: '#0d81ee',
  height: '55px',
  marginLeft: '10px'
}

function App() {
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  
  const [url, setUrl] = useState({
    rtspUrl: "",
  });
  const [rtspUrl, setRtspUrl] = useState({
    webSocketUrl: "",
    pid: 0,
  });

  const handleClose = async () => {
    const response = await axios.post("http://localhost:3000/rtsp-stream/kill-stream/"+rtspUrl.pid)
    setOpenModal(false);
    return response.data;
  }

  const handleChange = (e: any) => {
    setUrl({
      rtspUrl: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let response = await axios.post("http://localhost:3000/rtsp-stream", url);

    console.log(response);

    setRtspUrl(response.data);
    setOpenModal(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>RTSP Player App</h2>
      </header>

      <form onSubmit={handleSubmit}>
        
        <TextField
          id="outlined-helperText"
          label="RTSP Link"
          name="rtsp-link-input"
          value={url.rtspUrl}
          onChange={handleChange}
        />

        <Button sx={buttonStyle} variant="contained" type="submit"> Watch Stream </Button>
      </form>

      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Player url={rtspUrl.webSocketUrl} />

          <Button sx={buttonStyle} variant="contained" onClick={handleClose}>Stop Player</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default App;
