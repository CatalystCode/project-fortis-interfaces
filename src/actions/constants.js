module.exports = {
    SENTIMENT_JSON_MAPPING : {
         "0": -5,
         "-1": -15,
         "1": 5
    },
    TIMESPAN_TYPES : {
         'hour': {
             format: "MM/DD/YYYY HH:00", blobFormat: "[hour]-YYYY-MM-DDHH:00", rangeFormat: "hour"
         },
         'day': {
             format: "MM/DD/YYYY", blobFormat: "[day]-YYYY-MM-DD", rangeFormat: "day"
         },
         'month': {
             format: "YYYY-MM", blobFormat: "[month]-YYYY-MM", rangeFormat: "month"
         },
         'week': {
             format: "YYYY-WW", blobFormat: "[week]-YYYY-WW", rangeFormat: "isoweek"
         },
         'year': {
             format: "YYYY", blobFormat: "[year]-YYYY", rangeFormat: "year"
         },
         'customDate': {
             format: "MM/DD/YYYY", reactWidgetFormat: "MMM Do YYYY", blobFormat: "[day]-YYYY-MM-DD", rangeFormat: "day"
         },
         'customDateTime': {
             format: "MM/DD/YY HH:00", reactWidgetFormat: "MMM Do YYYY HH:00", blobFormat: "[hour]-YYYY-MM-DDHH:00", rangeFormat: "hour"
         },
         'customMonth': {
             format: "MMMM YYYY", reactWidgetFormat: "MMMM YYYY", blobFormat: "[month]-YYYY-MM", rangeFormat: "month"
         }
    },
    DATA_SOURCES: new Map([["all", {"display": "All", "sourceValues":["twitter", "facebook", "acled", "reddit", "bing"], "icon": "fa fa-share-alt", "label": "All"}],
                     ["facebook", {"display": "Facebook", "sourceValues":["facebook"], "icon": "fa fa-facebook-official", "label": ""}],
                     ["twitter", {"display": "Twitter", "sourceValues":["twitter"], "label": "", "icon": "fa fa-twitter"}],
                     ["acled", {"display": "acled", "sourceValues":["acled"], "label": "", "icon": "fa fa-font"}],
                     ["tadaweb", {"display": "Tadaweb", "sourceValues":["tadaweb"], "label": "", "icon": "fa fa-text-width"}],
                     ["custom", {"display": "Imported Events", "sourceValues":["custom"], "label": "", "icon": "fa fa-upload"}]
                   ]),
    MOMENT_FORMATS: {
        "timeScaleDate": "MM/DD/YY HH:00"
    },
    SENTIMENT_COLOR_MAPPING : {
        "negative": "red",
        "neutral": "yellow",
        "positive": "green"
    },
    EVENT_SOURCE_ICON_MAP : {
        "twitter": "fa fa-twitter",
        "facebook": "fa fa-facebook-official"
    },
    CATEGORY_KEY_MAPPING: {
      'kw': 'keyword',
      'g': 'group',
      'sec': 'sector',
      'st': 'status'
    },
    DEFAULT_TIMESERIES_PERIOD: "hour",
    DEFAULT_DATA_SOURCE: "all",
    DEFAULT_EXTERNAL_SOURCE: "all",
    DEFAULT_TIMESPAN_TYPE: "month",
    DEFAULT_TIMEPERIOD_FORMAT: "YYYY-MM",
    ANNUAL_TIMESERIES_PERIOD: "day",
    HEATMAP_MAX_ZOOM: 16,
    HEATMAP_DEFAULT_ZOOM: 8,
    APP : {
        INITIALIZE: "APP:LOAD_SETTINGS",
        CHANGE_LANGUAGE: "APP:CHANGE_LANGUAGE",
    },
    DASHBOARD : {
        CHANGE_SEARCH: "SEARCH:CHANGE",
        INITIALIZE: "DASHBOARD:INIT",
        RELOAD_CHARTS: "RELOAD:RELOAD_CHARTS",
        RELOAD_TOP_SOURCES: "RELOAD:RELOAD_TOP_SOURCES",
        ASSOCIATED_TERMS: "UPDATE:ASSOCIATED_TERMS",
        RELOAD_SOURCES: "DASHBOARD:RELOAD_SOURCES",
        CHANGE_TERM_FILTERS: "UPDATE:CHANGE_TERM_FILTERS",
        CHANGE_LANGUAGE: "DASHBOARD:CHANGE_LANGUAGE",
        LOAD_DETAIL: "LOAD:DETAIL",
        LOAD_DETAIL_ERROR: "LOAD:DETAIL_ERROR",
        CHANGE_TERM_FILTERS_TO_ONLY: "UPDATE:CHANGE_TERM_FILTERS_TO_ONLY",
        CLEAR_FILTERS: "UPDATE:CLEAR_FILTERS",
    },
    FACTS : {
        LOAD_FACTS_SUCCESS: "LOAD:FACTS_SUCCESS",
        LOAD_FACTS_FAIL: "LOAD:FACTS_FAIL",
        LOAD_TAGS: "LOAD:TAGS",
        INITIALIZE: "FACTS:INIT",
        SAVE_PAGE_STATE: "SAVE:PAGE_STATE",
        CHANGE_LANGUAGE: "FACTS:CHANGE_LANGUAGE",
    },
    ADMIN : {
        LOAD_STREAMS: "LOAD:STREAMS",
        REMOVE_STREAMS: "REMOVE:STREAMS",
        LOAD_KEYWORDS: "LOAD:KEYWORDS",
        LOAD_SETTINGS: "LOAD:SETTINGS",
        LOAD_BLACKLIST: "LOAD:BLACKLIST",
        SAVE_SETTINGS: "SAVE:SETTINGS",
        LOAD_PLACES: "LOAD:PLACES",
        CREATE_SITE: "CREATE:SITE",
        SAVE_TWITTER_ACCTS: "SAVE:TWITTER_ACCTS",
        LOAD_TWITTER_ACCTS: "LOAD:TWITTER_ACCTS",
        SAVE_TRUSTED_TWITTER_ACCTS: "SAVE:TRUSTED_TWITTER_ACCTS",
        LOAD_TRUSTED_TWITTER_ACCTS: "LOAD:TRUSTED_TWITTER_ACCTS",
        LOAD_FB_PAGES: "LOAD:FB_PAGES",
        LOAD_LOCALITIES: "LOAD:LOCALITIES",
        PUBLISHED_EVENTS: "SAVE:EVENT_PUBLISH",
        LOAD_FAIL: "LOAD:FAIL",
        REMOVE_FAIL: "REMOVE:FAIL"
    }
};