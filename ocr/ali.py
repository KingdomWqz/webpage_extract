from viapi.fileutils import FileUtils
file_utils = FileUtils('LTAI5tGcFYHWknLFRmjhfQgS', 'USJq3PIcX3QZIjVQseLPE2zYei7P4P')

oss_url = file_utils.get_oss_url("demo.jpg", 'jpg', True)
print(oss_url)
    




