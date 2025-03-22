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
cv2.destroyAllWindows()
