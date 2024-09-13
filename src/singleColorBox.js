import { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import './styles/singleColorBox.css';
import chroma from "chroma-js";

class SingleBox extends Component{
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
        const {name,color} = this.props;
        const isDarkColor = chroma(this.props.color).luminance() <= 0.5;
        const isLightColor = chroma(this.props.color).luminance() > 0.5;
        const colors = document.querySelector('.colors');
        function scrollToTop() {
            // Scroll to top logic
            colors.scrollTo({
              top: 0,
              behavior: "smooth"
            })
          }
        scrollToTop()

        return(
            <CopyToClipboard text={color} onCopy={this.changeCopyState}>
                <div className="singleBox" style={{backgroundColor:color}}>
                    <div style={{backgroundColor:color}} className={`copy-overlay ${this.state.coppied && 'show'}`} />
                    <div className={`copy-msg ${this.state.coppied && 'show'}`}>
                        <h1>COPPIED!!!!</h1>
                        <p className={isLightColor && 'dark-text'}>{color}</p>
                    </div>
                    <div className="copy-container w-100 h-100">
                        <div className="box-content">
                            <span className={isDarkColor && 'light-text'}>{name}</span>
                        </div>
                        <button className={`copy-button ${isLightColor && 'dark-text'}`}>Copy</button>
                    </div>
                </div>
            </CopyToClipboard>
        )
    }
}

export default SingleBox;