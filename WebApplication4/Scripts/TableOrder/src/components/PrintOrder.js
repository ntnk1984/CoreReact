import React from "react";
import { Row, Col } from "antd";
import Barcode from "react-barcode";

const Printorder = (props) => {
  const handlPrintMulti = () => {
    return props.listPrint.map((item, index) => {
      const {
        shipno,
        dropofftype,
        servicetype,
        ordercode,
        shippingchargespayment,
        timeregister,
        sendername,
        senderphone,
        senderaddress,
        sendercountrycode,
        sendercitycode,
        senderdistrictcode,
        senderwardcode,
        senderpostalcode,
        receivername,
        receiverphone,
        receiveraddress,
        receivercountrycode,
        receivercitycode,
        receiverdistrictcode,
        receiverwardcode,
        receiverpostalcode,
        totalpackages,
        servicepostage,
        addedpostage,
        codpostage,
        surcharge,
        totalpostage,
        vat,
        weight,
        cod,
        currency,
        content,
        note,
      } = item;
      return (
        <div className="page">
          <div className="p-2" style={{ width: "100%" }}>
            <Row>
              <Col span={8}>
                <Barcode value={ordercode} />
              </Col>
              <Col span={8}>
                <h1 className="text-center mt-4">PHIẾU GỬI</h1>
                <h3 className="text-center">Bill of consignment</h3>
              </Col>
              <Col span={8}>
                <h3 className="text-center text-light mt-4">
                  <i>INTEPOST</i>
                </h3>
              </Col>
            </Row>

            <Row>
              <Col span={10}>
                <div className="border border-2 p-2">
                  <h6>Người gửi:</h6>
                  <h6>Họ tên :</h6>
                  <p>{sendername}</p>
                  <h6>Địa chỉ :</h6>
                  <p>{`${sendercitycode} - ${senderdistrictcode} - ${senderwardcode}`}</p>
                </div>
                <div className="border border-2 p-2">
                  <h6>Người nhận:</h6>
                  <h6>Họ tên :</h6>
                  <p>{receivername}</p>
                  <h6>Địa chỉ :</h6>
                  <p>{`${receivercitycode} - ${receiverdistrictcode} - ${receiverwardcode}`}</p>
                </div>
              </Col>
              <Col span={14} style={{ height: 347 }}>
                <div className="border border-2 p-2 h-100 ">
                  <h6>Địa chỉ</h6>
                  <br></br>
                  <p>
                    <i>Tỉnh/TP:</i>
                  </p>
                  <h5>{receivercitycode}</h5>
                  <br></br>
                  <p>
                    <i>Quận/Huyện:</i>
                  </p>
                  <h5>{receiverdistrictcode}</h5>
                  <br></br>
                  <p>
                    <i>Phường/Xã:</i>
                  </p>
                  <h5>{receiverwardcode}</h5>
                  <br></br>
                </div>
              </Col>
            </Row>
            <Row className="">
              <Col span={10}>
                <div className="border border-2 p-2" style={{ height: 300 }}>
                  <h6>Nội dung hàng hóa:</h6>
                  <h6>
                    <i>Tên hàng hóa, số lượng, giá trị, imei, số hóa đơn</i>
                  </h6>
                  {/* <p>{loaiHang}</p> */}
                </div>
              </Col>
              <Col span={14} style={{ height: 300 }}>
                <Row className="h-50">
                  <Col span={12} className="h-100">
                    <div className="h-100 border border-2 p-2">
                      <h6>Dịch vụ cộng thêm:</h6>
                      <p>
                        <i>Cho xem đơn hàng</i>
                      </p>
                      <p>
                        <i>Thời gian dự kiến giao: 05/05/2020</i>
                      </p>
                    </div>
                  </Col>
                  <Col span={12} className="h-100">
                    <div className="h-100 border border-2 p-2">
                      <h6>Cước phí:</h6>
                      <p className="my-0">
                        <i>{`Trọng lượng : ${weight}kg`}</i>
                      </p>
                      <p className="my-0">
                        <i>{`Tổng cước : ${totalpostage.toLocaleString()} đ`}</i>
                      </p>
                      <p className="my-0">
                        <i>Thanh toán cước : người nhận</i>
                      </p>
                      <h6>
                        <i>{`Số tiền phải thu : ${cod.toLocaleString()} đ`}</i>
                      </h6>
                    </div>
                  </Col>
                </Row>
                <Row className="h-50">
                  <Col span={12} className="h-100">
                    <div className="h-100 border border-2 p-2">
                      <p>
                        <i>Ngày ký: ...../...../.........</i>
                      </p>
                      <h6>Người nhận ký tên:</h6>
                    </div>
                  </Col>
                  <Col span={12} className="h-100">
                    <div className="h-100 border border-2 p-2">
                      <p>
                        <i>Ngày ký: ...../...../.........</i>
                      </p>
                      <h6>Người gửi ký tên:</h6>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <p className="text-center">
              <i>Mọi thắc mắc vui lòng liên hệ tổng đài hỗ trợ 1900571022</i>
            </p>
          </div>
        </div>
      );
    });
  };
  return <>{handlPrintMulti(props.listPrint)}</>;
};

export default Printorder;
