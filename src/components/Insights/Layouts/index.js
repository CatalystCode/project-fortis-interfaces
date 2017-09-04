const layout = {
    "lg": [
<<<<<<< HEAD
      { "i": "locations", "x": 0, "y": 0, "w": 4, "h": 8},
      { "i": "topics", "x": 4, "y": 0, "w": 4, "h": 8},
      { "i": "sources", "x": 8, "y": 0, "w": 4, "h": 8},
      { "i": "timeline", "x": 12, "y": 0, "w": 12, "h": 8 },
      { "i": "watchlist", "x": 0, "y": 9, "w": 5, "h": 16},
      { "i": "heatmap", "x": 5, "y": 6, "w": 14, "h": 16 },
      { "i": "newsfeed", "x": 19, "y": 6, "w": 5, "h": 16 }
=======
      { "i": "locations", "x": 0, "y": 0, "w": 4, "h": 7, minH: 3, maxH: 7, minW: 1, maxW: 4 },
      { "i": "topics", "x": 4, "y": 0, "w": 4, "h": 7, minH: 3, maxH: 7, minW: 1, maxW: 4 },
      { "i": "sources", "x": 8, "y": 0, "w": 4, "h": 7, minH: 3, maxH: 7, minW: 1, maxW: 4 },
      { "i": "timeline", "x": 12, "y": 0, "w": 12, "h": 7, minH: 3, maxH: 7, static: true },
      { "i": "watchlist", "x": 0, "y": 9, "w": 6, "h": 16, minW: 6, maxW: 6 },
      { "i": "heatmap", "x": 6, "y": 6, "w": 12, "h": 16, static: true, resizable: true },
      { "i": "newsfeed", "x": 18, "y": 6, "w": 6, "h": 16, minW: 6, maxW: 12 }
>>>>>>> V2 dashboard rewrite to accomodate cassandra GQL services
    ]
  };
  
  const layoutCollapsed = {
    "lg": [
      { "i": "watchlist", "x": 0, "y": 0, "w": 4, "h": 22, static: true },
      { "i": "heatmap", "x": 4, "y": 0, "w": 14, "h": 22, static: true },
      { "i": "newsfeed", "x": 18, "y": 0, "w": 6, "h": 22, static: true }
    ]
  };

module.exports = {
    defaultLayout: {
        layout, layoutCollapsed
    }
};