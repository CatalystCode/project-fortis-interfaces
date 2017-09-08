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
<<<<<<< HEAD
            conjunctivetopics, heatmapTileIds, timeSeriesGraphData, popularLocations, popularTerms,
=======
            conjunctivetopics, timeSeriesGraphData, popularLocations, popularTerms,
>>>>>>> V2 dashboard rewrite to accomodate cassandra GQL services
=======
            conjunctivetopics, heatmapTileIds, timeSeriesGraphData, popularLocations, popularTerms,
>>>>>>> Fortis V2 interface changes
            topSources, trustedSources, fullTermList } = this.state;

    return Object.assign({}, { dataSource, maintopic, termFilters, bbox, 
                               externalsourceid, datetimeSelection, fromDate, toDate, language,
<<<<<<< HEAD
<<<<<<< HEAD
                               zoomLevel, settings, timespanType, heatmapTileIds, 
=======
                               zoomLevel, settings, timespanType, 
>>>>>>> V2 dashboard rewrite to accomodate cassandra GQL services
=======
                               zoomLevel, settings, timespanType, heatmapTileIds, 
>>>>>>> Fortis V2 interface changes
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