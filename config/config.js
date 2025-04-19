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
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.2.20"],	// Set [] to allow all IP addresses
									// or add a specific IPv4 of 192.168.1.5 :
									// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
									// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
									// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false,			// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "",	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "",	// HTTPS Certificate path, only require when useHttps is true

	// Đặt ngôn ngữ mặc định là Tiếng Việt
    language: "vi",
    locale: "vi-VN", // Locale phù hợp với Tiếng Việt
    logLevel: ["INFO", "LOG", "WARN", "ERROR"],
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
                        "Hôm nay bạn trông thật tuyệt vời!",
                        "Nhớ làm xong deadline nha người đẹp!"
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
                lat: 10.7769, // Vĩ độ TPHCM
                lon: 106.7009 // Kinh độ TPHCM
            },
            classes: "hien"
        },
        {
            module: "weather",
            position: "top_right",
            header: "Dự báo thời tiết",
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
                broadcastNewsUpdates: true,
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
                cascade: 'modules/MMM-Face-Reco-DNN/model/haarcascade_frontalface_default.xml',
                method: 'haar',
                detectionMethod: 'hog',
                encodings: 'modules/MMM-Face-Reco-DNN/model/encodings.pickle',
                brightness: 50,
                contrast: 30,
                rotateCamera: -1,
                animationSpeed: 300,
                resolution: [1280, 720],
                processWidth: 300,
                outputmm: 0,
                pythonPath: null,
                welcomeMessage: true,
                usernameDisplayMapping: null,
                extendDataset: true,
                dataset: 'modules/MMM-Face-Reco-DNN/dataset/',
                tolerance: 0.55,
                multiUser: 1,
                debug: 1,
                external_trigger_notification: ''
            }
        },
        {
            module: "MMM-ImageSlideshow",
            position: "top_right",
            config: {
                fixedImage: true,
                imagePaths: ["/home/richardmelvin52/MagicMirror/modules/MMM-Face-Reco-DNN/images/"],
                slideshowSpeed: 0,
                randomizeImageOrder: false,
            },
            classes: "hien"
        },
        {
            module: 'MMM-BackgroundSlideshow',
            position: 'fullscreen_below',
            config: {
                imagePaths: ['/home/richardmelvin52/MagicMirror/modules/MMM-BackgroundSlideshow/exampleImages'],
                transitionImages: true,
                randomizeImageOrder: true
            },
            classes: "hien"
        },
        {
            module: "MMM-Cursor",
            config: {
                timeout: 1500
            },
            classes: "hien"
        }
    ]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") { module.exports = config; }