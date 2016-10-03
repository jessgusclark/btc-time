
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
        //console.log("Block " + item.height, "at " + item.block_time);
        blockData.push({"height": item.height, "block_time": item.block_time});
    });

    //console.log(blockData.length);
    evalTime(blockData);
}

function evalTime(blockData){
    var timeDifference = [];

    for (i = 0; i < blockData.length; i++) { 
        if (i != 0){

            if (blockData[i].height == blockData[i-1].height){
                console.log("duplicate block", blockData[i].height);
            }

            var d1 = Date.parse(blockData[i].block_time);
            var d2 = Date.parse(blockData[i-1].block_time);
            console.log(d1, d2);

            timeDifference.push(d2-d1);
            //console.log(blockData[i].height, d2-d1);
            //document.write(blockData[i].height + "," + d2-d1);
            //$("pre").append(blockData[i].height + "," + d2-d1);
        }
    }
}