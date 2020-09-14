/* eslint-disable */
import simLauncher from '../../joist/js/simLauncher.js';

const image = new Image();
const unlock = simLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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';
export default image;