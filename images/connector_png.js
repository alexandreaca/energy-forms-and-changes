/* eslint-disable */
import SimLauncher from '../../joist/js/SimLauncher.js';
const image = new Image();
const unlock = SimLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAABICAYAAACJFMdwAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAV1JREFUeNrsm8FthTAMhh0SQEJIMMp7IzABHaGdBJikXYEJGKGMAhcuBKiNSvWqXqsqrn5LURJOH9ZHCCg29BBt2z5zVxtjSgoojuOYuOuZ7+26Zj6BS4YdnHM37inEYHjy3o/cV8w7ObkYRdGQZVmw0A/wt2VZBh7ejehRFMVrHMekIdZ1pXmeXxwD13mek5ZI05Q467VLkqSUiaYQZmetJW3gwuz4wZQ7UAUuzCe4tozrBlftOFSBKv9dFY3reERKA+AABzjAfzfc9QWtDlygt21TBS3MJ/i+7wD/M3AZaAP/chyqQBWoAlWgim5wlXsVOA7HoQpUgSpQBarg9wTA4TiWQ6gCVaAKVIEq2GRhkwXHsRxClRBUYehJG7gwC3jvvX+SA1pKoKX1Z21B13Xv1loNpQbyshybprlfxz4qzvrAWQ+6uIMzPfKwkvk3yquchlsZGPePcpoPAQYAstydVJJ0xdwAAAAASUVORK5CYII=';
export default image;