import React from 'react';
import DoughnutChart from '../Graphics/DoughnutChart';
import { Cell } from 'recharts';
import { fetchTermFromMap } from './shared';
<<<<<<< HEAD
import Sentiment from '../Graphics/Sentiment';
import constants from '../../actions/constants';

export default class PopularTermsChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeIndex: 0,
            dataProvider: [],
            colorCells: []
        };
    }

    handleClick(data) {
        const { dataSource, bbox, timespanType, termFilters, datetimeSelection, zoomLevel, externalsourceid, fromDate, toDate } = this.props;

        this.props.flux.actions.DASHBOARD.reloadVisualizationState(fromDate, toDate, datetimeSelection, timespanType, dataSource, data.defaultName, bbox, zoomLevel, Array.from(termFilters), externalsourceid);
    }

    refreshChart(props) {
        const { allSiteTopics, popularTerms, defaultLanguage, maintopic, language } = props;
=======

const BG_FILL = "#30303d";
const COLORS = ['#EE2E2F', '#008C48', '#185AA9', '#F47D23', '#662C91', '#A21D21'];

export default class PopularTermsChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeIndex: 0,
            dataProvider: [],
            colorCells: []
        };
    }

    handleClick(data) {
        const { dataSource, bbox, timespanType, termFilters, datetimeSelection, zoomLevel, maintopic, externalsourceid, fromDate, toDate } = this.props;

        this.props.flux.actions.DASHBOARD.reloadVisualizationState(fromDate, toDate, datetimeSelection, timespanType, dataSource, data.defaultName, bbox, zoomLevel, Array.from(termFilters), externalsourceid);
    }

    refreshChart() {
        const { allSiteTopics, popularTerms, defaultLanguage, maintopic, language } = this.props;
>>>>>>> V2 dashboard rewrite to accomodate cassandra GQL services
        let activeIndex = -1;
        let colorCells = [], dataProvider = [];

        popularTerms.forEach((term, index) => {
            const edge = fetchTermFromMap(allSiteTopics, term.name, language, defaultLanguage);

            if (edge.name.toLowerCase() === maintopic.toLowerCase()) {
                activeIndex = index;
            }

            const value = term.mentions;
<<<<<<< HEAD
            const icon = <Sentiment showGraph={false} value={term.avgsentiment} />;
            const color = constants.CHART_STYLE.COLORS[index];
=======
            const color = COLORS[index];
>>>>>>> V2 dashboard rewrite to accomodate cassandra GQL services
            const name = edge.translatedname;
            const defaultName = edge.name;

            colorCells.push(<Cell key={0} fill={color} />);

<<<<<<< HEAD
            dataProvider.push(Object.assign({}, { value, name, icon, defaultName }));
=======
            dataProvider.push(Object.assign({}, { value, name, defaultName }));
>>>>>>> V2 dashboard rewrite to accomodate cassandra GQL services
        });

        this.setState({ colorCells, dataProvider, activeIndex });
    }
<<<<<<< HEAD

    hasChanged(nextProps, propertyName) {
        if (Array.isArray(nextProps[propertyName])) {
            return nextProps[propertyName].join(",") !== this.props[propertyName].join(",");
        }

        if (this.props[propertyName] && nextProps[propertyName] && nextProps[propertyName] !== this.props[propertyName]) {
            return true;
        }

=======

    hasChanged(nextProps, propertyName) {
        if (Array.isArray(nextProps[propertyName])) {
            return nextProps[propertyName].join(",") !== this.props[propertyName].join(",");
        }

        if (this.props[propertyName] && nextProps[propertyName] && nextProps[propertyName] !== this.props[propertyName]) {
            return true;
        }

>>>>>>> V2 dashboard rewrite to accomodate cassandra GQL services
        return false;
    }

    componentDidMount() {
<<<<<<< HEAD
        this.refreshChart(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.refreshChart(nextProps);
=======
        this.refreshChart();
    }

    componentWillReceiveProps(nextProps) {
        //if (this.props.datetimeSelection !== nextProps.datetimeSelection || this.props.dataSource !== nextProps.dataSource
        //    || this.props.language !== nextProps.language || this.props.mainEdge !== nextProps.mainEdge) {
        this.refreshChart();
        //}
>>>>>>> V2 dashboard rewrite to accomodate cassandra GQL services
    }

    render() {
        return (
            <DoughnutChart handleClick={data=>this.handleClick(data)}
<<<<<<< HEAD
                fill={constants.CHART_STYLE.BG_FILL}
=======
                fill={BG_FILL}
>>>>>>> V2 dashboard rewrite to accomodate cassandra GQL services
                language={this.props.language}
                data={this.state.dataProvider}
                activeIndex={this.state.activeIndex}>
                {this.state.colorCells}
            </DoughnutChart>
        );
    }
}