import React, { useState } from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import "./Header.css"
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import axios from 'axios';
  function getModalStyle() {
    const top = 50;
    const left = 50 ;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

const Header = () => {


  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const [noteText, setNoteText] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // for adding the new note
  const addNote = async()=>{
    
    console.log("in the add note");
    try{
      await axios.post(
        `add`,{
          "text":noteText
        },
        {
          headers:{
            'Content-Type':'application/json'
          },
          
       });
      // console.log("note is:"+noteText);
    }catch(err){
      console.log(err);
    }
    setInterval(function(){
      window.location.reload(1);
   }, 1000);
   
  };

console.log(noteText);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2>Add New Note</h2>
      <form method="post" className="modalForm">
          <textarea 
          name="newNote" 
          className="newNote" 
          id="" 
          cols="30" 
          rows="10"
          placeholder="Add the text here"
          onChange={e => setNoteText(e.target.value)}
          required
          ></textarea>
      </form>
          <button onClick={addNote} className="modalButton">Save</button>
    </div>
  );

    return (
        <div className="header">
            <div className="headerLeft">
                <h1> MyNotes</h1>
            </div>
            <div className="headerRight">
                <IconButton 
                className="headerRight__Icon">
                 <AddCircleIcon  className="headerRight__IconBtn" onClick={handleOpen}/>
                </IconButton>
                 <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {body}
                </Modal>
            </div>
        </div>
    )
}

export default Header
