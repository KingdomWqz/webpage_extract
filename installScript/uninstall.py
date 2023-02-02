import winreg

machine_subkey = r'SOFTWARE\Google\Chrome\NativeMessagingHosts\zrpa.chrome.bridge'
winreg.DeleteKey(winreg.HKEY_LOCAL_MACHINE, machine_subkey)

user_subkey = r'SOFTWARE\Google\Chrome\NativeMessagingHosts\zrpa.chrome.bridge'
winreg.DeleteKey(winreg.HKEY_CURRENT_USER, user_subkey)