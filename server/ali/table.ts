// This file is auto-generated, don't edit it
import ocr_api20210707, * as $ocr_api20210707 from "@alicloud/ocr-api20210707";
// 依赖的模块可通过下载工程中的模块依赖文件或右上角的获取 SDK 依赖信息查看
import OpenApi, * as $OpenApi from "@alicloud/openapi-client";
import Util, * as $Util from "@alicloud/tea-util";
import Stream from "@alicloud/darabonba-stream";

const tableOcr = async () => {
  let config = new $OpenApi.Config({
    // 必填，您的 AccessKey ID
    accessKeyId: "",
    // 必填，您的 AccessKey Secret
    accessKeySecret: "",
  });
  // 访问的域名
  config.endpoint = `ocr-api.cn-hangzhou.aliyuncs.com`;
  const client = new ocr_api20210707(config);

  // 需要安装额外的依赖库，直接点击下载完整工程即可看到所有依赖。
  let bodyStream = Stream.readFromFilePath("./image.png");
  let recognizeTableOcrRequest = new $ocr_api20210707.RecognizeTableOcrRequest({
    body: bodyStream,
  });
  let runtime = new $Util.RuntimeOptions({});
  try {
    // 复制代码运行请自行打印 API 的返回值
    const res = await client.recognizeTableOcrWithOptions(
      recognizeTableOcrRequest,
      runtime
    );
    console.log(res);
  } catch (error) {
    // 如有需要，请打印 error
    Util.assertAsString(error.message);
  }
};

exports.tableOcr = tableOcr;
