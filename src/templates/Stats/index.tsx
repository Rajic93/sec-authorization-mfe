import map from "lodash/map";
import { Card, Col, Row, Statistic, Typography } from "antd";

interface StatDefinition {
    title: string;
    value?: string | number;
}

interface StatsProps {
    definitions?: StatDefinition[];
}

const Stats = ({ definitions }: StatsProps) => (
  <Card bordered={false}>
      <Row>
          <Col
              span={24}
              style={{
                  display: 'flex',
                  justifyContent: 'start',
                  borderBottom: '1px solid rgba(28, 49, 68, 0.1)',
              }}
          >
              <Typography.Title level={3}>Statistics</Typography.Title>
          </Col>
          {map(definitions, (definition: StatDefinition) => (
              <Col xs={24} sm={12} md={8} style={{ paddingTop: 20 }}>
                  <Statistic
                      title={definition.title}
                      value={definition.value || 'N/A'}
                  />
              </Col>
          ))}
          <Col span={24}>
              {!definitions?.length && (
                  <Typography.Text style={{ display: 'inline-block', marginTop: 20 }}>There are no stats!</Typography.Text>
              )}
          </Col>
      </Row>
  </Card>
);

export default Stats;
