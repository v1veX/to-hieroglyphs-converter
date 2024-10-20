import { ThemeToggler } from './themeToggler.js'
import { init as initConverter } from './converter.js'
import { History } from './history.js'
import { Notification } from './notification.js';

new ThemeToggler();
initConverter();
new History();
new Notification();