import React from 'react';
import { Area } from 'recharts';
import moment from 'moment';
import GraphCard from '../Graphics/GraphCard';
import constants from '../../actions/constants';
import { FromToDateFormat } from '../../utils/Utils';
import { fetchTermFromMap } from './shared';
import Timeline from '../Graphics/Timeline';
import FlatButton from 'material-ui/FlatButton';
import ActionTimeline from 'material-ui/svg-icons/action/timeline';
import { fullWhite } from 'material-ui/styles/colors';

<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> V2 refactored interface
=======
>>>>>>> Fortis V2 interface changes
export default class TimeSeriesGraph extends React.Component {
    constructor(props) {
        super(props);
        this.range = {};
        this.state = {
<<<<<<< HEAD
<<<<<<< HEAD
            lines: []
=======
            lines: [],
            startIndex: 0,
            endIndex: 0
>>>>>>> V2 refactored interface
=======
            lines: []
>>>>>>> Fortis V2 interface changes
        };
    }

    refreshChart(props, initialLoad) {
        const { timeSeriesGraphData, defaultLanguage, language, allSiteTopics } = props;
<<<<<<< HEAD

        const lines = timeSeriesGraphData.labels.map((label, index) => {
            const topic = fetchTermFromMap(allSiteTopics, label.name, language, defaultLanguage);
            const localTopicName = topic.translatedname;
            const color = constants.CHART_STYLE.COLORS[index];

            return <Area key={index}
                name={localTopicName}
                type="monotone"
                connectNulls={true}
                dataKey={topic.name}
                stroke={color}
                fill={color}
                strokeWidth={3}
                dot={false}
                ticksCount={5} />
        });

        const startIndex = 0, endIndex = timeSeriesGraphData.graphData.length - 1;
        this.range = { startIndex, endIndex };

        this.setState({ lines });
    }

    dateFormat(time) {
        let validDatetimeTypes = ["day"];
        let format = validDatetimeTypes.indexOf(this.props.timespanType || "") > -1 ? "h:mm a" : this.props.timespanType === "week" ? "ddd h a" : "MMM-DD";
        return moment(time).format(format);
    }

    componentDidMount() {
        this.refreshChart(this.props);
    }

    dateRangeChanged(range, obj) {
        const { startIndex, endIndex } = range;
        this.range = { startIndex, endIndex };
    }

=======

        const lines = timeSeriesGraphData.labels.map((label, index) => {
            const topic = fetchTermFromMap(allSiteTopics, label.name, language, defaultLanguage);
            const localTopicName = topic.translatedname;
            const color = constants.CHART_STYLE.COLORS[index];

            return <Area key={index}
                name={localTopicName}
                type="monotone"
                connectNulls={true}
                dataKey={topic.name}
                stroke={color}
                fill={color}
                strokeWidth={3}
                dot={false}
                ticksCount={5} />
        });

        const startIndex = 0, endIndex = timeSeriesGraphData.graphData.length - 1;
        this.range = { startIndex, endIndex };

        this.setState({ lines });

        if(initialLoad){
            this.forceUpdate();
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
        
        console.log(`Rendering time series for ${nextProps.fromDate} - ${nextProps.toDate} ${nextProps.maintopic} ${nextProps.bbox}`);
        return true;
    }

    dateFormat(time) {
        let validDatetimeTypes = ["day"];
        let format = validDatetimeTypes.indexOf(this.props.timespanType || "") > -1 ? "h:mm a" : this.props.timespanType === "week" ? "ddd h a" : "MMM-DD";
        return moment(time).format(format);
    }

    componentDidMount() {
        const initialLoad = true;
        this.refreshChart(this.props, initialLoad);
    }

    dateRangeChanged(range, obj) {
        const { startIndex, endIndex } = range;
        this.range = { startIndex, endIndex };
    }

>>>>>>> V2 refactored interface
    componentWillReceiveProps(nextProps) {
        this.refreshChart(nextProps);
    }

    momentFormat(dateString, format){
        return moment(dateString).format(format);
    }

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> Fortis V2 interface changes
    resetTimeline(){
        this.props.refreshDashboardFunction();
    }

<<<<<<< HEAD
    handleDataFetch() {
        const { dataSource, timespanType, bbox, termFilters, timeSeriesGraphData, zoomLevel, externalsourceid, maintopic } = this.props;
=======
    handleDataFetch() {
        const { dataSource, bbox, timespanType, termFilters, timeSeriesGraphData, zoomLevel, externalsourceid, maintopic } = this.props;
>>>>>>> V2 refactored interface
=======
    handleDataFetch() {
        const { dataSource, timespanType, bbox, termFilters, timeSeriesGraphData, zoomLevel, externalsourceid, maintopic } = this.props;
>>>>>>> Fortis V2 interface changes
        const { startIndex, endIndex } = this.range;
        const fromDateSlice = timeSeriesGraphData.graphData[startIndex];
        const toDateSlice = timeSeriesGraphData.graphData[endIndex];

        if(fromDateSlice && toDateSlice){
            const datetimeSelectionFormat = "YY-MM-DD HH:mm";
            const fromDate = this.momentFormat(fromDateSlice.date, FromToDateFormat);
            const toDate =  this.momentFormat(toDateSlice.date, FromToDateFormat);
            const datetimeSelection = `${this.momentFormat(fromDateSlice.date, datetimeSelectionFormat)} - ${this.momentFormat(toDateSlice.date, datetimeSelectionFormat)}`
<<<<<<< HEAD
<<<<<<< HEAD
            const timeseriesType = constants.TIMESPAN_TYPES[timespanType].timeseriesType
            this.props.flux.actions.DASHBOARD.reloadVisualizationState(fromDate, toDate, datetimeSelection, timeseriesType, dataSource, maintopic, bbox, zoomLevel, Array.from(termFilters), externalsourceid);
        }
    }
=======
            this.props.flux.actions.DASHBOARD.reloadVisualizationState(fromDate, toDate, datetimeSelection, timespanType, dataSource, maintopic, bbox, zoomLevel, Array.from(termFilters), externalsourceid);
        }
    }

    resetTimeline(event) {
        const startIndex = 0, endIndex = this.props.timeSeriesGraphData.graphData.length;

        this.setState({ startIndex, endIndex});
    }
>>>>>>> V2 refactored interface

=======
            const timeseriesType = constants.TIMESPAN_TYPES[timespanType].timeseriesType
            this.props.flux.actions.DASHBOARD.reloadVisualizationState(fromDate, toDate, datetimeSelection, timeseriesType, dataSource, maintopic, bbox, zoomLevel, Array.from(termFilters), externalsourceid);
        }
    }

>>>>>>> Fortis V2 interface changes
    render() {
        const ActionButtons = [<FlatButton key="reload-button"
                                           icon={<ActionTimeline color={fullWhite} />}
                                           label="Reload with Range"
                                           primary={true}
                                           onClick={()=>this.handleDataFetch()} />,
                               <FlatButton key="reset-button"
                                           icon={<ActionTimeline color={fullWhite} />}
                                           label="Reset Selection"
                                           primary={true}
                                           onClick={event => this.resetTimeline(event)} />
        ];

        return (
            <GraphCard cardActions={ActionButtons}>
                <Timeline fill={constants.CHART_STYLE.BG_FILL}
                    data={this.props.timeSeriesGraphData.graphData}
                    dataKey="date"
                    dateRangeChanged={(range, ob) => this.dateRangeChanged(range, ob)}
<<<<<<< HEAD
<<<<<<< HEAD
=======
                    brushStartIndex={this.state.startIndex}
                    brushEndIndex={this.state.endIndex}
>>>>>>> V2 refactored interface
=======
>>>>>>> Fortis V2 interface changes
                    tickFormatter={time => this.dateFormat(time)}>
                    {this.state.lines}
                </Timeline>
            </GraphCard>
        );
    }
}