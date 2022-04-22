const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com',
		'X-RapidAPI-Key': 'a227827dc1mshcb315bf002365bdp199b5ejsn08906ff75f5e'
	}
};

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

$('#search').on("click", function() {
    console.log("Search button was clicked!");
    var stockTicker = $("#search-input").val();
    getStockProfile(stockTicker);
})

