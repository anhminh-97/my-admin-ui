import { Component } from "react";
import { storage } from "../../Firebase";

class MyUploadAdapter extends Component {
  constructor(loader) {
    super(loader);
    this.loader = loader;
  }
  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          this._initListeners(resolve, reject, file);
        })
    );
  }

  _initListeners(resolve, reject, file) {
    const uploadImage = storage.ref(`images/${file.name}`).put(file);
    uploadImage.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        alert(`Couldn't upload file: ${file.name}.`);
      },
      () => {
        storage
          .ref("images")
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            resolve({
              default: url,
            });
          });
      }
    );
  }
}

export default MyUploadAdapter;
