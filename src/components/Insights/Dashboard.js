import React from 'react';
import Fluxxor from 'fluxxor';
import { DataSelector } from './DataSelector';
import { HeatMap } from './HeatMap';
import { SentimentTreeview } from './SentimentTreeview';
import GraphCard from '../Graphics/GraphCard';
import { ActivityFeed } from './ActivityFeed';
import { TimeSeriesGraph } from './TimeSeriesGraph';
import { PopularTermsChart } from './PopularTermsChart';
import { PopularLocationsChart } from './PopularLocationsChart';
import { TopSourcesChart } from './TopSourcesChart';
import ReactGridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import '../../styles/Insights/Dashboard.css';

const ResponsiveReactGridLayout = ReactGridLayout.Responsive;
const WidthProvider = ReactGridLayout.WidthProvider;
ResponsiveReactGridLayout = WidthProvider(ResponsiveReactGridLayout);

const DefaultToggleText = "Expand Heatmap";
const FluxMixin = Fluxxor.FluxMixin(React);
const StoreWatchMixin = Fluxxor.StoreWatchMixin("DataStore");

const layout = {"lg": [
  { "i": "locations", "x": 0, "y": 0, "w": 4, "h": 7, minH: 3, maxH: 7, minW: 1, maxW: 4 },
  { "i": "topics",    "x": 4, "y": 0, "w": 4, "h": 7, minH: 3, maxH: 7, minW: 1, maxW: 4 },
  { "i": "sources",   "x": 8, "y": 0, "w": 4, "h": 7, minH: 3, maxH: 7, minW: 1, maxW: 4 },
  { "i": "timeline",  "x": 12, "y": 0, "w": 12, "h": 7, minH: 3, maxH: 7 },
  { "i": "watchlist", "x": 0, "y": 9, "w": 6, "h": 16, minW: 6, maxW: 6 },
  { "i": "heatmap",   "x": 6, "y": 6, "w": 12, "h": 16, static: true, resizable: true },
  { "i": "newsfeed",  "x": 18, "y": 6, "w": 6, "h": 16, minW: 6, maxW: 12 }
]};

const layoutCollapsed = {"lg": [
  { "i": "watchlist", "x": 0, "y": 0, "w": 4, "h": 22, static: true},
  { "i": "heatmap",   "x": 4, "y": 0, "w": 14, "h": 22, static: true},
  { "i": "newsfeed",  "x": 18, "y": 0, "w": 6, "h": 22, static: true}
]};

export const Dashboard = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin],

  getInitialState() {
    return {
      contentRowHeight: 0,
      newsfeedResizedHeight: 0,
      watchlistResizedHeight: 0,
      contentAreaHeight: 0,
      mounted: false,
      heatmapToggleText: DefaultToggleText
    };
  },

  getStateFromFlux() {
    return this.getFlux().store("DataStore").getState();
  },

  componentWillReceiveProps(nextProps) {
    this.setState(this.getStateFromFlux());
  },

  componentDidMount() {
    const rowInitialHeight = document.getElementById("leafletMap");
    const contentAreaHeight = document.getElementById("contentArea");
    this.setState({contentRowHeight: rowInitialHeight.clientHeight, contentAreaHeight: contentAreaHeight.clientHeight, mounted: true});
  },

  onResizeStop(item, oldItem, newItem, placeholder, e, element) {
    const height = e.toElement.clientHeight;

    const resizedItemId = newItem.i;
    const resizeStateHeightItems = ['newsfeed', 'watchlist'];
    if (resizeStateHeightItems.indexOf(resizedItemId) > -1) {
      const newState = {};
      newState[resizedItemId + 'ResizedHeight'] = height;
      this.setState(newState);
    }
  },

  toggleHeatmapSize() {
    const heatmapToggleText = this.state.heatmapToggleText === DefaultToggleText ? "Minimize Heatmap" : DefaultToggleText;
    const newsfeedResizedHeight = 0;
    const watchlistResizedHeight = 0;
    this.setState({heatmapToggleText, newsfeedResizedHeight, watchlistResizedHeight});
  },

  getEdges() {
    return Array.from(this.state.termFilters);
  },

  getMainEdge() {
    if (!this.state.categoryValue) {
      return undefined;
    }

    return this.state.categoryValue[`name_${this.state.language}`] || this.state.categoryValue.name;
  },

  heatmapComponent() {
    const HeatMapFullScreen = this.state.heatmapToggleText !== DefaultToggleText;
    const {contentAreaHeight, contentRowHeight} = this.state;

    return (
      <div key={'heatmap'} className="heatmapContainer">
        <div>
          <div id='leafletMap'></div>
          <HeatMap
            bbox={this.state.bbox}
            dataSource={this.state.dataSource}
            height={HeatMapFullScreen ? contentAreaHeight : contentRowHeight}
            timespanType={this.state.timespanType}
            datetimeSelection={this.state.datetimeSelection}
            mainEdge={this.getMainEdge()}
            language={this.state.language}
            categoryType={this.state.categoryType}
            edges={this.getEdges()}
            {...this.props}
          />
        </div>
      </div>
    );
  },

  newsfeedComponent() {
    const HeatMapFullScreen = this.state.heatmapToggleText !== DefaultToggleText;
    const {contentAreaHeight, contentRowHeight, newsfeedResizedHeight} = this.state;

    return (
      <div key={'newsfeed'}>
        <div id="newsfeed-container">
          {this.state.bbox && this.state.bbox.length > 0 && this.getMainEdge() ?
          <ActivityFeed
            bbox={this.state.bbox}
            infiniteScrollHeight={HeatMapFullScreen ? contentAreaHeight : newsfeedResizedHeight > 0 ? newsfeedResizedHeight : contentRowHeight}
            timespanType={this.state.timespanType}
            datetimeSelection={this.state.datetimeSelection}
            mainEdge={this.getMainEdge()}
            dataSource={this.state.dataSource}
            categoryType={this.state.categoryType}
            originalSource={this.state.originalSource}
            language={this.state.language}
            edges={this.getEdges()}
            {...this.props}
          />
          : undefined}
        </div>
      </div>
    );
  },

  topLocationsComponent() {
    const cardHeader = {
      title: "Popular Locations"
    };

    return (
      <div key={'locations'} className="doughnutChart">
        <GraphCard cardHeader={cardHeader}>
          <PopularLocationsChart
            mainEdge={this.getMainEdge()}
            datetimeSelection={this.state.datetimeSelection}
            timespanType={this.state.timespanType}
            language={this.state.language}
            dataSource={this.state.dataSource}
            {...this.props}
          />
        </GraphCard>
      </div>
    );
  },

  topTopicsComponent() {
    const cardHeader = {
      title: "Popular Topics"
    };

    return (
      <div key={'topics'} className="doughnutChart">
        <GraphCard cardHeader={cardHeader}>
          <PopularTermsChart
            mainEdge={this.getMainEdge()}
            edgeType={this.state.categoryType}
            timespanType={this.state.timespanType}
            datetimeSelection={this.state.datetimeSelection}
            language={this.state.language}
            dataSource={this.state.dataSource}
            {...this.props}
          />
        </GraphCard>
      </div>
    );
  },

  topSourcesComponent() {
    const cardHeader = {
      title: "Popular Sources"
    };

    return (
      <div key={'sources'} className="doughnutChart">
        <GraphCard cardHeader={cardHeader}>
          <TopSourcesChart
            mainEdge={this.getMainEdge()}
            originalSource={this.state.originalSource}
            timespanType={this.state.timespanType}
            datetimeSelection={this.state.datetimeSelection}
            dataSource={this.state.dataSource}
            {...this.props}
          />
        </GraphCard>
      </div>
    );
  },

  timelineComponent() {
    const cardHeader = {
      title: "Event Timeseries"
    };

    return (
      <div key={'timeline'}>
        <GraphCard cardHeader={cardHeader}>
          <TimeSeriesGraph
            mainEdge={this.getMainEdge()}
            edgeType={this.state.categoryType}
            language={this.state.language}
            timespanType={this.state.timespanType}
            dataSource={this.state.dataSource}
            timespan={this.state.datetimeSelection}
            {...this.props}
          />
        </GraphCard>
      </div>
    );
  },

  watchlistComponent() {
    const HeatMapFullScreen = this.state.heatmapToggleText !== DefaultToggleText;
    const {contentAreaHeight, contentRowHeight, watchlistResizedHeight} = this.state;

    return (
      <div key={'watchlist'}>
        <GraphCard>
          <SentimentTreeview
            enabledTerms={this.getEdges()}
            language={this.state.language}
            height={HeatMapFullScreen ? contentAreaHeight : (watchlistResizedHeight > 0 ) ? watchlistResizedHeight : contentRowHeight}
            {...this.props}
          />
        </GraphCard>
      </div>
    );
  },

  renderedGridCards(heatMapFullScreen) {
     return heatMapFullScreen ? [this.watchlistComponent(), this.heatmapComponent(), this.newsfeedComponent()] :
                                [this.topLocationsComponent(), this.topTopicsComponent(), this.topSourcesComponent(), this.timelineComponent(), this.watchlistComponent(), this.heatmapComponent(), this.newsfeedComponent()];
  },

  render() {
    const HeatMapFullScreen = this.state.heatmapToggleText !== DefaultToggleText;

    return (
      <div>
        <div className="app-container">
          <div className="container-fluid">
            <DataSelector
              heatmapToggleText={this.state.heatmapToggleText}
              toggleHeatmapSize={this.toggleHeatmapSize}
              {...this.props}
            />
            <div className="row" id="contentArea">
              <div className="dashboard-grid">
                <ResponsiveReactGridLayout
                  measureBeforeMount={false}
                  className="layout"
                  layouts={HeatMapFullScreen ? layoutCollapsed : layout}
                  cols={{lg: 24, md: 20, sm: 12, xs: 8, xxs: 4} }
                  rowHeight={32}
                  onResizeStop={this.onResizeStop}
                  breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                  useCSSTransforms={this.state.mounted}>
                    {this.renderedGridCards(HeatMapFullScreen)}
                </ResponsiveReactGridLayout>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
