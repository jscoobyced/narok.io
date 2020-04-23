import * as React from 'react';
import './home.scss';
import * as Config from '../../services/config/config';
import { DataService } from '../../services/data/data';

interface HomeState {
  hello: String
}

export class Home extends React.Component<{}, HomeState> {
  public constructor(props: {}, state: HomeState) {
    super(props, state);
    this.state = {
      hello: 'Nothing yet...',
    };
  }

  componentDidMount = async () => {
    new DataService().getHelloScala()
      .then((data) => {
        this.setState({
          hello: data.hello,
        });
      })
      .catch((error:Error) => {
        this.setState({
          hello: error.message,
        });
      });
  }

  render = () => {
    const server = Config.getApplicationConfig().Server;
    const port = Config.getApplicationConfig().Port;
    const { hello } = this.state;
    return (
      <>
        <header>
          <h1>Hello, TypeScript + React!</h1>
        </header>
        <div className="container">
          <section>
            <p>
              This sample application can run in developer mode with hot-reload.
              <br />
              Simply start it from the
              <strong><i>fe</i></strong>
              folder by typing:
            </p>
            <pre>
              yarn start
            </pre>
            <br />
            <p>
              The API service is running at
              {' '}
              <a
                href={`http://${server}:${port}/hello`}
              >
                {`http://${server}:${port}/hello`}
              </a>
              . It says:
              {' '}
              {hello}
              .
            </p>
          </section>
        </div>
        <footer>
          &copy; Copyright
          {' '}
          {Config.getCopyright().Year}
          {' '}
          {Config.getCopyright().Author}
        </footer>
      </>
    );
  }
}
