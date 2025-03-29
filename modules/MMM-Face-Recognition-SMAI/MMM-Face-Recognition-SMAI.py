# # SMAI V1.01 - Face Recognition Module

# # Modified by: Pratik & Eben
# # This is a modified script from the open source face recognition repo:
# # https://github.com/ageitgey/face_recognition
# # Patch update to fix bugs

# import face_recognition

# # import picamera
# import cv2
# import numpy as np
# import sys
# import os
# import time

# # Get a reference to the Raspberry Pi camera.
# # If this fails, make sure you have a camera connected to the RPi and that you
# # enabled your camera in raspi-config and rebooted first.
# # camera = picamera.PiCamera()
# # camera.resolution = (320, 240)
# # output = np.empty((240, 320, 3), dtype=np.uint8)

# # Thay vi dung picamera, su dung OpenCV de mo camera
# cap = cv2.VideoCapture(0)  # mo camera mac dinh
# if not cap.isOpened():
#     print("Khong the mo camera")
#     exit()

# # Load a sample picture and learn how to recognize it.
# print("Loading known face image(s)")
# rec_image = face_recognition.load_image_file(
#     "/home/richardmelvin52/MagicMirror/modules/MMM-Face-Recognition-SMAI/public/face.png"
# )
# rec_face_encoding = face_recognition.face_encodings(rec_image)[0]

# # Initialize some variables
# face_locations = []
# face_encodings = []

# id_check = 0

# while True:
#     # print("Capturing image.")
#     # # Grab a single frame of video from the RPi camera as a numpy array
#     # camera.capture(output, format="rgb")

#     # Doc anh tu camera bang OpenCV
#     ret, frame = cap.read()
#     if not ret:
#         print("Khong the nhan frame (ket thuc chuong trinh?)")
#         break
#     # Chuyen doi anh tu BGR sang RGB (vi OpenCV su dung BGR)
#     rgb_frame = frame[:, :, ::-1]

#     # # Find all the faces and face encodings in the current frame of video
#     # face_locations = face_recognition.face_locations(output)
#     # print("Found {} faces in image.".format(len(face_locations)))
#     # face_encodings = face_recognition.face_encodings(output, face_locations)

#     # Tim vi tri cac khuon mat trong khung hinh hien tai
#     face_locations = face_recognition.face_locations(rgb_frame)
#     print("Tim thay {} khuon mat trong anh.".format(len(face_locations)))
#     face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)

#     face_id = "Hiển"

#     # Loop over each face found in the frame to see if it's someone we know.
#     for face_encoding in face_encodings:
#         # See if the face is a match for the known face(s)
#         match = face_recognition.compare_faces([rec_face_encoding], face_encoding)
#         name = "<Unknown Person>"

#         # if id_check == 0:
#         #     for file in os.listdir(
#         #         "/home/richardmelvin52/MagicMirror/modules/MMM-Face-Recognition-SMAI/public"
#         #     ):
#         #         if file.endswith("-id.png"):
#         #             face_id = file.replace("-", " ").split(" ")[0]
#         #             # print(face_id)
#         #     id_check = 0
#         #     # print(face_id) -- print the name you saved as the MM picture

#         if match[0]:
#             name = face_id

#         print("Person Detected: {}!".format(face_id))
#         f = open(
#             "/home/richardmelvin52/MagicMirror/modules/MMM-Face-Recognition-SMAI/sample.txt",
#             "w",
#         )
#         f.write(name)
#         f.close()

#         # Hiển thị lời chào
#         if name != "<Unknown Person>":
#             print("Welcome, {}!".format(name))

#         # time taken before the user is logged off from the mirror
#         time.sleep(15)

#     f = open(
#         "/home/richardmelvin52/MagicMirror/modules/MMM-Face-Recognition-SMAI/sample.txt",
#         "w",
#     )
#     f.write(face_id)
#     f.close()

# # Giai phong camera sau khi su dung
# cap.release()
# cv2.destroyAllWindows()


import face_recognition
import cv2
import numpy as np
import os

# Khởi động camera
video_capture = cv2.VideoCapture(0)

# Load ảnh mẫu để nhận diện
print("Loading known face image(s)")
rec_image = face_recognition.load_image_file(
    "/home/richardmelvin52/MagicMirror/modules/MMM-Face-Recognition-SMAI/public/face.png"
)
rec_face_encoding = face_recognition.face_encodings(rec_image)[0]

# Đặt tên người nhận diện
face_id = "Hien"

print("Capturing image...")
ret, output = video_capture.read()
if not ret:
    print("Không nhận được hình ảnh từ camera.")
else:
    # Chuyển đổi ảnh từ BGR sang RGB
    rgb_frame = cv2.cvtColor(output, cv2.COLOR_BGR2RGB)

    # Tìm khuôn mặt trong ảnh
    face_locations = face_recognition.face_locations(rgb_frame)
    print("Found {} faces in image.".format(len(face_locations)))

    # Mã hóa khuôn mặt
    face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)
    name = "<Unknown Person>"

    # Kiểm tra từng khuôn mặt
    for face_encoding in face_encodings:
        match = face_recognition.compare_faces([rec_face_encoding], face_encoding)
        if match[0]:
            name = face_id  # Cập nhật tên nếu trùng khớp

    print("Person Detected: {}!".format(name))

    # Ghi kết quả vào file
    with open(
        "/home/richardmelvin52/MagicMirror/modules/MMM-Face-Recognition-SMAI/sample.txt",
        "w",
    ) as f:
        f.write(name)

    # Hiển thị lời chào nếu nhận diện thành công
    if name != "<Unknown Person>":
        print("Welcome, {}!".format(name))

# Giải phóng camera
video_capture.release()
# cv2.destroyAllWindows()
# SMAI V1.01 - Face Recognition Module
