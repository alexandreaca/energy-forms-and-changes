/* eslint-disable */
var img = new Image();
window.phetImages.push( img );
img.src = 'data:image/png;base64,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';
export default img;
