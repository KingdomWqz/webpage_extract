var ViapiUtil = require("@alicloud/viapi-utils");

function saveToTempOSS(filePath) {
  // AccessKeyID
  var accessKeyId = "";
  // AccessKeySecret
  var accessKeySecret = "";

  ViapiUtil.default
    .upload(accessKeyId, accessKeySecret, filePath)
    .then(function (ossUrl) {
      console.log(ossUrl);
    })
    .catch(function (err) {
      console.log(err);
    });
}

function tableOcr(filePath) {
  var config = new $OpenApi.Config({
    // 必填，您的 AccessKey ID
    accessKeyId: accessKeyId,
    // 必填，您的 AccessKey Secret
    accessKeySecret: accessKeySecret,
  });
  // 访问的域名
  config.endpoint = `ocr-api.cn-hangzhou.aliyuncs.com`;
  var client = new ocr_api20210707(config);
  
}

exports.saveToTempOSS = saveToTempOSS;
