// import './PopUp.css';
import React from 'react';
import Slider from '@material-ui/core/Slider'
import { Button } from 'react-bootstrap'
import TextField from '@material-ui/core/TextField';



class PopUp extends React.Component
{

  constructor(props)
  {
    super(props)
    this.state = {
        title: null,
        priority: 4,
        due: null,
        titleError: null,
        dueError: null,
        curDate: ""
    }
  }

  componentDidMount()
  {
    console.log(123)
    var date = new Date()
    var curDate = date.getFullYear()+'-'+((date.getMonth()+1).toString().padStart(2,0))+'-'+date.getDate().toString().padStart(2,0)+'T'+date.getHours().toString().padStart(2,0)+':'+(date.getMinutes()).toString().padStart(2,0)
    var due = date.getFullYear()+'-'+((date.getMonth()+1).toString().padStart(2,0))+'-'+date.getDate().toString().padStart(2,0)+'T'+(date.getHours()+1).toString().padStart(2,0)+':'+(date.getMinutes()).toString().padStart(2,0)
    this.setState({curDate, due})
  }


  handleClick =() => {
      this.props.toggle()
  }

  handleSubmit = () => {
      if(this.validate()){
        var data = {title: this.state.title, priority: this.state.priority, due: this.state.due}
        this.props.addNew(data)
        this.handleClick()
      }
      else{
          console.log("Correct the input")
      }
  }

  handleChange = (element, val)=> {

    if(element === "title"){
        this.setState({title: val.target.value, titleError: null})
    }
    else if(element === "priority")
      this.setState({priority: val})
    else
      this.setState({due: val.target.value, dueError: null})
  }

  validate= ()=>{
      var stuff = this.state
      console.log(stuff.title)
      if(stuff.title === null){
        this.setState({titleError: true})
        return false
      }
      else if(!(parseInt(stuff.due.substring(0,4))>=parseInt((stuff.curDate).substring(0,4)) && parseInt(stuff.due.substring(5,7))>=parseInt((stuff.curDate).substring(5,7)) && parseInt(stuff.due.substring(8,10))>=parseInt((stuff.curDate).substring(8,10)) && parseInt(stuff.due.substring(11,13))>=parseInt((stuff.curDate).substring(11,13)) && parseInt(stuff.due.substring(14,16))>=parseInt((stuff.curDate).substring(14,16)))){
        this.setState({dueError: true})
        return false
      }
      else return true
  }


  render()
  {
    return (
        <div className="pop">
            <input type="text" onChange={(val)=> {this.handleChange("title", val)}} placeholder="Task Name"/>
            <div className="flexit">
              <lable style={{marginRight: "5%"}}>Priority</lable>
              <Slider
                style={{width: "80%"}}
                defaultValue={4}
                valueLabelDisplay="auto"
                step = {1}
                onChange={(e, val) => {this.handleChange("priority", val)}}
                marks
                min = {1}
                max = {10}
              />
            </div>
            <form noValidate>
              <TextField
                id="datetime-local"
                label="Due"
                type="datetime-local"
                onChange={(e, val) => {this.handleChange("due", e)}}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>
            <div className="buttons">
            <Button variant="outline-warning" className="spacingr"onClick={this.handleClick}>Cancel</Button>
              {/* <button className="spacingr"onClick={this.handleClick} >Cancel</button> */}
              <Button variant="outline-warning" onClick={this.handleSubmit}>Submit</Button>
              {/* <button className="spacingl" onClick={this.handleSubmit}>Submit</button> */}
            </div>
          </div>
    )
  }
}

export default PopUp;
