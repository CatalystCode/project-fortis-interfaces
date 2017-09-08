import React from 'react';
import { getHumanDateFromNow } from '../../utils/Utils.js';
import Sentiment from '../Graphics/Sentiment';
import {SERVICES} from '../../services/Dashboard';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import Highlighter from 'react-highlight-words';
import Chip from 'material-ui/Chip';
import MapViewPort from './MapViewPort';
import {blue300, indigo900} from 'material-ui/styles/colors';

const DATETIME_FORMAT = "MM/DD HH:mm:ss";
const styles = {
    listItemHeader: {
        font: '.777777778em Arial,Helvetica,sans-serif',
        marginBottom: '3px',
        fontWeight: 500,
        marginTop: '2px',
        textAlign: 'left',
        color: '#f44d3c',
        fontSize: '22px'
    },
    title: {
        font: '.777777778em Arial,Helvetica,sans-serif',
        fontWeight: 700,
        fontSize: '16px',
        color: 'rgb(51, 122, 183)'
    },
    chip: {
      margin: 4,
    },
    highlight: {
        backgroundColor: '#ffd54f',
        fontWeight: '600'
    }
};

export default class Acled extends React.Component {
    _loadDetail(id){
        SERVICES.FetchMessageDetail(this.props.siteKey, id, ["acled"], [], (error, response, body) => {
            if (error || response.statusCode !== 200 || !body.data || !body.data.event ) {
                console.error("Failed to fetch details for id:", id, error);
                return;
            }
            let payload = body.data.event;
            this.setState({...payload});
        });
    }

    componentDidMount() {
        this._loadDetail(this.props.content.id);
    }

    render() {
        if (!this.state){
            return (
                <div className="fact">
                    <div className="container-fluid">
                        <p>Loading fact&hellip;</p>
                    </div>
                </div>
            );
        }
        const text = this.state.properties.fullText || this.state.properties.sentence;
        const dateText = getHumanDateFromNow(this.state.properties.createdtime, DATETIME_FORMAT);
        const sentiment = this.state.properties.sentiment;
        const originalSource = this.state.properties.properties.originalSources && this.state.properties.properties.originalSources.length > 0 ? this.state.properties.properties.originalSources[0] : "";
        const title = this.state.properties.properties.title;
        const tags = this.props.content.featureEdges || [];

        return (
            <div id="fact">
                <div className="container-fluid">
                    <div className="row whitespace">
                        <div className="caption">
                            <h6 style={styles.listItemHeader}>
                                    {
                                        title !== "" ? <span>{title}</span> : undefined
                                    }
                            </h6>
                        </div>
                      <div className="col-md-3 viewport">
                        <p className="drop">
                            <MapViewPort coordinates={this.state.coordinates} mapSize={[375, 400]}/>
                        </p>
                      </div>
                        <div className="col-md-6">
                            <div className="article">
                                <p className="text">
                                <Highlighter searchWords={tags}
                                            highlightStyle={styles.highlight}
                                            textToHighlight={text} />
                                </p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="details">
                                <p className="subheading">Date created</p>
                                <p className="drop"><i className="fa fa-clock-o fa-1"></i><span className="date">{dateText}</span></p>
                                
                                <p className="subheading">Sentiment</p>
                                <div className="drop">
                                    <Sentiment value={sentiment}></Sentiment>
                                </div>
                            
                                <p className="subheading">Sources</p>
                                <div className="drop">
                                {
                                    originalSource && originalSource !== "" && !originalSource.startsWith("acled") ? 
                                        <Chip key={originalSource} style={styles.chip}>
                                                                <Avatar icon={<FontIcon className="material-icons">share</FontIcon>} />
                                                                {originalSource}
                                        </Chip> : undefined
                                }
                                </div>
                                <p className="subheading">Tags</p>
                                <div className="drop">
                                {tags && tags.map(tag => <Chip key={tag} backgroundColor={blue300} style={styles.chip}>
                                                            <Avatar size={32} color={blue300} backgroundColor={indigo900}>
                                                                {tag.substring(0, 2)}
                                                            </Avatar>
                                                            {tag}
                                                        </Chip>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

};

Acled.defaultProps = {
    content: null,
};

Acled.propTypes = {
    content: React.PropTypes.object.isRequired,
};