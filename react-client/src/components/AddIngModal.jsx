import React from 'react';

class AddIngModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      possibleIng: []
    }

  }

  onOptionClick(e) {
    // console.log(e.target.value);
    let { name } = e.target.dataset;
    console.log(name)

    // Todo: reset value of textarea to whatever is clicked
    this.props.onAddIngNameChange(name);
    this.setState({name})
  }

  onNewIngChange(e) {
    console.log(this.props);
    // let { name } = this.state;
    const { ingredients } = this.props;
    // console.log(Trie);
    let str = e.target.value;
    console.log(str[str.length - 1] === '\n');
    if (str[str.length - 1] === '\n') {
      // send name to server immediately
      // this.props.updateServer(str.slice(0, str.length - 1))
      //   .then(())
    } else {
      let possibleIng = [];
      if (ingredients.Trie.startsWith(e.target.value.slice())) {
        possibleIng = ingredients.Trie.allStartsWith(e.target.value.slice());
      }
      console.log(possibleIng);
      this.props.onAddIngNameChange(e.target.value);
      this.setState({ name: e.target.value, possibleIng });
    }



  }

  render() {
    const { modal } = this.props;
    const possibilities = this.state.possibleIng.map((possible) => {
      let id = possible;
      let className = `posName ${id.replace(/[ ]/gi, '')}`;
      return (<div data-name={possible} onClick={this.onOptionClick.bind(this)} className={className}>{possible}</div>);
    });

    return (
      <div className='modal-container'>
        <textarea   onChange={this.onNewIngChange.bind(this)}
                        rows="1"
                        cols="50"
                 placeholder='Carrots, peas, cheese, bees, etc'
                      value={this.state.name}
                         key={1}>
        </textarea>
        {possibilities}
      </div>
    )
  }

}


export default AddIngModal;