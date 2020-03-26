from datetime import datetime as dt
import picamera,os
from io import BytesIO
from time import sleep

class praCamera:
    def __init__(self,leave_files_num=5,save_dir="./images",resolution=(320,240),on_memory=False,vflip=False):
        self.leave_files_num=leave_files_num
        self.save_dir=save_dir if save_dir[-1]=="/" else save_dir + "/"
        self.resolution=resolution
        self.on_memory=on_memory
        self.vflip=vflip
        self.change_save_dir(self.save_dir)

    def capture(self,file_name="auto"):
        if self.on_memory:
            savepath=BytesIO()
        else:
            if file_name=="auto":
                file_name=dt.now().strftime('%Y%m%d-%H%M%S') + ".jpg"
            savepath = self.save_dir+file_name
        with picamera.PiCamera() as camera:
            camera.resolution=self.resolution
            if self.on_memory:
                camera.vflip = self.vflip
                camera.capture(savepath,"jpeg")
            else:
                camera.vflip = self.vflip
                camera.capture(savepath)
        return savepath

    def change_save_dir(self,save_dir):
        self.save_dir=save_dir
        if self.on_memory:
            return True
        else:
            return os.makedirs(self.save_dir,exist_ok=True)

    def remove_images(self):
        file_list = sorted(os.listdir(self.save_dir))
        if len(file_list) <= self.leave_files_num:
            pass
        else:
            for file in file_list[self.leave_files_num:]:
                os.remove(self.save_dir + file)

def main():
    cam = praCamera(leave_files_num=3)
    while True:
        capture_file = cam.capture()
        print(capture_file)
        cam.remove_images()
        print("remove_process_done")

if __name__ == "__main__":
    main()