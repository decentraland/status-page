import { Container, Mobile, NotMobile } from "decentraland-ui";
import { Col, Row } from "react-bootstrap";
import HistoricalMetric from "../components/metrics/historical-metric";
import LiveMetrics from "../components/metrics/live-metrics";
import Subtitle from "../components/Subtitle";
import Title from "../components/Title";

export default function Metrics() {
  return (
    <Container className="page-container">
      <LiveMetrics />
      <Container>
        <Title title='Historical Metrics' paragraph="The graphs below show the last three months platform statistics and are automatically updated at the begining of each month."/>
        <NotMobile>
          <Row>
            <Col>
              <Subtitle subtitle='Active Users' paragraph="How many unique users have logged into Decentraland and moved out of their initial tile"/>
            </Col>
            <Col>
              <Subtitle subtitle='Community Events' paragraph="How many events were created by the Decentraland community"/>
            </Col>
          </Row>
          <Row>
            <Col>
              <HistoricalMetric name={'active-users'} />
            </Col>
            <Col>
              <HistoricalMetric name={'community-events'} />
            </Col>
          </Row>
        </NotMobile>
        <Mobile>
          <Row>
            <Col>
              <Subtitle subtitle='Active Users' paragraph="How many unique users have logged into Decentraland and moved out of their initial tile"/>
              <HistoricalMetric name={'active-users'} />
            </Col>
            <Col>
              <Subtitle subtitle='Community Events' paragraph="How many events were created by the Decentraland community"/>
              <HistoricalMetric name={'community-events'} />
            </Col>
          </Row>
        </Mobile>
        <Row>
          <Col>
            <Subtitle subtitle='DAO Proposals' paragraph="How many proposals were created within the DAO"/>
            <HistoricalMetric name={'dao-proposals'} />
          </Col>
          <Col>
            <Subtitle subtitle='DAO Votes' paragraph="How many votes were cast on DAO proposals"/>
            <HistoricalMetric name={'dao-votes'} />
          </Col>
        </Row>
        <Row md={2}>
          <Col>
            <Subtitle subtitle='NFTs Sold' paragraph="How many NFTs were sold in the marketplace"/>
            <HistoricalMetric name={'community-nfts-sold'} />
          </Col>
        </Row>
      </Container>
    </Container>
  )
}
