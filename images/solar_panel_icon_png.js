/* eslint-disable */
import simLauncher from '../../joist/js/simLauncher.js';
const image = new Image();
const unlock = simLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;