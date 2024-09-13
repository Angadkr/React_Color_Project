import { Component } from "react";
import './styles/colorBox.css';
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useNavigate } from "react-router-dom";
import chroma from "chroma-js";

function withParams(Component) {
    return props => <Component {...props} navigate={useNavigate()} />;
}

class ColorBox extends Component{
    constructor(props){
        super(props);
        this.state = {
            coppied:false
        }
        this.changeCopyState = this.changeCopyState.bind(this);
    }

    changeCopyState(e){
        this.setState({coppied:true},()=>{
            setTimeout(()=>{
                this.setState({coppied:false})
            },1500)
        })
    }

    render(){
        const {navigate,palletId,colorId} = this.props;
        const isDarkColor = chroma(this.props.color).luminance() <= 0.5;
        const isLightColor = chroma(this.props.color).luminance() > 0.5;

        return(
            <CopyToClipboard text={this.props.color} onCopy={this.changeCopyState}>
                <div className="colorBox" style={{backgroundColor:this.props.color}}>
                    <div style={{backgroundColor:this.props.color}} className={`copy-overlay ${this.state.coppied && 'show'}`} />
                    <div className={`copy-msg ${this.state.coppied && 'show'}`}>
                        <h1>COPPIED!!!!</h1>
                        <p className={isLightColor && 'dark-text'}>{this.props.color}</p>
                    </div>
                    <div className="copy-container">
                        <div className="box-content">
                            <span className={isDarkColor && 'light-text'}>{this.props.name}</span>
                        </div>
                        <button className={`copy-button ${isLightColor && 'dark-text'}`}>Copy</button>
                    </div>
                    <span className={`see-more ${isLightColor && 'dark-text'}`} onClick={()=>{
                        navigate(`/colorPallets/${palletId}/${colorId}`)
                    }}>More</span>
                </div>
            </CopyToClipboard>
        )
    }
}

export default withParams(ColorBox);