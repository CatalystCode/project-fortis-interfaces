import { DataGrid } from './DataGrid';
import React from 'react';
import createReactClass from 'create-react-class';
import Fluxxor from 'fluxxor';

const FluxMixin = Fluxxor.FluxMixin(React);
const StoreWatchMixin = Fluxxor.StoreWatchMixin("AdminStore");

export const TrustedSources = createReactClass({
    mixins: [FluxMixin, StoreWatchMixin],

    componentDidMount(){
      this.getFlux().actions.ADMIN.load_trusted_sources();
    },

    getStateFromFlux() {
      return this.getFlux().store("AdminStore").getState();
    },

    handleSave(rows) {
      rows.map(row => row.rowKey = row.pipelineKey + ',' + row.externalSourceId + ',' + row.sourceType + ',' + row.rank);
      this.getFlux().actions.ADMIN.save_trusted_sources(rows);
    },

    handleRemove(rows) {
      this.getFlux().actions.ADMIN.remove_trusted_sources(rows);
    },

    render() {
      const state = this.getFlux().store("AdminStore").getState();

      return (
        this.state.trustedSourcesColumns ? 
          <DataGrid 
            rowHeight={40}
            minHeight={500}
            rowKey="rowKey"
            handleSave={this.handleSave}
            handleRemove={this.handleRemove}
            columns={this.state.trustedSourcesColumns}
            rows={state.trustedSources} />
          : <div />
      );
    }
});