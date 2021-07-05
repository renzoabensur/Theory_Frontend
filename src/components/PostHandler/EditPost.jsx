import React, { Component } from 'react';
import { auth } from "../Firebase/firebase"
import axios from 'axios';

export default class CreateExercise extends Component {
    constructor(props) {
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            user_account_id: '',
            title: '',
            description: '',
            topic_id: '',
            thread_id: '' ,
        }
    }

    componentDidMount() {
        auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    username: user.displayName
                });
            }
        })
        axios.get('http://localhost:5000/posts/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    title: response.data.title,
                    description: response.data.description,
                })
            })
            .catch(function (error) {
                console.log(error);
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

    onSubmit(e) {
        e.preventDefault();

        const post = {
            username: this.state.username,
            user_account_id: 2,
            title: this.state.title,
            description: this.state.description,
            topic_id: '3',
            thread_id: '1',
        }

        console.log(post);

        axios.post('http://localhost:5000/posts/update/'+ this.props.match.params.id, post)
            .then(res => console.log(res.data));

        window.location = '/';
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-4" style={{ left: "31.95%" }}>
                        <h3>Create Edit Post</h3>
                        <form onSubmit={this.onSubmit} id="postform">
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
                            <button type="submit" form="postform" value="submit" className="btn btn-primary" >Edit Post</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}