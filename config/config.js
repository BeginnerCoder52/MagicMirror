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
			classes: "hien"
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
			// classes: "hien"
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
			// classes: "hien"
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
			// classes: "hien"
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
			// classes: "hien"
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
			// classes: "hien"
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
				imagePaths: ["/home/richardmelvin52/MagicMirror/images"], // Ảnh Hiển
				slideshowSpeed: 0, // Không tự đổi ảnh
				randomizeImageOrder: false,
			},
			// classes: "hien"
		},
		// {
		// 	module: "MMM-Text",
		// 	position: "top_right",
		// 	config: {
		// 		text: "Welcome back, Hiển!", 
		// 		fontSize: "20px",
		// 		updateInterval: 0, // Không tự động thay đổi
		// 	}
		// },
		
		  {
			module: 'MMM-voice',
			position: 'bottom_bar',
			config: {
				microphone: 'plughw:Generic_1,0', // Chỉ định card 1, device 0
				keyword: 'MAGIC MIRROR',
    			timeout: 15,
				debug: true,
				// ... see config options below
			},
			classes: "hien",
		},

			// {
			// 	module: 'MMM-Voice-Control',
			// 	position: 'lower_third', // If you want to see the prompt and recognised speech, omit otherwise
			// 	config: {
			// 		// See 'Configuration options' for more information.
			// 	}
			// },

			// {
			// 	module: "MMM-Voice-Commands",
			// 	config: {
			// 		debug: false, //Displays end results and errors from annyang in the Log
			// 		autoStart: true, //Adds annyang commands when it first starts
			// 		activateCommand: "hello mirror", //Command to active all other commands
			// 		deactivateCommand: "goodbye mirror", //Command to deactivate all other commands
			// 		alertHeard: false, //Whether an alert should be shown when annyang hears a phrase (mostly for debug)
			// 		commands: {
			// 			"command statement :variable (optional statement)": "SOCKET_NOTIFICATION_NAME",
			// 			//The payload of the socket notification will be whatever is said in the :variable
			// 			"command statement *variable": function(param){
			// 				alert("Whatever is said in the *variable space is given as the "+param);
			// 				//These function's 'this' are bound to the module's 'this' so you can do stuff like:
			// 				this.sendNotification("PAGE_SELECT", "2");
			// 			}
			// 		}
			// 	}
			// },
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") { module.exports = config; }
