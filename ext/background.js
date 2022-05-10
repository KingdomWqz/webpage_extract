
// chrome.browserAction.onClicked.addListener(() => {
//     chrome.tabs.captureVisibleTab({ format: 'jpeg', quality: 100 }, (dataUrl) => {
//         if (!chrome.runtime.lastError) {
//             const imgData = dataUrl.split('base64,')[1];
//             fetch('https://www.paddlepaddle.org.cn/paddlehub-api/image_classification/chinese_ocr_db_crnn_mobile', {
//                 method: "POST",
//                 mode: 'cors',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     'image': imgData
//                 })
//             }).then(res => res.json()).then(data => {
//                 console.log(data)
//             })
//         }
//     });
// });



