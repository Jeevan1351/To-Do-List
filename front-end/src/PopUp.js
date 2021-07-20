// import './PopUp.css';
import React from 'react';
import Slider from '@material-ui/core/Slider'
// import { makeStyles } from '@material-ui/core/styles';
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
        dueError: null
    }
  }

  componentDidMount()
  {
    var date = new Date()
    var curDate = date.getFullYear()+'-'+((date.getMonth()+1).toString().padStart(2,0))+'-'+date.getDate().toString().padStart(2,0)+'T'+date.getHours().toString().padStart(2,0)+':'+(date.getMinutes()).toString().padStart(2,0)
    this.setState({curDate})
  }


  handleClick =() => {
      this.props.toggle()
  }

  handleSubmit = () => {
      if(this.validate()){
          this.props.addNew(this.state)
          this.handleClick()
      }
      else{
          console.log("Correct input")
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
      if(stuff.title === null && stuff.title === ""){
        this.setState({titleError: true})
        return false
      }
      if(!(parseInt(stuff.due.substring(0,4))>=parseInt(stuff.curDate).substring(0,4) && parseInt(stuff.due.substring(5,7))>=parseInt(stuff.curDate).substring(5,7) && parseInt(stuff.due.substring(8,10))>=parseInt(stuff.curDate).substring(8,10) && parseInt(stuff.due.substring(11,13))>=parseInt(stuff.curDate).substring(11,13) && parseInt(stuff.due.substring(14,16))>parseInt(stuff.curDate).substring(14,16))){
        this.setState({dueError: true})
        return false
      }
  }


  render()
  {
    return (
        <div className = "modal">
            <div className = "modal_content">
                <span className="close" onClick={this.handleClick}>&times;</span>
                <p>I am a pop up!</p>
            </div>
            <input type="text" onChange={(val)=> {this.handleChange("title", val)}}/>
            <Slider
              style={{width: "10%"}}
              defaultValue={4}
              valueLabelDisplay="auto"
              step = {1}
              onChange={(e, val) => {this.handleChange("priority", val)}}
              marks
              min = {1}
              max = {10}
            />
            <form noValidate>
              <TextField
                id="datetime-local"
                label="Next appointment"
                type="datetime-local"
                defaultValue="2021-07-20T22:36"
                onChange={(e, val) => {this.handleChange("due", e)}}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>
            <button onClick={this.handleSubmit}>Submit</button>
        </div>
    )
  }
}

export default PopUp;
