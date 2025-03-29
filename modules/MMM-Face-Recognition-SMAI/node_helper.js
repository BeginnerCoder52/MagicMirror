var util = require("util");


/// node_helper.js
var NodeHelper = require("node_helper")

module.exports = NodeHelper.create({
  start: function() {
    this.countDown = 10000000
  },
  socketNotificationReceived: function(notification, payload) {
    switch(notification) {
      case "DO_YOUR_JOB":

  
      var fs = require('fs');
      fs.readFile("/home/richardmelvin52/MagicMirror/modules/MMM-Face-Recognition-SMAI/sample.txt", function(err,data)
            {
                if(err)
                    console.log(err)
                else
                    face_rec_name = data.toString().replace(/\s+/g, '')
                    console.log(face_rec_name);
            });
  
      fs.readdir('/home/richardmelvin52/MagicMirror/modules/MMM-Face-Recognition-SMAI/public/', (err, datadir) => {
        if (err) throw err;
          
          // Try it where we expect a match
          const checker = value =>
          ['-id.png'].some(element => value.includes(element));
          face_name_id = datadir.filter(checker)[0];
          
          
          face_name_id = face_name_id.split("-")
          face_name_display = face_name_id[0];
          
           if(face_rec_name == face_name_display)
          {
            console.log(face_name_display);
            this.sendSocketNotification("I_DID", face_rec_name)
          }else
          {
            this.sendSocketNotification("I_NOT", face_rec_name)
          }
          
      });
        break
    }
  },
})

// const NodeHelper = require("node_helper");
// const fs = require("fs");
// const path = require("path");

// module.exports = NodeHelper.create({
//   start: function () {
//     console.log("Bắt đầu node helper cho module: " + this.name);
//     this.countDown = 10000000;
//   },

//   socketNotificationReceived: function (notification, payload) {
//     if (notification === "DO_YOUR_JOB") {
//       const sampleFilePath = path.join(__dirname, "sample.txt");
//       const publicDirPath = path.join(__dirname, "public");

//       // Đọc nội dung từ tệp sample.txt
//       fs.readFile(sampleFilePath, "utf8", (err, data) => {
//         if (err) {
//           console.error("Lỗi khi đọc tệp sample.txt:", err);
//           return;
//         }
//         const face_rec_name = data.toString().trim();
//         console.log("Tên nhận diện khuôn mặt:", face_rec_name);

//         // Đọc danh sách tệp trong thư mục public
//         fs.readdir(publicDirPath, (err, files) => {
//           if (err) {
//             console.error("Lỗi khi đọc thư mục public:", err);
//             return;
//           }

//           // Tìm tệp có chứa '-id.png' trong tên
//           const matchedFile = files.find(file => file.includes("-id.png"));
//           if (!matchedFile) {
//             console.log("Không tìm thấy tệp phù hợp trong thư mục public.");
//             this.sendSocketNotification("I_NOT", face_rec_name);
//             return;
//           }

//           const face_name_display = matchedFile.split("-")[0];

//           if (face_rec_name === face_name_display) {
//             console.log("Người dùng được nhận diện:", face_name_display);
//             this.sendSocketNotification("I_DID", face_rec_name);
//           } else {
//             console.log("Người dùng không khớp:", face_rec_name);
//             this.sendSocketNotification("I_NOT", face_rec_name);
//           }
//         });
//       });
//     }
//   },
// });
