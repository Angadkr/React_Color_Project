import { Component } from "react";
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { AddToPhotos } from "@material-ui/icons";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ChromePicker } from "react-color";
import { Divider } from "@mui/material";
import { Button } from "@material-ui/core";
import { ValidatorForm,TextValidator } from "react-material-ui-form-validator";
import { useNavigate } from "react-router-dom";
import DraggableColorList from "./DraggableColorList";
import { arrayMove } from "react-sortable-hoc";
import SavePallet from "./SavePalletForm";
import seed from "./seed";

const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    flexDirection:"row",
    justifyContent:"space-between",
    height:'64px'
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    height:'calc(100vh - 64px)',
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  drawerContainer:{
    width:"90%",
    height:"100%",
    display:'flex',
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center"
  },
  picker:{
    width:"85% !important",
    margin:'2rem'
  },
  addColor:{
    width:'100%',
    marginTop:"1rem",
    padding:"1rem",
    fontSize:"2rem"
  },
  colorNameInput:{
    width:"100%"
  },
  navBtns:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  }
});

function withParams(Component) {
  return props => <Component {...props} navigate={useNavigate()}/>;
}

class NewPallet extends Component{
    static defaultProps={
      maxColor:20
    }
  
    constructor(props){
        super(props);
        this.state = {
            open:false,
            color:'purple',
            colors:seed[0].colors,
            newName:'',
            openSave:false
        }
        this.handleColorChange = this.handleColorChange.bind(this);
        this.addNewColor = this.addNewColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.savePallet = this.savePallet.bind(this);
        this.deleteColor = this.deleteColor.bind(this);
        this.onSortEnd = this.onSortEnd.bind(this);
        this.clearColors = this.clearColors.bind(this);
        this.addRandomColor = this.addRandomColor.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    componentDidMount(){
      ValidatorForm.addValidationRule("nameExist",value=>{
        return this.state.colors.every(
          ({name}) => {
            return name.toLowerCase() !== value.toLowerCase();
          }
        )
      })

      ValidatorForm.addValidationRule('uniqueColor',value=>{
        return this.state.colors.every(
          ({color}) =>{
            return color !== this.state.color;
          }
        )
      })
    }

    handleClose(e){
      this.setState({openSave:false})
    }

    handleSave(e){
      this.setState({openSave:true})
    }

    addRandomColor(e){
      let flag = false;
      let randomPallet;
      let randomColor;
      while(!flag){
        randomPallet = this.props.pallets[Math.floor(Math.random()*this.props.pallets.length)];
        randomColor = randomPallet.colors[Math.floor(Math.random()*randomPallet.colors.length)];

        flag = this.state.colors.every((el)=>{
          return el.name!==randomColor.name;
        })
      }
      this.setState((currState)=>{
        return(
          {colors:[...currState.colors,randomColor]}
        )
      })
    }

    clearColors(e){
      this.setState({colors:[]})
    }

    onSortEnd = ({oldIndex, newIndex}) => {
      this.setState(({colors}) => ({
        colors: arrayMove(colors, oldIndex, newIndex),
      }));
    };

    deleteColor(name){
      const newColors = this.state.colors.filter(el=>el.name!==name);

      this.setState({colors:newColors});
    }

    savePallet(newPalletName,emoji){
      let newPallet = {
        paletteName:newPalletName,
        id:newPalletName.toLowerCase().replace(/ /g,"-"),
        emoji:emoji,
        colors:this.state.colors
      }
      this.props.savePallete(newPallet);
      this.props.navigate('/colorPallets');
    }

    handleChange(evt){
      this.setState({newName:evt.target.value})
    }
    addNewColor(){
      const newColor = {name:this.state.newName,color:this.state.color}
      this.setState({colors:[...this.state.colors,newColor]});
    }

    handleColorChange(newColor){
      this.setState({color:newColor});
    }
    handleDrawerOpen = () => {
      this.setState({ open: true });
    };
  
    handleDrawerClose = () => {
      this.setState({ open: false });
    };
  
    render() {
      const { classes, theme } = this.props;
      const { open } = this.state;
  
      return (
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            color="default"
            position="fixed"
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar disableGutters={!open}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <AddToPhotos/>
              </IconButton>
              <Typography variant="h6" color="inherit" noWrap>
                Create A Palette
              </Typography>
            </Toolbar>
            <div className={classes.navBtns}>
                <SavePallet pallets={this.props.pallets} savePallet={this.savePallet} openSave={this.state.openSave} close ={this.handleClose}/>
                <Button variant="contained" color="secondary" onClick={()=>this.props.navigate('/')}>Go Back</Button>
                <Button variant="contained" color="primary" onClick={this.handleSave}>
                  Save Palette
                </Button>
              </div>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={this.handleDrawerClose}>
                  <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider/>
            <div className={classes.drawerContainer}>
              <Typography variant="h4">
                Design Your Palette
              </Typography>
              <div>
                <Button variant="contained" color="secondary" onClick={this.clearColors}>Clear Pallete</Button>
                <Button variant="contained" color="primary" onClick={this.addRandomColor} disabled={this.state.colors.length>=this.props.maxColor}>Random Color</Button>
              </div>
              <ChromePicker className={classes.picker} color={this.state.color} onChange={(newColor)=>{this.handleColorChange(newColor.hex)}} />
              <ValidatorForm style={{width:"85%"}} onSubmit={this.addNewColor}>
                <TextValidator label='color name' variant='filled' className={classes.colorNameInput} value={this.state.newName} onChange={this.handleChange} validators={['required','nameExist','uniqueColor']} errorMessages={['this field is required!','color name exists!','color should be unique!']}/>
                <Button className={classes.addColor} variant="contained" style={{backgroundColor:this.state.colors.length>=this.props.maxColor?'#d9dbde':this.state.color}} color="primary" type="submit" disabled={this.state.colors.length>=this.props.maxColor}>{this.state.colors.length>=this.props.maxColor?'Pallete is Full!':'Add Color'}</Button>              
              </ValidatorForm>
            </div>
          </Drawer>
          <main
            className={classNames(classes.content, {
              [classes.contentShift]: open,
            })}
            style={{padding:'0px'}}
          >
            <div className={classes.drawerHeader} />  
            
            <DraggableColorList colors={this.state.colors} deleteColor={this.deleteColor} axis='xy' onSortEnd={this.onSortEnd}/>
          </main>
        </div>
      );
    }
}

export default withStyles(styles, { withTheme: true })(withParams(NewPallet));