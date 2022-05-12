from playwright.sync_api import sync_playwright

from viapi.fileutils import FileUtils


with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)
    page = browser.new_page()
    page.goto('https://www.1688.com')
    

file_utils = FileUtils('LTAI5tGcFYHWknLFRmjhfQgS', 'USJq3PIcX3QZIjVQseLPE2zYei7P4P')

oss_url = file_utils.get_oss_url("demo.jpg", 'jpg', True)
print(oss_url)
    




