import React from 'react';
import BookmarksContext from '../BookmarksContext';
import config from '../config';



class EditBookmark extends React.Component {
  
  static contextType = BookmarksContext;
  state= {
    id: -1,
    title: '',
    description: '',
    rating: 0,
    url: '',
    error: null
  };

  componentDidMount() {
    const bookmarkId = this.props.match.params.id;
    fetch(`${config.API_ENDPOINT}/${bookmarkId}`,
    { headers: {
      'content-type': 'application/json',
     'Authorization': `Bearer ${config.API_KEY}`
    }, method: 'GET'})
    .then(res => {
      if (!res.ok) {
        // get the error message from the response,
        return res.json().then(error => {
          // then throw it
          throw error
        })
      }
      return res.json()
    })
    .then(responseData => {
      const { id, title, rating, description, url } = responseData
      //const currentBookmark = { id, title, rating, description, url }
      this.setState(
        { id, title, rating, description, url }
      )
    })
      .catch(error=>{this.setState({error})})
  }
  handleTitleChange = title => {
    this.setState({
      title: title
    })
  }

  handleDescriptionChange = description => {
    this.setState({
      description: description
    })
  }

  handleUrlChange = url => {
    this.setState({
      url: url
    })
  }

  handleRatingChange = rating => {
    this.setState({
      rating: rating
    })
  }

  handleSubmit = e => {
      e.preventDefault()
      fetch(`${config.API_ENDPOINT}/${this.state.id}`, {
        method: 'PATCH', headers: {
          'content-type': 'application/json',
         'Authorization': `Bearer ${config.API_KEY}`
        },
        body: JSON.stringify(this.state)
      })
      .then(
        this.context.editBookmark(this.state)
      )
      .then(
        this.props.history.push('/')
      )
  }
  handleClickCancel = () => {
    this.props.history.push('/')
  }
  render(){
    const { error } = this.state
    const { title, url, description, rating } = this.state
    return (
      <section className='EditBookmarkForm'>
        <h2>Edit Bookmark</h2>
        <form
          className='EditBookmark__form'
          onSubmit={this.handleSubmit}
        >
          <div className='EditBookmark__error' role='alert'>
            {error && <p>{error.message}</p>}
          </div>
          <div>
            <label htmlFor='title'>
              Title
              {' '}
            
            </label>
            <input
              type='text'
              name='title'
              id='title'
              value={title}
              placeholder={this.state.title}
              onChange={e=>this.handleTitleChange(e.target.value)}
              
            />
          </div>
          <div>
            <label htmlFor='url'>
              URL
              {' '}
              
            </label>
            <input
              type='url'
              name='url'
              id='url'
              value={url}
              placeholder={this.state.url}
              onChange={e=>this.handleUrlChange(e.target.value)}
              
            />
          </div>
          <div>
            <label htmlFor='description'>
              Description
            </label>
            <textarea
              name='description'
              id='description'
              value={description}
              onChange={e=>this.handleDescriptionChange(e.target.value)}
              placeholder={this.state.description}
            />
          </div>
          <div>
            <label htmlFor='rating'>
              Rating
              {' '}
            
            </label>
            <input
              type='number'
              name='rating'
              id='rating'
              value={rating}
              placeholder={this.state.rating}
              onChange={e=>this.handleRatingChange(e.target.value)}
              min='1'
              max='5'
              
            />
          </div>
          <div className='EditBookmark__buttons'>
            <button type='button' onClick={this.handleClickCancel}>
              Cancel
            </button>
            {' '}
            <button type='submit'>
              Save Changes
            </button>
          </div>
        </form>
      </section>
    )
  }
}

export default EditBookmark;