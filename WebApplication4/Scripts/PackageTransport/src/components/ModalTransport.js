import React, { useState } from "react";
import { Modal, Row, Col, Divider, Steps } from "antd";

const { Step } = Steps;
export default function ModalTransport() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <a onClick={showModal}>Chi tiết</a>
      <Modal
        width={1200}
       
        title="Chi tiết kiện hàng"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Row>
          <Col span={16}>
            <div>
              <h6 className="mb-3">Thông tin kiện hạng</h6>
              <p>
                Mã kiện hàng : 2304932094 - Đơn vị vận chuyển : Giao hàng nhanh
                - Biển số : 74C-32432
              </p>
              <p>
                Trạng thái : Đang vận chuyển - Nơi đi : Bưu cục 10 - Nơi đến :
                Bưu cục 19
              </p>
            </div>
            <Divider />
            <h6 className="mb-4">Thông tin gói hàng</h6>
            <ul class="list-group accordion-body py-0">
              <li class="list-group-item d-flex">
                <div className="col-4">Mã đơn </div>
                <div className="col-4">Kích thước </div>
                <div className="col-4">COD </div>
              </li>
              <li class="list-group-item d-flex">
                <div className="col-4"> 3480234</div>
                <div className="col-4">100x100x200</div>
                <div className="col-4"> 1.000.000 đ</div>
              </li>
              <li class="list-group-item d-flex">
                <div className="col-4"> 3480234</div>
                <div className="col-4">100x100x200</div>
                <div className="col-4"> 1.000.000 đ</div>
              </li>
              <li class="list-group-item d-flex">
                <div className="col-4"> 3480234</div>
                <div className="col-4">100x100x200</div>
                <div className="col-4"> 1.000.000 đ</div>
              </li>
              <li class="list-group-item d-flex">
                <div className="col-4"> 3480234</div>
                <div className="col-4">100x100x200</div>
                <div className="col-4"> 1.000.000 đ</div>
              </li>
              <li class="list-group-item d-flex">
                <div className="col-4"> 3480234</div>
                <div className="col-4">100x100x200</div>
                <div className="col-4"> 1.000.000 đ</div>
              </li>
              <li class="list-group-item d-flex">
                <div className="col-4"> 3480234</div>
                <div className="col-4">100x100x200</div>
                <div className="col-4"> 1.000.000 đ</div>
              </li>
              <li class="list-group-item d-flex">
                <div className="col-4"> 3480234</div>
                <div className="col-4">100x100x200</div>
                <div className="col-4"> 1.000.000 đ</div>
              </li>
              <li class="list-group-item d-flex">
                <div className="col-4"> 3480234</div>
                <div className="col-4">100x100x200</div>
                <div className="col-4"> 1.000.000 đ</div>
              </li>
              <li class="list-group-item d-flex">
                <div className="col-4"> 3480234</div>
                <div className="col-4">100x100x200</div>
                <div className="col-4"> 1.000.000 đ</div>
              </li>
              <li class="list-group-item d-flex">
                <div className="col-4"> 3480234</div>
                <div className="col-4">100x100x200</div>
                <div className="col-4"> 1.000.000 đ</div>
              </li>
              <li class="list-group-item d-flex">
                <div className="col-4"> 3480234</div>
                <div className="col-4">100x100x200</div>
                <div className="col-4"> 1.000.000 đ</div>
              </li>
              
            </ul>
          </Col>
          <Col span={8} className="ps-3" style={{height: "600px"}}>
            <h6 className="mb-3">Lịch trình vận chuyển</h6>
            <Steps progressDot current={1} direction="vertical" >
              <Step
                title="Finished"
                description="This is a description. This is a description."
              />
              <Step
                title="Finished"
                description="This is a description. This is a description."
              />
              <Step
                title="In Progress"
                description="This is a description. This is a description."
              />
              <Step title="Waiting" description="This is a description." />
              <Step title="Waiting" description="This is a description." />
              <Step title="Waiting" description="This is a description." />
              <Step title="Waiting" description="This is a description." />
              <Step title="Waiting" description="This is a description." />
              <Step title="Waiting" description="This is a description." />
              <Step title="Waiting" description="This is a description." />
              <Step title="Waiting" description="This is a description." />
              <Step title="Waiting" description="This is a description." />
              <Step title="Waiting" description="This is a description." />
              <Step title="Waiting" description="This is a description." />
              <Step title="Waiting" description="This is a description." />
            </Steps>
          </Col>
        </Row>
      </Modal>
    </>
  );
}
