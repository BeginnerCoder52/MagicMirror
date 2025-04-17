/* Config Sample
 *
 * For more information on how you can configure this file
 * see https://docs.magicmirror.builders/configuration/introduction.html
 * and https://docs.magicmirror.builders/modules/configuration.html
 *
 * You can use environment variables using a `config.js.template` file instead of `config.js`
 * which will be converted to `config.js` while starting. For more information
 * see https://docs.magicmirror.builders/configuration/introduction.html#enviromnent-variables
 */
let config = {
	address: "localhost",	// Address to listen on, can be:
							// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
							// - another specific IPv4/6 to listen on a specific interface
							// - "0.0.0.0", "::" to listen on any interface
							// Default, when address config is left out or empty, is "localhost"
	port: 8080,
	basePath: "/",	// The URL path where MagicMirror² is hosted. If you are using a Reverse proxy
									// you must set the sub path here. basePath must end with a /
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"],	// Set [] to allow all IP addresses
									// or add a specific IPv4 of 192.168.1.5 :
									// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
									// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
									// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false,			// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "",	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "",	// HTTPS Certificate path, only require when useHttps is true

	language: "vi",
	locale: "en-US",   // this variable is provided as a consistent location
			   // it is currently only used by 3rd party modules. no MagicMirror code uses this value
			   // as we have no usage, we  have no constraints on what this field holds
			   // see https://en.wikipedia.org/wiki/Locale_(computer_software) for the possibilities

	logLevel: ["INFO", "LOG", "WARN", "ERROR"], // Add "DEBUG" for even more logging
	timeFormat: 24,
	units: "metric",

	modules: [
		{
			module: "alert",
			classes: "hien"
		},
		{
			module: "updatenotification",
			position: "top_bar",
			classes: "hien"
		},
		{
			module: "clock",
			position: "top_left",
			classes: "hien",
		},
		{
			module: "calendar",
			header: "Lịch nghỉ lễ Việt Nam",
			position: "top_left",
			config: {
				calendars: [
					{
						fetchInterval: 7 * 24 * 60 * 60 * 1000,
						symbol: "calendar-check",
						url: "https://ics.calendarlabs.com/77/104efb3b/Vietnam_Holidays.ics"
					}
				]
			},
			classes: "hien"
		},
		{
			module: "compliments",
			position: "lower_third",
                        config: {
     			   compliments: {
            			anytime: [
                			"Xin chào người đẹp!",
                			"Hôm nay bạn trông thật tuyệt vời!"
            			]
        		}
    		},
			classes: "hien"
		},
		{
			module: "weather",
			position: "top_right",
			config: {
				weatherProvider: "openmeteo",
				type: "current",
				lat: 10.7769, //Vĩ độ TPHCM
				lon: 106.7009 //Kinh độ TPHCM 
			},
			classes: "hien"
		},
		{
			module: "weather",
			position: "top_right",
			header: "Weather Forecast",
			config: {
				weatherProvider: "openmeteo",
				type: "forecast",
				lat: 10.7769,
				lon: 106.7009,
                units: "metric"
			},
			classes: "hien"
		},
		{
			module: "newsfeed",
			position: "bottom_bar",
			config: {
				feeds: [
					{
						title: "Báo Thanh Niên",
						url: "https://thanhnien.vn/rss/home.rss"
					}
				],
				showSourceTitle: true,
				showPublishDate: true,
				broadcastNewsFeeds: true,
				broadcastNewsUpdates: true
			},
			classes: "hien"
		},

		{
			module: 'MMM-Face-Reco-DNN',
			config: {
				logoutDelay: 15000,
				checkInterval: 2000,
				noFaceClass: 'noface',
				unknownClass: 'unknown',
				knownClass: 'known',
				defaultClass: 'default',
				everyoneClass: 'everyone',
				alwaysClass: 'always',
				classes: {
					"hien": ["clock", "weatherforcast", "newsfeed"]
				},
				// Sử dụng Haarcascade cho nhận diện khuôn mặt (phù hợp với OpenCV)
				cascade: 'modules/MMM-Face-Reco-DNN/model/haarcascade_frontalface_default.xml',
				method: 'haar',  // Chuyển từ 'dnn' sang 'haar'
				detectionMethod: 'hog', // Dùng 'hog' thay vì 'cnn' (GPU)
		
				// Đường dẫn pickle chứa khuôn mặt đã mã hóa
				encodings: 'modules/MMM-Face-Reco-DNN/model/encodings.pickle',
		
				// Cấu hình camera
				brightness: 50,   // Tăng độ sáng một chút để OpenCV dễ nhận diện
				contrast: 30,     // Tăng độ tương phản để cải thiện nhận diện
				rotateCamera: -1, // Không xoay hình ảnh đầu vào
		
				// Tốc độ xử lý & hoạt ảnh
				animationSpeed: 300, // Hiệu ứng hiển thị/hide module nhanh hơn một chút
				resolution: [1280, 720], // Giảm xuống HD để tăng tốc độ xử lý
				processWidth: 300, // Giảm kích thước ảnh trước khi nhận diện để tăng hiệu suất
				outputmm: 0,
				
				// Cấu hình Python (null để dùng Python mặc định)
				pythonPath: null,
		
				// Cấu hình hiển thị và dữ liệu
				welcomeMessage: true,
				usernameDisplayMapping: null,
				extendDataset: true,
				dataset: 'modules/MMM-Face-Reco-DNN/dataset/',
				tolerance: 0.55, // Giảm để tăng độ chính xác khi nhận diện
		
				// Hỗ trợ nhiều user đăng nhập đồng thời
				multiUser: 1,
		
				// Debugging
				debug: 1,
		
				// Không cần trigger từ module khác, luôn chạy
				external_trigger_notification: ''
			}
		},
	     
		{
			module: "MMM-ImageSlideshow",
			position: "top_right", // Chỉnh vị trí theo ý muốn
			config: {
				fixedImage: true, // Hiển thị 1 ảnh duy nhất
				imagePaths: ["/home/richardmelvin52/MagicMirror/images/hien-id.jpg"], // Ảnh Hiển
				slideshowSpeed: 0, // Không tự đổi ảnh
				randomizeImageOrder: false,
			},
			classes: "hien"
		},
		
		{
			module: 'MMM-voice',
			position: 'bottom_bar',
			config: {
			  microphone: 1,
			  keyword: 'MAGIC MIRROR',
			  timeout: 15,
			  commands: {
				'HELLO MAGIC MIRROR': {
				  notificationExec: {
					notification: 'SHOW_ALERT',
					payload: { message: 'Hello! How can I assist you?', title: 'Magic Mirror' }
				  }
				},
				'SHOW ALL MODULES': {
				  notificationExec: {
					notification: 'SHOW_ALL_MODULES'
				  }
				},
				'HIDE ALL MODULES': {
				  notificationExec: {
					notification: 'HIDE_ALL_MODULES'
				  }
				},
				'TURN OFF MAGIC MIRROR': {
				  notificationExec: {
					notification: 'REMOTE_ACTION',
					payload: { action: 'SHUTDOWN' }
				  }
				}
			  }
			  
			},
			classes:"hien",
		  },
		  {
			module: 'MMM-Remote-Control',
			// uncomment the following line to show the URL of the remote control on the mirror
			// position: 'bottom_left',
			// you can hide this module afterwards from the remote control itself
			config: {
				customCommand: {},  // Optional, See "Using Custom Commands" below
				showModuleApiMenu: true, // Optional, Enable the Module Controls menu
				secureEndpoints: true, // Optional, See API/README.md
				// uncomment any of the lines below if you're gonna use it
				// customMenu: "custom_menu.json", // Optional, See "Custom Menu Items" below
				// apiKey: "", // Optional, See API/README.md for details
				// classes: {} // Optional, See "Custom Classes" below
			},
			classes:"hien"
		},
		  
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") { module.exports = config; }
