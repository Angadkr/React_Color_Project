export default {
    root:{
        backgroundColor:"white",
        borderRadius:"5px",
        padding:"0.5rem",
        position:"relative",
        "&:hover":{
            cursor:"pointer"
        },
        '&:hover button':{
            opacity:'1'
        },
        border:"1px solid black",
        height:"100%"
    },
    delete:{
        display:'inline-block',
        paddingX:'0',
        position:'absolute',
        zIndex:'25',
        top:'0',
        right:'0',
        opacity:'0',
        transition:'opacity 0.3s ease-in-out'
    },
    colors:{
        backgroundColor:"#dae1e4",
        height:"160px",
        width:"100%",
        borderRadius:"5px",
        overflow:"hidden"
    },
    title:{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        position:"relative",
        margin:"0",
        color:"black",
        paddingBottom:"0.5rem",
        paddingTop:"0.5rem",
        fontSize:"1rem"
    },
    emoji:{
        marginLeft:"0.5rem",
        fontSize:"1.5rem"
    },
    miniColor:{
        height:"25%",
        width:"20%",
        display:"inline-block",
        margin:"0 auto",
        position:"relative",
        marginBottom:"-6px"
    }
};