export const parseVideoDuration = (duration) => {
  const durationParts = duration
    .replace("PT", "")
    .replace("H", "")
    .replace("M", "")
    .replace("S", "")
    .split(":");
//     console.log('durgation',durationParts);

if (durationParts.length === 3) {
     // If the duration has hours, minutes, and seconds
     return `${durationParts[0]}:${
       parseInt(durationParts[1]) < 10 ? `0${durationParts[1]}` : durationParts[1]
     }:${
       parseInt(durationParts[2]) < 10 ? `0${durationParts[2]}` : durationParts[2]
     }`;
   }
   
   if (durationParts.length === 2) {
     // If the duration has only minutes and seconds
     return `${durationParts[0]}:${
       parseInt(durationParts[1]) < 10 ? `0${durationParts[1]}` : durationParts[1]
     }`;
   }
   
   if (durationParts.length === 1) {
     // If the duration has only seconds
     return `0:${
       parseInt(durationParts[0]) < 10 ? `0${durationParts[0]}` : durationParts[0]
     }`;
   }
   
  return "";
};
