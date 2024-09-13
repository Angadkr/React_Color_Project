import { Component } from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm,TextValidator } from "react-material-ui-form-validator";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'


class SavePallet extends Component{
    constructor(props){
        super(props);
        this.state = {
            newPalletName:'',
            open:false
        }
        this.palletName = this.palletName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(e){
        ValidatorForm.addValidationRule('isPalletNameUnique',value=>{
            return this.props.pallets.every(
              ({paletteName}) =>{
                return paletteName !== this.state.newPalletName;
              }
            )
        })
    }

    palletName(e){
        this.setState({newPalletName:e.target.value})
    }

    handleClose = () => {
        this.setState({open:false});
        this.props.close();
    };

    handleSubmit(e){
        this.handleClose();
        this.setState({open:true})
    }

    render() {
        return (
            <div>
            <Dialog open={this.state.open} onClose={this.handleClose}>
            <DialogTitle id="form-dialog-title">Choose A Palette Emoji</DialogTitle>
                <Picker theme='light' data={data} onEmojiSelect={(emoji)=>{this.props.savePallet(this.state.newPalletName,emoji.native)}}/>
            </Dialog>
            <Dialog
                open={this.props.openSave}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Choose a palette name 🎨</DialogTitle>
                <ValidatorForm onSubmit={this.handleSubmit}>
                    <DialogContent>
                    <DialogContentText>
                        Please choose a palette name for your new beautiful palette,make sure it's unique!
                    </DialogContentText>
                        <TextValidator 
                        label="Pallete Name" 
                        value={this.state.newPalletName} 
                        onChange={this.palletName}
                        variant='standard'
                        margin='normal'
                        fullWidth
                        validators={['required','isPalletNameUnique']}
                        errorMessages={['Pallete name is required!!','Pallete name should be unique!!']}
                        />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" type="submit">
                        Save Palette
                    </Button> 
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
            </div>
        );
    }
}

export default SavePallet;