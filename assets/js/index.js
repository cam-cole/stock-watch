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
                $('#stock-name').text(stockName + " (" + ticker + ")");
                $('#current-price').text("Price: $" + currentPrice);
                
            })
        }
    })

    
}

$('#search').on("click", function() {
    console.log("Search button was clicked!");
    var stockTicker = $("#search-input").val();
    getStockProfile(stockTicker);
})

