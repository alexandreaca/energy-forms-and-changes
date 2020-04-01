/* eslint-disable */
const img = new Image();
window.phetImages.push( img );
img.src = 'data:image/png;base64,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';
export default img;
