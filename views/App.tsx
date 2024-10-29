import Index from './components/index';
import { StyleProvider } from '@ant-design/cssinjs';

const App = () => {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/view/antd.min.css" />
        <title>My app</title>
      </head>
      <body
        id="root"
        style={{
          border: 0,
          margin: 0,
          width: '100vw',
          height: '100vh',
        }}
      >
        <StyleProvider hashPriority="high">
          <Index />
        </StyleProvider>
      </body>
    </html>
  );
};

export default App;
