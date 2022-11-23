import { Container } from "decentraland-ui";

export default function Help() {
  return (
    <Container className="page-container">
      <div className="title">
        <h1>Need Help?</h1>
        <p>If you are experiencing a production issue preventing you to use the platform as expected and this is currently not reported on the status page, please raise the issue on <a href="discord">Discord</a> under the <b>#help</b> support area and a community member will help to create the incident and upate the page.</p>
      </div>
      <div className="title">
        <h1>Did you find a bug?</h1>
        <p>If there is no major incident going on but you would like to report a bug, click <a href="https://github.com/decentraland/issues/issues/new/choose">here</a> and create a ticket, add as much details as possible so that the community contributor reviwing the problem can reproduce the situation and fix the problem.</p>
      </div>
    </Container>
  )
}
