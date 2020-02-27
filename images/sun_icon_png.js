/* eslint-disable */
var img = new Image();
window.phetImages.push( img );
img.src = 'data:image/png;base64,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';
export default img;
