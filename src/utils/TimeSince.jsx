export const TimeSince = (data)=>{

     const second = Math.floor((new Date().valueOf()- data.valueOf())/1000);
     let interval = second/31536000;
     
     if(interval > 1) {
          return Math.floor(interval) + "years"; // seconds in year
     }
     interval = second / 2592000;
     if(interval > 1){
          return Math.floor(interval)+ 'months'
     }
     interval = second / 86400;
     if(interval > 1){
          Math.floor(interval)+ 'days';
     }
     interval = second / 3600;
     if( interval > 1 ) {
           return Math.floor(interval)+ 'hours';
     }
     interval = second / 60;
     if(interval > 1){
          return Math.floor(interval)+'minutes';
     }
     return Math.floor(second)+ 'seconds';
}

