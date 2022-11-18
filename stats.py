import psutil
import os
import time

from datetime import datetime

import socketio



def get_stats(sio):
    while True:
        time.sleep(.01)
        
        now = datetime.now()
        
        currentDatetime = now.strftime("%y%m%d_%X")
        
        Date = now.strftime("%y%m%d")
        
        Time = now.strftime("%X")

        cpu_percent = psutil.cpu_percent(1)
        
        ram_percent = psutil.virtual_memory()[2]
        
        ram_GB = psutil.virtual_memory()[3]/1000000000  
        
        # get the network I/O stats from psutil
        io = psutil.net_io_counters()
        # extract the total bytes sent and received 
        bytes_sent, bytes_recv = io.bytes_sent, io.bytes_recv
        
        
        UPDATE_DELAY = 1 # in seconds

        def get_size(bytes):
            for unit in ['', 'K', 'M', 'G', 'T', 'P']:
                if bytes < 1024:
                    return f"{bytes:.2f}{unit}B"
                bytes /= 1024
        
        # get the stats again
        io_2 = psutil.net_io_counters()
        # new - old stats gets us the speed
        us, ds = io_2.bytes_sent - bytes_sent, io_2.bytes_recv - bytes_recv
        
        
        upload = get_size(io_2.bytes_sent)
        download = get_size(io_2.bytes_recv)
        upload_speed =  get_size(us / UPDATE_DELAY)
        download_speed =  get_size(ds / UPDATE_DELAY)
        
        bytes_sent, bytes_recv = io_2.bytes_sent, io_2.bytes_recv
        
        data = {
            "CPU_Percent": cpu_percent,
            "RAM_Percent": ram_percent,
            "Ram_GB": ram_GB,
            "Upload": upload,
            "Upload_Speed": upload_speed,
            "Download": download,
            "Download_Speed": download_speed,
            "Time": Time,
            "Current_Datetime": currentDatetime
        }
        
        sio.emit("stats", data)
        
        
def start_sio():
    sio = socketio.Client()
    sio.connect('http://localhost:3000')
    
    return sio
    
def main():
    sio = start_sio()
    
    get_stats(sio)
    
if __name__ == "__main__":
    main()