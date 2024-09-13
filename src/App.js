import { Component } from "react";
import ColorPallete from "./colorPallete";
import { Routes,Route } from "react-router-dom";
import { StyledEngineProvider } from '@mui/material/styles';
import NewPallet from "./newPallet";
import seed from "./seed";

class App extends Component{
  constructor(props){
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
    this.state = {
      palletes:savedPalettes || seed
    }
    this.savePallete = this.savePallete.bind(this);
    this.deletePallete = this.deletePallete.bind(this);
  }

  deletePallete(id){
    const newPalettes = this.state.palletes.filter(el=>el.id!==id);
    this.setState({palletes:newPalettes},this.syncLocalStorage);
  }

  savePallete(newPallet){
    this.setState({palletes:[...this.state.palletes,newPallet]},this.syncLocalStorage);
  }
  syncLocalStorage(){
    window.localStorage.setItem("palettes",JSON.stringify(this.state.palletes));
  }

  render(){
    return(
      <StyledEngineProvider injectFirst>
        <div className="App" style={{height:'100vh',overflow:'auto',width:"100%"}}>
          <Routes>
            <Route exact path="/" element={<ColorPallete pallets={this.state.palletes} deletePallete={this.deletePallete}/>}/>
            <Route exact path="/colorPallets" element={<ColorPallete pallets={this.state.palletes} deletePallete={this.deletePallete}/>}/>
            <Route exact path="/colorPallets/new" element={<NewPallet savePallete={this.savePallete} pallets={this.state.palletes}/>}/>
            <Route exact path="/colorPallets/:id" element={<ColorPallete pallets={this.state.palletes} deletePallete={this.deletePallete}/>}/>
            <Route exact path="/colorPallets/:id/:cid" element={<ColorPallete pallets={this.state.palletes} deletePallete={this.deletePallete}/>}/>
          </Routes>
        </div>
      </StyledEngineProvider>
    )
  }
}

export default App;
