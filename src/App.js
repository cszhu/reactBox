import React from 'react';
import CreateIdeaForm from './components/CreateIdeaForm'
import IdeaList from './components/IdeaList'
import Search from './components/Search'

class App extends React.Component {

  constructor() {
    super()
    this.state = { ideas: [], allIdeas: [] }
  }

  componentDidMount(){
    const ideas = JSON.parse(localStorage.getItem('ideas')) || []
    this.setState({ ideas: ideas, allIdeas: ideas})
  }

  storeIdea(idea){
    this.state.ideas.push(idea);

    let ideas = this.state.ideas

    this.setState({ ideas: ideas }, () => this.lstore(ideas))
  }

  lstore(ideas) {
    localStorage.setItem('ideas', JSON.stringify(ideas))
  }

  destroyIdea(id){
    let ideas = this.state.ideas.filter( idea => idea.id !== id )
    this.setState({ideas: ideas}, () => this.lstore(ideas))
  }

  updateTitle(event, id){
    let ideas = this.state.ideas.map( idea => {
      if(idea.id === id) {
        idea.title = event.target.textContent
      }
      return idea
    })
    this.setState({ideas: ideas}, () => this.lstore(ideas))
  }

  updateBody(event, id){
    console.log(event.target.textContent)
    let ideas = this.state.ideas.map( idea => {
      if(idea.id === id) {
        idea.body = event.target.textContent
      }
      return idea
    })
    this.setState({ideas: ideas}, () => this.lstore(ideas))
  }

  // App.js
  searchIdeas(query){
    let ideas = this.state.allIdeas.filter((idea) => {
      return idea.title.includes(query) || idea.body.includes(query)
    });
    this.setState({ideas: ideas})
  }

  render() {
    return (
      <div className='container'>
        <CreateIdeaForm saveIdea={ this.storeIdea.bind(this) }/>
        <Search searchIdeas={this.searchIdeas.bind(this)}/>
        <IdeaList ideas={this.state.ideas}
                  destroy={this.destroyIdea.bind(this)}
                  updateTitle={this.updateTitle.bind(this)}
                  updateBody={this.updateBody.bind(this)}/>
      </div>
    );
  }
}

export default App;
