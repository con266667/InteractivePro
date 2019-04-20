
video = document.getElementById('playVideo');
links = document.getElementById('links');
var linkshide;
var rowNumber;

function setupCreate(){
    document.getElementById('setup').style.display = "block";
    document.getElementById('setupClose').style.display = "block";
    document.getElementById('createButtons').style.display = "none";
}

function setupClose(){
    document.getElementById('setup').style.display = "none";
    document.getElementById('setupClose').style.display = "none";
    document.getElementById('createButtons').style.display = "block";
    passages = document.getElementById('passages').value;
    for(i=0;i<parseInt(passages);i++){
        name = document.getElementById('setupName'+(i+1)).value;
        document.getElementById('uploads'+(i+1)).id = name;
    };
}

function showPlay(){
        video.play();
        upload = document.getElementById('setupName1').value;
        passages = document.getElementById('passages').value;
        document.getElementById('create').style.display = "none";
        document.getElementById('play').style.display = "block";
        linkFirst = document.getElementById('setupFirst1').value;
        linkSecond = document.getElementById('setupSecond1').value;
        document.getElementById('first').value = linkFirst;
        document.getElementById('second').value = linkSecond;
        videosrc = document.getElementById(upload).value;
        document.getElementById('videoSource').src = videosrc;
        v=1;
        
}

function firstLink(){
    timeToEnd = (video.duration - video.currentTime)*1000;
    setTimeout(function(){
        //Set Video Source
        nameFirst = document.getElementById('setupFirst'+v).value;
        videosrc2 = document.getElementById(nameFirst).value;
        videoNumber = document.getElementById(nameFirst).className;
        v=videoNumber;
        video.src = videosrc2;
        //Set Links
        linkOne = document.getElementById('setupFirst'+videoNumber).value;
        linkTwo = document.getElementById('setupSecond'+videoNumber).value;
        document.getElementById('first').value = linkOne;
        document.getElementById('second').value = linkTwo;
    }, timeToEnd);
    hideLinks();
}

function secondLink(){
    timeToEnd = (video.duration - video.currentTime)*1000;

    setTimeout(function(){
        //Set Video Source
        nameSecond = document.getElementById('setupSecond'+v).value;
        videosrc2 = document.getElementById(nameSecond).value;
        videoNumber = document.getElementById(nameSecond).className;
        v=videoNumber;
        video.src = videosrc2;
        //Set Links
        linkOne = document.getElementById('setupFirst'+videoNumber).value;
        linkTwo = document.getElementById('setupSecond'+videoNumber).value;
        document.getElementById('first').value = linkOne;
        document.getElementById('second').value = linkTwo;
    }, timeToEnd);  
    hideLinks();  
}

function hideLinks(){
    linkshide = true;
    links.style.display = 'none';
}

function setupSubmit(){
    console.log(rowNumber);
    var rows = document.getElementById('setupTable').rows.length;
    for(var i=parseInt(rows, 10);i>-1;i--){
        document.getElementById('setupTable').deleteRow(i-1);
    };
    passages = document.getElementById('passages').value;
    for(var r=0;r<parseInt(passages);r++){
        var x = document.getElementById('setupTable').insertRow(r);
        rowNumber = r+1;
        //Create File Input
        rowInput = document.createElement('input');
        rowInput.setAttribute("type", "text");
        rowInput.setAttribute("value", "Video Link");
        rowInput.setAttribute("id", "uploads"+rowNumber+"");
        rowInput.setAttribute("class", rowNumber);
        //Create Name Input
        rowName = document.createElement('input');
        rowName.setAttribute("type", "text");
        rowName.setAttribute("value", "Name");
        rowName.setAttribute("id", "setupName"+rowNumber+"");
        rowName.setAttribute("class", rowNumber);
        //Create First Link Input
        rowFirst = document.createElement('input');
        rowFirst.setAttribute("type", "text");
        rowFirst.setAttribute("value", "First Link");
        rowFirst.setAttribute("id", "setupFirst"+rowNumber+"");
        rowFirst.setAttribute("class", rowNumber);
        //Create Second Link Input
        rowSecond = document.createElement('input');
        rowSecond.setAttribute("type", "Second");
        rowSecond.setAttribute("value", "Second Link");
        rowSecond.setAttribute("id", "setupSecond"+rowNumber+"");
        rowSecond.setAttribute("class", rowNumber);
        //Add items to row
        x.appendChild(rowInput);
        x.appendChild(rowName);
        x.appendChild(rowFirst);
        x.appendChild(rowSecond);
   };  
}

video.ontimeupdate = function(){
    timeToEnd = (video.duration - video.currentTime)*1000;
    timeToLinks = parseInt(document.getElementById('secondToLinks').value)*1000;

    document.getElementById('bar').style.width = (timeToEnd/timeToLinks)*100+"%";
    document.getElementById('bar').style.marginLeft = (100-(timeToEnd/timeToLinks)*100)/2+"%";

    if(timeToEnd < timeToLinks){
        if (linkshide == false){
        links.style.display = "block";
        }
    }
}

video.onplay = function(){
    linkshide = false;
    links.style.display = "none";
}
