
$(document).ready(function(){
    console.log("ready");
    getData();
});

function getData(){

    var apiPath = "local-data.json";

    var jqxhr = $.getJSON(apiPath, function(data) {
            parseData(data);
        }).
        fail(function(e){
            console.log("Error: ", e);
        });
}

function parseData(json){

    var blockData = [];

    $.each(json.data, function(key1, item) {
        blockData.push({"height": item.height, "block_time": item.block_time});
    });

    evalTime(blockData);
}

function evalTime(blockData){
    
    for (i = 0; i < blockData.length; i++) { 
        if (i != 0){

            if (blockData[i].height == blockData[i-1].height){
                console.log("duplicate block", blockData[i].height);
            }

            var d1 = Date.parse(blockData[i].block_time);
            var d2 = Date.parse(blockData[i-1].block_time);

            var diff = Math.abs(d1 - d2);
            console.log(blockData[i].height, blockData[i-1].height, returnSeconds(diff) );

        }
    }
}

function returnSeconds(time){
    return time / 1000;
}