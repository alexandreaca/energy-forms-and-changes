/* eslint-disable */
const img = new Image();
window.phetImages.push( img );
img.src = 'data:image/png;base64,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';
export default img;
