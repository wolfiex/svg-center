'use strict';
/* *
 * Escape special characters in the given string of html.
 *
 * @param  {String} html
 * @return {String}
 */

 function shrink(s,scale=1,square=false) {
       var btop =[],bbottom =[],bleft=[],bright=[];
       //var s = document.getElementsByTagName('svg')[3];
       var swidth = s.clientWidth;
       var sheight = s.clientHeight;


       s.removeAttribute('viewBox');


       [...s.children].forEach(c =>{
       var val = c.getBoundingClientRect();
       // filter points not on image
       if (isFinite(val.top)){btop.push(val.top)};
       if (isFinite(val.bottom)){bbottom.push(val.bottom)};
       if (isFinite(val.left)){bleft.push(val.left)};
       if (isFinite(val.right)){bright.push(val.right)};
       })
console.log(bleft)

       btop = Math.min(...btop)/sheight;
       bbottom = Math.max(...bbottom)/sheight;
       bleft = Math.min(...bleft)/swidth
       bright = Math.max(...bright)/swidth;

       var by= Math.abs(btop-bbottom)*sheight;
       var bx= Math.abs(bleft-bright)*swidth ;
              //btop = (btop <0)?0:btop;
              //bleft = (bleft <0)?0:bleft;
console.log(bleft,bright,bbottom,btop,bx,by,'cw',swidth,sheight)

       s.setAttribute('preserveAspectRatio',"none");
       scale += .5e-4
       console.log(''+ (bleft)*scale+' '+(btop)*scale+
        ' '+bx+' '+by)


       s.setAttribute('viewBox',''+

         (bleft)*scale*swidth+' '+(btop)*scale*sheight+
         ' '+bx+' '+by);
       scale += .5e-4
       s.setAttribute('preserveAspectRatio',"xMinYMin meet");


         s.style.width = bx*scale;
         s.style.height = by*scale;
       if (square){
         s.style.width = square;
         s.style.height = square;
       }

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
  shrinkall: function(scale =1, square=false  ) {
        [...document.getElementsByTagName('svg')].forEach(s=>shrink(s,scale = scale,square = square))
        console.log('done')
  }
};
