import { Component } from "react";
import ColorBox from "./colorBox";
import './styles/pallet.css';
import Navbar from "./Navbar";
import { useParams,useNavigate } from "react-router-dom";
import SingleBox from "./singleColorBox";

function withParams(Component) {
    return props => <Component {...props} params={useParams()} navigate={useNavigate()}/>;
}

class Pallet extends Component{
    constructor(props){
        super(props);
        this.state = {
            level:500,
            format:'hex'
        }
        this.changeLevel = this.changeLevel.bind(this);
        this.changeFormat = this.changeFormat.bind(this);
    }

    changeFormat(e){
        this.setState({format:e.target.value});
    }

    changeLevel(evt){
        this.setState({level:evt.target.value});
    }

    render(){
        const pallet = this.props.pallet;
        const {cid} = this.props.params;
        const singleColors = [];
        const {navigate} = this.props;

        if(cid){
            const arr = [100,200,300,400,500,600,700,800,900];

            for(let i = 0;i<arr.length;i++){
                let color = pallet.colors[arr[i]].find((el)=>{
                    return el.id == cid;
                })

                if(color){
                    singleColors.push(color);
                }
            }
        }

        return(
            <div className="Pallet w-100 h-100 d-flex flex-column justify-content-between">
                <Navbar level = {this.state.level} changeLevel = {this.changeLevel} changeFormat = {this.changeFormat} isSingleColor = {singleColors.length>0}/>
                
                {(singleColors.length)?<div style={{overflow:'hidden'}} className={`colors h-100`}>{singleColors.map(el=><SingleBox name={el.name} color={el[this.state.format]}  key={el.name}/>)}<div className="goBack" onClick={()=>navigate(`/colorPallets/${pallet.id}`)}><button className="backBtn">GO BACK</button></div></div>:
                <div className="colors h-100">
                    {pallet.colors[this.state.level].map((el)=><ColorBox name={el.name} palletId = {pallet.id} color={el[this.state.format]} colorId={el.id} key={el.id}/>)}
                </div>}

                <footer>
                    <div className="w-100 px-5 d-flex flex-row justify-content-end align-items-start">
                        <p className="lead" style={{fontSize:'1.3rem',fontWeight:'500'}}>{pallet.palletName} <span>{pallet.emoji}</span></p>
                    </div>
                </footer>    
            </div>
        )
    }
}

export default withParams(Pallet);