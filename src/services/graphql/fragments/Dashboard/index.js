export const getMessagesByBbox = `fragment FortisDashboardView on FeatureCollection {
        pageState
        features {
            properties {
                messageid,
                summary,
                edges,
                eventtime,
                sourceeventid,
                externalsourceid,
                sentiment,
                language,
                pipelinekey,
                link,
                title,
                link
            }
            coordinates
        }
    }`;

export const topSourcesFragment = `fragment FortisTopSourcesView on TopSourcesCollection {
        edges {
            name, 
            pipelinekey,
            mentions,
            avgsentiment
        }
    }`;

export const translationEventFragment = `fragment TranslationView on TranslationResult{
    translatedSentence
}`;

export const termsFragment = ` fragment FortisPopularTermsView on TopTermsCollection {
        edges {
            name
            avgsentiment
            mentions
        }
    }`;

export const popularPlacesFragment = ` fragment FortisPopularPlacesView on TopPlacesCollection {
        edges {
            name
            placeid
            layer
            bbox
            mentions
            avgsentiment
        }
    }`;

export const visualizationChartFragment = `fragment FortisDashboardTimeSeriesView on FeatureTimeSeriesCollection {
        labels {
            name
        }
        graphData {
            name
            mentions
            avgsentiment
            date
        }
        tiles
    }`;

export const conjunctiveTermsFragment = `fragment FortisDashboardConjunctiveTermsView on ConjunctionTermCollection {
        edges {
            name
            mentions
            conjunctionterm
        }
    }`;

export const eventDetailsFragment = `fragment FortisDashboardView on Feature {
    coordinates
    properties {
        messageid,
        summary,
        edges,
        eventtime,
        sourceeventid,
        externalsourceid,
        sentiment,
        language,
        pipelinekey,
        link,
        title,
        body,
        link
    }
}`;

export const heatmapFragment = `fragment FortisHeatmapViewFeatures on FeatureCollection {
    features {
        coordinates
        properties {
            mentions
            date
            avgsentiment
            tile {
                id
                row
                column
            }
        }
    }
 }`;
