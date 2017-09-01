import React from 'react';
import Fluxxor from 'fluxxor';
import Dashboard from '../components/Insights/Dashboard';

const FluxMixin = Fluxxor.FluxMixin(React),
      StoreWatchMixin = Fluxxor.StoreWatchMixin("DataStore");

export const EntryPage = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin],

  getStateFromFlux() {
    return this.getFlux().store("DataStore").getState();
  },

  propertyLiterals() {
    const { dataSource, bbox, termFilters, maintopic, externalsourceid, datetimeSelection, 
            fromDate, toDate, language, zoomLevel, settings, timespanType, 
<<<<<<< HEAD
            conjunctivetopics, heatmapTileIds, timeSeriesGraphData, popularLocations, popularTerms,
=======
            conjunctivetopics, timeSeriesGraphData, popularLocations, popularTerms,
>>>>>>> V2 dashboard rewrite to accomodate cassandra GQL services
            topSources, trustedSources, fullTermList } = this.state;

    return Object.assign({}, { dataSource, maintopic, termFilters, bbox, 
                               externalsourceid, datetimeSelection, fromDate, toDate, language,
<<<<<<< HEAD
                               zoomLevel, settings, timespanType, heatmapTileIds, 
=======
                               zoomLevel, settings, timespanType, 
>>>>>>> V2 dashboard rewrite to accomodate cassandra GQL services
                               conjunctivetopics, timeSeriesGraphData, popularLocations, popularTerms,
                               topSources, trustedSources, fullTermList });
  },

  render() {
    return (
    this.state.bbox.length ? 
      <div>
        <Dashboard flux={this.props.flux} 
                {...this.propertyLiterals()} />
      </div>
    : <div />
  )}
});