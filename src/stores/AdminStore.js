import Fluxxor from 'fluxxor';
import constants from '../actions/constants';
// eslint-disable-next-line
import ReactDataGridPlugins from 'react-data-grid-addons';
import { StreamParamsButtonFormatter } from '../components/Admin/StreamParamsButtonFormatter';
import { StreamStatusButtonFormatter } from '../components/Admin/StreamStatusButtonFormatter';

// eslint-disable-next-line
const Filters = window.ReactDataGridPlugins.Filters;

const DEFAULT_COLUMN = {
  editable: false,
  filterable: false,
  resizable: true
};

export const AdminStore = Fluxxor.createStore({
    initialize() {
        this.dataStore = {
            streams: [],
            streamColumns: [],
            streamParamColumns: [],
            settings: {},
            siteList: [],
            loading: false,
            twitterAccounts: [],
            twitterAccountColumns: [],
            trustedTwitterAccounts: [],
            topicGridColumns: [],
            facebookPages: [],
            osmPlaceGroups: new Map(),
            blacklist: [],
            blacklistColumns: [],
            locationGridColumns: [],
            locations: new Map(),
            watchlist: [],
            action: false,
            error: null
        };

        this.bindActions(
            constants.ADMIN.LOAD_SITE_SETTINGS, this.handleLoadSiteSettings,
            constants.ADMIN.LOAD_STREAMS, this.handleLoadStreams,
            constants.ADMIN.MODIFY_STREAMS, this.handleModifyStreams,
            constants.ADMIN.REMOVE_STREAMS, this.handleRemoveStreams,
            constants.ADMIN.LOAD_TOPICS, this.handleLoadTopics,
            constants.ADMIN.LOAD_FB_PAGES, this.handleLoadFacebookPages,
            constants.ADMIN.LOAD_TWITTER_ACCOUNTS, this.handleLoadTwitterAccounts,
            constants.ADMIN.LOAD_TRUSTED_TWITTER_ACCTS, this.handleLoadTrustedTwitterAccts,
            constants.ADMIN.LOAD_FAIL, this.handleLoadPayloadFail,
            constants.ADMIN.CREATE_SITE, this.handleCreateSite,
            constants.ADMIN.LOAD_BLACKLIST, this.handleLoadBlacklist,
            constants.ADMIN.PUBLISHED_EVENTS, this.handlePublishedCustomEvents
        );
    },

    getState() {
        return this.dataStore;
    },

    loadColumns(columnValues, saveAsColumnName) {
      const columns = columnValues.map(value =>
        Object.assign({}, DEFAULT_COLUMN, value));

      this.dataStore[saveAsColumnName] = columns;
    },

    handleLoadSiteSettings(response) {
      this.dataStore.settings = response || [];
      this.dataStore.action = response.action || false;
      this.emit("change");
    },

    handleLoadStreams(response) {
      this.dataStore.streams = response.response.streams.streams || [];
      this.dataStore.action = response.action || false;

      this.loadStreamsColumns();
      this.loadStreamParamsColumns();

      this.emit("change");
    },

    loadStreamsColumns() {
      const columnValues = [
        {key: "status", name: "Status", formatter: StreamStatusButtonFormatter, getRowMetaData: (row) => row, width: 90},
        {key: "streamId", name: "Stream Id"},
        {key: "pipelineKey", name: "Pipeline Key"},
        {key: "pipelineLabel", name: "Pipeline Label"},
        {key: "pipelineIcon", name: "Pipeline Icon"},
        {key: "streamFactory", name: "Stream Factory"},
        {key: "params", name: "Params", formatter: StreamParamsButtonFormatter, getRowMetaData: (row) => row, width: 70}
      ];
      const saveAsColumnName = 'streamColumns';

      this.loadColumns(columnValues, saveAsColumnName);
    },

    loadStreamParamsColumns() {
      const columnValues = [
        {key: "key", name: "key"},
        {editable: true, key: "value", name: "value"}
      ];
      const saveAsColumnName = 'streamParamColumns';

      this.loadColumns(columnValues, saveAsColumnName);
    },

    handleModifyStreams(response) {
      this.loadStreamsColumns(this.dataStore.streams);
      this.emit("change");
    },

    handleRemoveStreams(response) {
      this.loadStreamsColumns(this.dataStore.streams);
      this.emit("change");
    },

    handleLoadPayload(payload) {
        this.dataStore.settings = Object.assign(this.dataStore.settings, payload);
        this.emit("change");
    },

    handleLoadTwitterAccounts(response) {
      this.loadTwitterAccountsColumns();
      this.dataStore.twitterAccounts = response.response.twitterAccounts.accounts;
      this.dataStore.action = response.action || false;
      this.emit("change");
    },

    loadTwitterAccountsColumns() {
      const columnValues = [
        {key: "consumerKey", name: "Consumer Key"},
        {key: "consumerSecret", name: "Consumer Secret"},
        {key: "accessToken", name: "Access Token"},
        {key: "accessTokenSecret", name: "Access Token Secret"},
        {key: "userIds", name: "User Ids"}
      ];
      const saveAsColumnName = 'twitterAccountColumns';

      this.loadColumns(columnValues, saveAsColumnName);
    },

    handleLoadTrustedTwitterAccts(response){
        this.dataStore.trustedTwitterAccounts = response.accounts.accounts || [];
        this.dataStore.action = response.action || false;
        this.emit("change");
    },

    handleLoadFacebookPages(response){
        this.dataStore.facebookPages = response.pages.pages || [];
        this.dataStore.action = response.action || false;
        this.emit("change");
    },

    handleLoadBlacklist(response) {
      this.handleLoadBlackListColumns();
      let action = false;
      let rows = [];
      if (response.response) {
        action = response.action || false;
        response.response.forEach(term => {
          if (term.filteredTerms.constructor === Array) {
            rows.push({id: term.id, filteredTerms: JSON.stringify(term.filteredTerms)});
          } else if (typeof term.filteredTerms === 'string') {
            rows.push({id: term.id, filteredTerms: term.filteredTerms});
          } else {
            rows.push({id: term.id, filteredTerms: JSON.stringify([term.filteredTerms])});
          }
        });
      }
      this.dataStore.blacklist = rows;
      this.dataStore.action = action;
      this.emit("change");
    },

    handleLoadBlackListColumns() {
      const columnValues = [
        {key: "id", name: "Id"},
        {editable: true, key: "filteredTerms", name: "Blacklisted Terms"}
      ];
      const saveAsColumnName = 'blacklistColumns';
            
      this.loadColumns(columnValues, saveAsColumnName);
    },

    handleLoadTopics(response){
        this.dataStore.watchlist = response.response || [];
        this.dataStore.action = response.action || false;
        this.loadTopicColumns(this.dataStore.settings.properties.supportedLanguages);
        this.emit("change");
    },

    loadTopicColumns(languages) {
      const defaultLanguage = this.dataStore.settings.properties.defaultLanguage;
      const columnValues = [
        {key: "topicid", name: "Topic Id"},
        {key: "name", name: defaultLanguage}
      ];
      const saveAsColumnName = 'topicGridColumns';

      languages.forEach(lang => {
        if (lang !== defaultLanguage) {
          columnValues.push({
            key: "translatedname",
            name: lang
          })
        }
      });

      this.loadColumns(columnValues, saveAsColumnName);
    },

    handlePublishedCustomEvents(response){
        this.dataStore.action = response.action || false;
        this.emit("change");
    },

    handleCreateSite(response){
        const {siteName, action} = response;
        this.dataStore.siteList.push({name: siteName});
        this.dataStore.action = action;
        this.emit("change");
    },

    
    handleLoadPayloadFail(payload) {
        this.dataStore.error = payload.error;
    }

});