export const dimensions = () => {
   const {innerWidth, innerHeight} = window
   return {
     width: innerWidth,
     height: innerHeight,
     ratio: innerWidth / innerHeight,
     center: {
       x: innerWidth / 2,
       y: innerHeight / 2
     }
   }
}