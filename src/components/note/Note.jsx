import React, { useEffect, useState } from 'react';
import "./Note.css";
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

const Note = ({text,id,date}) => {

    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
  
    const [noteText, setNoteText] = useState(null);
    const [prevNoteText, setPrevNoteText] = useState(null);
  
    const handleOpen = () => {
      setOpen(true);
      currentNote();
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    // to edit the note
    // get data by id through axios
    const currentNote = async()=>{
        console.log("in the current note");
        try{
            const res = await axios.get(`get/${id}`, {headers:{
                'Content-Type':'application/json'
            }});
            // console.log(res);
            setNoteText(res.data.text);
            // console.log(prevNoteText);
        }catch(err){
            console.log(err);
        }
    }

    // put that in edit modal body
    const editNote = async()=>{
        console.log("int the edit note");
        try{
            await axios.put(`${id}`,
            //   {
            //     params:id
            //   },
              {
                  "text":noteText
              },
              {
                headers:{
                  'Content-Type':'application/json'
                },
                
             });
          }catch(err){
            console.log(err);
          }
          setInterval(function(){
            window.location.reload(1);
         }, 1000);

        //  check if the note is empty..
        if(noteText === ""){
            deleteNote();
        }
    }
    // then axios post reequest


    const deleteNote = async()=>{
        // console.log(id);
        try{
            await axios.delete(`${id}`,{params:id}, {
                headers:{
                    'Content-Type':'application/json'
                }});
        }catch(err){
            console.log(err);
        }
    };

    // console.log(noteText);
    

    const body = (
        <div style={modalStyle} className={classes.paper}>
          <h2>Edit The Note</h2>
          <form method="post" className="modalForm">
              <textarea 
              name="newNote" 
              className="newNote" 
              id="" 
              cols="30" 
              rows="10"
            //   placeholder= "enter your note"
              value={noteText}
              onChange={e => setNoteText(e.target.value)}
              required
              ></textarea>
          </form>
              <button onClick={editNote} className="modalButton">Update</button>
        </div>
      );

    return (
        <div className="note">
            <span>{text}</span>
            <div className="note__footer">
                <div className="date">
                     <small className="note__date">Last Updated at <br /> <b className="date_value">{date}</b></small>
                </div>

                <div className="operations">
                        <button className="edit_btn" onClick={handleOpen}>
                            edit
                        </button>
                    <form onSubmit={deleteNote}>
                        <input type="submit" className="delete_btn" value="delete" />
                    </form>
                </div>
            </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {body}
                </Modal>
        </div>
    )
}

export default Note
