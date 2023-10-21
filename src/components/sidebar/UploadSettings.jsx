/* eslint-disable react/prop-types */
import userImg from "../../assets/home/user.png";

// for image croping
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useRef, useState } from "react";

// for  alret
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

const UploadSettings = ({ cancleUpload }) => {
  //for image
  const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("");
  const cropperRef = useRef();

  // for croping function
  const handleImgChange = (e) => {
    e.preventDefault();
    const files = e.dataTransfer ? e.dataTransfer : e.target.files;
    console.log(files);
    if (files.length === 0) {
      // Handle no files selected
      setImage(false);
      console.log("No files selected.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };
  // for cancellation
  const handleCancle = () => {
    console.log("ok");
    Swal.fire({
      title: "Are sure you want to exit?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        cancleUpload();
      }
    });
  };
  return (
    <>
      <div className=" absolute top-0 left-0 z-50 w-full h-screen backdrop-blur-sm bg-black/20 flex flex-col justify-center items-center">
        <div>
          <h2 className=" font-pops bg-slate-100 font-semibold text-xl text-gray-700 px-5 py-3 capitalize">
            Upload your image{" "}
          </h2>
          <div className="p-5 bg-white flex flex-col gap-3 relative">
            <div className="flex justify-around items-center">
              {/* left  */}
              <div>
                <div className="w-96">
                  <label
                    className="text-xl text-gray-700  font-pops font-medium capitalize"
                    htmlFor="upload"
                  >
                    Uplode your File
                  </label>
                  <input
                    onChange={handleImgChange}
                    className="my-3 text-gray-700 "
                    type="file"
                  />
                  {image && (
                    <Cropper
                      className="bg-center"
                      ref={cropperRef}
                      style={{ height: 200, width: "100%" }}
                      zoomTo={0.5}
                      initialAspectRatio={1}
                      preview=".img-preview"
                      src={image}
                      viewMode={1}
                      minCropBoxHeight={10}
                      minCropBoxWidth={10}
                      background={false}
                      responsive={true}
                      autoCropArea={1}
                      checkOrientation={false}
                      guides={true}
                    />
                  )}
                  <p className="text-gray-700  font-pops font-semibold text-sm capitalize py-4">
                    Drag frame to adujust protrait
                  </p>
                </div>
              </div>
              {/* right  */}
              <div className="flex flex-col items-center gap-6 border-l-2 ">
                <h3 className="font-pops font-medium text-gray-700  text-xl capitalize">
                  Your profile Protrait
                </h3>
                <div className="group w-3/4 mx-auto rounded-full overflow-hidden relative ">
                  {image ? (
                    <div className="img-preview w-[100px] h-[100px] mx-auto rounded-full overflow-hidden"></div>
                  ) : (
                    <img src={userImg} alt="userImage" />
                  )}
                </div>
                <div>
                  <button className="px-3 py-2 active:scale-95 bg-primary text-white rounded-md font-nunito">
                    Upload
                  </button>
                  <button
                    onClick={handleCancle}
                    className="px-3 py-2 active:scale-95 bg-red-500 text-white rounded-md font-nunito ml-4"
                  >
                    Cancle
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadSettings;