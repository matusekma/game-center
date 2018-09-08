$(document).ready(function() {
    addImage();
    $(".game").click(function() {
            $("#middle").empty();

            var gameName = $(this).data('name');
            var width = $(this).data('width');
            var height = $(this).data('height');

            addGame(gameName, width, height);
        }
    );

    $("#home").click(function(){
        $("#middle").empty();
        addImage();
    });

    $("#contact").click(function(){
        $("#middle").empty();
        var content = "Marton Matusek <br> <a href='mailto:matusekma@gmail.com'>matusekma@gmail.com</a>";
        var p = document.createElement("p");
        p.innerHTML = content;
        p.id = "contactp";
        $("#middle").append(p);
    });
});


function addImage(){
    var image = document.createElement("img");
    image.src = "/images/welcome.jpg";
    image.id = "welcomeimg";
    $("#middle").append(image);
}

function addGame(gameName, w, h){
    var frame = document.createElement("iframe");
    var width = w;
    var height = h;
    frame.src= "/" + gameName + "/index.html";
    frame.height = height + "px";
    frame.width = width + "px";
    frame.id = "frame";
    $("#middle").append(frame);
}






