import "./App.css";

import { Anchor, Col, Layout, Row } from "antd";

import ConfigProvider from "antd/es/config-provider";
import { FC } from "react";
import Title from "antd/es/typography/Title";

const { Header, Content } = Layout;

// figure out themeing
// https://ant.design/docs/react/customize-theme
const App: FC = () => {
  return (
    <Layout>
      <Header>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#00b96b",
            },
          }}
        >
          <Title level={2} style={{ color: "white" }}>
            Welcome to my Homepage - All about Julian Patterson - In
            construction
          </Title>
        </ConfigProvider>
      </Header>
      <Content>
        <Row>
          <Col span={20}>
            <div
              id="part-1"
              style={{ height: "100vh", background: "rgba(255,0,0,0.02)" }}
            />
            <div
              id="part-2"
              style={{ height: "100vh", background: "rgba(0,255,0,0.02)" }}
            />
            <div
              id="part-3"
              style={{ height: "100vh", background: "rgba(0,0,255,0.02)" }}
            />
          </Col>
          <Col span={4}>
            <Anchor
              items={[
                {
                  key: "part-1",
                  href: "#part-1",
                  title: "About me",
                },
                {
                  key: "part-2",
                  href: "#part-2",
                  title: "Projects",
                },
                {
                  key: "part-3",
                  href: "#part-3",
                  title: "Experience",
                },
              ]}
            />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default App;
