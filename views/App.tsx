import Index from './components/index';
import { StyleProvider } from '@ant-design/cssinjs';
import './app.css';
const App = () => {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/view/antd.min.css" />
        <link rel="stylesheet" href="/view/client.css" />
        <title>My app</title>
      </head>
      <body id="root">
        <StyleProvider hashPriority="high">
          <Index />
        </StyleProvider>
      </body>
    </html>
  );
};

export default App;
