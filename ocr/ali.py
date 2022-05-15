from cgitb import reset
from multiprocessing import context
from playwright.sync_api import sync_playwright

from viapi.fileutils import FileUtils
from alibabacloud_ocr20191230.client import Client as ocr20191230Client
from alibabacloud_tea_openapi import models as open_api_models
from alibabacloud_ocr20191230 import models as ocr_20191230_models


with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)
    context = browser.new_context()
    page = context.new_page()
    page.goto('https://www.1688.com')

    # 搜索
    page.fill('input#home-header-searchbox', 'iphone13')

    with context.expect_page() as new_page_info:
        page.click('button.single')
        new_page = new_page_info.value

        new_page.wait_for_load_state()
        print(new_page.title())

        # Screenshot
        new_page.screenshot(path='screenshot.jpg', type='jpeg', full_page=True)
        file_utils = FileUtils('key',
                               'sec')
        oss_url = file_utils.get_oss_url("screenshot.jpg", 'jpg', True)
        print(oss_url)

        # recognize
        config = open_api_models.Config(
            access_key_id='key',
            access_key_secret='sec',
            endpoint=f'ocr.cn-shanghai.aliyuncs.com'
        )
        client = ocr20191230Client(config)
        recognize_basic_request = ocr_20191230_models.RecognizeCharacterRequest(
            image_url=oss_url,
            min_height=10,
            output_probability=True
        )
        res = client.recognize_character(recognize_basic_request).to_map()
        print(res['body']['Data']['Results'])

    page.click('div#aaaa')

