import React from 'react';
import Rating from '../Rating/Rating';
import BookmarksContext from '../BookmarksContext';
import config from '../config';
import './BookmarkItem.css';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

function deleteBookmarkRequest(bookmarkId, cb) {
  fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
    method: 'DELETE',
    headers: {
      'authorization': `bearer ${config.API_KEY}`
    }
  })
    .then(res => {
      if (!res.ok) {
        // get the error message from the response,
        return res.then(error => {
          // then throw it
          throw error
        })
      }
      return res
    })
    .then(data => {
      // call the callback when the request is successful
      // this is where the App component can remove it from state
       cb(bookmarkId)
    })
    .catch(error => {
      console.error(error)
    })
}

export default function BookmarkItem(props) {
  BookmarkItem.defaultProps = {
    rating: 1, 
    description: '',
  }
  return (
    <BookmarksContext.Consumer>
      {(context)=> (
<li className='BookmarkItem'>
      <div className='BookmarkItem__row'>
        <h3 className='BookmarkItem__title'>
          <a
            href={props.url}
            target='_blank'
            rel='noopener noreferrer'>
            {props.title}
          </a>
        </h3>
        <Rating value={props.rating} />
      </div>
      <p className='BookmarkItem__description'>
        {props.description}
      </p>
      <div className='BookmarkItem__buttons'>
        <button
          className='BookmarkItem__description'
          onClick={() => {
            deleteBookmarkRequest(
              props.id, context.deleteBookmark,
              )
          }}
        >
          Delete
        </button>
        <Link to={`/edit/${props.id}`}>
        <button className='BookmarkItem__description'>Edit Bookmark</button>
        </Link>
      </div>
    </li>
  )}

    </BookmarksContext.Consumer>
  )}
  BookmarkItem.propTypes = {
    title: propTypes.string.isRequired,
    url: propTypes.string.isRequired,
    rating: propTypes.number,
    description: propTypes.string
  };