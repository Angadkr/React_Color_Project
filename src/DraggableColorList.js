import React from "react";
import DraggableColorBox from './draggableColorBox'
import { SortableContainer } from "react-sortable-hoc";

const DraggableColorList = SortableContainer((props)=>{
    return(
        <div style={{height:"100%",overflowY:'hidden'}}>
            {props.colors.map((el,i)=>{
                return <DraggableColorBox 
                    index={i}
                    key={el.name} 
                    color={el.color} 
                    name={el.name} 
                    deleteColor={props.deleteColor}
                />
            })}
        </div>
    )
})

export default DraggableColorList;