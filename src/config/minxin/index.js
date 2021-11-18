import { exportModules } from '@/assets/js/__utils__/file';

let requireFiles = require.context('@/config/minxin', true, /\.js$/);
const modules = exportModules(requireFiles, false, true)

export default modules;