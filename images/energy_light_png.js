/* eslint-disable */
import simLauncher from '../../joist/js/simLauncher.js';
const image = new Image();
const unlock = simLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;