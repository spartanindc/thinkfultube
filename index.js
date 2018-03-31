
//Constants
const YT_Search_URL = 'https://www.googleapis.com/youtube/v3/search';
const API_KEY = 'AIzaSyAUq_o_9oV0k8L67k4kSrdWZ31GwZPSp8Q';
const YT_WATCH_URL = "https://www.youtube.com/watch?v=";

function renderSearchResults(settings) {

let displayElem = $('.videoSearchResults');
    settings.items.forEach(function(item) {
        let elem = $('.js-result-template').children().clone();
        let watchUrl = YT_WATCH_URL + item.id.videoId;
        let imageUrl = item.snippet.thumbnails.medium.url;
        elem.find('a').attr('href', watchUrl);
        elem.find('img').attr('src', imageUrl);
        displayElem.append(elem);
        displayElem.prop(hidden, false)
    });
}

function clearResults() {
	$('.videoSearchResults').empty();
}

function queryYouTubeAPI(searchTerm, callback) {
	const settings = { 
  		part: 'snippet',
        key: API_KEY,
        q: searchTerm,
        maxResults: 9,
    	};
	$.getJSON(YT_Search_URL, settings, callback);	
}

function submitButtonClicked() {
$('#searchForm').submit(event => {
	event.preventDefault();
	clearResults();
	let searchTerm = $(event.currentTarget).find('input[name="ytSearchString"]').val();
  	queryYouTubeAPI(searchTerm, renderSearchResults);

	});

}

function constructTemplateHTML() {
	$('.resultTemplate').html(`
				<div class="js-result-template">
            		<div class="search-result-item">
		                <a href="" target="_blank">
		                <img src="">
		                </a>
        			</div>
        		<div>`);
}


function runApp() {
	submitButtonClicked();
	constructTemplateHTML();
}

runApp();

