/* eslint-disable */
import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;