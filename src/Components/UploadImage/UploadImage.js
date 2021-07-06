import { LoadingOutlined } from "@ant-design/icons";
import { message, Modal, Spin, Upload } from "antd";
import React, { useState } from "react";
import { storage } from "../../Firebase";

const UploadImage = ({ showList, fileList, handleData, handleRemove }) => {
  const [imageList, setImageList] = useState(fileList || []);
  const [visible, setVisible] = useState(false);
  const [src, setSrc] = useState("");
  const [loading, setLoading] = useState(false);

  // Function
  const onRemove = (file) => {
    setImageList((prev) => prev.filter((item) => item.uid !== file.uid));
    handleRemove(file);
  };

  const onPreview = async (file) => {
    setVisible(true);
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    setSrc(src);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleUpload = ({ file }) => {
    const uploadImage = storage.ref(`images/${file.name}`).put(file);
    uploadImage.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setLoading(progress);
      },
      (error) => {
        console.log("error :>> ", error);
      },
      () => {
        storage
          .ref("images")
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            setLoading(false);
            setImageList((prev) => [
              ...prev,
              { uid: file.uid, name: file.name, status: "done", url: url },
            ]);
            const newFileList = imageList.map((item) => ({ id: item.uid, url: item.url }));
            handleData([...newFileList, { id: file.uid, url: url }]);
          });
      }
    );
  };

  return (
    <>
      <Upload
        beforeUpload={beforeUpload}
        listType="picture-card"
        onRemove={onRemove}
        onPreview={onPreview}
        fileList={imageList}
        customRequest={handleUpload}
      >
        {(!imageList.length && "+ Upload") || showList ? (
          imageList?.length < 6 && loading ? (
            <Spin indicator={<LoadingOutlined spin />} />
          ) : (
            "+ Upload"
          )
        ) : (
          imageList?.length < 1 && "+ Upload"
        )}
      </Upload>
      <Modal
        centered
        width={550}
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <img style={{ width: "100%", height: "80%" }} src={src} alt="" />
      </Modal>
    </>
  );
};

export default UploadImage;
