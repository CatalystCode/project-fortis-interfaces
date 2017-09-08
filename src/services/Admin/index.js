import * as AdminFragments from '../graphql/fragments/Admin';
import * as AdminQueries from '../graphql/queries/Admin';
import * as AdminMutations from '../graphql/mutations/Admin';
import request from 'request';

const twitterFragment = `fragment FortisTwitterAcctView on TwitterAccountCollection {
                            accounts {
                                    accountName
                                    consumerKey
                                    token
                                    consumerSecret
                                    tokenSecret
                            }
                        }`;

const trustedTwitterFragment = `fragment FortisTrustedTwitterAcctView on TrustedTwitterAccountCollection {
                            accounts {
                                    RowKey
                                    acctUrl
                            }
                        }`;

const fbPageAnalyticsFragment = `fragment FortisAdminSettingsView on FacebookPageAnalyticsCollection {
                        analytics {
                            Name,
                            Count,
                            LastUpdated
                        }
                      }`;

const fbPageFragment = `fragment FortisDashboardView on FacebookPageCollection {
                        runTime
                        pages {
                            RowKey
                            pageUrl
                        }
                      }`;

const blacklistFragment = `fragment FortisDashboardView on BlacklistCollection {
                        runTime
                        filters {
                            filteredTerms
                            lang
                            RowKey
                        }
                      }`;

export const SERVICES = {
    getDashboardSiteDefinition(translationLanguage, callback){
        const query = ` ${AdminFragments.siteSettingsFragment}
                        ${AdminQueries.getPipelineDenfintion}`;

        const variables = { translationLanguage };
        const host = process.env.REACT_APP_SERVICE_HOST
        const POST = {
            url: `${host}/api/settings`,
            method: "POST",
            json: true,
            withCredentials: false,
            body: { query, variables }
        };

        request(POST, callback);
    },
    fetchStreams(callback) {
        const query = `
        query Streams {
          streams {
            streams {
              pipelineKey
              pipelineLabel
              pipelineIcon
              streamFactory
            }
          }
        }`;
  
        const host = process.env.REACT_APP_SERVICE_HOST;
        const POST = {
          url: `${host}/api/settings`,
          method: 'POST',
          json: true,
          withCredentials: false,
          body: { query }
        };
  
        request(POST, callback);
      },

      getSiteDefintion(siteId, callback) {
        const query = ` ${AdminFragments.siteSettingsFragment}
                        ${AdminQueries.getAdminSiteDefinition} `;

        const variables = { siteId };
        const host = process.env.REACT_APP_SERVICE_HOST
        const POST = {
            url: `${host}/api/settings`,
            method: "POST",
            json: true,
            withCredentials: false,
            body: { query, variables }
        };

        request(POST, callback);
    },
    saveTwitterAccounts(site, accounts, mutation, callback) {
        const query = ` ${twitterFragment} 
                      mutation ModifyTwitterAccounts($input: TwitterAccountDefintion!) {
                            streams: ${mutation}(input: $input) {
                                ...FortisTwitterAcctView
                            }
                        }`;

        const variables = { input: { accounts, site } };
        const host = process.env.REACT_APP_SERVICE_HOST
        const POST = {
            url: `${host}/api/settings`,
            method: "POST",
            json: true,
            withCredentials: false,
            body: { query, variables }
        };

        request(POST, callback);
    },

    publishCustomEvents(messages, callback) {
        const query = ` mutation PublishEvents($input: NewMessages!) {
                            events: publishEvents(input: $input) 
                        }`;

        const variables = { input: { messages } };
        const host = process.env.REACT_APP_SERVICE_HOST
        const POST = {
            url: `${host}/api/messages`,
            method: "POST",
            json: true,
            withCredentials: false,
            body: { query, variables }
        };

        request(POST, callback);
    },

    getTwitterAccounts(siteId, callback) {
        let query = `  ${twitterFragment}
                        query TwitterAccounts($siteId: String!) {
                            streams: twitterAccounts(siteId: $siteId) {
                                ...FortisTwitterAcctView
                            }
                        }`;

        let variables = { siteId };

        let host = process.env.REACT_APP_SERVICE_HOST
        var POST = {
            url: `${host}/api/settings`,
            method: "POST",
            json: true,
            withCredentials: false,
            body: { query, variables }
        };

        request(POST, callback);
    },

    getTrustedTwitterAccounts(siteId, callback) {
        let query = `  ${trustedTwitterFragment}
                        query TrustedTwitterAccounts($siteId: String!) {
                            accounts: trustedTwitterAccounts(siteId: $siteId) {
                                ...FortisTrustedTwitterAcctView
                            }
                        }`;

        let variables = { siteId };

        let host = process.env.REACT_APP_SERVICE_HOST
        var POST = {
            url: `${host}/api/settings`,
            method: "POST",
            json: true,
            withCredentials: false,
            body: { query, variables }
        };

        request(POST, callback);
    },

    saveKeywords(site, edges, callback) {
        const query = `${""}//termsEdgeFragment} 
                        mutation AddKeywords($input: EdgeTerms!) {
                            addKeywords(input: $input) {
                                ...FortisDashboardTermEdges
                            }
                        }`;

        const variables = { input: { site, edges } };

        const host = process.env.REACT_APP_SERVICE_HOST
        const POST = {
            url: `${host}/api/edges`,
            method: "POST",
            json: true,
            withCredentials: false,
            body: { query, variables }
        };

        request(POST, callback);
    },

    saveLocations(site, edges, callback) {
        const query = `${""}//locationEdgeFragment} 
                        mutation SaveLocations($input: EdgeLocations!) {
                            saveLocations(input: $input) {
                                ...FortisDashboardLocationEdges
                            }
                        }`;

        const variables = { input: { site, edges } };

        const host = process.env.REACT_APP_SERVICE_HOST
        const POST = {
            url: `${host}/api/edges`,
            method: "POST",
            json: true,
            withCredentials: false,
            body: { query, variables }
        };

        request(POST, callback);
    },

    removeLocations(site, edges, callback) {
        const query = `${""}//locationEdgeFragment} 
                        mutation removeLocations($input: EdgeLocations!) {
                            removeLocations(input: $input) {
                                ...FortisDashboardLocationEdges
                            }
                        }`;

        const variables = { input: { site, edges } };

        const host = process.env.REACT_APP_SERVICE_HOST
        const POST = {
            url: `${host}/api/edges`,
            method: "POST",
            json: true,
            withCredentials: false,
            body: { query, variables }
        };

        request(POST, callback);
    },

    editSite(siteName, siteDefinition, callback) {
        let query = `${AdminMutations.editSite}`;
        let variables = { input: siteDefinition };

        let host = process.env.REACT_APP_SERVICE_HOST
        var POST = {
            url: `${host}/api/settings`,
            method: "POST",
            json: true,
            withCredentials: false,
            body: { query, variables }
        };

        request(POST, callback);
    },

    removeKeywords(site, edges, callback) {
        const query = `${""}//termsEdgeFragment} 
                        mutation RemoveKeywords($input: EdgeTerms!) {
                            removeKeywords(input: $input) {
                                ...FortisDashboardTermEdges
                            }
                        }`;

        const variables = { input: { site, edges } };

        let host = process.env.REACT_APP_SERVICE_HOST
        var POST = {
            url: `${host}/api/edges`,
            method: "POST",
            json: true,
            withCredentials: false,
            body: { query, variables }
        };

        request(POST, callback);
    },
    getAdminFbPages(siteId, days, callback){
        let query = ` ${fbPageFragment},
                      ${fbPageAnalyticsFragment}
                           query FacebookPages($siteId: String!, $days: Int!) {
                              pages: facebookPages(siteId: $siteId) {
                                  ...FortisDashboardView
                              },
                              analytics: facebookAnalytics(siteId: $siteId, days: $days)
                              {
                                  ...FortisAdminSettingsView
                              }
                          }`;
  
          let variables = { siteId, days };
  
          let host = process.env.REACT_APP_SERVICE_HOST
          var POST = {
              url: `${host}/api/settings`,
              method: "POST",
              json: true,
              withCredentials: false,
              body: { query, variables }
          };
  
          request(POST, callback);
    },
    saveFbPages(site, pages, callback) {
          const query = `${fbPageFragment} 
                          mutation ModifyFacebookPages($input: FacebookPageListInput!) {
                              pages: modifyFacebookPages(input: $input) {
                                  ...FortisDashboardView
                              }
                          }`;
  
          const variables = { input: { pages, site } };
  
          const host = process.env.REACT_APP_SERVICE_HOST
          const POST = {
              url: `${host}/api/settings`,
              method: "POST",
              json: true,
              withCredentials: false,
              body: { query, variables }
          };
  
          request(POST, callback);
    },
    saveTrustedTwitterAccts(site, accounts, callback) {
          const query = `${trustedTwitterFragment} 
                          mutation ModifyTrustedTwitterAccounts($input: TrustedTwitterAccountDefintion!) {
                              accounts: modifyTrustedTwitterAccounts(input: $input) {
                                  ...FortisTrustedTwitterAcctView
                              }
                          }`;
  
          const variables = { input: { accounts, site } };
  
          const host = process.env.REACT_APP_SERVICE_HOST
          const POST = {
              url: `${host}/api/settings`,
              method: "POST",
              json: true,
              withCredentials: false,
              body: { query, variables }
          };
  
          request(POST, callback);
    },
    removeFbPages(site, pages, callback) {
          const query = `${fbPageFragment} 
                          mutation RemoveFacebookPages($input: FacebookPageListInput!) {
                              pages: removeFacebookPages(input: $input) {
                                  ...FortisDashboardView
                              }
                          }`;
  
          const variables = { input: { pages, site } };
  
          const host = process.env.REACT_APP_SERVICE_HOST
          const POST = {
              url: `${host}/api/settings`,
              method: "POST",
              json: true,
              withCredentials: false,
              body: { query, variables }
          };
  
          request(POST, callback);
    },
    removeTrustedTwitterAccts(site, accounts, callback) {
        const query = `${trustedTwitterFragment} 
                          mutation RemoveTrustedTwitterAccounts($input: TrustedTwitterAccountDefintion!) {
                              accounts: removeTrustedTwitterAccounts(input: $input) {
                                  ...FortisTrustedTwitterAcctView
                              }
                          }`;
  
        const variables = { input: { accounts, site } };
  
        const host = process.env.REACT_APP_SERVICE_HOST
        const POST = {
            url: `${host}/api/settings`,
            method: "POST",
            json: true,
            withCredentials: false,
            body: { query, variables }
        };
  
        request(POST, callback);
    },
    getBlacklistTerms(siteId, callback){
        let query = `  ${blacklistFragment}
                          query TermBlacklist($siteId: String!) {
                              filters: termBlacklist(siteId: $siteId) {
                                  ...FortisDashboardView
                              }
                          }`;
  
          let variables = { siteId };
  
          let host = process.env.REACT_APP_SERVICE_HOST
          var POST = {
              url: `${host}/api/settings`,
              method: "POST",
              json: true,
              withCredentials: false,
              body: { query, variables }
          };
  
          request(POST, callback);
    },
    saveBlacklistTerms(site, terms, callback) {
          const query = `${blacklistFragment} 
                          mutation ModifyBlacklist($input: BlacklistTermDefintion!) {
                              terms: modifyBlacklist(input: $input) {
                                  ...FortisDashboardView
                              }
                          }`;
  
          const variables = { input: { terms, site } };
          const host = process.env.REACT_APP_SERVICE_HOST
          const POST = {
              url: `${host}/api/settings`,
              method: "POST",
              json: true,
              withCredentials: false,
              body: { query, variables }
          };
  
          request(POST, callback);
    },
    removeBlacklistTerms(site, terms, callback) {
          const query = `${blacklistFragment} 
                          mutation RemoveBlacklist($input: BlacklistTermDefintion!) {
                              terms: removeBlacklist(input: $input) {
                                  ...FortisDashboardView
                              }
                          }`;
  
          const variables = { input: { terms, site } };
          const host = process.env.REACT_APP_SERVICE_HOST
          const POST = {
              url: `${host}/api/settings`,
              method: "POST",
              json: true,
              withCredentials: false,
              body: { query, variables }
          };
  
          request(POST, callback);
    },
};