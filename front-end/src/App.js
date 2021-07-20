import './App.css';
import { Component } from 'react';
import PopUp from './PopUp';

class App extends Component
{
  constructor(props)
  {
    super(props)
    this.state = {
      user: "VJ",
      data: null,
      nextTitle: null,
      nextDue: null,
      nextPriority: null,
      pop: false
    }
  }

  componentDidMount()
  {
    console.log("Hi there!!")
    fetch(`http://localhost:4500/list`).then((value) =>{return value.json()})
    .then((data)=>{
      console.log(data)
      this.setState({data})
    })
  }

  togglePop = () => {
    this.setState({
      pop: !this.state.pop
    })
  }

  addNew = (newItem) => {
    var data = this.state.data
    data.push(newItem)
    this.setState({data})
  }

  render()
  {
    return <>
    <div>Hello! {this.state.user}</div>
    {
      (this.state.data)?<>
      <div>Come on! Let's add some events to our list!</div>
      </>:<><div>Haha! you are fucked!</div></>
    }
    <div className="btn" onClick={this.togglePop}>
      <button>New Event?</button>
    </div>
    {this.state.pop?<PopUp toggle={this.togglePop} addNew={this.addNew} />: null}
    </>
  }
}

export default App;
