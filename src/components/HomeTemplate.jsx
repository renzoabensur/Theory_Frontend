import React, { Component } from "react";
import * as ROUTES from '../constants/routes';
import PostsList from "./PostHandler/PostRender";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic, faFilm, faTv, faFire, faSync } from '@fortawesome/free-solid-svg-icons'


class HomeTemplate extends Component {
  constructor(props) {
    super(props);

    this.onClickNew = this.onClickNew.bind(this);
    this.onClickPopular = this.onClickPopular.bind(this);

    this.state = {
      sortBy: 'date'
    }
  }

  onClickPopular() {
    this.setState({
      sortBy: 'popularity'
    })
  }

  onClickNew(){
    this.setState({
      sortBy: 'date'
    })
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-3" style={{ paddingLeft: "0px" }}>
            <ul className="list-group">
              <h4 className="list-title list-group-item " style={{ backgroundColor: "#333" }}>Categories</h4>
              <a href={ROUTES.MUSICS} className="list-group-item list-group-item-action">Musics <FontAwesomeIcon icon={faMusic} /></a>
              <a href={ROUTES.MOVIES} className="list-group-item list-group-item-action">Movies <FontAwesomeIcon icon={faFilm} /></a>
              <a href={ROUTES.SERIES} className="list-group-item list-group-item-action">Series <FontAwesomeIcon icon={faTv} /> </a>
            </ul>
          </div>
          <div className="col-6">
            <div className="row post-bar">
              <div className="col-4" style={{ paddingTop: "5px"}}>
                <button onClick={this.onClickNew} className="header1">New <FontAwesomeIcon className="headerIcon" icon={faSync} /></button>
              </div>
              <div className="col-4" style={{ paddingTop: "5px" }}>
                <a href={ROUTES.CREATEPOST}><input type="text" placeholder="Create Post" name="createPost" className="search-post" /></a>
              </div>
              <div className="col-4" >
                <button onClick={this.onClickPopular} className="header2">Popular <FontAwesomeIcon className="headerIcon" icon={faFire} /></button>
              </div>
            </div>
            <PostsList topic_id={this.props.topic_name} sortBy={this.state.sortBy}/>
          </div>
          <div className="col-3"></div>
        </div>
      </div>
    );
  }
}

export default HomeTemplate;