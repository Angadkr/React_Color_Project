import { Component } from "react";
import { withStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import styles from './styles/miniPallet';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from "@mui/material";
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const options = ['Delete', 'Cancel'];

class SimpleDialog extends Component {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;

    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
        <DialogTitle id="simple-dialog-title">Delete Palette?</DialogTitle>
        <div>
          <List>
            <ListItem button onClick={() => this.handleListItemClick(options[0])} key={Option[0]}>
                <ListItemAvatar>
                  <Avatar style={{backgroundColor:'red',color:'white'}}>
                    <CheckIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={options[0]} />
            </ListItem>
            <ListItem button onClick={() => this.handleListItemClick(options[1])} key={options[1]}>
                <ListItemAvatar>
                  <Avatar style={{backgroundColor:'skyblue',color:'white'}}>
                    <CloseIcon/>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={options[1]} />
            </ListItem>
          </List>
        </div>
      </Dialog>
    );
  }
}




function withParams(Component) {
    return props => <Component {...props} navigate={useNavigate()}/>;
}

class MiniPallet extends Component{
    constructor(props){
        super(props);
        this.state = {
            open:false,
            selectedValue:options[1]
        }
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClickOpen(e){
        this.setState({
            open: true,
        });
    }
    
    handleClose(value){
        this.setState({ selectedValue: value, open: false },()=>{
            if(this.state.selectedValue == 'Delete'){
                return this.props.deletePallete(this.props.id);
            }
        });
    }

    render(){
        const {classes,paletteName,emoji,colors,id,navigate} = this.props;
        const miniColorBoxes = colors.map((el)=>{
            return <div className={classes.miniColor} style={{backgroundColor:el.color}} key={el.name} />
        })


        return(
            <div className={classes.root} onClick={()=>navigate(`/colorPallets/${id}`)}>
                <Button variant="contained" color="error" onClick={(e)=>{
                    e.stopPropagation();
                    return  this.handleClickOpen();
                }} className={classes.delete}><DeleteIcon/>
                </Button>
                <SimpleDialog
                    selectedValue={this.state.selectedValue}
                    open={this.state.open}
                    onClose={this.handleClose}
                    onClick={(e)=>{
                        e.stopPropagation();
                    }}
                />
                <div className={classes.colors}>{miniColorBoxes}</div>
                <h5 className={classes.title}>
                    {paletteName}  <span className={classes.emoji}>{emoji}</span>
                </h5>
            </div>
        )
    }
}

export default withStyles(styles)(withParams(MiniPallet));

