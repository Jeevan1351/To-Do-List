import './App.css';
import { Component } from 'react';
import PopUp from './PopUp';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar} from 'react-bootstrap'

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

  refresh = () => {
    fetch(`http://localhost:4500/list`).then((value) =>{return value.json()})
    .then((data)=>{
      console.log(data)
      this.setState({data})
    })
  }

  drop = (item, id)=> {
    var requestOptions = {
      method: 'Delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        _id: item._id
      }
    )}
    fetch("http://localhost:4500/delete", requestOptions)
    .then(this.refresh())
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
    .then((element)=> {
      data.push(element)
      this.setState({data})
    })
    // this.refresh()
  }

  render()
  {
    return <>
    <div className="body">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand ></Navbar.Brand>
          <Navbar.Brand >To Do List!</Navbar.Brand>
      </Navbar>

    <div><h4>Hello! {this.state.user}</h4></div>
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
            <button onClick={()=> this.drop(item, id)}>Drop</button>
          </div>
      }):<></>
      }
      </>
    }
    <div className="btn">
      <button onClick={this.togglePop}>New Event?</button>
    </div>
    {this.state.pop?<PopUp toggle={this.togglePop} addNew={this.addNew} />: null}
    </div>
    </>
  }
}

export default App;
