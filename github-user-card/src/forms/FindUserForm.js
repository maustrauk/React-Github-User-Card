import React from 'react';

class FindUserForm extends React.Component {

    state = {
        textInput: ""
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.textInput);
    }

    onChange = (event) => {
        this.setState({
            textInput: event.target.value
        })
    }

    reset = (event) => {
        this.setState({
            textInput: "maustrauk"
        })
    }

    render() {
        return(<div className="findUserform">
            <form onSubmit={this.onSubmit}>
                <input type="text" name="username" placeholder="Enter Username" value={this.state.textInput} onChange={this.onChange}/>
                <button>Search</button>
                <button onClick={this.reset}>Reset</button>
            </form>
        </div>)
    }
}

export default FindUserForm;