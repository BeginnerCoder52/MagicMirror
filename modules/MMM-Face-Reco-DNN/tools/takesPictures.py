import time
# from picamera2 import Picamera2, Preview
from libcamera import Transform
from pynput.keyboard import Key, Listener
import os
import sys
import cv2
# Raspberry Pi Camera Image Capture Script
# Captures images from a Raspberry Pi camera and saves them to folders in the 'root/dataset'
# directory of the module, with each folder named after the chosen 'name.'
# Press the space key to take pictures and 'q' to exit the application.
# Adjust camera rotation if needed.


# --------------------------------------------------------------------------------
# -- Edit this Parameter
# --------------------------------------------------------------------------------
# Set your name, which should be used to expand the dataset
name = "YOUR_NAME"

# Set camera rotation. Note, Transform does not support rotations, but only
# vertical and horizontal flips
# Transform()                   - the identity transform, which is the default
# Transform(hflip=1)            - horizontal flip
# Transform(vflip=1)            - vertical flip
# Transform(hflip=1, vflip=1)   - horizontal and vertical flip (equivalent to a 180 degree rotation)
transform = Transform(vflip=1)
# --------------------------------------------------------------------------------
# -- Edit this Parameter
# --------------------------------------------------------------------------------


# # Specifies the directory for saving the images
# output_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "dataset", name)
# # Create the directory if it doesn't exist
# os.makedirs(output_dir, exist_ok=True)

# picam2 = Picamera2()
# camera_config = picam2.create_still_configuration(lores={"size": (640, 480)}, display="lores")
# camera_config["transform"] = transform

# picam2.configure(camera_config)


# picam2.start_preview(Preview.QTGL)
# picam2.start()

# # Get the existing image files in the output directory
# existing_images = os.listdir(output_dir)

# # Determine the starting photo number based on existing files
# existing_numbers = set()
# for filename in existing_images:
#     if filename.startswith("img") and filename.endswith(".jpg"):
#         try:
#             number = int(filename[3:5])
#             existing_numbers.add(number)
#         except ValueError:
#             pass

# if existing_numbers:
#     next_photo_number = max(existing_numbers) + 1
# else:
#     next_photo_number = 1

# def on_key_release(key):
#     global photo_captured
#     if key == Key.space:
#         global next_photo_number
#         # Generate the filename with the format "imgXX.jpg"
#         img_filename = f"img{next_photo_number:02d}.jpg"
#         next_photo_number += 1
#          # Save the image to the specified directory
#         img_path = os.path.join(output_dir, img_filename)
#         picam2.capture_file(img_path)
#         print(f"Photo captured and saved as '{img_filename}' in '{output_dir}'")
#         time.sleep(1)  # Wait for 2 seconds to stabilize the image

#     if key == Key.esc:
#         print("Exiting the application.")
#         picam2.stop_preview()
#         picam2.stop()
#         sys.exit()


# # Create a listener to detect key releases
# with Listener(on_release=on_key_release) as listener:
#     listener.join()

# picam2.stop_preview()
# picam2.stop()

name = "YOUR_NAME"  # Đổi thành tên của bạn để lưu vào dataset
output_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "dataset", name)
os.makedirs(output_dir, exist_ok=True)

# Khởi tạo webcam
video_capture = cv2.VideoCapture(0)  # Mở webcam mặc định

# Kiểm tra xem camera có mở được không
if not video_capture.isOpened():
    print("❌ Không thể mở webcam!")
    sys.exit()

# Tìm số ảnh đã chụp để tiếp tục đánh số
existing_images = os.listdir(output_dir)
existing_numbers = [
    int(f[3:5])
    for f in existing_images
    if f.startswith("img") and f.endswith(".jpg") and f[3:5].isdigit()
]
next_photo_number = max(existing_numbers) + 1 if existing_numbers else 1


def on_key_release(key):
    global next_photo_number
    if key == Key.space:
        ret, frame = video_capture.read()  # Chụp ảnh từ webcam
        if ret:
            img_filename = f"img{next_photo_number:02d}.jpg"
            next_photo_number += 1
            img_path = os.path.join(output_dir, img_filename)
            cv2.imwrite(img_path, frame)  # Lưu ảnh
            print(f"📸 Ảnh đã lưu: '{img_filename}' tại '{output_dir}'")
        else:
            print("❌ Lỗi: Không thể chụp ảnh!")

    if key == Key.esc:
        print("🔴 Thoát chương trình.")
        video_capture.release()  # Giải phóng webcam
        cv2.destroyAllWindows()  # Đóng cửa sổ OpenCV
        sys.exit()


# Hiển thị hình ảnh từ webcam
print("🎥 Đang bật camera... Nhấn Space để chụp ảnh, ESC để thoát.")

# Lắng nghe sự kiện bàn phím
with Listener(on_release=on_key_release) as listener:
    while True:
        ret, frame = video_capture.read()
        if ret:
            cv2.imshow("Webcam", frame)
        if cv2.waitKey(1) & 0xFF == ord("q"):  # Thêm tùy chọn thoát bằng phím 'q'
            break
    listener.join()

video_capture.release()
cv2.destroyAllWindows()
