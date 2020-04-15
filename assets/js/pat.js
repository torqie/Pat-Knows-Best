const pat = {

  // Variables For The Pat Class


  /**
   * This is the main search method. Searches any api and returns the results in json
   * @param {string} url - The Url you want to use in the fetch
   * @return {json}
   */
  search(url, callback) {
    $.ajax({
      url: url,
      method: "GET",
      success: function(result, status, xhr) {
        callback(result);
      }
    });
  },

  /**
   * Searches the rawg.io api for the game provided, along with what platform they would like.
   * @param {string} searchTerm - The game we are searching for.
   * @param {number} platform - The platform that we want to search under that we get from platform dropdown.
   * @param {Object} options - The Options for the search.
   * @param {number} [options.page=1] - The Page we are currently on.
   * @param {number} [options.limit=3] - The amount of items we will retrieve at a time.
   *
   * @param callback
   *
   */
  searchVideoGames(searchTerm, platform, options, callback) {
    const page = options.page || 1;
    const limit = options.limit || 3;
    const baseUrl = "https://api.rawg.io/api/games";
    const queryString = "?platforms=" + platform + "&search=" + searchTerm + "&page=" + page + "&page_size=" + limit;

    pat.search(baseUrl + queryString, function(response) {
      console.log("Search Video Games: ", response);
      callback(response);
    });
  },

  /**
   * Searches the boardgameatlas.com api for the game provided
   * @param {string} name - The board game we are searching for.
   * @param {Object} options - The Options for the search.
   * @param {number} [options.limit=10] - The amount of items to return
   * @param {string} [options.orderBy="popularity"] - The way the items are ordered by.
   * @param {boolean} [options.fuzzyMatch=true] - If set to true it helps with typos
   *
   * @param callback
   */
  searchBoardGames(name, options, callback) {
    const limit = options.limit || 3;
    const orderBy = options.orderBy || "popularity";
    const fuzzyMatch  = options.fuzzyMatch || true;

    const baseUrl = "https://www.boardgameatlas.com/api/search";
    const queryString = "?name=" + name+ "&limit=" + limit + "&order_by=" + orderBy + "&fuzzy_match=" + fuzzyMatch + "&client_id=AoMOmUcuiK";

    pat.search(baseUrl + queryString, function(response) {
      console.log("Search Board Games: ", response);
      callback(response);
    });
  },

  /**
   * Returns Pats recommendations to the user for video games
   * @param {number} [limit=3] - The amount of items to return
   *
   * @returns {json}
   */
  recommendVideoGames(limit = 3) {

  },



  getPlatforms(callback) {
    let platforms = [{id:0, name:"Board Game", slug:"board-game"}];
    const url = "https://api.rawg.io/api/platforms";
    pat.search(url, function(response) {
      console.log("platforms: ", response);
      for(let i = 0; i < response.length; i++) {
        platforms.push(response[i]);
      }
      console.log("New Platforms: ", platforms);
      callback(platforms);
    });
  }
};

pat.getPlatforms();
