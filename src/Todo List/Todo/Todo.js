import React, {Component} from 'react';
import {BiCheck} from "react-icons/bi";
import {IconContext} from "react-icons";
import classNames from "classnames";
import './Todo.scss';

class Todo extends Component
{
    constructor ()
    {
        super();
        this.state = { 
            prioriy_color: null,
            priority_color_hex: null
        }
    }

    componentDidMount = () =>
    {
        switch (this.props.priority)
        {
            case 1:
                this.setState({prioriy_color: 'red'});
                this.setState({prioriy_color_hex: '#DE4C4A'});
                break;
            case 2:
                this.setState({prioriy_color: 'yellow'});
                this.setState({prioriy_color_hex: '#FB9814'});
                break;
            case 3:
                this.setState({prioriy_color: 'blue'});
                this.setState({prioriy_color_hex: '#4271B8'});

                break;
            default:
                this.setState({prioriy_color: 'grey'});
                this.setState({prioriy_color_hex: '#7F7F7F'});
        }
    };

    SetDone = (evt) =>
    { 
        this.props.onDoneClick(this.props.id)
    };

    render ()
    {

        return (
            <div className="todo">
                <div className={classNames('priority', this.state.prioriy_color)} onClick={this.SetDone}>
                    <IconContext.Provider value={{size: "15px", color: this.state.prioriy_color_hex ,className: "checked-icon" }}>
                        <div>
                            <BiCheck />
                        </div>
                    </IconContext.Provider>
                </div>
                <span className="todo-text">{this.props.text}</span>
            </div>
    )
    }
}

export default Todo;