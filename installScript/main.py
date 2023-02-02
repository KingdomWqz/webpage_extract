import sys
import struct
import threading
from queue import Queue
import tkinter as tk

if sys.platform == "win32":
    import os
    import msvcrt
    msvcrt.setmode(sys.stdin.fileno(), os.O_BINARY)
    msvcrt.setmode(sys.stdout.fileno(), os.O_BINARY)


def send_message(msg):
    msg_size = struct.pack('I', len(msg))
    msg_size = msg_size.decode(sys.stdout.encoding)

    sys.stdout.write(msg_size)
    sys.stdout.write(msg)
    sys.stdout.flush()


def read_thread_func(queue):
    while 1:
        txt_length_bytes = sys.stdin.buffer.read(4)

        if len(txt_length_bytes) == 0:
            if queue:
                queue.put(None)
            sys.exit(0)

        txt_length = struct.unpack('i', txt_length_bytes)[0]
        txt = sys.stdin.buffer.read(txt_length).decode("utf-8")

        if queue:
            queue.put(txt)
        else:
            send_message('{"echo": %s}' % txt)


class MainWindow(tk.Frame):
    def __init__(self, queue: Queue, parent=None):
        self.queue = queue

        super().__init__(parent)
        # self.pack()

        # self.text = tk.StringVar()
        # self.text = "接收消息..."
        self.label = tk.Label(parent, text="接收消息...\n")
        self.label.pack()

        # self.text = tk.Text(parent)
        # self.text.grid(row=0, column=0, padx=10, pady=10, columnspan=2)
        # self.text.config(state=tk.DISABLED, height=10, width=40)

        self.btn = tk.Button(parent, text="Send", command=self.onSend)
        self.btn.pack()

        self.after(100, self.processMsg)

    def processMsg(self):
        while not self.queue.empty():
            message = self.queue.get_nowait()
            if message == None:
                self.quit()
                return
            # self.text.set("Received %s" % message)
            self.label['text'] += "Received %s \n" % message

        self.after(100, self.processMsg)

    def onSend(self):
        txt = '{"text":"aaaaa"}'
        try:
            send_message(txt)
        except IOError:
            sys.exit(1)

def Main():
    queue = Queue()

    root = tk.Tk()
    root.title("Native Extension")
    root.geometry("450x300")
    main_win = MainWindow(queue, root)

    thread = threading.Thread(target=read_thread_func, args=(queue,))
    thread.daemon = True
    thread.start()

    main_win.mainloop()

    sys.exit()


if __name__ == '__main__':
    Main()
