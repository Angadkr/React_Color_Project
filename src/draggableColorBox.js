import React from "react";
import {  withStyles } from "@mui/styles";
import { Delete } from "@material-ui/icons";
import { SortableElement } from "react-sortable-hoc";

const styles = {
    root:{
        height:'25%',
        width:'20%',
        margin:'0 auto',
        display:'inline-block',
        position:'relative',
        cursor:'pointer',
        "&:hover svg":{
            color:"white",
            transform:"scale(1.2)",
            transition:"all 0.3s ease-in-out"
        },
        marginBottom:"-6px"
    },
    boxContent:{
        position: "absolute",
        left: '0',
        bottom: '0',
        padding: '5px',
        width: '100%',
        color: 'rgba(0,0,0,0.5)',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        fontSize: '12px',
        display:'flex',
        justifyContent:"space-between"
    }
}

const DraggableColorBox = SortableElement((props)=>{
    return (
        <div className={props.classes.root} style={{backgroundColor:props.color}}>
            <div className={props.classes.boxContent}>
                <span>{props.name}</span>
                <span onClick={()=>{props.deleteColor(props.name)}}><Delete/></span>
            </div>
        </div>
    )
})

export default withStyles(styles)(DraggableColorBox);