const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com',
		'X-RapidAPI-Key': 'a227827dc1mshcb315bf002365bdp199b5ejsn08906ff75f5e'
	}
};

var savedTickers = ['SPY', 'VUG', 'VGT', 'TSLA', 'AAPL'];

var getStockProfile = function(stockTicker) {
    fetch('https://yh-finance.p.rapidapi.com/stock/v2/get-profile?symbol=' + stockTicker + '&region=US', options).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                console.log(data);

                var stockName = data.quoteType.longName;
                var ticker = data.quoteType.symbol;
                var currentPrice = data.price.regularMarketPrice.fmt;
                var marketChangePrice = data.price.regularMarketChange.fmt;
                var marketChangePct = data.price.regularMarketChangePercent.fmt;
                $('#stock-name').text(stockName + " (" + ticker + ")");
                $('#current-price').text("$" + currentPrice);
                $('#current-market-change').text('$' + marketChangePrice + " (" + marketChangePct + ")");

                if(marketChangePrice < 0) {
                    $('#current-market-change').removeClass("has-text-white");
                    $('#current-market-change').addClass("has-text-danger");
                }

                else if (marketChangePrice > 0) {
                    $('#current-market-change').removeClass("has-text-white");
                    $('#current-market-change').addClass("has-text-success");
                }
                
            })
        }
    })

    
}

var getSavedStockProfiles = function(savedTickers) {
    for (i=0; i < savedTickers.length; i++) {
        fetch('https://yh-finance.p.rapidapi.com/stock/v2/get-profile?symbol=' + savedTickers[i] + '&region=US', options).then(function(response) {
            if(response.ok) {
                response.json().then(function(data) {
                    console.log(data);

                    var stockName = data.quoteType.longName;
                    var ticker = data.quoteType.symbol;

                    $('#saved-stock' + (i+1)).text(stockName + " (" + ticker + ")");
                })
            }
        })
        setTimeout(console.log('Fetched stock: ' + i), 1000);
    }
}

// var getStockGraph = function(stockTicker) {
//     fetch('https://yh-finance.p.rapidapi.com/stock/v3/get-chart?interval=1mo&symbol='+ stockTicker + '&range=5y&region=US&includePrePost=false&useYfid=true&includeAdjustedClose=true&events=capitalGain%2Cdiv%2Csplit', options).then(function(response) {
//         if(response.ok) {
//             response.json().then(function(data) {
//                 console.log(data);
//                 console.log(data.chart);
//             })
//         }
//     })
// }

$('#search').on("click", function() {
    console.log("Search button was clicked!");
    var stockTicker = $("#search-input").val();
    getStockProfile(stockTicker);
    getSavedStockProfiles(savedTickers);
    // getStockGraph(stockTicker);
})

