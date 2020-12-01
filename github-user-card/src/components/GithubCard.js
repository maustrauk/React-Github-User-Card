import React from 'react';

class GithubCard extends React.Component {

    state = {
        moreInfo : ""
    }

    onClick = event => {
        if(this.state.moreInfo === "") {
            this.setState({
                moreInfo : `Created at: ${this.props.githubCard.created_at}`
            })
        } else {
            this.setState({
                moreInfo : ""
            })
        }
    }

    render() {
        return(<div className="card">
            <img src={this.props.githubCard.img_url} alt="User avatar"/>
            <div className="card-info">
                <h3 className="name">{this.props.githubCard.name}</h3>
                <p className="username">{this.props.githubCard.login}</p>
                <p>Location: {this.props.githubCard.location}</p>
                <p>Profile:
                    <a href={this.props.githubCard.html_url}>{this.props.githubCard.html_url}</a>
                </p>
                <p>Followers: {this.props.githubCard.followers}</p>
                <p>Following: {this.props.githubCard.following}</p>
                <p>Bio: {this.props.githubCard.bio}</p>                
                <button onClick={this.onClick}>+</button>
                <div className="more-info">{this.state.moreInfo}</div>
            </div>
            <h2>{this.props.githubCard.role}</h2>
        </div>)
    }
}

export default GithubCard;