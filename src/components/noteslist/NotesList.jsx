import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Note from '../note/Note';
import "./NoteList.css"

const NotesList = () => {

    const [note , setNote] = useState([]);
    useEffect(()=>{
        const getNote = async ()=>{
            // console.log("into get not");
            try{
                // console.log("trying to fetch api");
                const res = await axios.get("all", {headers:{
                    'Content-Type':'application/json'
                }});
                // console.log(res.data);
                setNote(res.data);
                // console.log(note);
            }catch(err){
                console.log(err);
            }
        };
        getNote();
    },[]);
    
    
    return (
        <>
        
        
        <div className="notes__list">
        {
            note.map((noteInd)=>(
                
                <Note text={noteInd.text} id={noteInd._id} date={noteInd.updatedAt.slice(0,10)}/>  
                
                ))
        }
        </div>
        </>
    )
}

export default NotesList
