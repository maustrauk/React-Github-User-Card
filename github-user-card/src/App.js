import './App.css';
import React from 'react';
import axios from 'axios';

import GithubCrad from './components/GithubCard';

class App extends React.Component {

  state = {
    githubCards: [],
    followers_urls: []
  }

  fetchData = res => {
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
      created_at: res.created_at
    }
  }

  newCard = url => {
    axios
    .get(url)
    .then(res => {
      const data = this.fetchData(res.data);
      this.setState({
        githubCards: [...this.state.githubCards, data]
      })
    })
    .catch(err => {
      console.log("Error:",err);
    })
  }

  componentDidMount() {
    axios
    .get("https://api.github.com/users/maustrauk")
    .then(res => {
      const data = this.fetchData(res.data);
      this.setState({
        githubCards: [data]
      });
    })
    .catch(err => {
      console.log("Error:",err);
    })

    axios
    .get("https://api.github.com/users/maustrauk/followers")
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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.followers_urls !== this.state.followers_urls) {
      this.state.followers_urls.forEach(url => this.newCard(url));
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