import React from 'react';
import constants from '../../actions/constants';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import moment from 'moment';
import DataSourceFilter from './DataSourceFilter';
import injectTapEventPlugin from 'react-tap-event-plugin';
<<<<<<< HEAD
import { momentGetFromToRange, momentToggleFormats } from '../../utils/Utils.js';
=======
import { momentGetFromToRange } from '../../utils/Utils.js';
>>>>>>> V2 dashboard rewrite to accomodate cassandra GQL services
import '../../styles/Insights/DataSelector.css';
import 'react-widgets/dist/css/react-widgets.css';
import '../../styles/Header.css';

const TimeSelectionOptions = [
    { label: '', timeType: 'customDatePlaceholder' },
    { label: 'Today', timeType: 'day', subtractFromNow: 0 },
    { label: 'Yesterday', timeType: 'day', subtractFromNow: 1 },
    { label: 'This Week', timeType: 'week', subtractFromNow: 0 },
    { label: 'Last Week', timeType: 'week', subtractFromNow: 1 },
    { label: 'This Month', timeType: 'month', subtractFromNow: 0 },
    { label: 'Last Month', timeType: 'month', subtractFromNow: 1 },
<<<<<<< HEAD
    { label: 'This Year', timeType: 'year', subtractFromNow: 0 },
    { label: 'Last Year', timeType: 'year', subtractFromNow: 1 },
=======
>>>>>>> V2 dashboard rewrite to accomodate cassandra GQL services
    { label: 'Select Date', timeType: 'customDate', subtractFromNow: 0 },
    { label: 'Select Month', timeType: 'customMonth', subtractFromNow: 0 }
];

momentLocalizer(moment);
injectTapEventPlugin();

export default class DataSelector extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            timeType: '',
            selectedIndex: 0
        };
    }

    calendarOnChange(value, format) {
        this.setState({ timeType: '' });
    }

    cancelDateTimePicker() {
        this.setState({ timeType: '' });
    }

    refreshDashboard(timeSelection, timeType){
        const formatter = constants.TIMESPAN_TYPES[timeType];
        const dates = momentGetFromToRange(timeSelection, formatter.format, formatter.rangeFormat);
        const { fromDate, toDate } = dates;
        const { dataSource, maintopic, bbox, zoomLevel, termFilters, externalsourceid } = this.props;
<<<<<<< HEAD
        const dateType = this.customDateEntered(timeType) ? formatter.rangeFormat : timeType;

        this.props.flux.actions.DASHBOARD.reloadVisualizationState(fromDate, toDate, timeSelection, dateType, dataSource, maintopic, bbox, zoomLevel, Array.from(termFilters), externalsourceid);
    }

    handleChange(event, index, value) {
        var selectionOption = TimeSelectionOptions[index];
        
        if(selectionOption.timeType.startsWith("custom")){
            this.setState({timeType: value});
        }else{
=======

        this.props.flux.actions.DASHBOARD.reloadVisualizationState(fromDate, toDate, timeSelection, timeType, dataSource, maintopic, bbox, zoomLevel, Array.from(termFilters), externalsourceid);
    }

    handleChange(event, index, value) {
        const timeSelectionIndex = this.customDateEntered() ? index : index + 1;
        const selectionOption = TimeSelectionOptions[timeSelectionIndex];

        if (selectionOption.timeType.startsWith("custom")) {
            this.setState({ timeType: value });
        } else {
>>>>>>> V2 dashboard rewrite to accomodate cassandra GQL services
            this.refreshDashboard(value, selectionOption.timeType);
        }
    }

    handleDatePickerChange(dateObject, dateStr) {
<<<<<<< HEAD
        let formatter = constants.TIMESPAN_TYPES[this.state.timeType];
        this.refreshDashboard(momentToggleFormats(dateStr, formatter.reactWidgetFormat, formatter.format), this.state.timeType);
        this.setState({ timeType: 'customDatePlaceholder' });
    }

    customDateEntered(dateType) {
        return dateType && dateType.startsWith("custom");
    }

    predefinedDateOptions(self) {
            return TimeSelectionOptions.map((timeOption, index) => {
                let timeValue;
                let label = timeOption.label;

                //if there is no custom date entered then skip adding the customDatePlaceholder option
                if (timeOption.timeType === 'customDatePlaceholder') {
                    timeValue = self.props.datetimeSelection;
                    label = timeValue;
                    //format the pre defined date option
                } else if (!timeOption.timeType.startsWith("custom")) {
                    timeValue = moment().subtract(timeOption.subtractFromNow, timeOption.timeType)
                    .format(constants.TIMESPAN_TYPES[timeOption.timeType].format);
                    //Either the custom date or custom date+time options
                } else {
                    label = <div><i className="fa fa-calendar"></i>&nbsp;{label}</div>;
                    timeValue = timeOption.timeType;
                }

                return <MenuItem key={`${timeValue}-${index}`} value={timeValue} primaryText={label} />
            });
=======
        this.refreshDashboard(dateStr, this.state.timeType);
        this.setState({ timeType: '' });
    }

    customDateEntered() {
        return this.props.timespanType && (this.props.timespanType.startsWith('custom'));
    }

    predefinedDateOptions() {
        return TimeSelectionOptions.filter(option=>option.label).map((timeOption, index) => {
            let timeValue;
            let label = timeOption.label;

            if (timeOption.timeType === 'customDatePlaceholder') {
                timeValue = this.state.datetimeSelection;
                label = timeValue;
                //format the pre defined date option
            } else if (!timeOption.timeType.startsWith("custom")) {
                timeValue = moment().subtract(timeOption.subtractFromNow, timeOption.timeType)
                .format(constants.TIMESPAN_TYPES[timeOption.timeType].format);
                //Either the custom date or custom date+time options
            } else {
                label = <div><i className="fa fa-calendar"></i>&nbsp;{label}</div>;
                timeValue = timeOption.timeType;
            }

            return <MenuItem key={`${timeValue}-${index}`} value={timeValue} primaryText={label} />
        });
>>>>>>> V2 dashboard rewrite to accomodate cassandra GQL services
    }

    render() {
        let self = this;
        let showDatePicker = this.state.timeType && this.state.timeType === 'customDate' ? true : false;
        let showTimePicker = this.state.timeType && this.state.timeType === 'customDateTime' ? true : false;
        let showMonthSelector = this.state.timeType && this.state.timeType === 'customMonth' ? true : false;
        let monthSelectorProps = showMonthSelector ? { initialView: "year", finalView: "year" } : {};

        return (
            <div className="row dateRow">
                <div className="col-sm-12 dateFilterColumn">
                    <div className="input-group dateFilter">
                        {!showDatePicker && !showTimePicker && !showMonthSelector ?
                            <SelectField key="dateSelection" underlineStyle={{ borderColor: '#337ab7', borderBottom: 'solid 3px' }}
                                labelStyle={{ fontWeight: 600, color: '#2ebd59' }}
                                value={this.props.datetimeSelection}
                                onChange={(event, index, value)=>this.handleChange(event, index, value)}>
<<<<<<< HEAD
                                {self.predefinedDateOptions(self)}
=======
                                {self.predefinedDateOptions()}
>>>>>>> V2 dashboard rewrite to accomodate cassandra GQL services
                            </SelectField>
                            :
                            <DateTimePicker value={new Date()}
                                onChange={(dateObject, dateStr)=>this.handleDatePickerChange(dateObject, dateStr)}
                                format={constants.TIMESPAN_TYPES[this.state.timeType].reactWidgetFormat}
                                time={showTimePicker} {...monthSelectorProps} />
                        }
                    </div>
                    <div>
                        {showTimePicker || showDatePicker || showMonthSelector ?
<<<<<<< HEAD
                            <button id="cancel-button" type="button" className="btn btn-danger btn-sm" onClick={()=>this.cancelDateTimePicker()}>
=======
                            <button id="cancel-button" type="button" className="btn btn-danger btn-sm" onClick={this.cancelDateTimePicker}>
>>>>>>> V2 dashboard rewrite to accomodate cassandra GQL services
                                <span className="fa fa-times-circle-o" aria-hidden="true"></span>&nbsp;Cancel
                </button>
                            : undefined
                        }
                    </div>
                    <div>
                        <button id="save-button" type="button" className="btn btn-primary btn-sm" onClick={this.props.toggleHeatmapSize}>
                            <span className="fa fa-expand" aria-hidden="true">
                            </span>
                            <span>{this.props.heatmapToggleText}</span>
                        </button>
                    </div>
                    <div>
                        <DataSourceFilter {...this.props} />
                    </div>
                </div>
            </div>
        );
    }
}