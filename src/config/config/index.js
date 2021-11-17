import { exportModules } from '@/assets/js/__utils__/file';

let requireFiles = require.context('@/config/config', false, /\.js$/);
const modules = exportModules(requireFiles, true, true)

export default modules;