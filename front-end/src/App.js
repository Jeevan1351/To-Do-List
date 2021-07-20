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
    console.log(newItem)
    var requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        title: newItem.title,
        due: newItem.due,
        priority: newItem.priority
      }
    )}
    fetch(`http://localhost:4500/add`, requestOptions)
    .then((res)=>{return res.json()})
    .then((element)=> data.push(element))
    this.setState({data})
  }

  render()
  {
    return <>
    <div>Hello! {this.state.user}</div>
    {
      (this.state.data === [])?<>
      <div>Come on! Let's add some events to our list!</div>
      </>:<>
      { 
        (this.state.data)?this.state.data.map((item, id) => {
          return <div key={id} style={{border: "1px solid black"}}>
            title: {item.title}
            priority: {item.priority}
            due: {item.due}
          </div>
      }):<></>
      }
      </>
    }
    <div className="btn">
      <button onClick={this.togglePop}>New Event?</button>
    </div>
    {this.state.pop?<PopUp toggle={this.togglePop} addNew={this.addNew} />: null}
    </>
  }
}

export default App;
