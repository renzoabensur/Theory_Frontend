import React, { Component } from 'react';
import { auth } from "../Firebase/firebase"
import axios from 'axios';

export default class CreatePost extends Component {
    constructor(props) {
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeTopic = this.onChangeTopic.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            username: '',
            user_account_id: '',
            title: '',
            description: '',
            topic_id: '',
            thread_id: '',
            votes: 0
        }
    }

    componentDidMount() {
        auth().onAuthStateChanged((user) => {
            console.log(user)
            if (user) {
                this.setState({
                    username: user.displayName
                });
            }
        })
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    onChangeTopic(e) {
        console.log(e.target.value);
        this.setState({
            topic_id: e.target.value
        })
    }

    onSubmit(e) {
        if (this.state.topic_id === '') {
            e.preventDefault();

            alert("Add a topic");

        } else {
            e.preventDefault();

            const post = {
                username: this.state.username,
                user_account_id: 2,
                title: this.state.title.charAt(0).toUpperCase() + this.state.title.slice(1),
                description: this.state.description.charAt(0).toUpperCase() + this.state.description.slice(1),
                topic_id: this.state.topic_id,
                thread_id: '1',
                votes: 0
            }

            console.log(post);

            axios.post('http://localhost:5000/posts/add', post)
                .then(res => console.log(res.data));

            window.location = '/';
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-4" style={{ left: "31.95%" }}>
                        <h3>Create a New Post</h3>
                        <form onSubmit={this.onSubmit} id="postform">

                            <div class="form-row align-items-center">
                                <div class="col-auto my-1">
                                    <label class="mr-sm-2" for="inlineFormCustomSelect">Topic</label>
                                    <select class="custom-select mr-sm-2" id="inlineFormCustomSelect" onChange={this.onChangeTopic} required>
                                        <option selected>Choose Topic...</option>
                                        <option value="musics" >Musics</option>
                                        <option value="movies" >Movies</option>
                                        <option value="series" >Series</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Title: </label>
                                <input placeholder="Title" type="text"
                                    required
                                    className="form-control"
                                    value={this.state.title}
                                    onChange={this.onChangeTitle}
                                />
                            </div>
                            <div className="form-group">
                                <label>Description: </label>
                                <textarea placeholder="Write something.." type="text" style={{ height: "150px" }}
                                    required
                                    className="form-control"
                                    value={this.state.description}
                                    onChange={this.onChangeDescription}
                                />
                            </div>
                            <button type="submit" form="postform" value="submit" className="btn btn-primary" >Post</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}