import React from "react";
import PropTypes from "prop-types";

ThayDoiUI.propTypes = {};
const CreatOrderFourModal = () => {
  return (
    <>
      <div className=" rounded rounded-3 shadow-sm" style={{ background: "white", padding: "10px 20px" }}>
        <div className="modal-orderFour">
          <Modal
            title="Biểu mẫu mặt hàng"
            style={{ top: 20 }}
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            width={800}
            footer={[
              <Button
                onClick={() => {
                  setVisible(false);
                }}
                type="default"
              >
                Thoát
              </Button>,
              <Button
                onClick={() => {
                  setVisible(false);
                }}
                type="primary"
              >
                Xác Nhận
              </Button>,
            ]}
          >
            <p>some contents...</p>
            <p>some contents...</p>
            <p>some contents...</p>
          </Modal>
        </div>
        <h4 style={{ textAlign: "center", padding: "20px 0" }} className="text-secondary ">
          Mặt Hàng - Bưu Kiện - Đơn Gửi
        </h4>
        <div style={{ paddingBottom: "20px", textAlign: "end" }}>
          <Button onClick={() => setVisible(true)} style={{ marginBottom: "10px" }} type="primary">
            Thêm Mặt Hàng
          </Button>
          <Table columns={columns} dataSource={data} size="small" scroll={{ y: 240 }} pagination={false} />
        </div>
      </div>
    </>
  );
};
function ThayDoiUI(props) {
  return <div></div>;
}

export default ThayDoiUI;

const switchCaseSHowInputForm = (dataInd) => {
  switch (dataInd) {
    case "VietNameseName": {
      return (
        <Input
          ref={inputRef}
          onPressEnter={save}
          onBlur={() => {
            console.log(dataIndex);
            save();
          }}
        />
      );
    }
    case "CountryManufacturedCode": {
      return (
        <Input
          ref={inputRef}
          onPressEnter={save}
          onBlur={() => {
            console.log(dataIndex);
            save();
          }}
        />
      );
    }
    case "Unit": {
      return (
        <Input
          ref={inputRef}
          onPressEnter={save}
          onBlur={() => {
            console.log(dataIndex);
            save();
          }}
        />
      );
    }
    case "Currency": {
      return (
        <Input
          ref={inputRef}
          onPressEnter={save}
          onBlur={() => {
            console.log(dataIndex);
            save();
          }}
        />
      );
    }

    default:
    // code block
  }
};
