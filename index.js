'use strict';
/* *
 * Escape special characters in the given string of html.
 *
 * @param  {String} html
 * @return {String}
 */

 function shrink(s) {
       var btop =[],bbottom =[],bleft=[],bright=[];
       //var s = document.getElementsByTagName('svg')[3];
       [...s.children].forEach(c =>{
       var val = c.getBoundingClientRect();

       // filter points not on image
       btop.push(val.top);
       bbottom.push(val.bottom);
       bleft.push(val.left);
       bright.push(val.right);
       })

       btop = Math.min(...btop);
       bbottom = Math.max(...bbottom);
       bleft = Math.min(...bleft);
       bright = Math.max(...bright);


       var bx= Math.abs(btop-bbottom);
       var by= Math.abs(bleft-bright);


              //btop = (btop <0)?0:btop;
              //bleft = (bleft <0)?0:bleft;
console.log(bleft,bright,bbottom,btop,bx,by)
       s.setAttribute('preserveAspectRatio',"none");
       s.style.width = bx;
       s.style.height = by;
       s.setAttribute('viewBox',''+bleft/s.clientWidth+' '+btop/s.clientHeight+ ' '+bx+' '+by);
       s.setAttribute('preserveAspectRatio',"xMinYMin meet");

       return s
 }
module.exports = {
  shrink: shrink,
  shrinkall: function() {
        [...document.getElementsByTagName('svg')].forEach(s=>shrink(s))
        console.log('done')
  }
};
