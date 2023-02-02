import os
import hashlib
import json
import winreg


def createId(path):
    sha = hashlib.sha256(str(path).encode('utf-16le')).hexdigest()
    prefix = sha[:32]

    pluginId = ""
    ord_a = ord("a")
    for old_char in prefix:
        code = int(old_char, 16)
        pluginId += chr(ord_a + code)

    return pluginId


id = createId(os.getcwd() + '\ext')
print(os.getcwd())
print(id)

with open('manifest.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# path && allowed_origins
data['path'] = os.getcwd() + '\main.bat'
data['allowed_origins'][0] = 'chrome-extension://' + id + '/'

with open('manifest.json', 'w') as file:
    json.dump(data, file, ensure_ascii=False)

machine_subkey = r'SOFTWARE\Google\Chrome\NativeMessagingHosts\zrpa.chrome.bridge'
winreg.CreateKey(winreg.HKEY_LOCAL_MACHINE, machine_subkey)
winreg.SetValue(winreg.HKEY_LOCAL_MACHINE, machine_subkey,
                winreg.REG_SZ, os.getcwd() + "\manifest.json")

user_subkey = r'SOFTWARE\Google\Chrome\NativeMessagingHosts\zrpa.chrome.bridge'
winreg.CreateKey(winreg.HKEY_CURRENT_USER, user_subkey)
winreg.SetValue(winreg.HKEY_CURRENT_USER, user_subkey,
                winreg.REG_SZ, os.getcwd() + "\manifest.json")
