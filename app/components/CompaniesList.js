var React = require('react');
var Company = require('./Company');
var CompaniesStore = require('./../stores/CompaniesStore');
var CompareStore = require('./../stores/CompareStore');

function getState() {
  var compareStore = CompareStore.get();
  return {
    companies: CompaniesStore.getAll(),
    disabled: compareStore.max <= compareStore.current
  }
}

var CompaniesList = React.createClass({
  getInitialState: function () {
    return getState();
  },
  componentDidMount: function () {
    CompaniesStore.addChangeListener(this._onChange);
    CompareStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function () {
    CompaniesStore.removeChangeListener(this._onChange);
    CompareStore.removeChangeListener(this._onChange);
  },
  _onChange: function () {
    this.setState(getState());
  },
  render: function() {
    var companies = [];
    for (var id in this.state.companies) {
      companies.push(
        <Company key={'company-key-' + id} disabled={this.state.disabled} company={this.state.companies[id]}/>
      );
    }

    return (
      <ul className='list-group'>
        {companies}
      </ul>
    );
  }
});

module.exports = CompaniesList;