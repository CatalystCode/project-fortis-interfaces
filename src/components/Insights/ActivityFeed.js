import Fluxxor from 'fluxxor';
import React from 'react';
import {SERVICES} from '../../services/services';
import { getHumanDateFromNow } from '../../utils/Utils.js';
import {Actions} from '../../actions/Actions';
import '../../styles/Insights/ActivityFeed.css';
import Infinite from 'react-infinite';
import {Tabs, Tab} from 'material-ui/Tabs';
import CircularProgress from 'material-ui/CircularProgress';
import Highlighter from 'react-highlight-words';
import DialogBox from '../dialogs/DialogBox';

const FluxMixin = Fluxxor.FluxMixin(React),
      StoreWatchMixin = Fluxxor.StoreWatchMixin("DataStore");

const OFFSET_INCREMENT = 28;
const DEFAULT_LANGUAGE = "en";
const ELEMENT_ITEM_HEIGHT = 80;
const NEWS_FEED_SEARCH_CONTAINER_HEIGHT = 115;
const INFINITE_LOAD_DELAY_MS = 1000;
const SERVICE_DATETIME_FORMAT = "MM/DD/YYYY HH:mm:s A";
const styles ={
    sourceLogo: {
        color: "#337ab7"
    },
    listItemHeader: {
        font: '.777777778em Arial,Helvetica,sans-serif',
        marginBottom: '3px',
        fontWeight: 700,
        marginTop: '2px',
        textAlign: 'left',
        color: '#9e9ea6',
        fontSize: '12px'
    },
    newsItemTitle: {
        color: '#f44d3c',
        fontSize: '14px',
        paddingRight: '4px',
        fontWeight: 600
    },
    newsItemAnchor: {
        fontSize: '14px',
        paddingRight: '4px',
        fontWeight: 600
    },
    highlightStyles: {
        positive: {
            borderColor: "#337ab7",
            border: '1px solid',
            color: "#337ab7"
        },
        neutral: {
            borderColor: "#caaa00",
            border: '1px solid',
            color: "#caaa00"
        },
        negative: {
            borderColor: "#f48342",
            border: '1px solid',
            color: "#f48342"
        },
        veryNegative: {
            borderColor: "#d9534f",
            border: '1px solid',
            color: "#d9534f"
        }
    },
    tabStyle:{
        backgroundColor: "#3f3f4f",
        height: '60px'
    },
    tagStyle: {
        marginLeft: "4px",
        marginTop: "6px",
        fontSize: "11px"
    },
    iconStyle: {
        color: "#337ab7"
    },
    labelColumn: {
        paddingLeft: '2px'
    },
    labelRow: {
        marginRight: '0px',
        marginLeft: '17px',
        marginBottom: '4px'
    },
    trustedColor: {
        color: "#2ebd59"
    },
    loadingIcon:{
        textAlign: "center",
        fontSize: '16px',
        fontWeight: 700
    },
    contentRow: {
        marginRight: '2px',
        marginLeft: '3px',
        marginTop: '4px',
        paddingRight: '2px',
        paddingLeft: '2px',
        marginBottom: '4px'
    },
    highlight: {
        backgroundColor: '#ffd54f',
        fontWeight: '600'
    },
    translateButton: {
        height: "15px",
        marginLeft: "3px",
        fontSize: '10px',
        lineHeight: '1'
    }
};

const FortisEvent = React.createClass({
    getDefaultProps() {
            return {
                height: ELEMENT_ITEM_HEIGHT
            }
    },
    getSentimentStyle(sentimentScore){
            if(sentimentScore >= 0 && sentimentScore < 30){
                return styles.highlightStyles.positive;
            }else if(sentimentScore >= 30 && sentimentScore < 55){
                return styles.highlightStyles.neutral;
            }else if(sentimentScore >= 55 && sentimentScore < 80){
                return styles.highlightStyles.negative;
            }else{
                return styles.highlightStyles.veryNegative;
            }
    },
    getSentimentLabelStyle(sentimentScore){
            if(sentimentScore >= 0 && sentimentScore < 30){
                return "label label-primary label-news-feed";
            }else if(sentimentScore >= 30 && sentimentScore < 55){
                return "label label-neutral label-news-feed";
            }else if(sentimentScore >= 55 && sentimentScore < 80){
                return "label label-warning label-news-feed";
            }else{
                return "label label-danger label-news-feed";
            }
    },
    translateNewsItem(event, sentence, sourcelanguage, targetLanguage, eventId){   
        let self = this;
        event.stopPropagation();

        SERVICES.translateSentence(sentence, sourcelanguage, targetLanguage, (translatedSentence, error) => {
            if(translatedSentence && !error){
                self.props.updateFeedWithText(eventId, translatedSentence);
            } else {
                console.error(`[${error}] occured while translating sentense`);
            }
        });
    },
    render() {
        let dataSourceSchema = Actions.DataSourceLookup(this.props.source);
        let content = this.props;
        let newsItemTitle = this.props.originalSource.replace(/http:\/\/www./g, '').replace(/.com\//g, '').replace(/http:\/\//g, '');

        return <div className="infinite-list-item" onClick={() => {
                            this.props.handleOpenDialog(content)
                        }
                    }>
                    <div className="row">
                        <div className="col-lg-2" style={styles.labelColumn}>
                            <div className="row" style={styles.labelRow}>
                                <i style={styles.sourceLogo} className={`${dataSourceSchema.icon} fa-4x`}></i>
                            </div>
                            <div className="row" style={styles.labelRow}>
                                {
                                    this.props.pageLanguage!==this.props.language ? <button className="btn btn-primary btn-sm" 
                                                                                            style={styles.translateButton}
                                                                                            onClick={ev=>{this.translateNewsItem(ev, this.props.sentence, this.props.language, this.props.pageLanguage, this.props.id)} } >
                                                                                        Translate
                                                                                    </button> : ''
                                }
                            </div>
                            <div className="row" style={styles.labelRow}>
                                {
                                    this.props.trusted ? <i style={styles.trustedColor} className="fa fa-check" aria-hidden="true">
                                                                <span style={styles.trustedColor}>Trusted</span>
                                                            </i> : ''
                                }

                            </div>
                </div>
                        <div className="col-lg-10">
                            <div className="row" style={styles.contentRow}>
                                <h6 style={styles.listItemHeader}>
                                 {
                                       this.props.link && this.props.link !== "" ? <a style={styles.newsItemAnchor} href={this.props.link} onClick={ev=>ev.stopPropagation()} target="_blank">{newsItemTitle}</a>
                                     :
                                       <span style={styles.newsItemTitle}>{newsItemTitle}</span>   
                                 }
                                    <i className="fa fa-clock-o fa-1"></i>&nbsp;
                                    {getHumanDateFromNow(this.props.postedTime, SERVICE_DATETIME_FORMAT)}
                                </h6>
                            </div>
                            <div className="row" style={styles.contentRow}>
                                <Highlighter
                                    searchWords={this.props.featureEdges}
                                    highlightStyle={styles.highlight}
                                    textToHighlight={this.props.sentence} />
                            </div>
                            <div className="row" style={styles.contentRow}>
                                {this.props.edges.map(item=><span key={item} style={Object.assign({}, styles.tagStyle, this.getSentimentStyle(this.props.sentiment * 100))} className="edgeTag">{item}</span>)}
                            </div>
                        </div>
                    </div>
            </div>;
    }
});

export const ActivityFeed = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin],

  getStateFromFlux() {
    return this.getFlux().store("DataStore").getState();
  },

  getInitialState() {
    this.lastRenderedElementLength = 0;

    return {
        elements: [],
        filteredSource: "all",
        processedEventids: new Set(),
        isInfiniteLoading: false
    }
  },

  handleInfiniteLoad() {
        let self = this;
        this.setState({
                isInfiniteLoading: false
        });
        
        setTimeout(() => {
                const params = {
                    ...self.props, 
                    elementStartList: self.state.elements,
                    filteredSource: this.state.filteredSource
                };
                self.processNewsFeed(params);
        }, INFINITE_LOAD_DELAY_MS);
  },

  fetchSentences(requestPayload, callback){
      let {mainEdge, timespanType, searchValue, limit, edges, 
           categoryType, filteredSource, bbox, datetimeSelection, originalSource} = requestPayload;
      let location = [];

      if(categoryType === "Location"){
          mainEdge = undefined;
          location = this.state.selectedLocationCoordinates;
      }

      SERVICES.FetchMessageSentences(originalSource, bbox, datetimeSelection, timespanType, 
                                     limit, requestPayload.pageState, [mainEdge].concat(edges), Actions.DataSources(filteredSource), 
                                     searchValue, location, callback);
  },

  renderDataSourceTabs(iconStyle){
    let tabs  = [];
    if(this.props.dataSource === "all"){
        for (let [source, value] of Actions.constants.DATA_SOURCES.entries()) {
                tabs.push(<Tab key={source} 
                               label={value.label} 
                               value={source} 
                               icon={<i style={iconStyle} className={`${value.icon}`}></i>}>
                          </Tab>)
        }
    }else{
        let tabSchema = Actions.constants.DATA_SOURCES.get(this.state.filteredSource);
        tabs.push(<Tab key={tabSchema.label}
                       label={tabSchema.label} 
                       value={this.state.filteredSource}
                       icon={<i style={iconStyle} className={`${tabSchema.icon}`}></i>}>
                  </Tab>)
    }

    return tabs;
  },

  hasChanged(nextProps, currentProps, propertyName){
      if(Array.isArray(nextProps[propertyName])){
          return nextProps[propertyName].join(",") !== currentProps[propertyName].join(",");
      }

      if(currentProps[propertyName] && nextProps[propertyName] && nextProps[propertyName] !== currentProps[propertyName]){
          return true;
      }

      return false;
  },

  componentWillReceiveProps(nextProps){
      if((this.hasChanged(nextProps, this.props, "bbox") && this.props.bbox.length > 0) || this.hasChanged(nextProps, this.props, "datetimeSelection")
       ||  this.props.originalSource !== nextProps.originalSource
       ||  this.hasChanged(nextProps, "timespanType") || this.hasChanged(nextProps, this.props, "edges") ||  this.hasChanged(nextProps, this.props, "language")
       ||  this.hasChanged(nextProps, this.props, "mainEdge") || this.hasChanged(nextProps, this.props, "dataSource")){
          const params = {
              ...nextProps, 
              processedEventids: new Set(),
              elementStartList: [], 
              filteredSource: nextProps.dataSource
            };
          this.setState({filteredSource: params.filteredSource, elements: [], pageState: undefined});
          this.lastRenderedElementLength = 0;
          
          this.processNewsFeed(params);
      }
  },

  translateEvent(eventId, translatedSentence){
    const targetElement = this.state.elements.findIndex(feature=>feature.messageid===eventId);
    let elements = this.state.elements;
    this.lastRenderedElementLength = 0;

    if(targetElement > -1){
        elements[targetElement].summary = translatedSentence;
    }else{
        console.error(`Unexpected error occured where the translation request for event ${eventId} failed.`);
    }
    
    this.setState({ elements });
 },

  buildElements(requestPayload) {
        let elements = [];
        let self = this;

        this.fetchSentences(requestPayload,
            (error, response, body) => {
                let pageState, processedEventIds = this.state.processedEventids;

                if(!error && response.statusCode === 200 && body.data) {    
                    const graphQLResponse = body.data[Object.keys(body.data)[0]];

                    if(graphQLResponse && graphQLResponse.features && Array.isArray(graphQLResponse.features)){
                        elements = requestPayload.elementStartList.concat(graphQLResponse.features.filter(feature=>feature.properties.summary.length && !processedEventIds.has(feature.properties.messageid))
                                                                                                  .map(feature => {
                                const { messageid, title, externalsourceid, link, summary, pipelinekey, eventtime, sentiment, edges, language } = feature.properties;
                                const { searchValue } = requestPayload;
                                const { coordinates } = feature;
                                pageState = graphQLResponse.pageState;
                                processedEventIds.add(messageid);
                                let trusted = false;//todo: this needs to be properly implemented as this only works for twitter. 

                                return Object.assign({}, { coordinates, messageid, externalsourceid, summary, trusted, searchValue, pipelinekey, eventtime, link, sentiment, edges, language, title }, { eventEdges: requestPayload.edges });
                            }));                        
                    }
                }else{
                    console.error(`[${error}] occured while processing message request`);
                }

                //if there are no elements returned set the lastRenderedElementLength to -1 to foorce render an empty list.
                if(elements.length === 0){
                    this.lastRenderedElementLength = -1;
                }else{
                    this.lastRenderedElementLength = 0;
                }

                var trustedArray = []
                var nonTrustedArray = [];
                elements.forEach(function(element) {
                    if(element.trusted) trustedArray.push(element);
                    else nonTrustedArray.push(element);
                }, this);
                elements = trustedArray.concat(nonTrustedArray);

                self.setState({
                     isInfiniteLoading: false,
                     processedEventIds: processedEventIds,
                     pageState: pageState,
                     filteredSource: requestPayload.filteredSource,
                     elements: elements
                });
        });
  },

  processNewsFeed(filteredSources){
      const params = {...filteredSources, limit: OFFSET_INCREMENT};
      const { pageState, elements } = this.state;

      //if the rendered items are less than the increment count then avoid unnecessary service calls.
      if(pageState || this.lastRenderedElementLength === 0){
        this.setState({
            isInfiniteLoading: true
        });

        if(params.bbox && params.edges && params.datetimeSelection && params.timespanType){
            this.buildElements(params);
        }
      }else{
          this.lastRenderedElementLength = 0;
          this.setState({
            isInfiniteLoading: false
          });
      }
  },

  elementInfiniteLoad() {
        return <div className="infinite-list-item">
                  <div className="row">
                        <div className="col-lg-12" style={styles.loadingIcon}>
                             Loading... <CircularProgress />
                        </div>
                  </div>
                </div>;
  },

  sourceOnClickHandler(filteredSource){
      const params = {...this.props, elementStartList: [], filteredSource: filteredSource};
      
      this.lastRenderedElementLength = 0;
      this.processNewsFeed(params);
  },

  searchSubmit(){
      const params = {...this.props, limit: OFFSET_INCREMENT, searchValue: this.refs.filterTextInput.value, filteredSource: this.state.filteredSource,
                      elementStartList: []};
      event.preventDefault();
      this.processNewsFeed(params);
  },
  innerJoin(arr1, arr2){
        let out = new Set();

        arr1.forEach(item=>{
            if(arr2.indexOf(item) > -1){
                out.add(item);
            }
        });

        return Array.from(out);
  },
  translatedTerms(baseLanguage, targetLanguage, englishTerms){
      const languageEdgeMap = this.state.allEdges.get(baseLanguage);
      let translatedSelectedEdges = [];
    
      englishTerms.forEach(term => {
          const mapKey = term.toLowerCase();
          const translation = languageEdgeMap.get(mapKey)
          if(translation){
              translatedSelectedEdges.push(translation[`name_${targetLanguage}`]);
          }
      });

      return translatedSelectedEdges;
  },

  shouldComponentUpdate(nextProps, nextState){
      let lastRenderedElementLength = this.lastRenderedElementLength;
      let newInfiniteScrollHeight = nextProps.infiniteScrollHeight || 0;

      if(lastRenderedElementLength < nextState.elements.length || (nextState.elements.length > 0 && newInfiniteScrollHeight > 0 && this.props.infiniteScrollHeight !== newInfiniteScrollHeight)){
          this.lastRenderedElementLength = nextState.elements.length;
          return true;
      }else{
          return false;
      }
  },

  render() {
    const state = this.getStateFromFlux();
    const translatedDashboardEdges = this.translatedTerms(DEFAULT_LANGUAGE, this.state.language, this.props.edges);
    const mainTerm = state.mainEdge;
    const otherTags = this.refs && this.refs.filterTextInput && this.refs.filterTextInput.value !== "" ? [this.refs.filterTextInput.value, mainTerm] : [mainTerm];
    
    return (
     <div className="col-lg-12 news-feed-column">
            <Tabs tabItemContainerStyle={styles.tabStyle} 
                  value={this.state.filteredSource}
                  id="newsFeedContainer"
                  onChange={this.sourceOnClickHandler}>
                { this.renderDataSourceTabs(styles.iconStyle) }
            </Tabs>
            <Infinite elementHeight={ELEMENT_ITEM_HEIGHT}
                      containerHeight={this.props.infiniteScrollHeight -  NEWS_FEED_SEARCH_CONTAINER_HEIGHT}
                      infiniteLoadBeginEdgeOffset={300}
                      className="infite-scroll-container"
                      onInfiniteLoad={this.handleInfiniteLoad}
                      loadingSpinnerDelegate={this.elementInfiniteLoad()}
                      isInfiniteLoading={this.state.isInfiniteLoading} >
                    {
                     this.state.elements ? this.state.elements.map(feature => 
                        <FortisEvent key={feature.messageid}
                                     id={feature.messageid}
                                     sentence={feature.summary}
                                     source={feature.pipelinekey}
                                     originalSource={feature.externalsourceid ? feature.feature.originalSources : ""}
                                     postedTime={feature.eventtime}
                                     sentiment={feature.sentiment}
                                     coordinates={feature.coordinates}
                                     trusted={feature.trusted}
                                     link={feature.link}
                                     featureEdges={this.translatedTerms(DEFAULT_LANGUAGE, feature.language, feature.edges)}
                                     edges={this.innerJoin(translatedDashboardEdges, this.translatedTerms(DEFAULT_LANGUAGE, this.state.language, feature.edges)).concat(otherTags)}
                                     language={feature.language}  
                                     pageLanguage={this.props.language}
                                     updateFeedWithText={this.translateEvent}
                                     handleOpenDialog={this.handleOpenDialog} />
                    ) : undefined 
                 }
            </Infinite>
            <div className="panel-footer clearfix">
                  <div className="input-group">
                       <input ref="filterTextInput" type="text" placeholder="Filter News Feed .." className="form-control input-sm" />
                       <span className="input-group-btn">
                             <button onClick={this.searchSubmit} className="btn btn-default btn-sm"><i className="fa fa-search"></i>
                             </button>
                       </span>
                  </div>
            </div>
            <DialogBox ref="dialogBox" {...this.props}></DialogBox>
      </div>
     );
  },

  handleOpenDialog(item) {
      this.refs.dialogBox.open(item);
  }
});