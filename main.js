//declare firebase URL
var swiffs = new 
Firebase("https://swiffer.firebaseio.com/swiffs");

$(document).ready(function(){
    
    //declare some global variables
    var swiffList = $(".swiff-container");
    var swiffContainer = $("#swiffs");
    var swiffArrayCount = 0;
    
    
    //Get Swiffs that have not expired yet
        var time = (new Date).getTime();
        swiffs.orderByChild("expiry").startAt(time).on("child_added", function(snapshot) {
            var childData = snapshot.val();
            createBlock(childData.swiffText, childData.expiry);
            swiffList.remove();
        });
    
   
    //Create swiff boxes
    
    function createBlock (text, expiry) { 
        
        swiffContainer.append('<li class="swiff-container swiffClass' + swiffArrayCount + '"><div class="swiff-inner"><div class="swiff-name">' + text + '</div><div class="swiff-timer">0s</div></div></li>');
        
        var currentSwiff = $(".swiffClass" + swiffArrayCount).hide().fadeIn(500);
        var currentSwiffTimer = $(".swiffClass" + swiffArrayCount + " .swiff-timer");
        currentSwiff.hide().fadeIn(300);
        
        var myInterval = setInterval(function() {
            var time = (new Date).getTime();
            var remaining = ((expiry - time)/1000).toFixed(0);
            currentSwiffTimer.text( remaining + "s");
            if (remaining == 0){
                clearInterval(myInterval);
                currentSwiffTimer.text("0s");
                currentSwiff.fadeOut(500);
            }  
        }, 1000);
        
        swiffArrayCount += 1;
    
    };
    
    //Add a new swiff when the button is clicked or enter is pressed
    
    $("#add").click(function(e){
        e.preventDefault();
        var time = (new Date).getTime();
        var swiffText = $("#swiffText").val();
        var swiffDuration = $("#swiffDuration").val(); 
        var expiry = time + swiffDuration * 1000; 
        swiffs.push({
            expiry: expiry,
            swiffText: swiffText,
            size:1
        });
        $("#swiffText, #swiffDuration").val('');
    });
    
    $('#swiffText, #swiffDuration').keypress(function(e){
        if(e.which == 13){//Enter key pressed
            $('#add').click();//Trigger search button click event
        }
    });
});