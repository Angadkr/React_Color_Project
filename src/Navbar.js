import { Component } from "react";
import { Select,MenuItem,FormControl,Snackbar,IconButton} from "@mui/material";
import { Close} from "@mui/icons-material";
import { Link } from "react-router-dom";

class Navbar extends Component{
    constructor(props){
        super(props);
        this.state = {
            open:false
        }
        this.handleChange = this.handleChange.bind(this);
        this.closeSnackbar = this.closeSnackbar.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(e){
        this.setState({open:true});
        this.props.changeFormat(e);
    }

    handleChange(e){
        this.props.changeLevel(e);
    }

    closeSnackbar(e){
        this.setState({open:false})
    }

    render(){
        const level = this.props.level;
        const {isSingleColor} = this.props;

        return(
            <nav className="navbar navbar-light bg-light ">
                    <div className="container-fluid w-100 d-flex justify-content-between">
                        <div className="start d-inline w-50">
                            <Link to="/" className="navbar-brand mr-5">reactcolorpicker</Link>
                            <label className={`levelLable ${isSingleColor && 'd-none'}`} htmlFor="level">Level: {level}</label>
                            <input type="range" id="level" className={`form-range ${isSingleColor && 'd-none'}`} min="100" max="900" step="100" defaultValue={level} onChange={this.handleChange}></input>
                        </div>
                        <div className="end d-inline">
                            <FormControl variant="standard">
                                <Select defaultValue="hex" onChange={this.handleSelect}>
                                    <MenuItem value = "hex">HEX - #ffff</MenuItem>
                                    <MenuItem value = "rgb">RGB - rgb(100,100,100)</MenuItem>
                                    <MenuItem value = "rgba">RGBA - rgb(100,100,100,0.3)</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <Snackbar anchorOrigin={{vertical:"bottom",horizontal:"left"}}
                            open={this.state.open}
                            autoHideDuration={3000}
                            message={<span id="messsage-id">Format Changed!</span>}
                            ContentProps={{
                                "aria-describedby":"message-id"
                            }}    
                            onClose={this.closeSnackbar}
                            action={[
                                <IconButton onClick={this.closeSnackbar} color="inherit" key="close" aria-label="close-snackbar">
                                    <Close/>
                                </IconButton>
                            ]}
                        />

                    </div>
            </nav>
        )
    }
}

export default Navbar;