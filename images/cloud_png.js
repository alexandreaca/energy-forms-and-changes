/* eslint-disable */
const img = new Image();
window.phetImages.push( img );
img.src = 'data:image/png;base64,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';
export default img;
