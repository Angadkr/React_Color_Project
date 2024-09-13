import { Component } from "react";
import { useParams,useNavigate,NavLink} from "react-router-dom";
import Pallet from "./pallet";
import { generatePallet } from "./colorHelpers";
import MiniPallet from "./MiniPallet";
import {  withStyles } from "@mui/styles";
import styles from './styles/colorPallete';
import { CSSTransition,TransitionGroup } from "react-transition-group";


function withParams(Component) {
    return props => <Component {...props} navigate={useNavigate()} params={useParams()} />;
}

class ColorPallete extends Component{
    render(){
        const {id} = this.props.params;
        const {pallets} = this.props;
        let currPallet = "";
        const {classes} = this.props;

        if(id){
            currPallet = pallets.find((el)=>{
                if(el.id == id){
                    return el;
                }
            });    
        }

        const temp = (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1 className={classes.heading}>React Colors</h1>
                        <NavLink className={classes.navLink} to='/colorPallets/new'>Create Palette</NavLink>
                    </nav>
               
                    <TransitionGroup className={classes.pallets}>
                        {pallets.map((el)=><CSSTransition key={el.id} classNames='fade' timeout={500}><MiniPallet {...el} key={el.id} deletePallete={this.props.deletePallete}/></CSSTransition>)}
                    </TransitionGroup>
                </div>
            </div>
        )

        return(
            <div className="colorPallets" style={{height:"100vh",overflow:'auto',width:"100%"}}>
                {(currPallet == "") ? temp : <Pallet pallet={generatePallet(currPallet)} />}
            </div>
        )
    }
}

export default withStyles(styles)(withParams(ColorPallete));