import MarkerClusterGroup from './MarkerClusterGroup';
import { Map, TileLayer, ZoomControl } from 'react-leaflet';
import constants from '../../actions/constants';
import React from 'react';
import '../../styles/Insights/HeatMap.css';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZXJpa3NjaGxlZ2VsIiwiYSI6ImNpaHAyeTZpNjAxYzd0c200dWp4NHA2d3AifQ.5bnQcI_rqBNH0rBO0pT2yg';  // FIXME: should this really be checked in?
const TILE_LAYER_URL = 'https://api.mapbox.com/styles/v1/erikschlegel/cizn74i7700252rqk9tn70wu2/tiles/256/{z}/{x}/{y}?access_token={accessToken}';  // FIXME: should this be configurable?

export default class HeatMap extends React.Component {
  constructor(props) {
    super(props);

    this.handleMoveEnd = this.handleMoveEnd.bind(this);
    this.updateBounds = this.updateBounds.bind(this);
  }

  handleMoveEnd(viewport) {
    this.updateBounds(viewport);
  }

  getLeafletBbox(){
    if (!this.refs.map) {
      return undefined;
    }

    const bounds = this.refs.map.leafletElement.getBounds();

    return [bounds.getNorth(), bounds.getWest(), bounds.getSouth(), bounds.getEast()];
  }

  updateBounds(viewport) {
    if(this.refs.map){
      const { dataSource, timespanType, termFilters, datetimeSelection, maintopic, externalsourceid,
        fromDate, toDate } = this.props;
      const zoom = this.refs.map.leafletElement.getZoom();
      const bbox = this.getLeafletBbox();

      this.props.flux.actions.DASHBOARD.reloadVisualizationState(fromDate, toDate, datetimeSelection, timespanType, dataSource, maintopic, bbox, zoom, Array.from(termFilters), externalsourceid);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps && nextProps.bbox &&
      this.props.bbox === nextProps.bbox &&
      this.props.zoomLevel === nextProps.zoomLevel &&
      this.props.fromDate === nextProps.fromDate &&
      this.props.toDate === nextProps.toDate &&
      this.props.maintopic === nextProps.maintopic &&
      this.props.externalsourceid === nextProps.externalsourceid &&
      this.props.conjunctiveTermsLength === nextProps.conjunctiveTermsLength &&
      this.props.dataSource === nextProps.dataSource) {
      
      return false;
    }

    return true;
  }

  render() {
    const { zoomLevel, targetBbox, bbox, defaultZoom } = this.props;

    if (!this.props.bbox.length) return null;
    const minzoom = parseFloat(defaultZoom);
    const maxzoom = minzoom + constants.MAP.MAXZOOM;
    const bounds = [[bbox[1], bbox[0]], [bbox[3], bbox[2]]];
    const maxbounds = [[targetBbox[0], targetBbox[1]], [targetBbox[2], targetBbox[3]]];
    
    return (
      <Map
        onViewportChanged={this.handleMoveEnd}
        bounds={bounds}
        ref="map"
        id="leafletMap"
        maxBounds={maxbounds}
        zoom={zoomLevel}
        zoomControl={false} >

        <TileLayer url={TILE_LAYER_URL}
          maxZoom={maxzoom}
          //minZoom={minzoom}
          attribution='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="http://mapbox.com">Mapbox</a>'
          accessToken={MAPBOX_ACCESS_TOKEN} />

        <ZoomControl
          position={'topright'}
        />

        <MarkerClusterGroup
          clusterColorField={"avgsentiment"}
          clusterValueField={"mentions"}
          {...this.props}
        />
      </Map>
    )
  }
}