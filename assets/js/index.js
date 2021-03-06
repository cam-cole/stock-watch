const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com',
		'X-RapidAPI-Key': 'a227827dc1mshcb315bf002365bdp199b5ejsn08906ff75f5e'
	}
};

var savedTickers = [];
var savedStocksContainer = document.querySelector('#saved-stocks-container');
var stockObject = {};

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

                stockObject = {
                    name: stockName,
                    ticker: ticker,
                    price: currentPrice,
                    marketChangePrice: marketChangePrice,
                    marketChangePct: marketChangePct
                }

                
            })
        }
    })
}

var getSavedStockProfiles = function(savedTickers, i) {
    setTimeout(function() {
        fetch('https://yh-finance.p.rapidapi.com/stock/v2/get-profile?symbol=' + savedTickers[i] + '&region=US', options).then(function(response) {
            if(response.ok) {
                response.json().then(function(data) {
                    console.log(data);

                    var stockName = data.quoteType.longName;
                    var ticker = data.quoteType.symbol;
                    var currentPrice = data.price.regularMarketPrice.fmt;
                    var marketChangePrice = data.price.regularMarketChange.fmt;
                    var marketChangePct = data.price.regularMarketChangePercent.fmt;

                    $('#saved-stock' + (i)).text(stockName + " (" + ticker + ")");
                    $('#saved-stock' + (i) + '-price').text("$" + currentPrice);
                    $('#saved-stock' + (i) + '-market-change').text('$' + marketChangePrice + " (" + marketChangePct + ")");

                    if(marketChangePrice < 0) {
                        $('#saved-stock' + (i) + '-market-change').removeClass("has-text-white");
                        $('#saved-stock' + (i) + '-market-change').addClass("has-text-danger");
                    }

                    else if (marketChangePrice > 0) {
                        $('#saved-stock' + (i) + '-market-change').removeClass("has-text-white");
                        $('#saved-stock' + (i) + '-market-change').addClass("has-text-success");
                    }
                })
            }
        })       
    }, 300 * i)
    
}

var saveStock = function(stockName, ticker, currentPrice, marketChangePrice, marketChangePct) {
    savedTickers.push(ticker);
    var index = savedTickers.length - 1;

    savedStocksContainer.innerHTML += 
        `<div class="card column is-one-fifth has-background-black is-fullheight">
            <div class="card-header has-background-success">
                <h5 id="saved-stock` + index + `" class="title is-5 m-3 has-text-white">`+ stockName + " (" + ticker + ")" + ` </h5>
            </div>
            <div class="card-content">
                <p id="saved-stock` + index + `-price" class="title is-6 has-text-white mb-2">` + "$" + currentPrice +  `</p>
                <p id="saved-stock` + index + `-market-change">` + '$' + marketChangePrice + " (" + marketChangePct + ")" + `</p>
            </div>
            <footer class="card-footer is-align-content-flex-end">
                <button id="saved-stock-delete-button" class="button is-danger is-fullwidth">Delete</button>
            </footer>
        </div>`
}


$('#search').on("click", function() {
    console.log("Search button was clicked!");
    var stockTicker = $("#search-input").val();
    getStockProfile(stockTicker);
    // getStockGraph(stockTicker);
})

$('#update').on("click", function() {
    console.log("Update button was clicked!");
    for (i = 0; i < savedTickers.length; i++) {
        getSavedStockProfiles(savedTickers, i);
    }
})

$('#save-button').on("click", function() {
    saveStock(stockObject.name, stockObject.ticker, stockObject.price, stockObject.marketChangePrice, stockObject.marketChangePct)
    console.log(stockObject);
})

$(document).on("click", '#saved-stock-delete-button', function() {
    $(this).parent().parent().remove();
    console.log("Delete button was clicked!");
})

$('#delete-all').on("click", function() {
    savedTickers = [];
    savedStocksContainer.innerHTML = "";
})

