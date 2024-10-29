import http from '0http-bun'; // this lib can not be use in production
export const server = http({
  port: 3000,
});
import view_inject from './views/router_inject';
import backend_inject from './backend/router_inject';
await import('./prebuild');

view_inject(server.router);
backend_inject(server.router);

export default server.router;
