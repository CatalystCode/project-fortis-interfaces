import MarkerClusterGroup from './MarkerClusterGroup';
import { Map, TileLayer, ZoomControl } from 'react-leaflet';
import constants from '../../actions/constants';
import React from 'react';
<<<<<<< HEAD
=======
import { Actions } from '../../actions/Dashboard';
import { SERVICES } from '../../services/Dashboard';
import weightedMean from '../../utils/WeightedMean';
import eachLimit from 'async/eachLimit';
import numeralLibs from 'numeral';
import L from 'leaflet';
import ProgressBar from 'react-progress-bar-plus';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/images/layers-2x.png';
import 'leaflet/dist/images/layers.png';
import 'leaflet/dist/images/marker-icon-2x.png';
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
>>>>>>> V2 dashboard rewrite to accomodate cassandra GQL services
import '../../styles/Insights/HeatMap.css';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZXJpa3NjaGxlZ2VsIiwiYSI6ImNpaHAyeTZpNjAxYzd0c200dWp4NHA2d3AifQ.5bnQcI_rqBNH0rBO0pT2yg';  // FIXME: should this really be checked in?
const TILE_LAYER_URL = 'https://api.mapbox.com/styles/v1/erikschlegel/cizn74i7700252rqk9tn70wu2/tiles/256/{z}/{x}/{y}?access_token={accessToken}';  // FIXME: should this be configurable?

<<<<<<< HEAD
export default class HeatMap extends React.Component {
  constructor(props) {
    super(props);
=======
export const HeatMap = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin],

  getInitialState() {
    return {
      mapProgressPercent: -1,
      intervalTime: 200,
      selectedTileId: false,
      modalTitle: ''
    };
  },

  getStateFromFlux() {
    return this.getFlux().store("DataStore").getState();
  },

  addInfoBoxControl() {
    if (!this.map) {
      return;
    }

    const self = this;
    const info = L.control();

    info.onAdd = map => {
      this._sentimentDiv = L.DomUtil.create('div', 'info');
      info.update();
      return this._sentimentDiv;
    };

    info.options = {
      position: 'topleft'
    };

    info.update = props => {
      const sentimentLevel = props && props.weightedSentiment ? props.weightedSentiment : 0;
      const { sentimentClass, sentimentIcon } = self.getSentimentClassAndIcon(sentimentLevel);
      const sentimentIconSpan = `<span class="material-icons sentimentIcon ${sentimentClass}Icon" color="#ffffff">${sentimentIcon}</span>`;
      const infoHeaderText = "<h5>Sentiment Summary</h5>";
      const infoBoxInnerHtml =
      `<div id="sentimentGraph">
        <div class="sentimentGraphBar ${sentimentClass}">
          ${self.formatSentimentLevel(sentimentLevel)} / 10
        </div>
        ${sentimentIconSpan}
      </div>`;

      this._sentimentDiv.innerHTML = infoHeaderText + infoBoxInnerHtml;
    };

    info.addTo(this.map);
    this.sentimentGraph = info;
  },

  addBreadCrumbControl() {
    if (!this.map) {
      return;
    }

    const state = this.getStateFromFlux();
    const info = L.control();

    info.onAdd = map => {
      this._div = L.DomUtil.create('div', 'info');
      return this._div;
    };

    info.options = {
      position: 'topleft'
    };

    info.update = filters => {
      const selectionType = state.categoryType;
      const selectedLanguage = state.language;
      const translations = state.allEdges.get(DEFAULT_LANGUAGE);
      const mainSearchEntity = state.mainEdge;
      const maxTerms = 3;
      const infoHeaderText = "<h5>Review your selection below</h5>";
      const infoBoxIntro = `
      <span class="filterLabelType">
        ${selectionType}:
      </span>
      <div class="filterLabelContainer">
        <span class="filterLabel">
          ${mainSearchEntity}
        </span>
      </div>`;

      let infoBoxInnerHtml = '';
      let numberOfDisplayedTerms = 0;

      if (filters.length > 0) {
        filters.forEach(filter => {
          if (++numberOfDisplayedTerms === maxTerms) {
            infoBoxInnerHtml += `<span class="filterLast">&nbsp;and ${(filters.length + 1) - maxTerms} Others</span>`;
          } else if (numberOfDisplayedTerms < maxTerms) {
            infoBoxInnerHtml += `
            ${numberOfDisplayedTerms > 0 ? '<span class="filterSeperation">+</span>' : ''}
            <div class="filterLabelContainer">
              <span class="filterLabel">
                ${translations.get(filter)[`name_${selectedLanguage}`]}
              </span>
            </div>`;
          }
        });
      }

      if (filters > 0) { // FIXME: isn't filters a list? if so: this would always return false
        infoBoxInnerHtml = `
        <span class="filterSeperation">+</span>
          <span class="filterLabelType">
            Term(s):
          </span>
          ${infoBoxInnerHtml}`;
      }

      this._div.innerHTML = infoHeaderText + infoBoxIntro + infoBoxInnerHtml;
    };

    info.addTo(this.map);
    this.breadCrumbControl = info;
  },

  getSentimentColor(sentiment) {
    return Actions.constants.SENTIMENT_COLOR_MAPPING[sentiment];
  },

  componentWillReceiveProps(nextProps) {
    const shouldUpdate =
      ((this.hasChanged(this.getStateFromFlux(), this, "bbox") && this.props.bbox.length > 0) ||
        this.hasChanged(nextProps, this.props, "datetimeSelection") ||
        this.props.height !== nextProps.height ||
        this.hasChanged(nextProps, this.props, "timespanType") ||
        this.hasChanged(nextProps, this.props, "edges") ||
        (!this.status && nextProps.mainEdge) ||
        this.hasChanged(nextProps, this.props, "language") ||
        this.hasChanged(nextProps, this.props, "mainEdge") ||
        this.hasChanged(nextProps, this.props, "dataSource")) &&
      this.status !== 'loading';

    if (!shouldUpdate) {
      return;
    }

    this.updateHeatmap();

    if (this.map) {
      this.map.invalidateSize()
    }
  },

  hasChanged(nextProps, currentProps, propertyName) {
    if (Array.isArray(nextProps[propertyName])) {
      return nextProps[propertyName].join(",") !== currentProps[propertyName].join(",");
    }

    if (currentProps[propertyName] && nextProps[propertyName] && nextProps[propertyName] !== currentProps[propertyName]) {
      return true;
    }

    return false;
  },

  getSentimentClassAndIcon(sentimentLevel) {
    let sentimentClass = "";
    let sentimentIcon = "";

    if (sentimentLevel < 30) {
      sentimentClass = "positiveSenitment";
      sentimentIcon = "sentiment_very_satisfied";
    } else if (sentimentLevel < 55) {
      sentimentClass = "neutralSentiment";
      sentimentIcon = "sentiment_neutral";
    } else if (sentimentLevel < 80) {
      sentimentClass = "neutralNegativeSentiment";
      sentimentIcon = "sentiment_dissatisfied";
    } else {
      sentimentClass = "negativeSenitment";
      sentimentIcon = "sentiment_very_dissatisfied";
    }

    return { sentimentClass, sentimentIcon };
  },

  getSentimentCategory(level) {
    if (level >= 0 && level < 30) {
      return "small";
    } else if (level >= 30 && level < 55) {
      return "medium";
    } else if (level >= 55 && level < 80) {
      return "large";
    } else {
      return "xl";
    }
  },

  formatSentimentLevel(sentimentLevel) {
    return parseFloat((sentimentLevel / 100) * 10).toFixed(2);
  },

  componentDidMount() {
    const state = this.getStateFromFlux();

    if (!state.settings.properties.defaultLocation || !state.settings.properties.defaultZoomLevel) {
      return;
    }

    const bbox = this.state.settings.properties.targetBbox;
    this.bbox = bbox;
    const bounds = [[bbox[1], bbox[0]], [bbox[3], bbox[2]]];
    this.tilemap = new Map();
    L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.0.2/dist/images/";
    this.map = L.map('leafletMap', {zoomControl: false});
    this.map.addControl(L.control.zoom({position: 'topright'}));
    this.map.fitBounds(bounds);
    const { lat, lng } = this.map.getCenter();
    this.map.coordinates = [lng, lat];

    L.tileLayer(TILE_LAYER_URL, {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 17,
      minZoom: 5,
      accessToken: MAPBOX_ACCESS_TOKEN
    }).addTo(this.map);

    this.map.selectedTerm = state.mainEdge;
    this.map.datetimeSelection = state.datetimeSelection;
    this.map.dataSource = state.dataSource;
    this.map.on('moveend', () => {
      this.getFlux().actions.DASHBOARD.updateAssociatedTerms(this.getStateFromFlux().associatedKeywords, this.getLeafletBbox(), this.getLeafletZoomLevel());
    });

    this.addClusterGroup();
    this.addInfoBoxControl();
    this.addBreadCrumbControl();
  },

  addClusterGroup() {
    if (!this.map) {
      return;
    }

    const self = this;

    this.markers = L.markerClusterGroup({
      maxClusterRadius: 120,
      chunkedLoading: true,
      zoomToBoundsOnClick: true,
      iconCreateFunction: cluster => {
        let maxSentimentLevel = 0;
        const totalMentions = cluster.getAllChildMarkers().reduce((prevTotal, child) => {
          maxSentimentLevel = Math.max(maxSentimentLevel, child.feature.properties[SENTIMENT_FIELD]);
          return child.feature.properties.mentionCount + prevTotal;
        }, 0);
        const cssClass = "marker-cluster marker-cluster-{0}".format(self.getSentimentCategory((maxSentimentLevel || 0) * 100));
        return self.customClusterIcon(totalMentions, cssClass);
      },
      singleMarkerMode: true
    });

    this.map.addLayer(this.markers);
  },
>>>>>>> V2 dashboard rewrite to accomodate cassandra GQL services

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
      Array.from(this.props.termFilters).join(',') === Array.from(nextProps.termFilters).join(',') &&
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
          minZoom={minzoom}
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