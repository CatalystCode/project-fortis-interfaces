import React from 'react';
import DataSelector from './DataSelector';
<<<<<<< HEAD
import HeatMap from './HeatMap';
import SentimentTreeview from './SentimentTreeview';
import GraphCard from '../Graphics/GraphCard';
import ActivityFeed from './ActivityFeed';
import TimeSeriesGraph from './TimeSeriesGraph';
import PopularTermsChart from './PopularTermsChart';
import PopularLocationsChart from './PopularLocationsChart';
import PopularSourcesChart from './PopularSourcesChart';
=======
import { HeatMap } from './HeatMap';
import { SentimentTreeview } from './SentimentTreeview';
import GraphCard from '../Graphics/GraphCard';
import { ActivityFeed } from './ActivityFeed';
import { TimeSeriesGraph } from './TimeSeriesGraph';
import PopularTermsChart from './PopularTermsChart';
import { PopularLocationsChart } from './PopularLocationsChart';
import { TopSourcesChart } from './TopSourcesChart';
>>>>>>> V2 dashboard rewrite to accomodate cassandra GQL services
import ReactGridLayout from 'react-grid-layout';
import { defaultLayout } from './Layouts';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import '../../styles/Insights/Dashboard.css';

let ResponsiveReactGridLayout = ReactGridLayout.Responsive;
const WidthProvider = ReactGridLayout.WidthProvider;
ResponsiveReactGridLayout = WidthProvider(ResponsiveReactGridLayout);

const DefaultToggleText = "Expand Heatmap";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

<<<<<<< HEAD
    
    this.onResizeStop = this.onResizeStop.bind(this);

=======
>>>>>>> V2 dashboard rewrite to accomodate cassandra GQL services
    this.state = {
      contentRowHeight: 0,
      newsfeedResizedHeight: 0,
      watchlistResizedHeight: 0,
      contentAreaHeight: 0,
      mounted: false,
      heatmapToggleText: DefaultToggleText
    };
  }

  componentDidMount() {
<<<<<<< HEAD
    const rowInitialHeight = document.getElementById("leafletMap") || { clientHeight: 0 };
=======
    const rowInitialHeight = document.getElementById("leafletMap") || {clientHeight: 0};
>>>>>>> V2 dashboard rewrite to accomodate cassandra GQL services
    const contentAreaHeight = document.getElementById("contentArea");
    this.setState({ contentRowHeight: rowInitialHeight.clientHeight, contentAreaHeight: contentAreaHeight.clientHeight, mounted: true });
  }

  onResizeStop(item, oldItem, newItem, placeholder, e, element) {
    const height = e.toElement.clientHeight;

    const resizedItemId = newItem.i;
    const resizeStateHeightItems = ['newsfeed', 'watchlist'];
    if (resizeStateHeightItems.indexOf(resizedItemId) > -1) {
      const newState = {};
      newState[resizedItemId + 'ResizedHeight'] = height;
      this.setState(newState);
    }
  }

  toggleHeatmapSize() {
    const heatmapToggleText = this.state.heatmapToggleText === DefaultToggleText ? "Minimize Heatmap" : DefaultToggleText;
    const newsfeedResizedHeight = 0;
    const watchlistResizedHeight = 0;
    this.setState({ heatmapToggleText, newsfeedResizedHeight, watchlistResizedHeight });
  }

  filterLiterals() {
    const { dataSource, zoomLevel, flux, bbox, timespanType, termFilters, maintopic, externalsourceid, datetimeSelection, fromDate, toDate, language } = this.props;
    const defaultLanguage = this.props.settings.defaultLanguage;
    return Object.assign({}, { zoomLevel, dataSource, flux, maintopic, defaultLanguage, termFilters, bbox, timespanType, externalsourceid, datetimeSelection, fromDate, toDate, language });
  }

  heatmapComponent() {
    const HeatMapFullScreen = this.state.heatmapToggleText !== DefaultToggleText;
    const { contentAreaHeight, contentRowHeight } = this.state;

    return (
      <div key={'heatmap'} className="heatmapContainer">
        <div>
          <div id='leafletMap'></div>
          <HeatMap
<<<<<<< HEAD
            targetBbox={this.props.settings.targetBbox}
            heatmapTileIds={this.props.heatmapTileIds}
            defaultZoom={parseInt(this.props.settings.defaultZoomLevel)}
=======
            height={HeatMapFullScreen ? contentAreaHeight : contentRowHeight}
>>>>>>> V2 dashboard rewrite to accomodate cassandra GQL services
            {...this.filterLiterals() }
          />
        </div>
      </div>
    );
  }

  newsfeedComponent() {
    const HeatMapFullScreen = this.state.heatmapToggleText !== DefaultToggleText;
    const { bbox } = this.props;
    const { contentAreaHeight, contentRowHeight, newsfeedResizedHeight } = this.state;

    return (
      <div key={'newsfeed'}>
        <div id="newsfeed-container">
          {bbox.length ?
            <ActivityFeed
<<<<<<< HEAD
              allSiteTopics={this.props.fullTermList}
=======
>>>>>>> V2 dashboard rewrite to accomodate cassandra GQL services
              infiniteScrollHeight={HeatMapFullScreen ? contentAreaHeight : newsfeedResizedHeight > 0 ? newsfeedResizedHeight : contentRowHeight}
              {...this.filterLiterals() }
            />
            : undefined}
        </div>
      </div>
    );
  }

  topLocationsComponent() {
    const cardHeader = {
      title: "Popular Locations"
    };

    return (
      <div key={'locations'} className="doughnutChart">
        <GraphCard cardHeader={cardHeader}>
          <PopularLocationsChart
            popularLocations={this.props.popularLocations}
            {...this.filterLiterals() }
          />
        </GraphCard>
      </div>
    );
  }

  topTopicsComponent() {
    const cardHeader = {
      title: "Popular Topics"
    };

    return (
      <div key={'topics'} className="doughnutChart">
        <GraphCard cardHeader={cardHeader}>
          <PopularTermsChart
            allSiteTopics={this.props.fullTermList}
            popularTerms={this.props.popularTerms}
            {...this.filterLiterals() }
          />
        </GraphCard>
      </div>
    );
  }

  topSourcesComponent() {
    const cardHeader = {
      title: "Popular Sources"
    };

    return (
      <div key={'sources'} className="doughnutChart">
        <GraphCard cardHeader={cardHeader}>
<<<<<<< HEAD
          <PopularSourcesChart
=======
          <TopSourcesChart
>>>>>>> V2 dashboard rewrite to accomodate cassandra GQL services
            topSources={this.props.topSources}
            {...this.filterLiterals() }
          />
        </GraphCard>
      </div>
    );
  }

  refreshDashboard(){
    const { dataSource, timespanType, termFilters, datetimeSelection, zoomLevel, maintopic, bbox, fromDate, toDate, externalsourceid } = this.filterLiterals();
    this.props.flux.actions.DASHBOARD.reloadVisualizationState(fromDate, toDate, datetimeSelection, timespanType, dataSource, maintopic, bbox, zoomLevel, Array.from(termFilters), externalsourceid);
  }

  timelineComponent() {
    return (
      <div key={'timeline'}>
          <TimeSeriesGraph
<<<<<<< HEAD
            allSiteTopics={this.props.fullTermList}
            refreshDashboardFunction={()=>this.refreshDashboard()}
=======
>>>>>>> V2 dashboard rewrite to accomodate cassandra GQL services
            timeSeriesGraphData={this.props.timeSeriesGraphData}
            {...this.filterLiterals() }
          />
      </div>
    );
  }

  watchlistComponent() {
    const HeatMapFullScreen = this.state.heatmapToggleText !== DefaultToggleText;
    const { contentAreaHeight, contentRowHeight, watchlistResizedHeight } = this.state;

    return (
      <div key={'watchlist'}>
        <GraphCard>
          <SentimentTreeview
<<<<<<< HEAD
            conjunctivetopics={this.props.conjunctivetopics}
            allSiteTopics={this.props.fullTermList}
=======
>>>>>>> V2 dashboard rewrite to accomodate cassandra GQL services
            height={HeatMapFullScreen ? contentAreaHeight : (watchlistResizedHeight > 0) ? watchlistResizedHeight : contentRowHeight}
            {...this.filterLiterals() }
          />
        </GraphCard>
      </div>
    );
  }

  renderedGridCards(heatMapFullScreen) {
<<<<<<< HEAD
<<<<<<< HEAD
    return heatMapFullScreen ? [this.watchlistComponent(), this.heatmapComponent(), this.newsfeedComponent()] :
      [this.topLocationsComponent(), this.topTopicsComponent(), this.topSourcesComponent(), this.timelineComponent(), this.watchlistComponent(), this.heatmapComponent()];//;, this.newsfeedComponent()];
  }
=======
     return heatMapFullScreen ? [this.watchlistComponent(), this.heatmapComponent(), this.newsfeedComponent()] :
                                [this.topLocationsComponent(), this.topTopicsComponent(), this.topSourcesComponent(), this.timelineComponent(), this.watchlistComponent(), this.heatmapComponent(), this.newsfeedComponent()];
  },
>>>>>>> Integrating the V2 byBBox service
=======
    return [this.topTopicsComponent()];
    //return heatMapFullScreen ? [this.watchlistComponent(), this.heatmapComponent(), this.newsfeedComponent()] :
    //  [this.topLocationsComponent(), this.topTopicsComponent(), this.topSourcesComponent(), this.timelineComponent(), this.watchlistComponent(), this.heatmapComponent(), this.newsfeedComponent()];
  }
>>>>>>> V2 dashboard rewrite to accomodate cassandra GQL services

  render() {
    const HeatMapFullScreen = this.state.heatmapToggleText !== DefaultToggleText;

    return (
      <div>
        <div className="app-container">
          <div className="container-fluid">
            <DataSelector
              heatmapToggleText={this.state.heatmapToggleText}
              toggleHeatmapSize={this.toggleHeatmapSize}
              {...this.filterLiterals() }
            />
            <div className="row" id="contentArea">
              <div className="dashboard-grid">
                <ResponsiveReactGridLayout
                  measureBeforeMount={false}
                  className="layout"
<<<<<<< HEAD
                  isDraggable={false}
                  isDraggable={false}
                  layouts={HeatMapFullScreen ? defaultLayout.layoutCollapsed : defaultLayout.layout}
                  cols={{ lg: 24, md: 20, sm: 12, xs: 8, xxs: 4 }}
                  rowHeight={28}
=======
                  layouts={HeatMapFullScreen ? defaultLayout.layoutCollapsed : defaultLayout.layout}
                  cols={{ lg: 24, md: 20, sm: 12, xs: 8, xxs: 4 }}
                  rowHeight={32}
>>>>>>> V2 dashboard rewrite to accomodate cassandra GQL services
                  onResizeStop={this.onResizeStop}
                  breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
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
}