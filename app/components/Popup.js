var React = require('react');
var classNames = require('classnames');
var PopupStore = require('./../stores/PopupStore');
var CompareStore = require('./../stores/CompareStore');
var PopupActionCreators = require('./../actions/PopupActionCreators');
var $ = require('jquery');
window.$ = window.jQuery = $; // TODO: hack making jquery global for highcharts
var Highcharts = require('highcharts-browserify');

var Popup = React.createClass({
  getInitialState: function () {
    return PopupStore.get();
  },
  componentDidMount: function () {
    PopupStore.addChangeListener(this._onChange);
    CompareStore.addChangeListener(this._onChange);

    $(this.getDOMNode()).find('.chart').highcharts({
        chart: {
            type: 'area'
        },
        title: {
            text: 'Comparing companies by metrics'
        },
        xAxis: {
            categories: ['friends', 'landings', 'leads', 'offers', 'purchases', 'shares'],
            tickmarkPlacement: 'on',
            title: {
                enabled: false
            }
        },
        yAxis: {
            title: {
                text: 'Percent'
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.0f})<br/>',
            shared: true
        },
        plotOptions: {
            area: {
                stacking: 'percent',
                lineColor: '#ffffff',
                lineWidth: 1,
                marker: {
                    enabled: false
                }
            }
        },
        series: []
    });
  },
  componentWillUnmount: function () {
    PopupStore.removeChangeListener(this._onChange);
    CompareStore.removeChangeListener(this._onChange);
    var chart = $(this.getDOMNode()).find('.chart').highcharts();
    if (chart) {
      chart.destroy();
    }
  },
  componentDidUpdate: function () {
    if (this.state.show) {
      var chart = $(this.getDOMNode()).find('.chart').highcharts();
      var companies = CompareStore.getAllCompanies();
      var totalMetrics = {};
      var categories = [];

      // clear all series
      while (chart.series.length > 0) {
        chart.series[0].remove(true);
      }

      // adding new series
      for (var id in companies) {
        var data = [];
        for (var metric in companies[id].metrics) {
          data.push(companies[id].metrics[metric]);
          if (totalMetrics[metric]) {
            totalMetrics[metric] += companies[id].metrics[metric];
          } else {
            totalMetrics[metric] = companies[id].metrics[metric];
          }
        }
        chart.addSeries({
          name: companies[id].title,
          data: data
        });
      }

      // seting categories
      for (var name in totalMetrics) {
        categories.push(name + ' (' + totalMetrics[name] + ')')
      }
      chart.xAxis[0].setCategories(categories);
    }
  },
  _onChange: function () {
    this.setState(PopupStore.get());
  },
  closePopup: function () {
    PopupActionCreators.closePopup();
  },
  render: function() {
    var classes = classNames('popup', {show: this.state.show});

    return (
      <div className={classes}>
        <div className='chart'></div>
        <span onClick={this.closePopup} className='popup-close'></span>
      </div>
    );
  }
});

module.exports = Popup;