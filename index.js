'use strict';
/* *
 * Escape special characters in the given string of html.
 *
 * @param  {String} html
 * @return {String}
 */

 function shrink(s,scale=1,loop=0) {
       var btop =[],bbottom =[],bleft=[],bright=[];
       //var s = document.getElementsByTagName('svg')[3];
       var swidth = s.clientWidth;
       var sheight = s.clientHeight;


       s.removeAttribute('viewBox');


       [...s.children].forEach(c =>{
       var val = c.getBoundingClientRect();
       // filter points not on image
       btop.push(val.top);
       bbottom.push(val.bottom);
       bleft.push(val.left);
       bright.push(val.right);
       })


       btop = Math.min(...btop)/sheight;
       bbottom = Math.max(...bbottom)/sheight;
       bleft = Math.min(...bleft)/swidth
       bright = Math.max(...bright)/swidth;

       //if (s.origin === undefined){s.origin = {x:s.clientWidth,y:s.clientHeight}}

       var by= Math.abs(btop-bbottom)*sheight;
       var bx= Math.abs(bleft-bright)*swidth ;
              //btop = (btop <0)?0:btop;
              //bleft = (bleft <0)?0:bleft;
console.log(bleft,bright,bbottom,btop,bx,by)

       s.setAttribute('preserveAspectRatio',"none");
       scale += .5e-4
       s.setAttribute('viewBox',''+

         (bleft)*scale+' '+(btop)*scale+
         ' '+bx+' '+by);
       scale += .5e-4
       s.setAttribute('preserveAspectRatio',"xMinYMin meet");


         s.style.width = bx*scale;
         s.style.height = by*scale;

    /*if (loop >0 ){
      loop += 1
      shrink(s,scale=1,loop=loop)
    }  else{
       return s
    }*/
    return s
 }
module.exports = {
  shrink: shrink,
  shrinkall: function(scale =1 ) {
        [...document.getElementsByTagName('svg')].forEach(s=>shrink(s,scale = scale))
        console.log('done')
  }
};
