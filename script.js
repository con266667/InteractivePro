
video = document.getElementById('playVideo');
links = document.getElementById('links');
var linkshide;
var rowNumber;
var view = "create";
checkbox = document.getElementById('hint');

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
        view = "play";
        links.style.opacity = "";
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
        video.src = videosrc;
        video.play();
        v=1;
        
}

function firstLink(){
    document.getElementById('first').style.background = "white";
    timeToEnd = (video.duration - video.currentTime)*1000;
    setTimeout(function(){
        document.getElementById('first').style.background = "";
        document.getElementById('second').style.background = "";
        //Set Video Source
        nameFirst = document.getElementById('setupFirst'+v).value;
        if(checkbox.checked == true){
            hint = document.getElementById('hintFirst'+v).value;
            videosrc2 = document.getElementById(nameFirst+hint).value;
            videoNumber = document.getElementById(nameFirst+hint).className;
        } else {
            videosrc2 = document.getElementById(nameFirst).value;
            videoNumber = document.getElementById(nameFirst).className;
        }
        v=videoNumber;
        video.src = videosrc2;
        //Set Links
        end = document.getElementById("end"+v);
        if(end.checked == false){
            linkOne = document.getElementById('setupFirst'+videoNumber).value;
            linkTwo = document.getElementById('setupSecond'+videoNumber).value;
            document.getElementById('first').value = linkOne;
            document.getElementById('second').value = linkTwo;
        } else {
            links.style.opacity = "0";
        }
        
    }, timeToEnd);
    hideLinks();
}

function secondLink(){
    document.getElementById('second').style.background = "white";
    timeToEnd = (video.duration - video.currentTime)*1000;
    setTimeout(function(){
        document.getElementById('first').style.background = "";
        document.getElementById('second').style.background = "";
        //Set Video Source
        nameSecond = document.getElementById('setupSecond'+v).value;
        if(checkbox.checked == true){
            hint = document.getElementById('hintSecond'+v).value;
            videosrc2 = document.getElementById(nameSecond+hint).value;
            videoNumber = document.getElementById(nameSecond+hint).className;
        } else {
            videosrc2 = document.getElementById(nameSecond).value;
            videoNumber = document.getElementById(nameSecond).className;
        }
        
        v=videoNumber;
        video.src = videosrc2;
        //Set Links
        end = document.getElementById("end"+v);
        if(end.checked == false){
            linkOne = document.getElementById('setupFirst'+videoNumber).value;
            linkTwo = document.getElementById('setupSecond'+videoNumber).value;
            document.getElementById('first').value = linkOne;
            document.getElementById('second').value = linkTwo;
        } else {
            links.style.opacity = "0";
        }
    }, timeToEnd);  
    hideLinks();  
}

function hideLinks(){
    linkshide = true;
    links.className = 'links fadeout';
}

function setupSubmit(){
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
        rowInput.setAttribute("placeholder", "Video Link");
        rowInput.setAttribute("id", "uploads"+rowNumber+"");
        rowInput.setAttribute("class", rowNumber);
        //Create Name Input
        rowName = document.createElement('input');
        rowName.setAttribute("type", "text");
        rowName.setAttribute("placeholder", "Name");
        rowName.setAttribute("id", "setupName"+rowNumber+"");
        rowName.setAttribute("class", rowNumber);
        //Create First Link Input
        rowFirst = document.createElement('input');
        rowFirst.setAttribute("type", "text");
        rowFirst.setAttribute("placeholder", "First Link");
        rowFirst.setAttribute("id", "setupFirst"+rowNumber+"");
        rowFirst.setAttribute("class", rowNumber);
        //Create Second Link Input
        rowSecond = document.createElement('input');
        rowSecond.setAttribute("type", "Second");
        rowSecond.setAttribute("placeholder", "Second Link");
        rowSecond.setAttribute("id", "setupSecond"+rowNumber+"");
        rowSecond.setAttribute("class", rowNumber);

        rowEnd = document.createElement('input');
        rowEnd.setAttribute("type", "checkbox");
        rowEnd.setAttribute("id", "end"+rowNumber+"");
        rowEnd.setAttribute("class", rowNumber);

        //Add items to row
        x.appendChild(rowInput);
        x.appendChild(rowName);
        x.appendChild(rowFirst);
        if(checkbox.checked == true){
        //Create Hint Input
        rowHintFirst = document.createElement('input');
        rowHintFirst.setAttribute("type", "text");
        rowHintFirst.setAttribute("placeholder", "Hint");
        rowHintFirst.setAttribute("id", "hintFirst"+rowNumber+"");
        rowHintFirst.setAttribute("class", rowNumber);
        x.appendChild(rowHintFirst);
        }
        x.appendChild(rowSecond);
        if(checkbox.checked == true){
        //Create Hint Input
        rowHintSecond = document.createElement('input');
        rowHintSecond.setAttribute("type", "text");
        rowHintSecond.setAttribute("placeholder", "Hint");
        rowHintSecond.setAttribute("id", "hintSecond"+rowNumber+"");
        rowHintSecond.setAttribute("class", rowNumber);
        x.appendChild(rowHintSecond);
        }
        x.appendChild(rowEnd);

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
        links.className = 'links';
        }
    }
}

video.onplay = function(){
    linkshide = false;
    links.style.display = "none";
}

video.onclick = function(){
    if(video.paused){
        video.play();
    } else {
        video.pause();
    }
}

window.onkeyup = function(e){
    if(view == "play"){
        video.pause();
        document.getElementById('create').style.display = "block";
        document.getElementById('play').style.display = "none";
        view = "create";
    }
    
    
}