import React from 'react';
import DoughnutChart from '../Graphics/DoughnutChart';
import { Cell } from 'recharts';
import { fetchTermFromMap } from './shared';

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
        let activeIndex = -1;
        let colorCells = [], dataProvider = [];

        popularTerms.forEach((term, index) => {
            const edge = fetchTermFromMap(allSiteTopics, term.name, language, defaultLanguage);

            if (edge.name.toLowerCase() === maintopic.toLowerCase()) {
                activeIndex = index;
            }

            const value = term.mentions;
            const color = COLORS[index];
            const name = edge.translatedname;
            const defaultName = edge.name;

            colorCells.push(<Cell key={0} fill={color} />);

            dataProvider.push(Object.assign({}, { value, name, defaultName }));
        });

        this.setState({ colorCells, dataProvider, activeIndex });
    }

    hasChanged(nextProps, propertyName) {
        if (Array.isArray(nextProps[propertyName])) {
            return nextProps[propertyName].join(",") !== this.props[propertyName].join(",");
        }

        if (this.props[propertyName] && nextProps[propertyName] && nextProps[propertyName] !== this.props[propertyName]) {
            return true;
        }

        return false;
    }

    componentDidMount() {
        this.refreshChart();
    }

    componentWillReceiveProps(nextProps) {
        //if (this.props.datetimeSelection !== nextProps.datetimeSelection || this.props.dataSource !== nextProps.dataSource
        //    || this.props.language !== nextProps.language || this.props.mainEdge !== nextProps.mainEdge) {
        this.refreshChart();
        //}
    }

    render() {
        return (
            <DoughnutChart handleClick={data=>this.handleClick(data)}
                fill={BG_FILL}
                language={this.props.language}
                data={this.state.dataProvider}
                activeIndex={this.state.activeIndex}>
                {this.state.colorCells}
            </DoughnutChart>
        );
    }
}