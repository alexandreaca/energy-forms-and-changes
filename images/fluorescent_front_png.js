/* eslint-disable */
const img = new Image();
window.phetImages.push( img );
img.src = 'data:image/png;base64,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';
export default img;
