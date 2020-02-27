/* eslint-disable */
var img = new Image();
window.phetImages.push( img );
img.src = 'data:image/png;base64,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';
export default img;
