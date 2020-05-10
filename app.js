 $(function(){
     let mode = false;// 0 will be false
     var timecounter = 0;//time
     var lapcounter = 0;//lap
     var action // variable for setinterval
     var lapnumber=0;
     
    //min ,sec,centi
     var timemin,timesec,timecentisec,lapmin,lapsec,lapcentisec;
     
     //click on stop button
        $("#stopbtn").click(function(){
           //show resume and reset button
            hideshowbutton('#resumebtn','#resetbtn');
            //stopcounter
          clearInterval(action);
        });
     
     //click on resume button
       $("#resumebtn").click(function(){
           //show stop and lap button
            hideshowbutton('#stopbtn','#lapbtn');
            //startcounter
            startaction();
        });
     
     //click on reset button
       $("#resetbtn").click(function(){
           //show start and lap button
            hideshowbutton('#startbtn','#lapbtn');
            //reload page
            location.reload();
        });
     
     //click on lap btn
     $("#lapbtn").click(function(){
           //if mode is on
            if(mode==true){
                //stop action
                clearInterval(action);
                //reset lap and print details
                lapcounter=0;
                addlap();
                //start action
                startaction();
            }
        });
     
     
     //on app load show start and lap btn
     hideshowbutton("#startbtn","#lapbtn");
     
     //click on start btn
     $("#startbtn").click(function(){
        //mode on
         mode = true; // 1
         //show stop and lap btn
         hideshowbutton("#stopbtn","#lapbtn");
         //start counter
         startaction();
     });
 
     //functions
     function  hideshowbutton(x,y){
         $(".control").hide();
         $(x).show();
         $(y).show();
         
     }
     
     //start counter function
     function  startaction(){
         action = setInterval(function(){
             timecounter++;
             if(timecounter == 100*60*100){
                 timecounter=0;
             }
             lapcounter++;
              if(lapcounter == 100*60*100){
                 lapcounter=0;
             }
             //function call to update time in each milisec
             updatetime();
         },10);
     }
     //updatetime function : convert counter to min sec and centisec
     function updatetime(){
         //1 sec =100 centisec
         //1min = 60s * 100cs =6000cs
         timemin=Math.floor(timecounter/6000);
         timesec=Math.floor((timecounter%6000)/100);
         timecentisec=(timecounter%6000)%100;
         
         $("#timemin").text(formatnumber(timemin));
          $("#timesec").text(formatnumber(timesec));
          $("#timecentisec").text(formatnumber(timecentisec));
         
         //same for lap
         lapmin=Math.floor(lapcounter/6000);
         lapsec=Math.floor((lapcounter%6000)/100);
         lapcentisec=(lapcounter%6000)%100;
         
          $("#lapmin").text(formatnumber(lapmin));
          $("#lapsec").text(formatnumber(lapsec));
          $("#lapcentisec").text(formatnumber(lapcentisec));
         
     }
     
     //format numbers
     function formatnumber(number){
         if(number<10){
             return '0'+number;
         }
         else{
             return number;
             
         }
     }
     //print lap details inside the lap box
     function addlap(){
         lapnumber++;
    var mylapdetails = '<div class="lap">'+
                            '<div class="laptimetitle">'+
                                'lap'+lapnumber+
                            '</div>'+
                            '<div class="laptime">'+
                                '<span>'+formatnumber(lapmin)+'</span>'+
                                 ':<span>'+formatnumber(lapsec)+'</span>'+
                                 ':<span>'+formatnumber(lapcentisec)+'</span>'+
                            '</div>'+
                       '</div>';
         $(mylapdetails).prependTo("#laps");
     }
 });
