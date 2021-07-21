import './App.css';
import { Component } from 'react';
import PopUp from './PopUp';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Button} from 'react-bootstrap'


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
    <h4>Hello! {this.state.user}</h4>
    <div className="PageWrapper">
      <div className="Page">
      {
        (this.state.data === [])?<>
        <div>Come on! Let's add some events to our list!</div>
        </>:<>
        { 
          (this.state.data)?this.state.data.map((item, id) => {
            return <div key={id} className="item">
              <h4>{item.title}</h4>
              <h6>priority: {item.priority}</h6>
              <h6>due: {item.due}</h6>
              <Button variant="outline-warning" onClick={()=> this.drop(item, id)}>Finished!</Button>
            </div>
        }):<></>
        }
        </>
      }
      <div className="item">
        {this.state.pop?<PopUp toggle={this.togglePop} addNew={this.addNew} />: null}
        <Button variant="outline-warning" onClick={this.togglePop} style={{display: (this.state.pop)?"none":"block"}}>+</Button>
      </div>
      </div>
      </div>
    </div>
    </>
  }
}

export default App;