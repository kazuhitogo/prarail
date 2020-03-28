source activate prarail
/usr/local/bin/mjpg_streamer -o "/usr/local/lib/mjpg-streamer/output_http.so -w ./www -p 8080" -i "/usr/local/lib/mjpg-streamer/input_uvc.so -d /dev/video0 -r 640x480 -fps 30 -q 10 -y -n" &
python prarail

