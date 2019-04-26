
video = document.getElementById('playVideo');
links = document.getElementById('links');
var linkshide;
var linksclicked = false;
var rowNumber;
var view = "create";
checkbox = document.getElementById('hint');
file = document.getElementById('file');
var jsonlength;

file.onchange = function(){
    var uploadedFile = file.files[0]; 
    
    if (uploadedFile) {
        var readFile = new FileReader();
        readFile.onload = function(e) { 
            var contents = e.target.result;
            var json = JSON.parse(contents);
            got_data(json);
        };
        readFile.readAsText(uploadedFile);
    } else { 
        console.log("Failed to load file");
    }

    function got_data(json){
        //alert('Name : ' + json[0].name + ', Family : '+ json[0].link)
        var count = Object.keys(json).length;
        createRows(count, json);
        jsonlength = count;
    }
    
}

function setupCreate(){
    document.getElementById('setup').style.display = "block";
    document.getElementById('setupClose').style.display = "block";
    document.getElementById('createButtons').style.display = "none";
}

function setupClose(){
    document.getElementById('setup').style.display = "none";
    document.getElementById('setupClose').style.display = "none";
    document.getElementById('createButtons').style.display = "block";
    if(jsonlength == null){
    passages = document.getElementById('passages').value;
    } else {
    passages = jsonlength;
    }
    for(i=0;i<parseInt(passages);i++){
        name = document.getElementById('setupName'+(i+1)).value;
        document.getElementById('uploads'+(i+1)).id = name;
    };
}

function showPlay(){
        view = "play";
        links.style.opacity = "";
        document.getElementById('linksback').style.display = "block";
        document.getElementById('first').className = "first";
        document.getElementById('second').className = "second";
        document.getElementById('bar').className = "bar";
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
    if(linksclicked == false){
    document.getElementById('bar').classList.toggle('colorchange');
    document.getElementById('second').classList.toggle('textfade');
    document.getElementById('first').classList.toggle('chosen');
    timeToEnd = (video.duration - video.currentTime)*1000;
    linksclicked = true;
    setTimeout(function(){
        linksclicked = false;
        document.getElementById('first').className = "first";
        document.getElementById('second').className = "second";
        document.getElementById('bar').className = "bar";
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
        document.getElementById('linksback').classList.toggle('show');
        setTimeout(function(){
            end = document.getElementById("end"+v);
            if(end.checked == false){
                linkOne = document.getElementById('setupFirst'+videoNumber).value;
                linkTwo = document.getElementById('setupSecond'+videoNumber).value;
                document.getElementById('first').value = linkOne;
                document.getElementById('second').value = linkTwo;
            } else {
                links.style.opacity = "0";
                document.getElementById('linksback').style.display = "none";
            }
        },700)
        hideLinks(); 
    }, timeToEnd);
    }
}

function secondLink(){
    if(linksclicked == false){
    document.getElementById('bar').classList.toggle('colorchange');
    document.getElementById('first').classList.toggle('textfade');
    document.getElementById('second').classList.toggle('chosen');
    timeToEnd = (video.duration - video.currentTime)*1000;
    linksclicked = true;
    
    setTimeout(function(){
        linksclicked = false;
        document.getElementById('first').className = "first";
        document.getElementById('second').className = "second";
        document.getElementById('bar').className = "bar";
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
        document.getElementById('linksback').classList.toggle('show');
        setTimeout(function(){
            end = document.getElementById("end"+v);
            if(end.checked == false){
                linkOne = document.getElementById('setupFirst'+videoNumber).value;
                linkTwo = document.getElementById('setupSecond'+videoNumber).value;
                document.getElementById('first').value = linkOne;
                document.getElementById('second').value = linkTwo;
            } else {
                links.style.opacity = "0";
                document.getElementById('linksback').style.display = "none";
            }
        },700)
        
        hideLinks();
    }, timeToEnd);   
    }  
}

function hideLinks(){
    linkshide = true;
    links.classList.toggle('fadeout');
}

function setupSubmit(){
    passages = document.getElementById('passages').value;
    createRows(passages, null);
}

function createRows(passages, json2){
    var rows = document.getElementById('setupTable').rows.length;
    for(var i=parseInt(rows, 10);i>-1;i--){
        document.getElementById('setupTable').deleteRow(i-1);
    };
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
        if(json2 != null){
            rowInput.value = json2[r].link;
            rowName.value = json2[r].name;
            rowFirst.value = json2[r].first;
            rowSecond.value = json2[r].second;
            rowEnd.checked = json2[r].end;
        }
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
        document.getElementById('linksback').classList.toggle('show');
        linkshide = true;
        setTimeout(function(){
            links.style.display = "block";
            links.classList.toggle('fadeout');
        }, 1000);
        }
    }
}

video.onplay = function(){
    linkshide = false;
    links.style.display = "none";
}

window.onkeyup = function(e){
    if(e.code == "KeyA" && view == "play"){
        video.pause();
        document.getElementById('create').style.display = "block";
        document.getElementById('play').style.display = "none";
        view = "create";
    }    
}