import {
  IeOutlined,
  InfoCircleOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { List, Modal } from "antd";
import { Condition } from "../condition";
import "./index.css";

const ModalComponent = ({ isModalOpen, handleCancel, selectedRecord }) => {
  return (
    <>
      <Condition show={!!selectedRecord}>
        <Modal
          title={
            <div className="header-wrapper">
              <div>
                <img className="image" src={selectedRecord?.links?.mission_patch_small} />
              </div>
              <div>
                <div className="title">{selectedRecord?.mission_name}</div>
                <div className="mb-1">{selectedRecord?.rocket_name}</div>
                <div style={{ display: 'flex' }}>
                  <div className="mr-05" onClick={() => {
                    window.open(selectedRecord?.links?.article_link)
                  }}>
                    <IeOutlined />
                  </div>
                  <div className="mr-05" onClick={() => {
                    window.open(selectedRecord?.links?.wikipedia)
                  }}>
                    <InfoCircleOutlined />
                  </div>
                  <div className="mr-05" onClick={() => {
                    window.open(selectedRecord?.links?.video_link)
                  }}>
                    <YoutubeOutlined />
                  </div>
                </div>
              </div>
              <div
                className={`status ${
                  selectedRecord?.launch_status === "Upcoming"
                    ? "upcoming"
                    : selectedRecord?.launch_status === "Success"
                    ? "success"
                    : "fail"
                }`}
              >
                {selectedRecord?.launch_status}
              </div>
            </div>
          }
          open={isModalOpen}
          closable
          onCancel={handleCancel}
          footer={null}
        >
          <div className="detail">{selectedRecord?.details}</div>
          <List>
            <List.Item>
              <div style={{ width: "10rem" }}>Flight Number</div>
              <div>{selectedRecord?.flight_number}</div>
            </List.Item>
            <List.Item>
              <div style={{ width: "10rem" }}>Mission Name</div>
              <div>{selectedRecord?.mission_name}</div>
            </List.Item>
            <List.Item>
              <div style={{ width: "10rem" }}>Rocket Type</div>
              <div>{selectedRecord?.rocket.rocket_type}</div>
            </List.Item>
            <List.Item>
              <div style={{ width: "10rem" }}>Manfacturer</div>
              <div>
                {
                  selectedRecord?.rocket?.second_stage?.payloads?.[0]
                    ?.manufacturer
                }
              </div>
            </List.Item>
            <List.Item>
              <div style={{ width: "10rem" }}>Nationality</div>
              <div>
                {
                  selectedRecord?.rocket?.second_stage?.payloads?.[0]
                    ?.nationality
                }
              </div>
            </List.Item>
            <List.Item>
              <div style={{ width: "10rem" }}>Launched Date</div>
              <div>{selectedRecord?.launch_date_utc}</div>
            </List.Item>
            <List.Item>
              <div style={{ width: "10rem" }}>Payload Type</div>
              <div>
                {
                  selectedRecord?.rocket?.second_stage?.payloads?.[0]
                    ?.payload_type
                }
              </div>
            </List.Item>
            <List.Item>
              <div style={{ width: "10rem" }}>Orbit</div>
              <div>{selectedRecord?.orbit}</div>
            </List.Item>
            <List.Item>
              <div style={{ width: "10rem" }}>Launched Site</div>
              <div>{selectedRecord?.launch_site}</div>
            </List.Item>
          </List>
        </Modal>
      </Condition>
    </>
  );
};
export default ModalComponent;
