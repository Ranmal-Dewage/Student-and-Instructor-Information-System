import React from 'react'

export default class DegreeList extends React.Component {

    state = {
        fid: ''
    }

    componentDidMount() {
        if (this.props.match && this.props.match.params) {
            this.setState({fid: this.props.match.params.id})
        } else {
            this.props.history.push('/faculties/404')
        }
    }

    render() {
        return (
            <div>Degrees in : {this.state.fid}</div>
        )
    }
}