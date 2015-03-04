var React = require('react');
var CompanyActionCreators = require('./../actions/CompanyActionCreators');
var CompareStore = require('./../stores/CompareStore');

var Company = React.createClass({
  selectCompany: function(e) {
    CompanyActionCreators.selectCompany({
      selected: e.currentTarget.checked,
      company: this.props.company
    });
  },
  render: function() {
    return (
      <li className='list-group-item'>
        <label htmlFor={'company-' + this.props.company.id} className="input-group">
          <span className="input-group-addon">
            <input onClick={this.selectCompany} id={'company-' + this.props.company.id} disabled={this.props.disabled && !CompareStore.getCompanyById(this.props.company.id)} type="checkbox" />
          </span>
          <span className="form-control">{this.props.company.title}</span>
        </label>
      </li>
    );
  }
});

module.exports = Company;