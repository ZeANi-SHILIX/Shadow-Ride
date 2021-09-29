/*
* Get: list of stops in route.
* Do: calculate per 2 stop.
* Return: final right/left.
*/

function persentPerRoute(stopslist){
    var cBus,persent,persentSide, sum_cBus=0;
    var sumR_cBus=0,sumL_cBus=0;
    for( i=0 ; i<stopslist.lengh - 1 ; i++){
        cBus = anglePer2stops(stopslist[i],stopslist[i+1]);
        cBus_getSide = get_R_L_by_cBus(cBus);
        
        if (cBus_getSide=="r"){
            sumR_cBus++;
            sum_cBus++;
        }
        if (cBus_getSide=="l"){
            sumL_cBus++;
            sum_cBus--;
        }
    }

    
    if(sum_cBus>0){
        persent = sumR_cBus/stopslist.lengh;
        persentSide ="r";
    }
    else{
        persent = sumL_cBus/stopslist.lengh;
        persentSide ="l";
    } 

    return {persent,persentSide};

}

function get_R_L_by_cBus(cBus){
    var side;

    //reset to possitive number
    if (cBus<0){
        cBus+=360;
    }

    // in right side
    if (cBus<180){

        // diff littel then 10, will not count
        if(Math.abs(cBus-180)<10){
            side=null;
        } 
        else {
            side = "r";
        }
    }
    // in left side
    else {

        // diff littel then 10, will not count
        cBus-=180; // for abs value
        if(Math.abs(cBus-180)<10){
            side=null;
        } 
        else {
            side = "l";
        }
    }

    return side;
}



/*
* Get: two stops (close to each other) on a bus line.
* Return: the angle (c) of the bus.
*/
function anglePer2stops(startStop, endStop){ 
    //Find the celuis of the bus to Y-axis
    var cBus;
    xDiff = endStop.x - startStop.x; //.x is Longitude
    yDIff = endStop.y - startStop.y; //.y is Latitude

    if(yDIff==0&&xDiff==0){
        //ERROR: Same location!! TODO:------------
    }
    // Math.atan2 return value in radians.
    cBus = Math.atan2(yDIff,xDiff) * 180 / Math.PI;
    // cBus has celius to X-axis, so we need to convert it.
    cBus = xAngle_to_yAngle(cBus);

    //check if xDiff is nagtiv.
    //check if XDiff is equale (yDiff is the angle)
    return cBus;
}



/*
* Get the angle (c) between bus and the X-axis
* Return the angle (c) between bus and the Y-axis
*/
function xAngle_to_yAngle(xAngle){
    if (xAngle=>180)
    { yAngle=-(xAngle-90); }
    else
    { yAngle=90+(-xAngle); }
    return yAngle;
}
