import Subheader from './Subheader';
import React from 'react';
import { Treebeard, decorators } from 'react-treebeard';
import * as filters from './TreeFilter';
<<<<<<< HEAD
import TypeaheadSearch from './TypeaheadSearch';
=======
import { TypeaheadSearch } from './TypeaheadSearch';
>>>>>>> V2 dashboard rewrite to accomodate cassandra GQL services
import '../../styles/Header.css';
import '../../styles/Insights/SentimentTreeView.css';
import { styles, treeDataStyle } from '../../styles/Insights/SentimentTreeview';
import numeralLibs from 'numeral';
import { fetchTermFromMap } from './shared';

const TopRowHeight = 130;
<<<<<<< HEAD
const parentTermsName = "Term Filters";
=======
const parentTermsName = "Term Filters",
    DEFAULT_LANGUAGE = "en";

const styles = {
    subHeader: {
        color: '#fff',
        paddingLeft: '11px',
        fontSize: '18px',
        fontWeight: 700
    },
    component: {
        display: 'block',
        verticalAlign: 'top',
        width: '100%'
    },
    searchBox: {
        padding: '0px 20px 10px 20px'
    },
    subHeaderDescription: {
        color: '#a3a3b3',
        fontSize: '8px',
        fontWeight: 800,
        paddingLeft: '4px'
    },
    titleSpan: {
        paddingRight: '8px'
    }
};

const treeDataStyle = {
    tree: {
        base: {
            listStyle: 'none',
            backgroundColor: 'rgb(63, 63, 79)',
            margin: 0,
            padding: 0,
            color: '#9DA5AB',
            fontFamily: 'lucida grande ,tahoma,verdana,arial,sans-serif',
            fontSize: '12px'
        },
        node: {
            base: {
                position: 'relative'
            },
            link: {
                cursor: 'pointer',
                position: 'relative',
                padding: '0px 5px',
                display: 'block'
            },
            activeLink: {
                background: '#31363F'
            },
            toggle: {
                base: {
                    position: 'relative',
                    display: 'inline-flex',
                    verticalAlign: 'top',
                    marginLeft: '-5px',
                    height: '24px',
                    width: '24px'
                },
                wrapper: {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    margin: '-7px 0 0 -7px',
                    height: '14px'
                },
                height: 14,
                width: 14,
                arrow: {
                    fill: '#9DA5AB',
                    strokeWidth: 0
                }
            },
            header: {
                base: {
                    display: 'inline-flex',
                    verticalAlign: 'top',
                    width: '100%',
                    color: '#9DA5AB'
                },
                baseHighlight: {
                    background: 'rgb(49, 54, 63)',
                    display: 'inline-flex',
                    verticalAlign: 'top',
                    width: '100%',
                    color: '#9DA5AB'
                },
                only: {
                    fontSize: '14px',
                    textDecoration: 'underline',
                    fontWeight: '500'
                },
                badge: {
                    textAlign: 'right',
                    marginRight: '14px'
                },
                parentBadge: {
                    marginRight: '28px',
                    textAlign: 'right',
                },
                connector: {
                    width: '2px',
                    height: '12px',
                    borderLeft: 'solid 2px black',
                    borderBottom: 'solid 2px black',
                    position: 'absolute',
                    top: '0px',
                    left: '-21px'
                },
                title: {
                    lineHeight: '24px',
                    display: 'inline-table',
                    verticalAlign: 'middle'
                }
            },
            subtree: {
                listStyle: 'none',
                paddingLeft: '19px'
            },
            loading: {
                color: '#E2C089'
            }
        }
    }
};
>>>>>>> V2 dashboard rewrite to accomodate cassandra GQL services

decorators.Toggle = (props) => {
    let isNodeTypeCategory = props.node && props.node.children && props.node.children.length > 0;
    let iconComponent = <div />;
    let iconStyle = { color: '#fff' };
    const style = props.style;

    if (isNodeTypeCategory) {
        iconComponent = props.node.toggled ? <i className="fa fa-plus fa-1" style={iconStyle}></i> : <i className="fa fa-minus fa-1" style={iconStyle}></i>;
    }

    return (
        <div style={style.base}>
            <div style={style.wrapper}>
                {iconComponent}
            </div>
        </div>
    );
};

export default class SentimentTreeview extends React.Component {
    constructor(props) {
        super(props);

        this.totalMentionCount = 0;
        this.visibleMentionCount = 0;

        this.state = {
            treeData: {},
            originalTreeData: {}
        }
    }

<<<<<<< HEAD
    componentWillReceiveProps(nextProps) {
        let treeData = this.createRelevantTermsTree(nextProps);
        this.setState({ treeData: treeData, originalTreeData: treeData })
    }

    createRelevantTermsTree(props) {
        const { conjunctivetopics, language, termFilters, allSiteTopics, defaultLanguage } = props;

=======
    hasChanged() {
        const { conjunctivetopics } = this.props;
        let totalMentionCount = 0, visibleMentionCount = 0;

        // eslint-disable-next-line
        for (let [term, value] of associatedKeywords.entries()) {
            if (value.enabled) {
                visibleMentionCount += value.mentions;
            }
            totalMentionCount += value.mentions;
        }

        if (this.totalMentionCount !== totalMentionCount || this.visibleMentionCount !== visibleMentionCount) {
            this.totalMentionCount = totalMentionCount;
            this.visibleMentionCount = visibleMentionCount;

            return true;
        } else {
            return false;
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.hasChanged() || this.props.language !== nextProps.language) {
            const { conjunctivetopics } = this.props;
            let treeData = this.createRelevantTermsTree(conjunctivetopics, nextProps.language);
            this.setState({ treeData: treeData, originalTreeData: treeData })
        }
    }

    createRelevantTermsTree(termsMap, lang) {
>>>>>>> V2 dashboard rewrite to accomodate cassandra GQL services
        let rootItem = {
            name: parentTermsName,
            folderKey: 'associatedKeywords',
            toggled: true,
            children: []
        };

        let popularItemsRoot = {
            name: 'Top 5 Terms',
            folderKey: 'top5Keywords',
            checked: true,
            toggled: true,
            children: []
        };

        let otherItemsRoot = {
            name: 'Other Terms',
            folderKey: 'otherKeywords',
            checked: true,
            toggled: true,
            children: []
        };

        let itemCount = 0;
        let popularTermsTotal = 0, otherTotal = 0;

<<<<<<< HEAD
        conjunctivetopics.forEach(topic => {
            const { mentions, conjunctionterm } = topic;
            const edge = fetchTermFromMap(allSiteTopics, conjunctionterm, language, defaultLanguage);
            const enabledConjunctiveTerm = termFilters.has(conjunctionterm);

            let newEntry = Object.assign({}, {
                name: edge.translatedname,
                folderKey: conjunctionterm,
                checked: enabledConjunctiveTerm,
                eventCount: mentions
            });

            if (itemCount++ < 5) {
                newEntry.parent = popularItemsRoot;
                popularItemsRoot.children.push(newEntry);
                popularTermsTotal += enabledConjunctiveTerm ? mentions : 0;
            } else {
=======
        for (var [term, value] of termsMap.entries()) {
            let newEntry = Object.assign({}, value, {
                name: value["name_" + lang],
                folderKey: term,
                checked: value.enabled,
                eventCount: value.mentions
            });
            if (term !== "none" && itemCount++ < 5) {
                newEntry.parent = popularItemsRoot;
                popularItemsRoot.children.push(newEntry);
                popularTermsTotal += value.enabled ? value.mentions : 0;
            } else if (term !== "none") {
>>>>>>> V2 dashboard rewrite to accomodate cassandra GQL services
                newEntry.parent = otherItemsRoot;
                otherItemsRoot.children.push(newEntry);
                otherTotal += enabledConjunctiveTerm ? mentions : 0;
            }
<<<<<<< HEAD
        });
=======
        }
>>>>>>> V2 dashboard rewrite to accomodate cassandra GQL services

        if (popularItemsRoot.children < 5) {
            popularItemsRoot.name = "Terms";
        }

        rootItem.children.push(popularItemsRoot);

        if (otherItemsRoot.children.length > 0) {
            rootItem.children.push(otherItemsRoot);
        }

        rootItem.eventCount = popularTermsTotal + otherTotal;

        return rootItem;
    }

    onToggle(node, toggled) {
<<<<<<< HEAD
        const { name } = node;
        let { termFilters, maintopic } = this.props;

        if(!node.checked && termFilters.size < 2){
            termFilters.add(name);
            this.handleDataFetch(maintopic, termFilters);
        }else if(node.checked){
            termFilters.delete(name);
            this.handleDataFetch(maintopic, termFilters);
        }else{
            alert(`You're allowed to select up to 2 conjunctive terms. Please unselect one of the topics.`);
        }
    }

    handleDataFetch(maintopic, termFilters) {
        const { dataSource, bbox, timespanType, datetimeSelection, zoomLevel, externalsourceid, fromDate, toDate } = this.props;

        this.props.flux.actions.DASHBOARD.reloadVisualizationState(fromDate, toDate, datetimeSelection, timespanType, dataSource, maintopic, bbox, zoomLevel, Array.from(termFilters), externalsourceid);
    }

    clearTerms(){
        const { maintopic } = this.props;
        this.handleDataFetch(maintopic, []);
=======
        // eslint-disable-next-line      
        if (this.state.cursor) { this.state.cursor.active = false; }
        node.active = true;
        if (node.children) { node.toggled = toggled; }
        this.setState({ cursor: node });
    }

    getStateFromFlux() {
        return this.getFlux().store("DataStore").getState();
    }

    changeCheckedStateForChildren(node, filters, cb) {
        let self = this;
        cb(node, filters);

        if (node.children && node.children.length > 0) {
            node.children.map(item => self.changeCheckedStateForChildren(item, filters, cb));
        }
    }

    onChange(node) {
        let filters = this.props.enabledTerms.map(filter => Object.assign({}, { term: filter, action: 'add' }));
        let checkboxActionCB = (nodeElement, filterList) => {
            let addTerm = !nodeElement.checked;
            let termIndex = filterList.findIndex(filter => filter.term === nodeElement.folderKey);

            //you're selecting to remove the enabled filter
            if (!addTerm && termIndex > -1) {
                let mutatedFilter = Object.assign({}, filterList[termIndex], { action: 'remove' });
                filterList[termIndex] = mutatedFilter;
            } else {
                filterList.push({ term: nodeElement.folderKey, action: 'add' });
            }
        }

        this.changeCheckedStateForChildren(node, filters, checkboxActionCB);
        this.getFlux().actions.DASHBOARD.changeTermsFilter(filters);
    }

    filterNode(filteredNode) {
        let filters = [filteredNode[`name_${DEFAULT_LANGUAGE}`]];
        this.getFlux().actions.DASHBOARD.changeTermsFilterToOnly(filters);
>>>>>>> V2 dashboard rewrite to accomodate cassandra GQL services
    }

    onFilterMouseUp(e) {
        const filter = e.target.value.trim();

        if (!filter) { return this.setState({ treeData: this.state.originalTreeData }); }
        var filtered = filters.filterTree(this.state.treeData, filter);
        filtered = filters.expandFilteredNodes(filtered, filter);
        this.setState({ treeData: filtered });
    }

<<<<<<< HEAD
    termSelected(node) {
        this.handleDataFetch(node.name, []);
    }

    render() {
        let self = this;
        let treeviewStyle = {
            height: this.props.height - TopRowHeight
        };

        const decoratorsOverride = {
            Header: (props, ref) => {
                const style = props.style;
                let self = this;
                const termStyle = { paddingLeft: '3px', fontWeight: 800, fontSize: '14px', color: '#337ab7', width: '100%' };
                const categoryStyle = { paddingLeft: '3px', fontSize: '14px', color: '#fff', display: 'inline-table', fontWeight: 600 };
                let badgeClass = (props.node.checked || props.node.children) && props.node.eventCount > 0 ? "badge" : "badge badge-disabled";
                let isNodeTypeCategory = props.node.children && props.node.children.length > 0;
                let termClassName = !isNodeTypeCategory ? "relevantTerm" : "";
        
                return (
                    <div className="row" style={!props.node.highlighted || props.node.children ? style.base : style.baseHighlight} >
                        <div className="col-md-10" style={style.title}>
                            <input type="checkbox" onChange={()=>self.onToggle(props.node)}
                                checked={props.node.checked} />
                            <span className={termClassName} onClick={() => self.termSelected(props.node)} style={!isNodeTypeCategory ? termStyle : categoryStyle}>{props.node.name} </span>
                        </div>
                        <div style={props.node.name === parentTermsName ? style.parentBadge : style.badge} className="col-md-2">
                            {
                                props.node.eventCount && props.node.eventCount > 0 ?
                                    <span className={badgeClass}>{numeralLibs(props.node.eventCount).format(props.node.eventCount > 1000 ? '+0.0a' : '0a')}</span>
                                    : undefined
                            }
                        </div>
                    </div>
                );
            }
        };

        return (
            <div className="panel panel-selector">
                <Subheader style={styles.subHeader}>
                    <span style={styles.titleSpan}>FILTERS</span>
                    {
                        this.props.termFilters.size > 0 ?
                            <button type="button" onClick={() => self.clearTerms()} className="btn btn-primary btn-sm">Clear Selections</button>
=======
    changeHighlightedStateForChildren(node, highlightedNodeName) {
        let self = this;
        if (node.name === highlightedNodeName) {
            node.highlighted = true;
        } else {
            node.highlighted = false;
        }

        if (node.children && node.children.length > 0) {
            node.children.map(item => self.changeHighlightedStateForChildren(item, highlightedNodeName));
        }
    }

    onHighlight(node) {
        if (!node.children) {
            let treeData = this.state.treeData;
            this.changeHighlightedStateForChildren(treeData, node.name);

            this.setState({ treeData });
        }
    }

    termSelected(node) {
        if (!node.children) {
            node['type'] = "Term";
            this.getFlux().actions.DASHBOARD.reloadVisualizationState(this.props.siteKey, this.state.datetimeSelection,
                this.state.timespanType, this.state.dataSource, node);
        }
    }

    Header(props) {
        const style = props.style;
        let self = this;
        const termStyle = { paddingLeft: '3px', fontWeight: 800, fontSize: '14px', color: '#337ab7', width: '100%' };
        const categoryStyle = { paddingLeft: '3px', fontSize: '14px', color: '#fff', display: 'inline-table', fontWeight: 600 };
        let badgeClass = (props.node.checked || props.node.children) && props.node.eventCount > 0 ? "badge" : "badge badge-disabled";
        let isNodeTypeCategory = props.node.children && props.node.children.length > 0;
        let onlyLink = <span style={style.only} onClick={this.filterNode.bind(this, props.node)}>only</span>;
        let termClassName = !isNodeTypeCategory ? "relevantTerm" : "";

        return (
            <div className="row" style={!props.node.highlighted || props.node.children ? style.base : style.baseHighlight} onMouseEnter={this.onHighlight.bind(this, props.node)}>
                <div className="col-md-10" style={style.title}>
                    <input type="checkbox"
                        checked={props.node.checked}
                        onChange={self.onChange.bind(this, props.node)} />
                    <span className={termClassName} onClick={() => this.termSelected(props.node)} style={!isNodeTypeCategory ? termStyle : categoryStyle}>{props.node.name} </span>
                    {props.node.highlighted ? onlyLink : ""}
                </div>
                <div style={props.node.name === parentTermsName ? style.parentBadge : style.badge} className="col-md-2">
                    {
                        props.node.eventCount && props.node.eventCount > 0 ?
                            <span className={badgeClass}>{numeralLibs(props.node.eventCount).format(props.node.eventCount > 1000 ? '+0.0a' : '0a')}</span>
                            : undefined
                    }
                </div>
            </div>
        );
    }

    Toggle(props) {
        let iconComponent = {};
        const style = props.style;

        return (
            <div style={style.base}>
                <div style={style.wrapper}>
                    {iconComponent}
                </div>
            </div>
        );
    }

    render() {
        let self = this;
        let treeviewStyle = {
            height: this.props.height - TopRowHeight
        };

        return (
            <div className="panel panel-selector">
                <Subheader style={styles.subHeader}>
                    <span style={styles.titleSpan}>WATCHLIST TERMS</span>
                    {
                        this.props.enabledTerms.length > 0 ?
                            <button type="button" onClick={() => this.getFlux().actions.DASHBOARD.clearWatchlistFilters()} className="btn btn-primary btn-sm">Clear Selections</button>
>>>>>>> V2 dashboard rewrite to accomodate cassandra GQL services
                            : undefined
                    }
                </Subheader>
                <div style={styles.searchBox}>
<<<<<<< HEAD
                   { <TypeaheadSearch 
                        dashboardRefreshFunc={(maintopic, conjunctivetopics)=>this.handleDataFetch(maintopic, conjunctivetopics)}
                        language={this.props.language}
                        allSiteTopics={this.props.allSiteTopics}
                        maintopic={this.props.maintopic}
                        defaultLanguage={this.props.defaultLanguage} /> }
=======
                    <TypeaheadSearch data={this.state.categoryValue["name_" + this.props.language]}
                        type={this.state.categoryType}
                        siteKey={this.props.siteKey}
                        dataSource={this.state.dataSource}
                        language={this.state.language}
                        datetimeSelection={this.state.datetimeSelection}
                        timespanType={this.state.timespanType} />
>>>>>>> V2 dashboard rewrite to accomodate cassandra GQL services
                </div>
                <div style={styles.searchBox}>
                    <div className="input-group">
                        <span className="input-group-addon">
                            <i className="fa fa-filter"></i>
                        </span>
                        <input type="text"
                            className="form-control edgeFilterInput"
                            placeholder="Search the association list..."
                            onKeyUp={ev=>self.onFilterMouseUp(ev)} />
                    </div>
                </div>
                <div className="list-group" data-scrollable="" style={treeviewStyle}>
                    {
                        this.state && this.state.treeData && this.state.treeData.children ?
                            <div style={styles.component}>
<<<<<<< HEAD
                                <Treebeard animations={false}
                                    decorators={Object.assign({}, decorators, decoratorsOverride)}
                                    data={this.state.treeData}
                                    style={treeDataStyle} />
=======
                                <Treebeard
                                    onToggle={this.onToggle}
                                    animations={false}
                                    data={this.state.treeData}
                                    style={treeDataStyle}
                                    siteKey={this.props.siteKey}
                                    decorators={Object.assign({}, decorators, { Header: self.Header })} />
>>>>>>> V2 dashboard rewrite to accomodate cassandra GQL services
                            </div> : undefined
                    }
                </div>
            </div>
        );
    }
}