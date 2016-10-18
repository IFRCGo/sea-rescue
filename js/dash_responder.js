
// On page load show Responder data
jQuery(document).ready(function($){
  $('#responder').show();
  $("#phoenix").hide();
  $("#both").hide();
});

$("#vesselSelection").on("change", function(e) {
    selection = $("#vesselSelection").val();
    //console.log("forecast selection = ", selection);
    switch (selection) {
      case "responder":  $("#responder").show();
                  $("#phoenix").hide();
                  $("#both").hide();
                  break;
      case "phoenix": $("#responder").hide();
                  $("#phoenix").show();
                  $("#both").hide();
                  break;
      case "both": $("#responder").hide();
                  $("#phoenix").hide();
                  $("#both").show();
                  break;   
    };
  }); 

function hxlProxyToJSON(input,headers){
  var output = [];
  var keys=[];
  input.forEach(function(e,i){
      if(headers==true && i==0){
          keys = e;
      } else if(headers==true && i>1) {
          var row = {};
          e.forEach(function(e2,i2){
              row[keys[i2]] = e2;
          });
          output.push(row);
      } else if(headers!=true){
          var row = {};
          e.forEach(function(e2,i2){
              row[keys[i2]] = e2;
          });
          output.push(row);
      }
  });
  return output;
}

function generateStats(idA,idB,data){
    // Define variables for demographic stats
    var tEmbark    = 0;
        tDisembark = 0;
        tTransIn   = 0;
        tTransOut  = 0;
        tRescue    = 0;
        tMen       = 0;
        tWomen     = 0;
        tChild     = 0;
        tDead      = 0;
        tOps = data.length;

        // Responder variables
        rEmbark    = 0;
        rDisembark = 0;
        rTransIn   = 0;
        rTransOut  = 0;
        rRescue    = 0;
        rMen       = 0;
        rWomen     = 0;
        rChild     = 0;
        rDead      = 0;
        rOps       = 0;

        // Phoenix variables
        pEmbark    = 0;
        pDisembark = 0;
        pTransIn   = 0;
        pTransOut  = 0;
        pRescue    = 0;
        pMen       = 0;
        pWomen     = 0;
        pChild     = 0;
        pDead      = 0;
        pOps       = 0;

    // Define variables for operations counts
    var rRescueOps    = 0;
        rDisembarkOps = 0;
        rTransInOps   = 0;
        rTransOutOps  = 0;

        pRescueOps    = 0;
        pDisembarkOps = 0;
        pTransInOps   = 0;
        pTransOutOps  = 0;

    var pplRescuedr   = 0;
        pplTransInr   = 0;
        pplTransOutr  = 0;
        pplDisembarkr = 0;

        pplRescuedp   = 0;
        pplTransInp   = 0;
        pplTransOutp  = 0;
        pplDisembarkp = 0;

    for(i = 0; i < tOps; i++) {
      // Responder Stats
      if (data[i]['boat'] == "Responder") {
        numEmbark    = parseInt(data[i]['sTotal']);
        numDisembark = parseInt(data[i]['disTotal']);
        numDead   = parseInt(data[i]['dTotal']);

        if (!isNaN(numEmbark)) {rEmbark += numEmbark;};
        if (!isNaN(numDisembark)) {rDisembark += numDisembark;};
        if (!isNaN(numDead))  {rDead  += numDead;};

        if (data[i]['opType'] == "Rescue") {
          rRescueOps += 1;
          numRMen    = parseInt(data[i]['sMen']) + parseInt(data[i]['dMen']);
          numRWomen  = parseInt(data[i]['sWomen']) + parseInt(data[i]['dWomen']);
          numRChild  = parseInt(data[i]['sChildren']) + parseInt(data[i]['dChildren']);

          if (!isNaN(numRMen))   {rMen   += numRMen;};
          if (!isNaN(numRWomen)) {rWomen += numRWomen;};
          if (!isNaN(numRChild)) {rChild += numRChild;};

          pplRescuedr += parseInt(data[i]['sTotal']);
        } else if (data[i]['opType'] == "Disembarkment") {
          rDisembarkOps += 1;
          pplDisembarkr += parseInt(data[i]['disTotal']);
        } else if (data[i]['opType'] == "Transfer In") {
          rTransInOps += 1;

          numTiMen    = parseInt(data[i]['sMen']) + parseInt(data[i]['dMen']);
          numTiWomen  = parseInt(data[i]['sWomen']) + parseInt(data[i]['dWomen']);
          numTiChild  = parseInt(data[i]['sChildren'])  + parseInt(data[i]['dChildren']);

          if (!isNaN(numTiMen))   {rMen   += numTiMen;};
          if (!isNaN(numTiWomen)) {rWomen += numTiWomen;};
          if (!isNaN(numTiChild)) {rChild += numTiChild;};

          pplTransInr += parseInt(data[i]['sTotal']);
        } else if (data[i]['opType'] == "Transfer Out") {
          rTransOutOps += 1;
          pplTransOutr += parseInt(data[i]['disTotal']);
        }
      }

      if (data[i]['boat'] == "Phoenix") {
        numEmbark    = parseInt(data[i]['sTotal']);
        numDisembark = parseInt(data[i]['disTotal']);
        numDead      = parseInt(data[i]['dTotal']);

        if (!isNaN(numEmbark)) {pEmbark += numEmbark;};
        if (!isNaN(numDisembark)) {pDisembark += numDisembark;};
        if (!isNaN(numDead)) {pDead += numDead;};

        if (data[i]['opType'] == "Rescue") {
          pRescueOps += 1;
          numRMen    = parseInt(data[i]['sMen']) + parseInt(data[i]['dMen']);
          numRWomen  = parseInt(data[i]['sWomen']) + parseInt(data[i]['dWomen']);
          numRChild  = parseInt(data[i]['sChildren']) + parseInt(data[i]['dChildren']);

          if (!isNaN(numRMen))   {pMen   += numRMen;};
          if (!isNaN(numRWomen)) {pWomen += numRWomen;};
          if (!isNaN(numRChild)) {pChild += numRChild;};

          pplRescuedp += parseInt(data[i]['sTotal']);
        } else if (data[i]['opType'] == "Disembarkment") {
          pDisembarkOps += 1;
          pplDisembarkp += parseInt(data[i]['disTotal']);
        } else if (data[i]['opType'] == "Transfer In") {
          pTransInOps += 1;

          numTiMen    = parseInt(data[i]['sMen']) + parseInt(data[i]['dMen']);
          numTiWomen  = parseInt(data[i]['sWomen']) + parseInt(data[i]['dWomen']);
          numTiChild  = parseInt(data[i]['sChildren'])  + parseInt(data[i]['dChildren']);

          if (!isNaN(numTiMen))   {pMen   += numTiMen;};
          if (!isNaN(numTiWomen)) {pWomen += numTiWomen;};
          if (!isNaN(numTiChild)) {pChild += numTiChild;};

          pplTransInp += parseInt(data[i]['sTotal']);
        } else if (data[i]['opType'] == "Transfer Out") {
          pTransOutOps += 1;
          pplTransOutp += parseInt(data[i]['disTotal']);
        }
      }
  }

    tRescueOps    = rRescueOps + pRescueOps;
    tDisembarkOps = rDisembarkOps + pDisembarkOps;
    tTransInOps   = rTransInOps + pTransInOps;
    tTransOutOps  = rTransOutOps + pTransOutOps;

    tMen       = rMen + pMen;
    tWomen     = rWomen + pWomen;
    tChild     = rChild + pChild;
    tDead      = rDead + pDead;

    pplRescued   = pplRescuedr + pplRescuedp;
    pplTransIn   = pplTransInr + pplTransInp;
    pplTransOut  = pplTransOutr + pplTransOutp;
    pplDisembark = pplDisembarkr + pplDisembarkp;

    var diff = tEmbark - pplTransIn;

    /*    console.log("Responder Ops: " + rRescueOps);
        console.log("Phoenix Ops: " + pRescueOps);
        console.log("Phoenix Men: " + pMen);

        console.log("Total Embarked: " + tEmbark);
        console.log("Total Disembarked: " + tDisembark);
        console.log("Total Men: " + tMen);
        console.log("Total Women: " + tWomen);
        console.log("Total Children: " + tChild);
        console.log("Total Dead: " + tDead);

        console.log("Total Rescued: " + pplRescued);
        console.log("Total Transferred In: " + pplTransIn);
        console.log("Total Transferred Out: " + pplTransOut);
        console.log("Total Disembarked: " + pplDisembark);
    */

    var pplCaredFor = pplRescued + pplTransIn + tDead;
        pplCaredForR = pplRescuedr + pplTransInr + rDead;
        pplCaredForP = pplRescuedp + pplTransInp + pDead;

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
      })

    $("#responder").html("");
    $("#phoenix").html("");
    $("#both").html("");

    $("#responder").append("<h4>People Cared For: " + pplCaredForR + "</h4>" +
                           "<canvas id='rChart' width=200 height=200></canvas><div class='row'><div class='col-sm-6'><img width='35' height='35' data-toggle='tooltip' data-placement='right' alt='Rescue Symbol' title='People Rescued' src='img/icons/rescue_red.svg'><span class='stats'>" + pplRescuedr + "</span></div><div class='col-sm-6'><img width='35' height='35' alt='Disembark Symbol' data-toggle='tooltip' data-placement='top' title='People Disembarked to Land' src='img/icons/disembark_red.svg'><span class='stats'>" + pplDisembarkr + "</span></div></div><div class='row'><div class='col-sm-6'><img width='35' height='35' alt='Transferred In Symbol' data-toggle='tooltip' data-placement='right' title='People Transferred to the Responder' src='img/icons/trans_in_red.svg'><span class='stats'>" + pplTransInr + "</span></div><div class='col-sm-6'><img width='35' height='35' alt='Transferred Out Symbol' data-toggle='tooltip' data-placement='top' title='People Transferred from the Responder' src='img/icons/trans_out_red.svg'><span class='stats'>" + pplTransOutr + "</span></div></div><div class='row'><div class='col-sm-6'><img width='35' height='35' alt='Deceased Symbol' data-toggle='tooltip' data-placement='right' title='Deceased or Missing People' src='img/icons/deceased_red.svg'><span class='stats'>" + rDead + "</span></div><div class='col-sm-6'><img width='35' height='35' alt='Operations Symbol' data-toggle='tooltip' data-placement='top' title='Number of Rescue Operations' src='img/icons/operations_red.svg'><span class='stats'>" + rRescueOps + "</span></div></div> <!-- stats row -->");

    $("#phoenix").append("<h4>People Cared For: " + pplCaredForP + "</h4>" +
                           "<canvas id='pChart' width=200 height=200></canvas><div class='row'><div class='col-sm-6'><img width='35' height='35' alt='Rescue Symbol' data-toggle='tooltip' data-placement='right' title='People Rescued' src='img/icons/rescue_red.svg'><span class='stats'>" + pplRescuedp + "</span></div><div class='col-sm-6'><img width='35' height='35' alt='Disembark Symbol' data-toggle='tooltip' data-placement='top' title='People Disembarked to Land' src='img/icons/disembark_red.svg'><span class='stats'>" + pplDisembarkp + "</span></div></div><div class='row'><div class='col-sm-6'><img width='35' height='35' alt='Transferred In Symbol' data-toggle='tooltip' data-placement='right' title='People Transferred to the Responder' src='img/icons/trans_in_red.svg'><span class='stats'>" + pplTransInp + "</span></div><div class='col-sm-6'><img width='35' height='35' alt='Transferred Out Symbol' data-toggle='tooltip' data-placement='top' title='People Transferred from the Responder' src='img/icons/trans_out_red.svg'><span class='stats'>" + pplTransOutp + "</span></div></div><div class='row'><div class='col-sm-6'><img width='35' height='35' alt='Deceased Symbol' data-toggle='tooltip' data-placement='right' title='Deceased or Missing People' src='img/icons/deceased_red.svg'><span class='stats'>" + pDead + "</span></div><div class='col-sm-6'><img width='35' height='35' alt='Operations Symbol' data-toggle='tooltip' data-placement='top' title='Number of Rescue Operations' src='img/icons/operations_red.svg'><span class='stats'>" + pRescueOps + "</span></div></div> <!-- stats row -->");

    $("#both").append("<h4>People Cared For: " + pplCaredFor + "</h4>" +
                           "<canvas id='tChart' width=200 height=200></canvas><div class='row'><div class='col-sm-6'><img width='35' height='35' alt='Rescue Symbol' data-toggle='tooltip' data-placement='right' title='People Rescued' src='img/icons/rescue_red.svg'><span class='stats'>" + pplRescued + "</span></div><div class='col-sm-6'><img width='35' height='35' alt='Disembark Symbol' data-toggle='tooltip' data-placement='top' title='People Disembarked to Land' src='img/icons/disembark_red.svg'><span class='stats'>" + pplDisembark + "</span></div></div><div class='row'><div class='col-sm-6'><img width='35' height='35' alt='Transferred In Symbol' data-toggle='tooltip' data-placement='right' title='People Transferred to the Responder' src='img/icons/trans_in_red.svg'><span class='stats'>" + pplTransIn + "</span></div><div class='col-sm-6'><img width='35' height='35' alt='Transferred Out Symbol' data-toggle='tooltip' data-placement='top' title='People Transferred from the Responder' src='img/icons/trans_out_red.svg'><span class='stats'>" + pplTransOut + "</span></div></div><div class='row'><div class='col-sm-6'><img width='35' height='35' alt='Deceased Symbol' data-toggle='tooltip' data-placement='right' title='Deceased or Missing People' src='img/icons/deceased_red.svg'><span class='stats'>" + tDead + "</span></div><div class='col-sm-6'><img width='35' height='35' alt='Operations Symbol' data-toggle='tooltip' data-placement='top' title='Number of Rescue Operations' src='img/icons/operations_red.svg'><span class='stats'>" + tRescueOps + "</span></div></div> <!-- stats row -->");

    


      //var htmlA = '<h3>KEY STATISTICS</h3>';
      
      //htmlA = '<h4>People Cared For: ' + pplCaredForR + '</h4>";

      //$(idA).html(htmlA);
      generatePieCharts(tMen,tWomen,tChild,tDead,pMen,pWomen,pChild,pDead,rMen,rWomen,rChild,rDead);
}

function generateCharts(data) {
    

}

function outputMedia(media) {
  var o1 = "";
      o2 = "";
      o3 = "";

  var videoArray = [];
  var storyArray = [];
  var photoArray = [];

  // Push list items to arrays by category
  for (i = 0; i < media.length; i++) {
    if (media[i]['Category'] == "Video") {
      videoArray.push("<li class=list-group-item><a href=" + media[i]['URL'] + ">" + media[i]['Title'] + "</a></li> ");
    } else if (media[i]['Category'] == "Story") {
      storyArray.push("<li class=list-group-item><a href=" + media[i]['URL'] + ">" + media[i]['Title'] + "</a></li> ");
    } else if (media[i]['Category'] == "Photos") {
      photoArray.push("<li class=list-group-item><a href=" + media[i]['URL'] + ">" + media[i]['Title'] + "</a></li> ");
    }
  }

  // Output first five items per category if more than 5
  for ( k = 0; k < 5; k++ ) {
    if (k > videoArray.length - 1) { break; }
    o1 += videoArray[k];
  }
  for ( k = 0; k < 5; k++ ) {
    if (k > storyArray.length - 1) { break; }
    o2 += storyArray[k];
  }
  for ( k = 0; k < 5; k++ ) {
    if (k > photoArray.length - 1) { break; }
    o3 += photoArray[k];
  }

  var html1 = "";
      html1 = html1 + o1;

  var html2 = "";
      html2 = html2 + o2;

  var html3 = "";
      html3 = html3 + o3;

  $(videoOutput).html(html1);
  $(newsOutput).html(html2);
  $(photoOutput).html(html3);
}

function generatePieCharts(tm,tw,tc,td,pm,pw,pc,pd,rm,rw,rc,rd) {
  var tChart = document.getElementById("tChart");
  var tData = {
    labels: ["Men","Women","Children"],
    datasets: [
      {
        data: [tm,tw,tc],
        backgroundColor: [
              "#CD0000",
              "#EE3B3B",
              "#F08080"
          ],
          hoverBackgroundColor: [
              "#CD0000",
              "#EE3B3B",
              "#F08080"
          ]
        }]
  };

  tChart = new Chart(tChart,{
    type: 'pie',
    data: tData,
    options: {
      legend: {
        display: false
      }
    }
  });

  var rChart = document.getElementById("rChart");
  var rData = {
    labels: ["Men","Women","Children"],
    datasets: [
      {
        data: [rm,rw,rc],
        backgroundColor: [
              "#CD0000",
              "#EE3B3B",
              "#F08080"
          ],
          hoverBackgroundColor: [
              "#CD0000",
              "#EE3B3B",
              "#F08080"
          ]
        }]
  };

  rChart = new Chart(rChart,{
    type: 'pie',
    data: rData,
    options: {
      legend: {
        display: false
      }
    }
  });

  var pChart = document.getElementById("pChart");
  var pData = {
    labels: ["Men","Women","Children"],
    datasets: [
      {
        data: [pm,pw,pc],
        backgroundColor: [
              "#CD0000",
              "#EE3B3B",
              "#F08080"
          ],
          hoverBackgroundColor: [
              "#CD0000",
              "#EE3B3B",
              "#F08080"
          ]
        }]
  };

  pChart = new Chart(pChart,{
    type: 'pie',
    data: pData,
    options: {
      legend: {
        display: false
      }
    }
  });

}

var dataCall = $.ajax({
    type: 'GET',
    url: 'https://proxy.hxlstandard.org/data.json?strip-headers=off&force=on&url=https%3A//docs.google.com/spreadsheets/d/1RnEigM1KUihlDe9hlM8ndLZro6CIv90fol8HVpnQnYg/pub%3Fgid%3D613947999%26single%3Dtrue%26output%3Dcsv',
    dataType: 'json',
});

var mediaCall = $.ajax({
    type: 'GET',
    url: 'https://proxy.hxlstandard.org/data.json?strip-headers=off&force=on&url=https%3A//docs.google.com/spreadsheets/d/1pH0ztwQ8_EUOIKHhi1U15A6W4eLgCnn8IoWBEYTVnUM/pub%3Fgid%3D0%26single%3Dtrue%26output%3Dcsv',
    dataType: 'json',
});

$.when(dataCall,mediaCall).then(function(dataArgs,mediaArgs){
    var data  = hxlProxyToJSON(dataArgs[0],true);
        media = hxlProxyToJSON(mediaArgs[0],true);

    data.forEach(function(d){
        d['Date'] = d3.timeParse("%d/%m/%Y")(d['Date']);
    });

    media.forEach(function(d){
        d['Date'] = d3.timeParse("%d/%m/%Y")(d['DATE']);
    });

    function sortByDateAscending(a,b) {
        //return a["#date"] - b["#date"];
        return a["Date"]>b["Date"] ? -1 : a["Date"]<b["Date"] ? 1 : 0;
    }

    data = data.sort(sortByDateAscending);

    media = media.sort(sortByDateAscending);

    console.log("Data: ", data);
    console.log("Media: ", media);
    outputMedia(media);
    generateStats("#tot_stats","#ops_stats",data);
});
