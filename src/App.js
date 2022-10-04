import { Navbar } from 'decentraland-ui/dist/components/Navbar/Navbar';
import { Page } from 'decentraland-ui/dist/components/Page/Page';
import { Footer } from 'decentraland-ui/dist/components/Footer/Footer';
import { Header } from 'decentraland-ui/dist/components/Header/Header';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu';
import Helmet from 'react-helmet';



function App() {
  return (
    <>
       <div className="Page-story-container">
        <Navbar 
            activePage="marketplace" 
            leftMenu={
              <>
                <Menu.Item>Status Page</Menu.Item>                                
              </> 
            }
        />
        <Helmet>
            <meta charSet="utf-8" />
            <title>Decentraland Status</title>
            <link rel="canonical" href="http://decentraland.status.org/" />
            <meta name="Decentraland status page" content="Helmet application" />
        </Helmet>
        <Page>
          <Header>Hello Wolrd</Header>
          <p>This is a regular page</p>
        </Page>
        <Footer />
      </div>
    </>
  );
}

export default App;
