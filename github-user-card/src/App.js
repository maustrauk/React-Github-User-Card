import './App.css';
import React from 'react';
import axios from 'axios';

import GithubCrad from './components/GithubCard';
import FindUserForm from './forms/FindUserForm';

class App extends React.Component {

  state = {
    githubCards: [],
    followers_urls: []
  }

  fetchData = (res, role) => {
    return {
      id: res.id,
      img_url: res.avatar_url,
      login: res.login,
      name: res.name,
      location: res.location,
      html_url: res.html_url,
      followers: res.followers,
      following: res.following,
      bio: res.bio,
      created_at: res.created_at,
      role: role
    }
  }

  newCard = (url, role) => {
    axios
    .get(url)
    .then(res => {
      const data = this.fetchData(res.data, role);
      this.setState({
        githubCards: [...this.state.githubCards, data]
      })
    })
    .catch(err => {
      console.log("Error:",err);
    })
  }

  onSubmit = (username) => {
    this.leaderMount(username);
  }

  leaderMount = (username) => {
    axios
    .get(`https://api.github.com/users/${username}`)
    .then(res => {
      const data = this.fetchData(res.data, "Leader");
      this.setState({
        githubCards: [data]
      });
    })
    .catch(err => {
      console.log("Error:",err);
    })

    axios
    .get(`https://api.github.com/users/${username}/followers`)
    .then(res => {
      const data = res.data.map(obj => obj.url);
      this.setState({
        followers_urls: data
      })
    })
    .catch(err => {
      console.log("Error:",err);
    })
  }

  componentDidMount() {
    this.leaderMount('maustrauk');
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.followers_urls !== this.state.followers_urls) {
      this.state.followers_urls.forEach(url => this.newCard(url, "Follower"));
    }
  }

  render() {
    return (<div className="container">
      <div className="header">
        <img src="./assets/githublogo.png" alt="Lambda Logo"/>
        <p>❤️'s</p>
        <img src="./assets/githublogo.png" alt="GitHub Logo" />
      </div>
      <div className="cards">
        <FindUserForm onSubmit={this.onSubmit}/>
        {
          this.state.githubCards.map((githubCard) => (
            <GithubCrad githubCard={githubCard} key={githubCard.id} />
          ))
        }
      </div>
    </div>)
  }
   
}

export default App;