
            var tempX = 0; // cursor x - y position....
            var tempY = 0;              
             
             
            function getMouseXY(event) {
                    tempX=zxcMse(event)[0];
                    tempY=zxcMse(event)[1];         
 
                    return true;
            }
 
 
            //----------------------------------
 
            var zxcEvt=0;
 
            function zxcMse(event){
                        if(!event) var event=window.event;
                        if (document.all){ return [event.clientX+zxcDocS()[0],event.clientY+zxcDocS()[1]]; }
                        else { return[event.pageX,zxcMseY=event.pageY]; }
                    }
 
                    function zxcDocS(){
                        var zxcsx,zxcsy;
                        if (!document.body.scrollTop){ zxcsx=document.documentElement.scrollLeft; zxcsy=document.documentElement.scrollTop; }
                        else { zxcsx=document.body.scrollLeft; zxcsy=document.body.scrollTop; }
                        return [zxcsx,zxcsy];
                    }
 
 
                     
 
                    function zxcEventAdd(zxco,zxct,zxcf){
                        if (zxco.addEventListener){ zxco.addEventListener(zxct, function(e){ zxco[zxcf](e);}, false); }
                        else if (zxco.attachEvent){ zxco.attachEvent('on'+zxct,function(e){ zxco[zxcf](e); }); }
                        else {
                            var zxcPrev=zxco['on'+zxct];
                            if (zxcPrev){ zxco['on'+zxct]=function(e){ zxcPrev(e); zxco[zxcf](e); }; }
                            else { zxco['on'+zxct]=zxco[zxcf]; }
                        }
                    }
 
                    function zxcAddEvt(zxcobj,zxcfun,zxcevt){
                        if (zxcobj[zxcevt+'add']){ return; }
                        zxcobj['zxcaddEvt'+zxcEvt]=window[zxcfun];
                        zxcobj[zxcevt+'add']=true;
                        zxcEventAdd(zxcobj,zxcevt,'zxcaddEvt'+zxcEvt);
                        zxcEvt++;
                    }
 
                    zxcAddEvt(document,'zxcDrag','mousemove');          
 
            //---------------------------------
 
 
            function popupcreate(){
                var bodyObj = document.getElementsByTagName('body')[0];
 
                //alert(tempX+" "+tempY+"---"); 
                if(document.getElementById('tooltip1')==null){
                    var divObj1 = document.createElement('div');
                    divObj1.id = "tooltip1";
                    divObj1.innerHTML = "This a trial content<br> Just to check that that it can function properly";
 
                    var divObj2 = document.createElement('div');
                    divObj2.id = "tooltip2";    
                    divObj2.innerHTML = '<img src="close.gif" id="img1" onclick="popclose()">';
                    divObj1.appendChild(divObj2);
 
                    bodyObj.appendChild(divObj1);
 
                    //getting cursor postion..          
                    //-------------------------------------         
                    var clientWidth = document.body.clientWidth; // client width & Height.....
                    var clientHeight = document.body.clientHeight;
 
                    var divWidth = 150;  // tooltip height & width hard coded .....
                    var divHeight = 150;
                    //-------------------------------------     
                
                
                    //alert(tempObj.style.width);   
                    var tempObj = document.getElementById('tooltip1');
                    if(tempX > divWidth){
                        if(tempY > divHeight){                       
                            tempObj.style.top = (tempY-divHeight)+"px";                                                             
                            tempObj.style.left = (tempX-divWidth)+"px";
                        }
                        else if(tempY < divHeight){
                            tempObj.style.top  = tempY+"px";                                                                
                            tempObj.style.left = (tempX-divWidth)+"px";
                        }
                    }
                    else if(tempX < divWidth){
                        if(tempY > divHeight){
                            tempObj.style.top  = (tempY-divHeight)+"px";                                                                
                            tempObj.style.left = tempX+"px";
                        }
                        else if(tempY < divHeight){
                            tempObj.style.top  = tempY+"px";
                            tempObj.style.left = tempX+"px";
                        }
                    }
                }               
            }   
 
            function popclose(){
                var bodyObj = document.getElementsByTagName('body')[0];
         
                var popElm = document.getElementById('tooltip1');
                bodyObj.removeChild(popElm);
            }    