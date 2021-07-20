// import './PopUp.css';
import React from 'react';
import Slider from '@material-ui/core/Slider'

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
    //   console.log(val.target.value)
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
      if(stuff.title !== null && stuff.title !== "")
        return true
    this.setState({titleError: true})
    return false
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
            <input type="text" onChange={(val)=> {this.handleChange("due", val)}}/>
            <button onClick={this.handleSubmit}>Submit</button>
        </div>
    )
  }
}

export default PopUp;
